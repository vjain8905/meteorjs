// Client side code
if (Meteor.isClient) {
  // call function when template is finished rendering
  Template.btcavg_usd.rendered = function () {
      updateBTCAvgValue();
  };

  // Bind function to the "refresh" button click
  Template.btcavg_usd.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      updateBTCAvgValue();
    }
  });

  // Get the value from an external api
  function updateBTCAvgValue() {
    // Get JSON object from btcaverage API
    Meteor.http.get("https://api.bitcoinaverage.com/ticker/USD", function (err, res) {
      // Update the page to show the last USD value
      var returnVal = res.data['last'];
      console.log(returnVal);
      $('#btcavg_usd_last').html(returnVal);
    });
  }

  Template.mtgox_usd.rendered = function () {
      updateMtGoxValue();
  };

  Template.mtgox_usd.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      updateMtGoxValue();
    }
  });

  function updateMtGoxValue() {
    Meteor.http.get("http://data.mtgox.com/api/2/BTCUSD/money/ticker", function(err,res) {
      $('#mtgox_usd_last').html(res.data['data']['last']['value']);
    })
  }

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
