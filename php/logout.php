<?php
	//start the session
	ini_set("session.cookie_httponly", 1);
    session_start();

        
       // Unset all of the session variables.
    $_SESSION = array();

    // If it's desired to kill the session, also delete the session cookie.
    // Note: This will destroy the session, and not just the session data!
    if (ini_get("session.use_cookies")) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000,
            $params["path"], $params["domain"],
            $params["secure"], $params["httponly"]
        );
    }

    // Finally, destroy the session.
    session_destroy();

/*
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
*/
	echo "{\"response\":\"t\"}";
	
?>