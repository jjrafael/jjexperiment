JStest.extend('Canvas', function(App) {

    var configMap = {
        //static states (configs, constants ...)
        xPos: 0,
        yPos: 0,
        initSize: 256
    };

    var stateMap = {
        //derived states
        
    };

    // Render functions
    var render = function() {
         
    };


    // Bind functions
    var bind = function() {
        var $container = $('.canvas .block');

        $container.on('click', '.item', function(){
            toggleItem($(this));
        });

        $container.on('click', '.btn-del-item', function(){
            deleteItem($(this).closest('.item'));
        });

        $container.on('change', '.item-text textarea', function(){
            updateText();
        });

        $('body').on('click', function(e){
            if(e.target.className == '.item')
                return;
            if($(e.target).closest('.item').length)
                return; 
            removeSelection();
        });

    };


    var toggleItem = function(item) {
        if($(item).hasClass('selected')){
            if(!$(item).hasClass('item-text')){
                removeSelection();
            }
        }else{
            selectItem(item);
        }
    }

    var selectItem = function(item) {
        var canvas =  $('.canvas .block');
        var itemHtml = '<div class="tools-wrap"><div class="tool btn-del-item"><i class="mdi mdi-close"></div></div>';

        $(canvas).find('.item').not(item).find('.tools-wrap').remove();
        $(canvas).find('.item').not(item).removeClass('selected');
        if($(item).find('.tools-wrap').length === 0){
            $(item).toggleClass('selected').prepend(itemHtml);
        }
    }

    var removeSelection = function () {
        $('.item').removeClass('selected');
        $('.item').find('.tools-wrap').remove();
    }

    var deleteItem = function(item) {
        var canvas =  $('.canvas .block');
        var id = $(item).attr('id');
        App.Util.fadeOut(item);
        App.States.remove(id, 'renderedItems');
    }

    var showError = function(xhr) {
        console.log('fetching images failed: ', xhr);
    }

    var load = function($container) {    
        render();
        bind();
    };

    return {
        load: load,
        selectItem: selectItem,
        removeSelection: removeSelection
    }

});