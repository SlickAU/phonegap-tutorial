var app = {

    initialize: function() {
        var self = this;
        this.detailsURL = /^#employees\/(\d{1,})/;
        this.store = new MemoryStore(function() {
            self.route();
        });
        this.registerEvents();
    },
    
    showAlert: function(message, title) {
        if(navigator.notification) {
            navigator.notification.alert(message, null, title, 'OK');   
        }
        else {
            alert(title ? (title + ': ' + message) : message);
        }
    },
    
    route: function() {
        var hash = window.location.hash;
        if(!hash) {
            $('body').html(new HomeView(this.store).render().el);
            return;
        }
        var match = hash.match(app.detailsURL);
        if(match) {
            this.store.findById(Number(match[1]), function(employee) {
                $('body').html(new EmployeeView(employee).render().el);
            });
        }
    },
    
    registerEvents: function() {
        var self = this;
        
        $(window).on('hashchange', $.proxy(this.route, this));
    
        if(document.documentElement.hasOwnProperty('ontouchstart')) {
            $('body').on('touchstart', 'a', function(e) {
                $(e.target).addClass('tappable-active');
            });
            $('body').on('touchend', 'a', function(e) {
                $(e.target).removeClass('tappable-active');   
            });
        } else {
            $('body').on('mousedown', 'a', function(event) {
                $(event.target).addClass('tappable-active');
            });
            $('body').on('mouseup', 'a', function(event) {
                $(event.target).removeClass('tappable-active');
            });
        }
    }

};

app.initialize();