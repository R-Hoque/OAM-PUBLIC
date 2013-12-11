_SPDEV.FrontStats = {};

_SPDEV.FrontStats.init = function(){
	
	var quickStats = null;
	var statsURL = "php/getQuickStats.php";
	$.ajax({
	  url: statsURL,
	  dataType: 'JSON',
	  type: 'GET',
	  async: false,
	  success: function(data) {
	    //console.log('got it!');
	    quickStats = data;
	    $('#agStats').html(quickStats[6].count);
	    $('#transStats').html(quickStats[54].count);
	    $('#edStats').html(quickStats[20].count);
	    $('#healthStats').html(quickStats[29].count);
	  },
	  error: function(jqXHR, errorThrown) {
	    console.log('error...');
	    console.log(jqXHR);
	    console.log(errorThrown);
	  }
	});
	
};
