_SPDEV.FrontNews = {};

_SPDEV.FrontNews.init = function(allstories){
	allstories = allstories||false;
	var newsContent = null;
	var newsURL = "php/getNewsFiles.php";
	$.ajax({
	  url: newsURL,
	  dataType: 'JSON',
	  type: 'GET',
	  async: false,
	  success: function(data) {
	    newsContent = data.sort().reverse();
		for (i in newsContent) {
			if ( allstories ) {
				var storyi = newsContent[i].slice(3);
				if (storyi.slice(-13) != "template.html"){
					$.get(storyi, function(data){ 
						$('#qsnewsStories').append(data);
					});
				}
			} else {
				if ( i <=3 ){
					var storyi = newsContent[i].slice(3);
					if (storyi.slice(-13) != "template.html"){
						$.get(storyi, function(data){ 
							$('#qsnewsStories').append(data);
						});
					}
				}
			}
		}
	  },
	  error: function(jqXHR, errorThrown) {
	    console.log('error...');
	    console.log(jqXHR);
	    console.log(errorThrown);
	  }
	});
	
};

