/**
* Templates
*/

// Return all messages ordered with newest first
Template.messages.messages = function () {
	return Messages.find({}, { sort: { time: -1 }});
}

// Add a bind the the "Enter" key to add a new message
Template.input.events = {
	'keydown input#message' : function (event) {
	    if (event.which == 13) { // 13 is the enter key event
	    	var user = Meteor.user();
	    	// Validate the user is logged in
	    	if (user && user.emails) {
	    		// Set values to add to DB
	    		var name = user.emails[0].address;
	    		var message = document.getElementById('message');
	    		if (message.value != '') {
	    			// Insert the row into the DB
	    			Messages.insert({
	    				name: name,
	    				message: message.value,
	    				time: Date.now(),
	    			});

	    			// Clear values
	    			document.getElementById('message').value = '';
	    			message.value = '';
	    		}
	    	}
	    }
	}
}
