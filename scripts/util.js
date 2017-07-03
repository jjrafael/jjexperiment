JStest.extend('Util', function(App) {

    var fadeOut = function(el) {
        console.log('jj fadeout: ', el);
       $(el).css('opacity', '0');
        setTimeout(function(){
            $(el).remove();
        }, 500);
    }

    return {
        fadeOut: fadeOut
    }

});