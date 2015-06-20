(function() {

    $(function() {

        var Model = Backbone.Model.extend({
            defaults: {
                name: 'Default name'
            }
        });

        var NamesCollection = Backbone.Collection.extend({
            model: Model
        });

        var names;





        var ViewElement = Backbone.View.extend({
            template: template('viewExample'),
            tagName: 'li',
            className: 'list__item',
            initialize: function() {
                this.model.on('change:name', this.render, this);
            },
            events: {
                'click': 'onClick',
                'click .jsDelete': 'onDelete',
                'keyup .jsInputItem': 'onKeyUp'
            },
            onClick: function(el) {
                if (!this.$el.has('input').length) {
                    this.$el.append('<input type="text" class="list__input" />');
                    this.$('.list__input').val(this.$('.jsName').text());
                } else {
                    this.$el.addClass('_hidden');
                    this.$('.list__input').val(this.$('.jsName').text());
                }
            },
            onDelete: function() {
                var data,
                    model = names.get(this.model.id);

                data = {
                    id: this.model.id
                };

                model.collection.remove(model);
                this.$el.remove();

                getData('remove.php', "POST", data);
            },
            onKeyUp: function(e) {
                var data;

                if (e.which === 13) {
                    this.model.set('name', e.target.value);
                    this.$el.removeClass('_hidden');

                    data = {
                        id: names.get(this.model.id).id,
                        name: this.model.get('name')
                    };

                    getData('post.php', "POST", data);
                }
            },
            render: function () {
                this.$el.html(this.template(this.model.toJSON()));

                return this;
            }
        });

        var ViewCollection = Backbone.View.extend({
            tagName: 'ul',
            className: 'list',
            initialize: function() {
                this.collection.on('add', this.onAdd, this);
            },
            onAdd: function(model) {
                var newName = new ViewElement({model: model});
                this.$el.append(newName.render().el);
            },
            render: function() {
                _.each(this.collection.models, function(model) {
                    var model = new ViewElement({model: model});

                    this.$el.append(model.render().el);
                }, this);

                return this;
            }
        });

        var viewCollection;





        var MainInputView = Backbone.View.extend({
            el: '#mainInput',
            events: {
                'keyup': 'onKeyup'
            },
            onKeyup: function(e) {
                var name = e.target.value,
                    _this = this,
                    dataPost;

                if (e.which === 13) {
                    dataPost = {
                        name: name
                    };

                    if (!name) return;

                    getData('add.php', "POST", dataPost).done(function(dataGet) {
                        var id = JSON.parse(dataGet).id;
                        _this.collection.add({name: name, id: id});
                    });


                }
            }
        });

        var mainInputView;





        getNames().done(function(data) {
            names = new NamesCollection(JSON.parse(data));
            viewCollection = new ViewCollection({collection: names});
            mainInputView = new MainInputView({collection: names});

            $('#example').prepend(viewCollection.render().el);
        });





        function template(id) {
            return _.template($('#' + id).html());
        }

        function getNames() {
            return getData('get.php', "GET");
        }

        function getData(url, type, data) {
            return $.ajax({
                url: url,
                type: type,
                data: data ? JSON.stringify(data) : {}
            });
        }

    });

})();