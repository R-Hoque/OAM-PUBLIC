<?php

	/*ini_set('display_errors', 'On');
	error_reporting(E_ALL);
	require('db.inc');*/
	
	
	$host = "";
	$database = "";
	$username = "";
	$password = "";
	
	# DB connection string
	$dbPostgres = pg_connect("host=$host port=5432 dbname=$database user=$username password=$password")
	   or die("Could not connect");
	
	
	# Build SQL SELECT statement and return the geometry as a GeoJSON element
	$sql = "SELECT COUNT(project_ID), classification FROM activity_taxonomies GROUP BY classification ORDER BY classification ASC";

	$result = pg_query($dbPostgres, $sql);

	$rows = pg_fetch_all($result);

	echo json_encode($rows);

	pg_close($dbPostgres);
	
?>
