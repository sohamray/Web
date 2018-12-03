<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link rel="stylesheet" href="https://code.getmdl.io/1.2.1/material.indigo-pink.min.css">
    <script defer src="https://code.getmdl.io/1.2.1/material.min.js"></script>
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Roboto:300,400,500,700" type="text/css">
    <link rel="stylesheet" type="text/css" href="mystylePHP.css">
    <title>Burger Form</title>
  </head>
  <body>
		<table class="mdl-data-table mdl-js-data-table">
			<thead>
		    <tr>
		      <th style="color: white; text-align: center;">NAME</th>
		      <th style="color: white;">PICKLES</th>
					<th style="color: white;">BBQ</th>
					<th style="color: white;">CHEESE</th>
		      <th style="color: white;">PEPPERS</th>
					<th style="color: white;">MUSHROOMS</th>
					<th style="color: white;">TOMATOES</th>
		      <th style="color: white;">JALAPENOS</th>
					<th style="color: white;">KETCHUP</th>
					<th style="color: white;">LETTUCE</th>
		      <th style="color: white;">MAYO</th>
					<th style="color: white;">MUSTARD</th>
					<th style="color: white;">ONIONS</th>
		    </tr>
		  </thead>
		  <tbody>
 <?php
	 $host = 'host=ec2-54-243-63-130.compute-1.amazonaws.com';
	 $dbname = 'dbname=dcb5ergntdbbjq';
	 $user = 'user=ymmjrhxsnrdzym';
	 $port = 'port=5432';
	 $password = 'password=mU5AJlnGh59GshVCa-n0xz5pwy';
	 $name = "'" . $_POST['fname'] . " " . $_POST['lname'] . "'";
	 $pickles = "'" . $_POST['pickles'] . "'";
	 $bbq = "'" . $_POST['bbq'] . "'";
	 $cheese = "'" . $_POST['cheese'] . "'";
	 $gpepper = "'" . $_POST['gpepper'] . "'";
	 $gmushrooms = "'" . $_POST['gmushrooms'] . "'";
	 $tomato = "'" . $_POST['tomato'] . "'";
	 $jalapenos = "'" . $_POST['jalapenos'] . "'";
	 $ketchup = "'" . $_POST['ketchup'] . "'";
	 $lettuce = "'" . $_POST['lettuce'] . "'";
	 $mayo = "'" . $_POST['mayo'] . "'";
	 $mustard = "'" . $_POST['mustard'] . "'";
	 $onions = "'" . $_POST['onions'] . "'";
	 $timestamp = "'" . date('Y-z-G-i-s', time()) . "'";
	 $db = pg_connect( "$host $port $dbname $user $password" );
   if(!$db){
      echo "Error : Unable to open database\n";
   } else {
   }
	$sql =<<<EOF
	 	 INSERT INTO BURGERS (ID,NAME,PICKLES,BBQ,CHEESE,GPEPPER,GMUSHROOMS,TOMATO,JALAPENOS,KETCHUP,LETTUCE,MAYO,MUSTARD,ONIONS)
	 	 VALUES ($timestamp, $name, $pickles, $bbq, $cheese, $gpepper, $gmushrooms, $tomato, $jalapenos, $ketchup, $lettuce, $mayo, $mustard, $onions);
EOF;

	$ret = pg_query($db, $sql);
	if(!$ret){
		 echo pg_last_error($db);
	} else {
	}
	$sql =<<<EOF
	      SELECT * from BURGERS;
EOF;
	$ret = pg_query($db, $sql);
   if(!$ret){
      echo pg_last_error($db);
      exit;
   }
   while($row = pg_fetch_row($ret)){
			echo("
			<tr>
				<td class='mdl-data-table__cell--non-numeric'><center>$row[1]</center></td>
				<td class='mdl-data-table__cell--non-numeric'><center>$row[2]</center></td>
				<td class='mdl-data-table__cell--non-numeric'><center>$row[3]</center></td>
				<td class='mdl-data-table__cell--non-numeric'><center>$row[4]</center></td>
				<td class='mdl-data-table__cell--non-numeric'><center>$row[5]</center></td>
				<td class='mdl-data-table__cell--non-numeric'><center>$row[6]</center></td>
				<td class='mdl-data-table__cell--non-numeric'><center>$row[7]</center></td>
				<td class='mdl-data-table__cell--non-numeric'><center>$row[8]</center></td>
				<td class='mdl-data-table__cell--non-numeric'><center>$row[9]</center></td>
				<td class='mdl-data-table__cell--non-numeric'><center>$row[10]</center></td>
				<td class='mdl-data-table__cell--non-numeric'><center>$row[11]</center></td>
				<td class='mdl-data-table__cell--non-numeric'><center>$row[12]</center></td>
				<td class='mdl-data-table__cell--non-numeric'><center>$row[13]</center></td>
			</tr>");
   }
   pg_close($db);
?>
			</tbody>
		</table>
	</body>
</html>
