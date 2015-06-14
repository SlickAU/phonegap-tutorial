var app = {

    initialize: function() {
        var self = this;
        this.store = new MemoryStore(function() {
            $('body').html(new HomeView(self.store).render().el);
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
    
    registerEvents: function() {
        var self = this;
    
        if(document.documentElement.hasOwnProperty('ontouchstart')) {
            $('body').on('touchstart', 'a', function(e) {
                $(e.target).addClass('tappable-touch');
            });
            $('body').on('touchend', 'a', function(e) {
                $(e.target).removeClass('tappable-touch');   
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