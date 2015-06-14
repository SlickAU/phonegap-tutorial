var EmployeeView = function(employee) {
    
    this.initialize = function() {
        var self = this;
        this.el = $('<div/>');   
        this.el.on('click', '.add-location-btn', function(e) {self.addLocation(e)});
        this.el.on('click', '.add-contact-btn', function(e) {self.addToContacts(e)});
        this.el.on('click', '.change-pic-btn', function(e) {self.changePicture(e)});
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
        
        if(employee.image) {
            var photos = [];
                photos[0] = new ContactField('url', employee.image, true);
        }
        contact.photos = photos;
        
        contact.save();
        return false;
    }
    
    this.changePicture = function(e) {
        e.preventDefault();
        
        if(!navigator.camera) {
            app.showAlert('Camera API not supported', 'Error');
            return;
        }
        
        var options = {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: 1,
            encodingType: 0
        };
        
        navigator.camera.getPicture(
            function(imageData) {
                $('.employee-image', this.el).attr('src', 'data:image/jpeg;base64,' + imageData);
            ),
            function() {
                app.showAlert('Error taking picture', 'Error');
            },
        options);
                
        return false;
    }
    
    this.render = function() {
        this.el.html(EmployeeView.template(employee));
        return this;
    }
    
}

EmployeeView.template = Handlebars.compile($("#employee-tpl").html());