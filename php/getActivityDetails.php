<?php

	ini_set('display_errors', 'On');
	error_reporting(E_ALL);
	require('db.inc');
	
	  $activity_id = $_GET['id'];


	
	// Get the data
	try {

		$sql="select a.activity_id as a_id, a.description as d, a.start_date, a.end_date, a.title as a, b.name as s, c.name as o, b.classification_id as s_id, c.organization_id as o_id from activity a join activity_taxonomy aa on a.activity_id = aa.activity_id join classification b on aa.classification_id = b.classification_id join participation cc on a.activity_id = cc.activity_id join organization c on cc.organization_id = c.organization_id";
		
		// Restrict records to one activity_id.
		if ($activity_id) {
		  $sql .= " WHERE c.organization_id != 3 AND (";
		  foreach($activity_id as $key=>$activity) { 
		    $sql .= "a.activity_id = " . $activity . " OR ";
		  }
		  $sql = substr($sql,0,-4);
		  // echo $sql;
		  $sql .= ");";
		}
		$result = pg_query($dbPostgres, $sql);
		$prev = null;
		$data = array();
		while($rows = pg_fetch_object($result)) {
		  if ($rows->a_id == $prev) {
		    $data["c".$rows->a_id]->o_id[] = $rows->o_id;
		    $data["c".$rows->a_id]->o[] = $rows->o;
		  } else {
		    $data["c".$rows->a_id] =  $rows;
		    $data["c".$rows->a_id]->o_id = array($rows->o_id);
		    $data["c".$rows->a_id]->o = array($rows->o);
		    $prev = $rows->a_id;
		  }
		}
		//echo $sql;
		echo json_encode($data, JSON_NUMERIC_CHECK);	
			
	} catch(Exception $e) {  
	      die( print_r( $e->getMessage() ) );  
	}
	
?>