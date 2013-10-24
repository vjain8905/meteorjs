// Client side code
if (Meteor.isClient) {
  // List all the currencies - values, ordered by source name
  Template.values.values = function () {
    return Values.find({}, { sort: { source: 1 }});
  }

  // Set up helpers via Handlebars
  Template.values.helpers({
    // Hook into the "value" variable and return a 2 decimal rather than a full float
    value: function() {
      return this["value"].toFixed(2);
    },

    // Same as above, but "volume"
    volume: function() {
      return this["volume"].toFixed(2);
    }
  });

  // Calculate the average based on volume
  // TODO: Make this work per currency
  Template.average.average = function() {
    var sum = 0;
    var volume = 0;

    // Loop through all rows from Values collection
    rows = Values.find({});
    rows.forEach(function(row) {
      sum += row["value"] * row["volume"];
      volume += row["volume"];
    });
    return (sum/volume).toFixed(2);
  }
}


// Server side code
if (Meteor.isServer) {
  Meteor.startup(function () {

    // Run function every 2000ms (2s)
    Meteor.setInterval( function () {
        updateDB();
    }, 2000 );
  });

  // Just to make it so I don't have 5000 functions in the setInterval
  function updateDB() {
    updateMtGox();
    updateBitStamp();
  }

  // Update the MtGox value in the collection
  function updateMtGox() {
    // Simple HTTP get to the API
    Meteor.http.get("http://data.mtgox.com/api/2/BTCUSD/money/ticker", function(err,res) {
      // Upsert updates if the selector exists, inserts otherwise. Kind of like ON DUPLICATE KEY for mysql
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

  // Update BitStamp USD
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
