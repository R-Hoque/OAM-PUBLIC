_SPDEV.FrontNews = {};

_SPDEV.FrontNews.init = function(allstories,filter){
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
					if ($.inArray('../content/news/'+filter,data) != -1){
						console.log(filter,storyi);
						if ('content/news/'+filter == storyi) {
							$.get(storyi, function(story){
								var linkedStory = $(story);
								$(linkedStory.find('.article_source')[0]).attr('href','news.html?article='+storyi.slice(13));
								$('#qsnewsStories').append(story);
							});
						}
					} else {
						$.get(storyi, function(story){ 
							var linkedStory = $(story);
							$(linkedStory.find('.article_source')[0]).attr('href','news.html?article='+storyi.slice(13));
							$('#qsnewsStories').append(linkedStory);
						});
					}
					
				}
			} else {
				if ( i <=3 ){
					var storyi = newsContent[i].slice(3);
					if (storyi.slice(-13) != "template.html"){
						$.get(storyi, function(story){ 
							var linkedStory = $(story);
							$(linkedStory.find('.article_source')[0]).attr('href','news.html?article='+storyi.slice(13));
							$('#qsnewsStories').append(story);
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

