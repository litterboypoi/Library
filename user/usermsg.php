<?php
	if(isset($_COOKIE["user_id"])){
		$userid=$_COOKIE["user_id"];
	$dbc = mysqli_connect("localhost","root","xUEBMI4oEQYNNqFj","library");
		mysqli_set_charset($dbc,"utf8");
		$query="SELECT * FROM users where userid='$userid'";
		$data = mysqli_query($dbc,$query);
		if (!$data) {
						die(mysqli_error($dbc));
					}
		$row = mysqli_fetch_array($data);
		
			echo json_encode($row);
	}