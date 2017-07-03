JStest.extend('Model', function(App) {
  var configMap = {
  	appName: 'JStest'
  };

  var consoleLogErr = function(url) {
      console.log('Something went wrong on: ' + url);
  }

  var getImages = function(callBack, errorCallBack) {
    var url = configMap.url;
    var stateName = 'images';

  	$.ajax({
  	  url: '/images',
  	  type: "GET",
  	  dataType: "json",
  	  success: function(data){
  	    if (typeof callBack === 'function') {
          callBack(data, stateName);
        }
  	  },
  	  error: function(xhr){
  	    if (typeof errorCallBack === 'function') {
            errorCallBack(xhr);
          }
    	 }
    });
  };

  return $.extend(configMap, {
  	getImages: getImages
  }, true);
});