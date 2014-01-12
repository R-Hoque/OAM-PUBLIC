_SPDEV.SectorEditor = {};
var _lang = null;

$(function() {
  
  var langFile;
  //parse querystring if any
  var url = document.URL;
  var queryPars = $.parseParams( url.split('?')[1] || '' );
  
  if(typeof queryPars.dg === 'undefined') {
	  window.location = './index.html';
	  return;
  }
  
  if(queryPars.dg === 'Bolivia') {
	  langFile = "js/lang/es.json";
  } else {
	  langFile =  "js/lang/en.json"
  }
  
  $.getJSON( langFile, function( data ) {
	  _lang = data;
	  _SPDEV.SectorEditor.loadApp(queryPars.dg);
  });
});

_SPDEV.SectorEditor.loadApp = function(dg) {
  
  $('#se_h_title').html(_lang.se_h_title);
  $('#se_tab_head').html(_lang.se_tab_head);
  $('#se_col_head1').html(_lang.se_col_head1);
  $('#se_col_head2').html(_lang.se_col_head2);
};