<?php

	ini_set('display_errors', 'On');
	error_reporting(E_ALL);
	require('../../php/db.inc');
	
	// Get the data
	try {

		$sql = "select * from pmt_sector_compare('769', 'import');";

		// Prepare a query for execution
		$result = pg_prepare($dbPostgres, "my_query", $sql);
		
		// Execute the prepared query.
		$result = pg_execute($dbPostgres, "my_query", array());
		
		$rows = pg_fetch_all($result);

		$a = array();
		foreach($rows as $r) {
		  $c = json_decode($r['response']);
		  $match = false;
		  foreach($a as &$ar) {
		    if ($ar->import == $c->import) {
		      $ar->a_id .= ",".$c->a_id;
		      $match = true;
		    }
		  }
		  if (!$match) {
		    $ar = (Object)array();
		    $ar->a_id = $c->a_id;
		    $ar->c_id = $c->c_id;
		    $ar->sector = $c->sector;
		    $ar->import = $c->import;
		    $a[] = $ar;
		  }
		}
		echo json_encode($a, JSON_NUMERIC_CHECK);	
			
	} catch(Exception $e) {  
	      die( print_r( $e->getMessage() ) );  
	}
	pg_close($dbPostgres);
?>

