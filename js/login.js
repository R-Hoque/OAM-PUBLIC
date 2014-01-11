_SPDEV.Login = {};
_SPDEV.Login.user = {};

// function is called on "LOG IN" button click
_SPDEV.Login.authenticate = function () {
    var postData = {'email': $('#uxLogin_email').val(), 'password': $('#uxLogin_pass').val()};
    $.ajax({
	    'type': 'POST',
	    'data': postData,
	    'dataType': "json",
	    'url': 'php/login_salted.php',
	    'success': function(data){
		if (data.status != 200) {
		    alert(data.message);
		} else {
		   _SPDEV.Login.user = data.data;
		   $('#login').html(data.data.username);
		   $('#wrapperLogin').toggle();
		   $('#uploadIATI').fadeIn();
		}
	    },		  
	    'error': function(response) {
		  console.error(response);
	    }
    });

  };
  
// Toggle the login drop down
_SPDEV.Login.loginToggle = function() {
    $('#wrapperLogin').toggle();
}