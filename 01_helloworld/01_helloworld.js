if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to 01_helloworld.";
  };

  Template.hello.events({
    'click input' : function () {
      // Using standard html
      document.getElementById("greeting").innerHTML = "Button has been clicked!";

      // Using jquery
      $('#greeting').html("Button has been clicked");
    }
  });
}

// Don't need any server-side code for this app!
if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
