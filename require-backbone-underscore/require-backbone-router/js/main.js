require.config({
  paths: {
    jquery: 'libs/jquery',
    underscore: 'libs/underscore',
    backbone: 'libs/backbone',
    text: 'libs/text'
  }

});

require([
    'init'
], function(init){
    init.initialize();
});