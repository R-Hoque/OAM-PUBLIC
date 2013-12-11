_SPDEV.Login = {};


 
_SPDEV.Login.authenticate = function () {
    var postData = {'email': $('#uxLogin_email').val(), 'password': $('#uxLogin_pass').val()};
    $.ajax({
	    'type': 'POST',
	    'data': postData,
	    'dataType': "json",
	    'url': 'php/login.php',
	    'success': function(data){
		if (data.status != 200) {
		    alert(data.message);
		} else {
		   $('#login_name').html(data.data.username);
		   $('#wrapperLogin').toggle();
		   $('#uploadIATI').fadeIn();
		}
	    },		  
	    'error': function(response) {
		  console.error(response);
	    }
    });

  };
  
_SPDEV.Login.loginToggle = function() {
    $('#wrapperLogin').toggle();
}


// data upload
_SPDEV.Upload = {};

_SPDEV.Upload.createForm = function() {
  
    var content = '<div id="upload_form" style="text-align:justify">'+_lang.uploadtext+'<br/><br/>' +
	'<form method="post" enctype="multipart/form-data"  action="php/uploadIATI.php">' +
	'<input type="file" name="upload_iati_file" id="upload_iati_file" multiple />' +
        '<button type="submit" id="upload_btn">Upload</button>' +
	'</form><div id="upload_response" style="text-align:center;width:100%;margin-top:5px"></div> </div>';
    $('#viewContent').append(content);
    
    var formdata = false;
    if (window.FormData) {
      formdata = new FormData(); 
      $('#upload_btn').hide();
    } 
   
    
    $('#upload_iati_file').change(function (evt) {
	    $("#upload_response").html("<img src='img/loading.gif'/>");
	    var img, reader, file;
    
	    file = this.files[0];

	    if (file.type = "text/xml") {
		    if ( window.FileReader ) {
			    reader = new FileReader();
			    reader.onloadend = function (e) { 
				    // showUploadedItem(e.target.result, file.fileName);
			    };
			    reader.readAsDataURL(file);
		    }
		    if (formdata) {
			    formdata.append("iati", file);
		    }
	    } else {
		$("#upload_response").html("File type does not match.  IATI File should be in XML"); 
	    }
    
	    if (formdata) {
		    $.ajax({
			    url: "php/uploadIATI.php?country=Bolivia",
			    type: "POST",
			    data: formdata,
			    processData: false,
			    contentType: false,
			    success: function (res) {
				    $("#upload_response").html(res); 
			    }
		    });
	    }
    });
 
}

    function showUploadedItem (source) {
	    var list = document.getElementById("image-list"),
		    li   = document.createElement("li"),
		    img  = document.createElement("img");
	    img.src = source;
	    li.appendChild(img);
	    list.appendChild(li);
    }  