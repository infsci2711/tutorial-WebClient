var restBaseUrl = "http://52.0.4.98:7654/";

function PersonViewModel(firstName, lastName) {
	var self = this;

	self.firstName = ko.observable(firstName);
	self.lastName = ko.observable(lastName);
}

function PersonsViewModel() {
	var self = this;

	self.people = ko.observableArray();

	self.newPerson = ko.observable(new PersonViewModel());

	self.findAll = function() {
		$.ajax({
            url: restBaseUrl + "Person",
            type: 'GET',
            dataType: 'json',
            contentType: "application/json",
            crossDomain: true,
            success: function(data) {
				self.people.removeAll();

				for (var i = 0; i < data.length; i++) {
                    var person = new PersonViewModel(data[i].firstName, data[i].lastName);
                   
                    self.people.push(person);
                }
            },
            error: function(data) {
                alert("Something went wrong while getting services' list. Please try again.");
            }
        });
	};

	self.addPerson = function() {
		debugger;
		$.ajax({
            url: restBaseUrl + "Person",
            type: 'PUT',
            data: ko.toJSON(self.newPerson()),
            dataType: 'json',
            contentType: "application/json",
            crossDomain: true,
            success: function(data) {
            	debugger;
				self.people.push(new PersonViewModel(data.firstName, data.lastName));
				self.newPerson(new PersonViewModel());
            },
            error: function(data) {
                alert("Something went wrong while getting services' list. Please try again.");
            }
        });
	};

	self.findAll();
}

ko.applyBindings(new PersonsViewModel(), $("#personsContainer")[0]);