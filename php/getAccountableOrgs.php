<?php
/**
 * Title: Call for organization list
 */
 
ini_set('display_errors', 'On');
error_reporting(E_ALL);
require('db.inc');
     
# Build SQL SELECT statement 
$sql = "SELECT name, organization_id as o_id FROM accountable_organizations";
 
$result = pg_query($dbPostgres, $sql);
		
$rows = pg_fetch_all($result);
 
echo json_encode($rows);
 
pg_close($dbPostgres);
 
?>