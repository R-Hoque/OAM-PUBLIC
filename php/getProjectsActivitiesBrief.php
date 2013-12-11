<?php

	ini_set('display_errors', 'On');
	error_reporting(E_ALL);
	require('db.inc');
	
	$l_ids = $_POST['l_ids'];
	
	// Get the data
	try {
		
		$sql="select * from pmt_infobox_menu('" . $l_ids . "')";
		
		$result = pg_query($dbPostgres, $sql);
		
		$rows = pg_fetch_all($result);
		
		$project = json_decode($rows[0]['response']);
		
		$activities = $project->activities;
		
		//array($a_ids =  => , );
		$a_ids = array();
		
		foreach ($activities as $act) {
		   array_push($a_ids, $act->a_id);
		}
		echo json_encode($a_ids, JSON_NUMERIC_CHECK);	
			
	} catch(Exception $e) {  
	      die( print_r( $e->getMessage() ) );  
	}
	
	pg_close($dbPostgres);
?>

