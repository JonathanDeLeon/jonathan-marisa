<?php

	$token = "rQu3u3";
	header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Methods: GET, POST');
	header('Access-Control-Max-Age: 1000');
	header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

	$verify = "false";
    if (isset($_POST['hash'], $_POST['username'], $_POST['salt'], $_GET['cmd'])) {
    	$hash = md5(md5(json_decode($_POST['username']).$token).$_POST['salt']);
    	if ($_POST['hash'] == $hash)
    		$verify = "true";
    }


	if (isset($_GET['file'], $_GET['cmd']) && $verify == "true") {
		$file = $_GET['file'];
		$cmd = $_GET['cmd'];
		if ($cmd == "open") {
			$data = file_get_contents(__DIR__."/".$file);
		} else if ($cmd == "list") {
			$data = [];
		    $files = glob($file."*");
		    foreach ($files as $file) {
		        if (is_dir($file))
		            $type = "directory";
	            else if (is_file($file)) {
	                $type = explode(".",$file);
	                $type = $type[count($type)-1];
	            }
	            if (isset($type)) {
	                $data[] = ['name' => $file, 'type' => $type];
	                unset($type);
	            }
		    }
		    if (count($data) == 0)
		        $data = "No files found";
		} else if ($cmd == "save" && isset($_POST['content'])) {
			$data = file_put_contents(__DIR__."/".$file, $_POST['content']);
		} else if ($cmd == "create") {
		    if (!stripos($file,".")) {
		        mkdir($file);
		        $data = "success";
		    } else {
		        file_put_contents(__DIR__."/".$file, "This is a blank file located at: ".$file);
		        $data = file_get_contents(__DIR__."/".$file);
		    }
		} else if ($cmd == "delete") {
		    exec("rm -rf ".$file);
		    $data = "Successfully deleted ".$file;
		}
	} else {
		$data = ['errors' => 'invalid token'];
	}
	
	echo json_encode($data);
	
?>
