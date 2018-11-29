<?php
    
    header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Methods: GET, POST');
	header('Access-Control-Max-Age: 1000');
	header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
	
   
    $site_title = "rQu";
    $db_user= "rQu_test";
    $db_pass = "rQupass";
	$db = new mysqli("localhost",$db_user,$db_pass,"rQu");
    if (mysqli_connect_errno())
      {
      echo "Failed to connect to MySQL: " . mysqli_connect_error();
      }
    
    $username_query = $_POST['username'];
	$_POST['p'] = $_POST['password'];
	
	$query = "SELECT * from users where username = '".$username_query."';";
    $result = mysqli_query($db, $query);
    //$count = mysqli_num_rows($result);
    
    $parsedUser = array();
  
?>