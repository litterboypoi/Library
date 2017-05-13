<?php
	
	if(isset($_COOKIE["user_id"])){
		if(isset($_GET["deal_id"])){
			$executorid=$_COOKIE["user_id"];
			$deal_id=$_GET["deal_id"];
			$dbc = mysqli_connect("localhost","root","xUEBMI4oEQYNNqFj","library");
			mysqli_set_charset($dbc,"utf8");
			
			$query="update `transaction` set executorid=$executorid ,state=\"accepted\" WHERE id=$deal_id;";
			$data=mysqli_query($dbc,$query);
			if(!$data){
				die(mysqli_error($dbc));
				}
			echo "success!";
		}else{
			echo "error";
		}
	}else{
		echo "Please login first!";
	}