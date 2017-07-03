JStest.extend('Assets', function(App) {

    var configMap = {
        //static states within this component (configs, constants ...)
        txtPlaceholder: 'Your text here'
    };

    var stateMap = {
        //derived states within this component
        itemCount: 0,
        lastItem: 0
        
    };

    // Render functions
    var render = function() {
        App.Model.getImages(App.States.update, showError);    
    };

    var checkcanSave = function() {
        var canvas = $('.canvas .block');
        var btn = $('.sidetop .btn');

        if($(canvas).find('.item').length !== 0){
            $(btn).removeClass('disable');
        }
    };

    var renderImages = function(data) {
        var $container = $('.image > ul');
        if(data.length){
            $.each(data, function( i, value ) {
              $container.prepend('<li><img src="'+value+'" class="img-rounded"/></li>');
            });
        }
        
    }

    var renderImage = function(el, id) {
        var canvas =  $('.canvas .block');
        
        $(canvas).append('<div id="'+id+'" class="item item-img"></div>');
        $(el).clone().appendTo('#'+id);
        $('.item').draggable({ containment: '.block', scroll: false });
    }

    var renderText = function(id) {
        var canvas =  $('.canvas .block');
        var textbox;
        var placeholder = configMap.txtPlaceholder;

        textbox = '<div id="'+id+'" class="item item-text"><textarea placeholder="'+placeholder+'"/><div class="text">'+placeholder+'</div></div>';
        $(canvas).append(textbox);
        $('.item').draggable({ containment: '.block', scroll: false });
    }


    // Bind functions
    var bind = function() {
        var $container = $('.sidepane');
        var canvas = $('.canvas > .block');

        $container.on('click', '.image img', function(){
            addAsset($(this));
        });

        $container.on('click', '#addText', function(){
            addAsset();
        });

        $container.on('click', '.form-upload .btn', function(){
            uploadImage();
        });

        $container.on('click', '.img-new', function(){
            $('.input-img').trigger('click');
        });

        $container.on('change', '.input-img', function(){
            uploadImage();
        });
    };

    var uploadImage =function() {
        var options = {};
        var input = $('input[name="upload"]');
        options['upload'] = input.val();
        if(input.val()){
            App.Model.postImage(options, App.States.update, showError); 
        }
    };

    var addAsset = function(el) {
        var item = {
            'id': '',
            'type': '',
            'content': '',
            'format': {},
            'xpos': 0,
            'ypos': 0
        };
        var id = stateMap.lastItem + 1;
        stateMap.itemCount++;
        stateMap.lastItem = id;
        item.id = id;

        if(el){
            item.type = 'image';
            item.content = $(el).attr('src');
            renderImage(el, id);
        }else{
            item.type = 'text';
            renderText(id);
        }
        App.States.newItem(item, 'renderedItems');
        App.Canvas.selectItem($('#'+id), true);
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
        stateMap: stateMap,
        renderImages: renderImages
    }

});