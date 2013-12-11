<?php

	ini_set('display_errors', 'On');
	error_reporting(E_ALL);
	require('db.inc');
	
	if(isset($_GET['id'])) {
	      $activity_id = $_GET['id'];
	      // Get the data	
	      try {

		      $sql="SELECT * FROM pmt_activity_details(".$activity_id.");";
		      
		      $result = pg_query($dbPostgres, $sql) or die("error");
		      
		      while($rows = pg_fetch_object($result)) {
			$r2 = array();
			foreach(json_decode($rows->response) as $key=>$val) {
			  if (is_array($val))
			    $r2[$key] = $val;
			  else if ($key == "title")
			    $r2[$key] = ucwords(strtolower($val));
			  else
			    $r2[$key] = ucfirst(strtolower($val));
			    
			}
			(Object)$r2;
		      }	
		      echo json_encode($r2);
			      
	      } catch(Exception $e) {  
		    die( print_r( $e->getMessage() ) );  
	      }
	}
?>