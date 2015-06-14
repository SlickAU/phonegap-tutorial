var EmployeeView = function() {
    
    this.initialize = function() {
        this.el = $('<div/>');   
    };
    
    this.initialize();
    
    this.render = function(employee) {
        this.el.html(EmployeeView.template(employee));
        return this;
    }
    
}

EmployeeView.template = Handlebars.compile($("#employee-tpl").html());