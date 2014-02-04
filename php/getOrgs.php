<?php

	ini_set('display_errors', 'On');
	error_reporting(E_ALL);
	require('db.inc');
	
	$dataGroup = $_POST['dataGroupId'];
	$countryIds = $_POST['countryIds'];
	$orgRole = $_POST['orgRole'];
	
	$tmpFilters = $dataGroup ."," . $countryIds;

	$preFilters = null;
	$lastChar = substr($tmpFilters, -1);
	
	if($lastChar == ','){
		
		$preFilters = substr($tmpFilters, 0, -1);
		
	}
	else {
		$preFilters = $tmpFilters;
	}
	
	// Get the data
	try {

		$sql = "select * from pmt_org_inuse('" . $orgRole . "," . $preFilters . "');";
		
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

