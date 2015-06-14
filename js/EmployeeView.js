var EmployeeView = function(employee) {
    
    this.initialize = function() {
        var self = this;
        this.el = $('<div/>');   
        this.el.on('click', '.add-location-btn', function(e) {self.addLocation(e)});
        this.el.on('click', '.add-contact-btn', function(e) {self.addToContacts(e)});
    };
    
    this.initialize();
    
    this.addLocation = function(e) {
        e.preventDefault();
        console.log('addLocation');
        navigator.geolocation.getCurrentPosition(
            function(pos) {
                $('.location', this.el).html(pos.coords.latitude + ',' + pos.coords.longitude);
            },
            function() {
                alert('Error getting location');
            });
        return false;
    }
    
    this.addToContacts = function(e) {
        e.preventDefault();
        console.log('addToContacts');
        if(!navigator.contacts) {
            app.showAlert('Contacts API not supported', 'Error');
            return;
        }
        var contact = navigator.contacts.create();
        contact.name = {givenName: employee.firstName, familyName: employee.lastName};
        var phoneNumbers = [];
        phoneNumbers[0] = new ContactField('work', employee.officePhone, false);
        phoneNumbers[1] = new ContactField('mobile', employee.cellPhone, true);
        contact.phoneNumbers = phoneNumbers;
        contact.save();
        return false;
    }
    
    this.render = function() {
        this.el.html(EmployeeView.template(employee));
        return this;
    }
    
}

EmployeeView.template = Handlebars.compile($("#employee-tpl").html());