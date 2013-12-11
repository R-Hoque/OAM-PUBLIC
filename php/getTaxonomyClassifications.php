<?php

	ini_set('display_errors', 'On');
	error_reporting(E_ALL);
	require('db.inc');
	require('translate.inc');
	
	$taxonomies = '15';//$_POST['taxonomyIds'];
	$dataGroup = 768; //$_POST['dataGroupId'];
	$countryIds = '';//$_POST['countryIds'];
	$language =  'spanish';//$_POST['language'];
	
	$taxonomies = $_POST['taxonomyIds'];
	$dataGroup = $_POST['dataGroupId'];
	$countryIds = $_POST['countryIds'];
	$language =  $_POST['language'];
	
	// Get the data
	try {

		$sql = "select * from pmt_tax_inuse(". $dataGroup .", '". $taxonomies ."', '" . $countryIds . "');";

		// Prepare a query for execution
		$result = pg_prepare($dbPostgres, "my_query", $sql);
		
		// Execute the prepared query.
		$result = pg_execute($dbPostgres, "my_query", array());
		
		$rows = pg_fetch_all($result);
		
		$data = array();
		
		
		if($language == 'spanish'){
				
			$rec = json_decode($rows[0]['response']);
			
			$name  = $rec->name;

			$classifications = array();
			

			foreach ($rec->classifications as $c) {

				$c->name = $sectorDictionary[$c->name];
				
			}
			
			$data[] = $rec;
			
		} else if($language == 'english') {
			
			foreach($rows as $row) {
				
				$data[] =  json_decode($row["response"]);
			}
			
		} else {
			 throw new Exception('Unsupported language translation requested.');
		}
		
		echo json_encode($data, JSON_NUMERIC_CHECK);	
			
	} catch(Exception $e) {  
	      die( print_r( $e->getMessage() ) );  
	}
	
	pg_close($dbPostgres);
?>

