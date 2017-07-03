JStest.extend('Canvas', function(App) {

    var configMap = {
        //static states (configs, constants ...)
        xPos: 0,
        yPos: 0,
        txtPlaceholder: 'Your text here'
    };

    var stateMap = {
        //derived states
        
    };

    // Render functions
    var render = function() {
         var data = localStorage.getItem('AppData') ? JSON.parse(localStorage.getItem('AppData')) : AppData;
         var canvas = $('.canvas .block');
         var content = configMap.txtPlaceholder;
         var lastItem;
         if(data.renderedItems){
            for (var i = 0; i < data.renderedItems.length; i++) {
                var item = data.renderedItems[i];
                App.Assets.stateMap.itemCount = i;
                lastItem = item.id;
                if(item.type === 'image'){
                    $(canvas).append('<div id="'+item.id+'" class="item item-img"><img src="'+item.content+'"/></div>');
                    $(canvas).find('#'+item.id).css({
                        'top': item.ypos,
                        'left': item.xpos
                    });
                }else{
                    content = item.content.trim() === '' ? content : item.content;
                    $(canvas).append('<div id="'+item.id+'" class="item item-text"><textarea placeholder="'+content+'" value="'+content+'"/><div class="text">'+content+'</div></div>');
                    $(canvas).find('#'+item.id).css({
                        'top': item.ypos,
                        'left': item.xpos
                    });
                }
            }
            App.Assets.stateMap.lastItem = lastItem;
            $('.item').draggable({ containment: '.block', scroll: false });
         }
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
            updateText($(this));
        });

        $('body').on('click', function(e){
            if(e.target.className == '.item')
                return;
            if($(e.target).closest('.item').length)
                return; 
            removeSelection();
        });

        $container.on('mouseup', '.item', function(){
            calculateItemPos($(this));
        });


    };

    var calculateItemPos = function(item) {
        var key = $(item).attr('id');
        var xpos = $(item).css('left');
        var ypos = $(item).css('top');
        App.States.updateProp(key, 'renderedItems', {
            'xpos' : xpos,
            'ypos' : ypos
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

    var selectItem = function(item, isNew) {
        var canvas =  $('.canvas .block');
        var itemHtml = '<div class="tools-wrap"><div class="tool btn-del-item"><i class="mdi mdi-close"></div></div>';

        $(canvas).find('.item').not(item).find('.tools-wrap').remove();
        $(canvas).find('.item').not(item).removeClass('selected');
        if($(item).find('.tools-wrap').length === 0){
            $(item).toggleClass('selected').prepend(itemHtml);
            if(isNew){
                $(item).addClass('selected').prepend(itemHtml);
            }
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

    var updateText = function(el) {
        var txt = $(el).val();
        var item = $(el).closest('.item');
        var key = $(item).attr('id');
        $(item).find('.text').text(txt);

        App.States.updateProp(key, 'renderedItems', {
            'content' : txt
        });
    };

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