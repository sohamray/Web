

<?php
	//Instantiate our DB object
	$host = "host=ec2-54-243-63-130.compute-1.amazonaws.com";
	$dbname = "dbname=dcb5ergntdbbjq";
	$user = "user=ymmjrhxsnrdzym";
	$port = "port=5432";
	$password = "password=mU5AJlnGh59GshVCa-n0xz5pwy";
	$db = pg_connect($host." ".$dbname." ".$user." ".$port." ".$password);
	$query = <<<EOF
		CREATE TABLE BURGERS(
			ID varchar(255) PRIMARY KEY     NOT NULL,
			NAME varchar(100)     NOT NULL,
			PICKLES varchar(100),
		 	BBQ varchar(100),
			CHEESE varchar(100),
			GPEPPER varchar(100),
			GMUSHROOMS varchar(100),
			TOMATO varchar(100),
			JALAPENOS varchar(100),
			KETCHUP varchar(100),
			LETTUCE varchar(100),
			MAYO varchar(100),
			MUSTARD varchar(100),
			ONIONS varchar(100)
		);
EOF;
	$ret = pg_query($query);
	if(!$ret){
		echo(pg_last_error($db));
	}
	else{
		echo "CREATED";
	}
 ?>
