<?php

	ini_set('display_errors', 'On');
	error_reporting(E_ALL);
	require('db.inc');
	
	$a_id = $_POST['a_id'];
	
	// Get the data
	try {

		$sql = "SELECT  a.activity_id, a.title, a.description, a.start_date, a.end_date, at.sectors, f.amount, po.orgs AS orgs
	FROM activity a 
		LEFT JOIN financial f 
			ON a.project_id = f.project_id AND a.activity_id = f.activity_id 
		LEFT JOIN (SELECT activity_id, array_to_string(array_agg(classification), '|') AS sectors FROM activity_taxonomies WHERE activity_id = 8454 AND LOWER(taxonomy) = 'sector' GROUP BY activity_id)  at
			ON a.activity_id = at.activity_id AND a.activity_id = at.activity_id
		LEFT JOIN (SELECT activity_id, array_to_string(array_agg(o.name), '|') AS orgs FROM participation p 
					LEFT JOIN organization o ON p.organization_id = o.organization_id WHERE p.activity_id = 8454 AND p.reporting_org = FALSE GROUP BY activity_id)  po
			ON a.activity_id = po.activity_id AND a.activity_id = po.activity_id
	WHERE a.activity_id = " . $a_id . ";";

		// Prepare a query for execution
		$result = pg_prepare($dbPostgres, "my_query", $sql);
		
		// Execute the prepared query.
		$result = pg_execute($dbPostgres, "my_query", array());
		
		$rows = pg_fetch_all($result);

		
		echo json_encode($rows[0], JSON_NUMERIC_CHECK);	
			
	} catch(Exception $e) {  
	      die( print_r( $e->getMessage() ) );  
	}
	
	pg_close($dbPostgres);
?>

