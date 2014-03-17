<?php
	//start the session
	session_set_cookie_params ( 3600, null, null, null, true);
	session_start();

	$_SESSION = array();

	//check to make sure the session variable is registered
	if (isset($_SESSION['oamuser'])) {

		if (ini_get("session.use_cookies")) {
		    $params = session_get_cookie_params();
		    setcookie(session_name(), '', time() - 42000,
		        $params["path"], $params["domain"],
		        $params["secure"], $params["httponly"]
		    );
		}
		
		//session variable is registered, the user is ready to logout
		session_unset();
		session_destroy();
	} 

	echo "{\"response\":\"t\"}";
	
?>