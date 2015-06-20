(function() {

    names = [
        {
            name: 'Max'
        },
        {
            name: 'Aliya'
        },
        {
            name: 'Anton'
        }
    ];



    var Model = Backbone.Model.extend({
        defaults: {
            name: 'Default name'
        }
    });

    var model = new Model();



    var Collection = Backbone.Collection.extend({
        model: Model
    });

    var collection = new Collection(names);



    var View = Backbone.View.extend({
        tagName: 'li',
        className: 'list__item',
        id: 'listItemId',
        template: template('viewExample'),
        events: {
            'dblclick': 'onClick',
            'keydown .jsInputItem': 'onEnter',
            'click .jsDelete': 'onDelete'
        },
        initialize: function() {
            this.model.on('change:name', this.render, this)
        },
        onClick: function(e) {
            this.$el.addClass('_hidden');
            console.log('is clicked %o', e.target);
        },
        onEnter: function(e) {
            if (e.which === 13) {
                this.model.set('name', e.target.value);
                this.$el.removeClass('_hidden');
            }
        },
        onDelete: function() {
            this.$el.remove();
            this.model.destroy();

            return this;
        },
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });

    var ViewCollection =  Backbone.View.extend({
        tagName: 'ul',
        className: 'list',
        initialize: function() {
            this.collection.on('add', this.onAdd, this);
        },
        onAdd: function(model) {
            var newName = new View({model: model});
            this.$el.append(newName.render().el);
        },
        render: function() {
            _.each(this.collection.models, function(model) {
                var view = new View({model: model});

                this.$el.append(view.render().el);
            }, this);

            return this;
        }
    });

    var viewCollection = new ViewCollection({collection: collection, attributes: {canGo:'yes'}});



    $('#id').append(viewCollection.render().el);



    var ViewMainInput = Backbone.View.extend({
        el: '#input',
        events: {
            'keyup': 'onKeyup'
        },
        onKeyup: function(e) {
            if (e.which === 13) this.collection.add({name: e.target.value});
        }
    });

    var  viewMainInput = new ViewMainInput({collection: collection});




    //хелпер шаблона, нужен просто для упрощения кода
    function template(id) {
        return _.template($('#' + id).html());
    }

})();