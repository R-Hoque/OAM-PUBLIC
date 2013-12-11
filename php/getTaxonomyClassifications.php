<?php

	ini_set('display_errors', 'On');
	error_reporting(E_ALL);
	require('db.inc');
	
	$taxonomies = $_POST['taxonomyIds'];
	$dataGroup = $_POST['dataGroupId'];
	$countryIds = $_POST['countryIds'];
	// Get the data
	try {

		$sql = "select * from pmt_tax_inuse(". $dataGroup .", '". $taxonomies ."', '" . $countryIds . "');";

		// Prepare a query for execution
		$result = pg_prepare($dbPostgres, "my_query", $sql);
		
		// Execute the prepared query.
		$result = pg_execute($dbPostgres, "my_query", array());
		
		$rows = pg_fetch_all($result);
        
		$data = array();
		foreach($rows as $row) {
			$data[] =  json_decode($row["response"]);
		}
		
		echo json_encode($data, JSON_NUMERIC_CHECK);	
			
	} catch(Exception $e) {  
	      die( print_r( $e->getMessage() ) );  
	}
	
	pg_close($dbPostgres);
?>

