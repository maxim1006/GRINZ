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



    var Collection = Backbone.Collection.extend({
       model: Model
    });


    var collection = new Collection(names);


    collection.on({
        "add": function(model) {
            console.log('%o is added', model);
        },
        "change:name": function(model) {
            console.log('%o is changed', model);
        },
        "remove": function(model) {
            console.log('%o is removed', model);
        },
        "reset": function(collection, options) {
            console.log('%o is reseted', collection); // коллекция из 0 элементов
            console.log('%o is reseted', options.previousModels); //array из 3х элементов
        }
    });

    console.log(collection.length); //3
    console.log(collection.models); // array из 3х моделей

    collection.add({name: 'Denis'});

    console.log(collection.length); //4
    console.log(collection.models); // array из 4х моделей

    collection.remove(collection.models[3]);

    console.log(collection.length); //3
    console.log(collection.models); // array из 3х моделей, удалена модель {name: 'Denis'}

    collection.models[0].set('name', 'Maxim');

    collection.reset();
    console.log(collection.length); // 0
    console.log(collection.models); // []

    collection.reset({name: 'Max'});
    console.log(collection.length); // 1
    console.log(collection.models); // array из 1й модели

    collection.set([{name: 'Aliya'}, {name: 'Anton'}, {name: 'Denis'}]);
    console.log(collection.length); // 3
    console.log(collection.models); // array из 3x моделей, причем {name: 'Max'} была удалена


    collection.forEach(function(model){
        console.log(model.get('name')); //Aliya Anton Denis
    });


})();