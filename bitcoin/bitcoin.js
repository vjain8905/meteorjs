if (Meteor.isClient) {
  Template.btcavg.value = function () {
    //var retVal = updateValue();
    retVal = '';
    return retVal;
  };

  Template.btcavg.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      updateValue();
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

function updateValue() {
  Meteor.http.get("https://api.bitcoinaverage.com/ticker/USD", function (err, res) {
    //var returnVal = JSON.parse(res.data);
    console.log(res.data);
  });
  return 'vj';
}
