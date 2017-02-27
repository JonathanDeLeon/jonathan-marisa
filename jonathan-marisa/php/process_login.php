<?php
    
    include_once("../config.php");
    include_once("functions.php");
    
   
    sec_session_start();
    
    if (isset($_POST['username'], $_POST['p'])) {
        $username = $_POST['username'];
        $password = $_POST['p']; // The hashed password.
        
        if (login($username, $password, $db) == true) {
            // Login success
            while ($row = mysqli_fetch_assoc($result)) {
            $parsedUser['id'] = $row['id'];
            $parsedUser['username'] = $row['username'];
            $parsedUser['email'] = $row['email'];
            }
            //header('Location: ../test.php');
        } else {
            // Login failed
            //echo("FAILURE!");
           // header("HTTP/1.0 404 Not Found");
        }
    } 
    echo json_encode($parsedUser);
    
   
?>