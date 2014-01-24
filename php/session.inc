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
	    $r = explode("/",$_SERVER['PHP_SELF']);
	    if($r[2] != "application.php")
		header('Location: index.html');
	}
?>