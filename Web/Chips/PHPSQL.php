 <?php
   $host = "host=ec2-54-243-185-99.compute-1.amazonaws.com";
   $dbname = "dbname=d6nuiljqspeb14";
   $user = "user=gumtwrgppoexqi";
   $port = "port=5432";
   $password = "password=7dc512821a4b0eaa180ebc7b4822215e9c3cac2680dc5c3d40957f9dd1106d96";
	 $ticketnum = $_GET['tn'];
   $one = "'" . $_GET['one'] . "'";
   $onecash = "'" . $_GET['onecash'] . "'";
   $two = "'" . $_GET['two'] . "'";
   $twocash = "'" . $_GET['twocash'] . "'";
   $three = "'" . $_GET['three'] . "'";
   $threecash = "'" . $_GET['threecash'] . "'";
   $four = "'" . $_GET['four'] . "'";
   $fourcash = "'" . $_GET['fourcash'] . "'";
   $five = "'" . $_GET['five'] . "'";
   $fivecash = "'" . $_GET['fivecash'] . "'";
   $six = "'" . $_GET['six'] . "'";
   $sixcash = "'" . $_GET['sixcash'] . "'";
   $timestamp = "'" . date('Y-z-G-i-s', time()) . "'";
	 $db = pg_connect( "$host $port $dbname $user $password" );
   if(!$db){
      echo "Error : Unable to open database\n";
   }
	$sql =<<<EOF
	 	 INSERT INTO CHIPS (ID,ONE,ONECASH,TWO,TWOCASH,THREE,THREECASH,FOUR,FOURCASH,FIVE,FIVECASH,SIX,SIXCASH)
	 	 VALUES ($timestamp,$one,$onecash,$two,$twocash,$three,$threecash,$four,$fourcash,$five,$fivecash,$six,$sixcash);
EOF;
	$ret = pg_query($db, $sql);
	$sql =<<<EOF
	      SELECT * from CHIPS;
EOF;
	$ret = pg_query($db, $sql);
   if(!$ret){
      exit;
   }
   while($row = pg_fetch_row($ret)){
			$totstr = $totstr . "
      [$row[0]]N1=$row[1] C1=$row[2] N2=$row[3] C2=$row[4] N3=$row[5] C3=$row[6] N4=$row[7] C4=$row[8] N5=$row[9] C5=$row[10] N6=$row[11] C6=$row[12][$row[0]] \n
      ";
   }
   if(strlen($ticketnum)>3){
     $output = substr($totstr,strpos($totstr,$ticketnum)+strlen($ticketnum)+1,strrpos($totstr,$ticketnum)-strpos($totstr,$ticketnum)-strlen($ticketnum)-2);
     echo "$output";
   }
   else{
     echo "$timestamp";
   }
   pg_close($db);
?>
