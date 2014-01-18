  /* ================================================
  @author = Grant McKenzie (gmckenzie@spatialdev.com)
  @date = January 2014
  @client = World Bank Open Aid Partnership
  @functionality = Sector Editor Main JS File
  =================================================== */
  
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

  // Load the Application
  _SPDEV.SectorEditor.loadApp = function(dg) {
    
    // Load Language
    $('#se_h_title').html(_lang.se_h_title);
    $('#se_tab_head').html(_lang.se_tab_head);
    $('#se_col_head1').html(_lang.se_col_head1);
    $('#se_col_head2').html(_lang.se_col_head2);
    $('#se_chooser_head').html(_lang.se_chooser_head);
    
    this.loadStandardSectors($('#se_chooser_content'));
    this.readIATI();
    
    $('.se_col.tab').on('mouseover',function() { 
	var x = this.id.split('_');
	$('#c_file_'+x[2]).addClass('selected');
	$('#c_iati_'+x[2]).addClass('selected');
    });
    $('.se_col.tab').on('mouseout',function() { 
	var x = this.id.split('_');
	$('#c_file_'+x[2]).removeClass('selected');
	$('#c_iati_'+x[2]).removeClass('selected');
    });
  };
  
  _SPDEV.SectorEditor.loadStandardSectors = function(parent) {
      var cell, c, content = "";
      $.ajax({
	  type: 'POST',
	    'dataType': "json",
	    'url': 'sector_editor/php/getSectors.php',
	    'success': function(data){
		data.sort(compare);
		var i = 0;
		while(i<data.length) {
		  cell = "<div class='se_col chooser' id='c_chooser_"+data[i].c_id+"'>"+data[i].name+"</div>";
		  content += cell;
		  i++;
		}
		parent.html(content);
	    },
	    'error': function(response) {
		  console.error(response);
	    }
	});

  }
  
  // AJAX Call to read in DATA from FILE and DB
  _SPDEV.SectorEditor.readIATI = function() {
      var params = {'dg': '769'};
      $.ajax({
        type: 'POST',
	  'dataType': "json",
	  'data': params,
	  'url': 'sector_editor/php/getComparison.php',
	  'success': function(data){
		$('#se_sectors_file').html(_SPDEV.SectorEditor.generateCells('import',data));
		$('#se_sectors_iati').html(_SPDEV.SectorEditor.generateCells('sector',data));
	  },
	  'error': function(response) {
	  	console.error(response);
	  }
      });
     // Replace this with real data
      var data = {};
      data.length = 10;
      
      
  }
  
  _SPDEV.SectorEditor.generateCells = function(type, data) {
      var cell, c, content = "";
      var i = 0;
      while(i<data.length) {
	c = i%2 == 0 ? 'odd' : 'even';
	cell = (type == "import") ? "<div class='se_col tab "+c+"' id='c_"+type+"_"+i+"'>"+data[i].import+"</div>" : "<div class='se_col tab "+c+"' id='c_"+type+"_"+i+"'>"+data[i].sector+"</div>"
	content += cell;
	i++;
      }
      return content;
  }
  
  
  
  function compare(a,b) {
    if (a.name < b.name)
      return -1;
    if (a.name > b.name)
      return 1;
    return 0;
  }