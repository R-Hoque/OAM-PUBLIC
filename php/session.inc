<?php
	/*
	@author: Grant McKenzie (gmckenzie@spatialdev.com)
	@client: World Bank
	@project: Open Aid Map
	@date: January 2014
	@description: makes sure user is authorized
	*/
	
	session_start();
	if (isset($_SESSION['oamuser'])) {
		require_once 'php/user.inc';
		$oamuser = unserialize($_SESSION['oamuser']);
		echo "<script>var _oamuser='".json_encode($oamuser)."';</script>";
	} else {
	    if($_SERVER['PHP_SELF'] == "/OAM-PUBLIC/application.php")
		$x = 1;
	    else
		header('Location: index.html');
	}
?>