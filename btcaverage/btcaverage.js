if (Meteor.isClient) {
  Template.values.values = function () {
    return Values.find({}, { sort: { source: 1 }});
  }

  Template.values.helpers({
    value: function() {
      return this["value"].toFixed(2);
    },

    volume: function() {
      return this["volume"].toFixed(2);
    }
  });

  Template.average.average = function() {
    var sum = 0;
    var volume = 0;
    rows = Values.find({});
    rows.forEach(function(row) {
      //console.log(row);
      sum += row["value"] * row["volume"];
      volume += row["volume"];
    });
    return (sum/volume).toFixed(2);
  }
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    Meteor.setInterval( function () {
        updateDB();
    }, 2000 );
  });

  function updateDB() {
    updateMtGox();
    updateBitStamp();
    // console.log(Values.find({}, { sort: { time: -1 }}));
  }

  function updateMtGox() {
    Meteor.http.get("http://data.mtgox.com/api/2/BTCUSD/money/ticker", function(err,res) {
      Values.upsert(
        {
          // Selector
          source: "MtGox", 
          currency: "USD"
        },
        {
          // Modifier
          $set: {
            value: parseFloat(res.data['data']['last']['value']),
            volume: parseFloat(res.data['data']['vol']['value']),
            time: Date.now()
          }
        }
      );
    });
  }

  function updateBitStamp() {
    Meteor.http.get("https://www.bitstamp.net/api/ticker/", function(err,res) {
      Values.upsert(
        {
          source: "BitStamp", 
          currency: "USD"
        },
        {
          $set: {
            value: parseFloat(res.data['last']),
            volume: parseFloat(res.data['volume']),
            time: Date.now()
          }
        }
      );
    });

  }
}
