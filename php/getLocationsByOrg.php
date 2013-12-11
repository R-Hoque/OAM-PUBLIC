<?php

	ini_set('display_errors', 'On');
	error_reporting(E_ALL);
	require('db.inc');

	$dataGroup = $_POST['dataGroupId'];
	$countryIds = $_POST['countryIds'];

	// Get the data
	try {
		
       	$sql= "SELECT * FROM pmt_locations_by_org(null," . $dataGroup . ", '" . $countryIds . "');";

		// Prepare a query for execution
		$result = pg_prepare($dbPostgres, "my_query", $sql);
		
		// Execute the prepared query.
		$result = pg_execute($dbPostgres, "my_query", array());
		
		$rows = pg_fetch_all($result);
        
		
		echo json_encode($rows, JSON_NUMERIC_CHECK);	
		
		
	} catch(Exception $e) {  
	      die( print_r( $e->getMessage() ) );  
	}
	
	pg_close($dbPostgres);
	
?>

