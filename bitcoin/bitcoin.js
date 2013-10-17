if (Meteor.isClient) {
  Template.btcavg_usd.rendered = function () {
      updateBTCAvgValue();
  };

  Template.btcavg_usd.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      updateBTCAvgValue();
    }
  });

  function updateBTCAvgValue() {
    Meteor.http.get("https://api.bitcoinaverage.com/ticker/USD", function (err, res) {
      var returnVal = res.data['last'];
      //console.log(res.data);
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
