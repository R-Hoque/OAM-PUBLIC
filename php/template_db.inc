<?php
	// IMPORTANT!!
	// This file needs to be configured with the actual db parameters, then renamed as "db.inc"

	// Turn on the PHP debugger for Chrome	
	$IS_PROD_DEPLOY=FALSE; // Prod v. Dev
	$IS_LOCAL_DEPLOY=TRUE; //Local v. Server

	$host = null;
	
	if($IS_PROD_DEPLOY) {
		$host = "<PROD_SERVER>";
		$IS_LOCAL_DEPLOY=FALSE; 
	} else {
		$host = "<DEV_SERVER";
	}
	
	if($IS_LOCAL_DEPLOY) {
		require_once('PhpConsole.php');
		PhpConsole::start();
	}
	
	//Database Server
	$dbserver = "<DB_SERVER>";

	//Data Model DB
	$host = "<DB_SERVER>";
	$database = "<DB_NAME>";
	$username = "<USERNAME-READ>";
	$username_write = "USERNAME-WRITE";
	$password = "<PASSWORD-READ>";
	$password_write = "<PASSWORD-WRITE>";
	
	// DB connection string - read
    $dbPostgres = pg_connect("host=$host port=5432 dbname=$database user=$username password=$password")
       or die("Could not connect");

    // DB connection string - write
    $dbPostgresWrite = pg_connect("host=$host port=5432 dbname=$database user=$username_write password=$password_write")
       or die("Could not connect");
?>