if (Meteor.isClient) {
  Template.values.values = function () {
  return Values.find({}, { sort: { source: 1 }});
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
            value: res.data['data']['last']['value'],
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
            value: res.data['last'],
            time: Date.now()
          }
        }
      );
    });

  }
}
