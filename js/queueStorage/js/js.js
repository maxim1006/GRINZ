var Storage = window.Storage || {};

var logContainer;

Storage.inherit = function(child, parent) {
    child.prototype = Object.create(parent.prototype);
    child.prototype.constructor = child;
};

Storage.baseClass = function baseClass() {
    this.queue = {};
    this.id = 0;
    this.size = 0;
};

Storage.baseClass.prototype = {
    _getSize: function() {
        return this.size;
    },

    _getQueue: function() {
        return this.queue;
    },

    nextId: function() {
        return ++this.id;
    },

    enqueue: function(params) {
        var id = this.nextId();

        this.id = id;
        this.queue[id] = params;
        this.size++;

        logContainer.innerHTML += '<p>' + params.logs + ' is added with id: ' + this.id + ', remaining ' + this.size + '</p>';

        return this.id;
    },

    dequeue: function(params) {

        if (!this.size) return;

        this.size--;

        logContainer.innerHTML += '<p>' + (this.queue[params.id] ? this.queue[params.id].logs : 'cleared') +
        ' is deleted with id: ' + params.id +
        ', remaining: ' + this.size + '</p>';

        delete this.queue[params.id];

        if (this.size === 0) {
            this.id = 0;
        }
    },

    clearQueue: function() {

        if (!this.size) return;

        var key,
            obj = this.queue;

        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                delete obj[key]
            }
        }

        this.size = 0;
        this.id = 0;

        logContainer.innerHTML += '<p>' + 'all requests are done' + '</p>';
    }
};



Storage.Loader = function() {
    Storage.baseClass.apply(this, arguments);
};

Storage.inherit(Storage.Loader, Storage.baseClass);

Storage.Loader.prototype.enqueue = function(params) {
    document.getElementById('layoutCover').style.display = "block";
    return Storage.baseClass.prototype.enqueue.call(this, params);
};

Storage.Loader.prototype.dequeue = function(params) {
    Storage.baseClass.prototype.dequeue.call(this, params);
    if ( this.size === 0 && document.getElementById('layoutCover').style.display !== "none") {
        logContainer.innerHTML += '<p>' + 'all requests are done' + '</p>';

        document.getElementById('layoutCover').style.display = "none";
    }
};

Storage.Loader.prototype.clearQueue = function(params) {
    Storage.baseClass.prototype.clearQueue.call(this, params);
    document.getElementById('layoutCover').style.display = "none";
};

Storage.loader = new Storage.Loader();




document.addEventListener("DOMContentLoaded", function(e) {

    logContainer = document.querySelector('.log');

    document.querySelector('.block1').addEventListener('click', function(e) {
        var loader = Storage.loader.enqueue({logs:'request from .block1'});

        setTimeout(function() {
            Storage.loader.dequeue({id: loader});
        }, 1000);
    });

    document.querySelector('.block2').addEventListener('click', function(e) {
        var loader = Storage.loader.enqueue({logs:'request from .block2'});

        setTimeout(function() {
            Storage.loader.dequeue({id: loader});
        }, 2000);
    });

    document.querySelector('.block3').addEventListener('click', function(e) {
        var loader = Storage.loader.enqueue({logs:'request from .block3'});

        setTimeout(function() {
            Storage.loader.dequeue({id: loader});
        }, 3000);
    });

    document.querySelector('.block-delete').addEventListener('click', function(e) {
        Storage.loader.clearQueue();
    });

    document.querySelector('.clear-log').addEventListener('click', function(e) {
        logContainer.innerHTML = '';
    });

});



