(function() {


    var Parent = Backbone.Model.extend({
        method: function() {
            console.log('method from Parent');
        },
        defaults: {
            defaultsMethod: function() {
                console.log('method from defaults in Parent');
            }
        }
    });

    var parent = new Parent({
        methodFromInitialization: function() {
            console.log('method from initialization');
        }
    });


    $('#simpleChild').click(function() {
        console.log(parent);
    });





    var ViewParent = Backbone.View.extend({
        initialize: function() {
           console.log('ViewParent initialized');
        },
        render: function() {
            console.log('ViewParent rendered');
            return this;
        },
        methodParent: function() {
            console.log('methodParent is triggered');
        }
    });



    var ViewChild = ViewParent.extend({
        initialize: function() {
            console.log('ViewChild initialized');
        },
            render: function() {
            ViewParent.prototype.render.apply(this, arguments);
            console.log('ViewChild rendered');

            return this;
        },
        methodChild: function() {
            console.log('methodChild is triggered');
        }
    });

    var viewChild = new ViewChild;
    viewChild.render();



    var ViewChildChild = ViewChild.extend({
        methodChildChild: function() {
            console.log('methodChildChild is triggered');
        }
    });

    var viewChildChild = new ViewChildChild;
    viewChildChild.methodParent();
    viewChildChild.methodChild();
    viewChildChild.methodChildChild();

    $('#viewChildChild').click(function() {
        console.log(viewChildChild);
    });


})();