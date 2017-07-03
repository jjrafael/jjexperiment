JStest.extend('States', function(App) {

    var AppData = {
        //derived states for global components (assets, canvas ...)
        autoSave: true,
        images: {},
        renderedItems: []
        
    };

    var update = function(data, model) {
        var localdata = localStorage.getItem('AppData') ? JSON.parse(localStorage.getItem('AppData')) : AppData;
        localdata[model] = data;
        if(data.length){
            switch(model) {
                case 'images':
                    App.Assets.renderImages(data);
                    break;
                default:
                    //none
                    break;
            }
        }
        AppData = localdata;


        if(AppData.autoSave){
            localStorage.setItem('AppData', JSON.stringify(localdata));
        }
    }

    var newItem = function(item, model) {
        var localdata = localStorage.getItem('AppData') ? JSON.parse(localStorage.getItem('AppData')) : AppData;
        localdata[model].push(item);
        AppData = localdata;

        if(AppData.autoSave){
            localStorage.setItem('AppData', JSON.stringify(localdata));
        }
    };

    var updateProp = function(key, model, newval) {
        var localdata = localStorage.getItem('AppData') ? JSON.parse(localStorage.getItem('AppData')) : AppData;
        var data = localdata[model];

        if(data.length){
            for (var i = 0; i < data.length; i++) {
                if(data[i].id == key){
                    for (var prop in newval) {
                        data[i][prop] = newval[prop];
                    }
                }
            }
        }
        AppData = localdata;
        if(AppData.autoSave){
            localStorage.setItem('AppData', JSON.stringify(localdata));
        }
    };

    var remove = function (key, model) {
        var newdata = [];
        var localdata = localStorage.getItem('AppData') ? JSON.parse(localStorage.getItem('AppData')) : AppData;
        var data = localdata[model];
        
        if(data.length){
            for (var i = 0; i < data.length; i++) {
                if(data[i].id != key){
                    newdata.push(data[i]);
                }
            }
            localdata[model] = newdata;
        }
        AppData = localdata;

        if(AppData.autoSave){
            localStorage.setItem('AppData', JSON.stringify(localdata));
        }
    }

    return {
        update: update,
        updateProp: updateProp,
        newItem: newItem,
        remove: remove,
        AppData: AppData
    }

});