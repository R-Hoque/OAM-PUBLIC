<?php

	ini_set('display_errors', 'On');
	error_reporting(E_ALL);
	require('db.inc');

	// classification id array from POST
	$email =  $_POST['email'];

	$classifications =  $_POST['classificationIds'];
	
	$organizations =  $_POST['organizationIds'];
	
	$unassignedTax = $_POST['unassignedTaxIds'];
	
	if(empty($_POST['startDate'])){
		$startDate = 'null';
	} else {
		$startDate = "'".$_POST['startDate']."'";
	}
	
	if(empty($_POST['endDate'])){
		$endDate = 'null';
	} else {
		$endDate = "'".$_POST['endDate']."'";
	}
	
	$classificationsArr = explode(",", $classifications);
	
	$orgArr = explode(",", $organizations);
	
	$impossibleId = "-999999";
	
	
	// client wants no selection === no data returned; but our db function thinks no classification or org ids mean 'all data'; so this is a work around
	if(in_array ( $impossibleId, $classificationsArr ) || in_array($impossibleId, $orgArr)) {
		echo json_encode('f', JSON_NUMERIC_CHECK);	
		
		return;
	}
	
	// Get the data
	try {

		$sql = "SELECT * FROM pmt_filter_iati('".$classifications."','".$organizations."','".$unassignedTax."',".$startDate.",".$endDate.",'".$email."');";

		// echo json_encode($sql);

		$result = pg_query($dbPostgresWrite, $sql);
		
		$response = pg_fetch_all($result);

		echo json_encode($response[0]);
			
	} catch(Exception $e) {  
	      die( print_r( $e->getMessage() ) );  
	}
	
	pg_close($dbPostgresWrite);
?>