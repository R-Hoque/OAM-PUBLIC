<?php

	ini_set('display_errors', 'On');
	error_reporting(E_ALL);
	require('db.inc');
	require('translate.inc');
	
	  $sectorcode = $_POST['sectorcode'];
	  $src = $_POST['src'];
	  $offset = $_POST['offset'];
	  $orderby = $_POST['orderby'];
	  $order = $_POST['order'];
	  $sectors = $_POST['sector'];
	  $orgs = $_POST['orgs'];
	  $language = $_POST['language'];
	  
	$impossibleId = "~~~999~~~";
	
	$classificationsArr = explode(",", $sectors);
	
	$orgArr = explode(",", $orgs);
	
	// client wants no selection === no data returned; but our db function thinks no classification or org ids mean 'all data'; so this is a work around
	if(in_array ( $impossibleId, $classificationsArr ) || in_array($impossibleId, $orgArr)) {
		echo json_encode(null, JSON_NUMERIC_CHECK);
		pg_close($dbPostgres);
		return;	
	}
	
	$records = getRecords($sectorcode, $src, $sectors, $orgs, $orderby, $order, $offset, $language);
	$cnt = getCount($src, $sectors, $orgs, $orderby, $order, $offset);
	
	$page = $offset/100 + 1;
	$totalpages = ceil($cnt/100)+1;
	$a = array('rows'=>$records,'count'=>$cnt, 'page'=>$page, 'tot'=>$totalpages);
	echo json_encode($a, JSON_NUMERIC_CHECK);
	
	
	function getRecords($sectorcode, $src, $sectors, $orgs, $orderby, $order, $offset, $lang) {
	      global $dbPostgres;
		  global $sectorDictionary;
	      // Get the data
	      try {
		    //INPUT: taxid (15 = sector), datagroup followed by sector ids, org ides, unassigned tax ids, order by, limit, offset.
		    $sql = "SELECT * FROM pmt_activity_listview(".$sectorcode.",'496,".$src.$sectors."','".$orgs."', null,'".$orderby." ".$order."', 100, ".$offset.")";
		    
		    // echo $sql;
		    $result = pg_query($dbPostgres, $sql) or die(pg_last_error());
		    $r = array();
		    while($rows = pg_fetch_object($result)) {
		      $r2 = array();
		      
		      foreach(json_decode($rows->response) as $key=>$val) {
		      	
				
				if($key == 'r_name' && $lang == 'spanish') {

					$val = $sectorDictionary[$val];;
					
				}
				
				$r2[$key] = ucwords(strtolower($val));
		      }
		      $r[] = (Object)$r2;
		    }
		    pg_free_result($result);
		    return $r;
			      
	      } catch(Exception $e) {  
		    die( print_r( $e->getMessage() ) );  
	      }
		  
		  pg_close($dbPostgres);
	}
	
	function getCount($src, $sectors, $orgs) {
	    global $dbPostgres;
	    $sql = "SELECT * FROM pmt_activity_listview_ct('496,".$src.$sectors."','".$orgs."','')";
	    $result = pg_query($dbPostgres, $sql) or die(pg_last_error());
	    $rows = pg_fetch_object($result);
	    pg_free_result($result);
	    return $rows->pmt_activity_listview_ct;
	}
	
	
	
	
	function buildFilters($sector, $orgs) {
		$filters = "";
		// Restrict records to organizations.
		if (count($sector) > 0 && $sector[0] != "") {
		  $filters .= " AND (";
		  foreach($sector as $s) {
		    $filters .= "aa.classification_id = " . $s . " OR ";
		  }
		  
		  $filters = substr($filters, 0, -4);
		  $filters .= ")";
		}
		
		if (count($orgs) > 0 && $orgs[0] != "") {
		  $filters .= " AND (";
		  foreach($orgs as $s) {
		    $filters .= "cc.organization_id = " . $s . " OR ";
		  }
		  $filters = substr($filters, 0, -4);
		  $filters .= ")";
		}
		return $filters;
	}
	
	
?>