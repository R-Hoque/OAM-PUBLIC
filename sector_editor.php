  <!-- =====================================================
  @author = Grant McKenzie (gmckenzie@spatialdev.com
  @date = January 2014
  @client = World Bank Open Aid Partnership
  @functionality = Main file for the Sector Editor (HTML/PHP)
  =========================================================== -->
 <?php 

 	session_set_cookie_params ( 3600, null, null, null, true);
	session_start();

	echo $_SESSION['oamuser'];
	/*
	if (isset($_SESSION['oamuser'])) {
		require_once 'php/user.inc';
		$oamuser = unserialize($_SESSION['oamuser']);
		echo "<script>var _oamuser='".json_encode($oamuser)."';</script>";
	} else {
	    //if(strpos($_SERVER['PHP_SELF'], "application.php") == 0)
		header('Location: index.html');
	}
*/
 ?>
  