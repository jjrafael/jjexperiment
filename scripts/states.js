JStest.extend('States', function(App) {

    var configMap = {
        //static states (configs, constants ...)
    };

    var stateMap = {
        //derived states
        images: {},
        texts: {},
        renderedItems: []
        
    };

    var update = function(data, model) {
        stateMap[model] = data;
        switch(model) {
            case 'images':
                App.Assets.renderImages(data);
                break;
            default:
                //none
                break;
        }
    }

    var remove = function (key, model) {
        data = stateMap[model];

        if(data.length){
            var data = data.filter(function(obj) {
                return obj.id !== key;
            });
        }
        console.log('jj deleted? key: ', key);
        console.log('jj deleted? 1: ', data);
    }

    return {
        update: update,
        remove: remove,
        stateMap: stateMap
    }

});