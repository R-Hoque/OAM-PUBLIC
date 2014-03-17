<?php
	session_set_cookie_params ( 3600, null, null, null, true);
	session_start();
	if (isset($_SESSION['oamuser'])) {
	    ini_set('display_errors', 'On');
	    error_reporting(E_ALL);
	    require('../../php/db.inc');
	    
	    if(isset($_POST['a_id']) && isset($_POST['c_id']) && isset($_POST['method'])) {
	      
	      $a_id = pg_escape_string($_POST['a_id']);
	      $c_id = pg_escape_string($_POST['c_id']);
	      $method = pg_escape_string($_POST['method']);
	    
		// Get the data
		try {

			$sql = "select * from pmt_edit_activity_taxonomy('".$a_id."', ".$c_id.", '".$method."');";
			
			// Prepare a query for execution
			$result = pg_prepare($dbPostgresWrite, "my_query", $sql);
			
			// Execute the prepared query.
			$result = pg_execute($dbPostgresWrite, "my_query", array());
			
			$rows = pg_fetch_all($result);
			echo json_encode($rows[0]['pmt_edit_activity_taxonomy']);	 
				
		} catch(Exception $e) {  
		      die( print_r( $e->getMessage() ) );  
		}
		pg_close($dbPostgresWrite);
		
	    } else {
	      echo "no params provided";
	    }
      } else {
	  echo "Please login to use this handler";
      }
?>

