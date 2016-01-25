<?php
	if(!$_POST['page']) die("0");
	$page = (string)$_POST['page'];
	if(file_exists('../page/'.$page.'.html'))
	echo file_get_contents('../page/'.$page.'.html');
	else echo 'There is no such page!';
?>