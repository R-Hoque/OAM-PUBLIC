<?php
ini_set('display_errors', 'On');
	error_reporting(E_ALL);
	require('../../php/session_handlers.inc');
	require('../../php/db.inc');

	try {	
	      $sql = "select * from refresh_taxonomy_lookup();";

	      // Prepare a query for execution
	      $result = pg_prepare($dbPostgresWrite, "refresh", $sql);
	      
	      // Execute the prepared query.
	      $result = pg_execute($dbPostgresWrite, "refresh", array());
			  
			
	} catch(Exception $e) {  
	      die( print_r( $e->getMessage() ) );  
	}
	pg_close($dbPostgresWrite);
	
?>

