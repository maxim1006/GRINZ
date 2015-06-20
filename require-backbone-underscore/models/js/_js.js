(function() {

    //простой пример
    var Model = Backbone.Model.extend({
        initialize: function() {
            console.log('Model is initialized');

            //прослушивание событий изменения всех атрибутов
            this.on('change', this.onchange, this);
            //прослушивание событий изменения отдельного атрибута
            //this.on('change:defaultMethod', this.onchange, this);
        },
        onchange: function() {
            //если изменить сразу несколько атрибутов, то onchange вызовется все равно один раз
        },
        defaults: {
            defaultProp: "defaultProp",
            defaultMethod: function() {
                console.log('defaultMethod');
            }
        }
    });

    //создаю новую модель
    var model = new Model({
        prop: "prop"
    });

    //получить свойство из defaults
    console.log(model.get("defaultProp")); //defaultProp
    console.log(model.get("prop")); //prop

    //переписать значние свойства
    model.set("prop", "new prop");
    model.set({defaultProp: 'new defaultProp'}, {silent: true}); //silent - глушит событие change при изменении атрибута defaultProp
    console.log(model.get("prop")); //new prop
    console.log(model.get("defaultProp")); //new defaultProp

})();