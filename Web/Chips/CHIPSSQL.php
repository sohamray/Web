<?php
	//Instantiate our DB object
	$host = "host=ec2-54-243-185-99.compute-1.amazonaws.com";
	$dbname = "dbname=d6nuiljqspeb14";
	$user = "user=gumtwrgppoexqi";
	$port = "port=5432";
	$password = "password=7dc512821a4b0eaa180ebc7b4822215e9c3cac2680dc5c3d40957f9dd1106d96";
	$db = pg_connect($host." ".$dbname." ".$user." ".$port." ".$password);
	$query = <<<EOF
		CREATE TABLE CHIPS(
			ID varchar(255) PRIMARY KEY     NOT NULL,
			ONE varchar(255)     NOT NULL,
			ONECASH INT		NOT NULL,
		 	TWO varchar(255)		NOT NULL,
			TWOCASH INT			NOT NULL,
			THREE varchar(255)			NOT NULL,
			THREECASH INT			NOT NULL,
			FOUR varchar(255)			NOT NULL,
			FOURCASH INT			NOT NULL,
			FIVE varchar(255)			NOT NULL,
			FIVECASH INT			NOT NULL,
			SIX varchar(255)			NOT NULL,
			SIXCASH INT			NOT NULL
		);
EOF;

	$ret = pg_query($query);

	if(!$ret){
		echo(pg_last_error($db));
		echo '1';
	}
	else{
		echo "CREATED";
	}
 ?>
