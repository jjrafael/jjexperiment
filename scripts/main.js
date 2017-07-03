'use strict'

var JStest = (function (){
    'use strict';
    var App = {
        init: []
    };

    var initApp = function() {
        console.log('Initializing JS Test..');

        App.Assets.load();
        App.Canvas.load();
    };

    var extend = function(module,obj){
        App[module] = obj(App);
        return App;
    };

    return {
        initApp: initApp,
        extend : extend
    };

}());