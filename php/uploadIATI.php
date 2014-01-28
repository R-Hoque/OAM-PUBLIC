<?php

  session_start();
  if (isset($_SESSION['oamuser'])) {
      require_once 'user.inc';
      $oamuser = unserialize($_SESSION['oamuser']);
      $country = $oamuser->data_group;
  } else {
      echo "Permission denied.  User must be logged in to execute this function.";
  }
  
  //The IATI upload through the UI overwrites the existing data for a specific data group with new data.
  include('db.inc');
  
  // Change the uploaded file name to reflect the country as well as the current timestamp
  $filename = $country."-".time().".xml";
  move_uploaded_file( $_FILES["iati"]["tmp_name"], "../../oam-iati/" . $filename);

  // Execute the upload.  Database server name comes from the db.inc file
  if (sendFile($dbserver, $filename) == 1) {
  
    // Execute the PostGres data load query
    $resp = loadFile($country, $filename);
    if ($resp == "t")
      echo true;
    else
      echo false;
  }
  
  
  function sendFile($dbserver, $filename) {
      set_include_path(get_include_path() . PATH_SEPARATOR . 'phpseclib');

      // Secure FTP for file transfer and RSA Crypt for access key encryption
      include('Net/SFTP.php');
      include('Crypt/RSA.php');

      $key = new Crypt_RSA();
      $key->loadKey(file_get_contents('spatialdev.pem'));

      $sftp = new Net_SFTP($dbserver);
      if (!$sftp->login('ubuntu', $key)) {
          exit('Login Failed');
      }
      
      // Set appropriate directories (from & to respectively)
      $ap_directory = "/var/www/oam-iati/";
      $db_directory = "/usr/local/pmt_iati/";
      
      // SFTP transfer the file from the APPLICATION SERVER to the DATABASE SERVER
      $r = $sftp->put($db_directory.$filename, $ap_directory.$filename, NET_SFTP_LOCAL_FILE);

      return $r;
  }

  
  function loadFile($country, $filename) {
    // Purge the existing data and load the new file with the appropriate country name.
    global $dbPostgresWrite;
    
    // Execute the query
    $query = "SELECT * FROM pmt_iati_import('/usr/local/pmt_iati/".$filename."', '".$country."', true);";	
    $result = pg_query($dbPostgresWrite, $query) or die(pg_last_error());
    
    // Make sure the query returns true
    $r = false;
    while ($row = pg_fetch_row($result)) {
      $r = $row[0];
    }
    return $r; 
 }
  
?>
