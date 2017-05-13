<?php
	
	if(isset($_COOKIE["user_id"])){
		if(isset($_GET["BOOK"])){
			$TIME=time();
			$state="unaccept";
			$bookid=$_GET["BOOK"];
			$commandid=$_COOKIE["user_id"];
			$dbc = mysqli_connect("localhost","root","xUEBMI4oEQYNNqFj","library");
			mysqli_set_charset($dbc,"utf8");
			
			$query="INSERT INTO `transaction` (`time`, `state`, `bookid`, `commandid`) 
					VALUES ('$TIME', '$state', '$bookid', '$commandid');";
			$data=mysqli_query($dbc,$query);
			$query1="update `books` set margin=margin-1 where id=$bookid";
			$data1=mysqli_query($dbc,$query1);
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