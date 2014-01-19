<?php
	/*
	@author: Grant McKenzie (gmckenzie@spatialdev.com)
	@client: AWM Solutions
	@project: GenderMappr
	@date: February 2012
	@description: makes sure user is authorized and load the appropriate language file.
	*/
        // Fix for removed Session functions
       /*  function session_register(){
                $args = func_get_args();
                foreach ($args as $key){
                        $_SESSION[$key]=$GLOBALS[$key];
                }
        }
        function session_is_registered($key){
                return isset($_SESSION[$key]);
        }
        function session_unregister($key){
                unset($_SESSION[$key]);
        } */

	session_start();
	if (isset($_SESSION['oamuser'])) {
		require_once 'php/user.inc';
		$oamuser = unserialize($_SESSION['oamuser']);
		var_dump();
	} else {
	    if($_SERVER['HTTP_REFERER'])
		header('Location: ' . $_SERVER['HTTP_REFERER']);
	    else
		header('Location: index.html');
	}
?>