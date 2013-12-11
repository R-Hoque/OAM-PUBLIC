<?php

  ini_set('display_errors', 'On');
  error_reporting(E_ALL);
  
  include('db.inc');
  
  $country = $_GET['country'];
  // echo $country . "\n";
  $filename = $country."-".time().".xml";
  move_uploaded_file( $_FILES["iati"]["tmp_name"], "../../oam-iati/" . $filename);

  // echo "Successfully uploaded new IATI file for ".$country;

  sendFile($dbserver, $filename);
  
  echo "Successfully uploaded new IATI file for ".$country;
  
  loadFile($country, $filename);
  
  
    
  function sendFile($dbserver, $filename) {
      global $dbserver;
      set_include_path(get_include_path() . PATH_SEPARATOR . 'phpseclib');

      include('Net/SFTP.php');
      include('Crypt/RSA.php');
      // include('Crypt/RSA.php');

      $key = new Crypt_RSA();

      $key->loadKey(file_get_contents('spatialdev.pem'));

      $sftp = new Net_SFTP($dbserver);
      if (!$sftp->login('ubuntu', $key)) {
	  exit('Login Failed');
      }
      $ap_directory = "/var/www/oam-iati/";
      $db_directory = "/usr/local/pmt_iati/";
      $sftp->put($db_directory.$filename, $ap_directory.$filename, NET_SFTP_LOCAL_FILE);
  }
  
  function loadFile($country, $filename) {
    global $dbPostgres;
    $query = "SELECT * FROM pmt_iati_import('/usr/local/pmt_iati/".$filename."', '".$country."', true);";
    $result = pg_query($dbPostgres, $query) or die();
  }
  
