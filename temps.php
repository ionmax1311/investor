<?php
define( 'ALLOW_PHP', 1 );
	if($_POST){
$a = implode(",", $_POST);

// $a = iconv('windows-1251', 'UTF-8', $a);
$a = mb_convert_encoding($a, "UTF-8");

file_put_contents("js/temp.php",PHP_EOL.  $a ,  FILE_APPEND);

}
?>