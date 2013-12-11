<?php

	ini_set('display_errors', 'On');
	error_reporting(E_ALL);
	require('db.inc');
	
	$summaryLevel = null;
    
	// classification id array from POST 
	$classifications =  $_POST['classificationIds'];
	
	$organizations =  $_POST['organizationIds'];
	
	$summaryTax = $_POST['summaryTaxId'];
	
	$startDate = $_POST['startDate'];
	
	$endDate = $_POST['endDate'];
	
	$impossibleId = "~~~999~~~";
	
	$classificationsArr = explode(",", $classifications);
	
	$orgArr = explode(",", $organizations);
	
	// client wants no selection === no data returned; but our db function thinks no classification or org ids mean 'all data'; so this is a work around
	if(in_array ( $impossibleId, $classificationsArr ) || in_array($impossibleId, $orgArr)) {
		echo json_encode(null, JSON_NUMERIC_CHECK);	
	}
	else {
			
		if($startDate != null) {
			$startDate = "'". $startDate . "'";
		} else {
			$startDate = "null";
		}
		if($endDate != null) {
			$endDate = "'". $endDate . "'";
		} else {
			$endDate = "null";
		}
		
		// Get the data
		try {
			
			$sql = "SELECT * FROM pmt_filter_locations(" . $summaryTax. ", '". $classifications ."', '" . $organizations ."', '', ". $startDate .", ".$endDate.")";
	
			$result = pg_query($dbPostgres, $sql);
			
			$rows = pg_fetch_all($result);
	        
			echo json_encode($rows, JSON_NUMERIC_CHECK);	
				
		} catch(Exception $e) {  
		      die( print_r( $e->getMessage() ) );  
		}
	}
	pg_close($dbPostgres);
?>

