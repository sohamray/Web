<?php
	$word = $_GET["name"];
  $type = $_GET["type"];
	$dict = file_get_contents("Dictionary.txt");
	if($type==='challenge'){
    $newword = '/\s' . $word . '\w+/';
		$result = [];
		preg_match($newword,$dict,$result);
		echo array_values($result)[0];
	}
	else{
  	$newword = '/\s' . $word . '\s/';
		echo preg_match($newword,$dict);
	}
?>
