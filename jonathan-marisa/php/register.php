<?php
	include_once("../config.php");
    include_once("functions.php");

sec_session_start();

$error_msg = "";

//$_POST['username'] = "guest";
//$_POST['p'] = "b109f3bbbc244eb82441917ed06d618b9008dd09b3befd1b5e07394c706a8bb980b1d7785e5976ec049b46df5f1326af5a2ea6d103fd07c95385ffab0cacbc86";
//$_POST['email'] = "guestexample.com";
//$username = $_POST['username'];
//$email = $_POST['email'];
//$password = $_POST['p'];

if (isset($_POST['username'], $_POST['email'], $_POST['p'])) {
    // Sanitize and validate the data passed in
    $username = filter_var($_POST['username'], FILTER_SANITIZE_STRING);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    //$email = filter_input(INPUT_POST, $email, FILTER_SANITIZE_EMAIL);
    $email = filter_var($email, FILTER_VALIDATE_EMAIL);
    //$username = $_POST['username'];
	//$email = $_POST['email'];
	//$password = $_POST['p'];
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // Not a valid email
        $error_msg .= '<p class="error"> The email address you entered is not valid.</p>';
    }
 	
    $password = filter_var($_POST['p'], FILTER_SANITIZE_STRING);
    if (strlen($password) != 128) {
        // The hashed pwd should be 128 characters long.
        // If it's not, something really odd has happened
        $error_msg .= '<p class="error"> Invalid password configuration.</p>';
    }
 
    // Username validity and password validity have been checked client side.
    // This should should be adequate as nobody gains any advantage from
    // breaking these rules.
    //
 	

    $prep_stmt = "SELECT id FROM users WHERE email = ? LIMIT 1";
    $stmt = $db->prepare($prep_stmt);
 
   // check existing email  
    if ($stmt) {
        $stmt->bind_param('s', $email);
        $stmt->execute();
        $stmt->store_result();
        
        if ($stmt->num_rows == 1) {

            // A user with this email address already exists
            $error_msg .= '<p class="error"> A user with this email address already exists.</p>';
                        $stmt->close();
        }
                $stmt->close();
    } else {
        $error_msg .= '<p class="error"> Database error Line 39.</p>';
                $stmt->close();
    }
 
    // check existing username
    $prep_stmt = "SELECT id FROM users WHERE username = ? LIMIT 1";
    $stmt = $db->prepare($prep_stmt);
 
    if ($stmt) {
    	
        $stmt->bind_param('s', $username);
        $stmt->execute();
        $stmt->store_result();
 
                if ($stmt->num_rows == 1) {
                        // A user with this username already exists
                        $error_msg .= '<p class="error"> A user with this username already exists.</p>';
                        $stmt->close();
                }
                $stmt->close();
        } else {
                $error_msg .= '<p class="error"> Database error line 55.</p>';
                $stmt->close();
        }
 
    // TODO: 
    // We'll also have to account for the situation where the user doesn't have
    // rights to do registration, by checking what type of user is attempting to
    // perform the operation.
    if (empty($error_msg)) {
        // Create a random salt
        //$random_salt = hash('sha512', uniqid(openssl_random_pseudo_bytes(16), TRUE)); // Did not work
        $random_salt = hash('sha512', uniqid(mt_rand(1, mt_getrandmax()), true));
 		
        // Create salted password 
        $password = hash('sha512', $password . $random_salt);
 		
        // Insert the new user into the database 
        if ($insert_stmt = $db->prepare("INSERT INTO users (username, email, password, salt) VALUES (?, ?, ?, ?)")) {
            $insert_stmt->bind_param('ssss', $username, $email, $password, $random_salt);
            // Execute the prepared query.
            if (! $insert_stmt->execute()) {
                //echo "Failure!";
                //header('Location: ../error.php?err=Registration failure: INSERT');
            }
        }
        $parsedUser['username'] = $username;
        $parsedUser['email'] = $email;
        echo json_encode($parsedUser);
        return;
        //header('Location: ./register_success.php');
    }
}
else{

	$error_msg .= '<p class="error"> The data you entered is not valid.</p>';
}

$error_msg = filter_var($error_msg, FILTER_SANITIZE_STRING);
echo json_encode($error_msg);


?>