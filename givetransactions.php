<?php

        $dbc = mysqli_connect("localhost","root","xUEBMI4oEQYNNqFj","library");
		mysqli_set_charset($dbc,"utf8");
		
		$query1="SELECT id,bookid ,commandid,state FROM transaction WHERE state='unaccept'";
		$data = mysqli_query($dbc,$query1);
		$i=0;
		while($row = mysqli_fetch_array($data))
		{
			
			$query2="SELECT bookname, writer, cover FROM books WHERE id = ".$row['bookid'];
			$data2 = mysqli_query($dbc,$query2);
			$row2 = mysqli_fetch_array($data2);
			$query3="SELECT username,address FROM users WHERE userid = ".$row['commandid'];
			$data3 = mysqli_query($dbc,$query3);
			$row3 = mysqli_fetch_array($data3);
			$temp=Array(
				"transactionid"=>$row["id"],
				"bookname"=>$row2["bookname"],
				"writer"=>$row2["writer"],
				"cover"=>$row2["cover"],
				"username"=>$row3["username"],
				"address"=>$row3["address"],
				"state"=>$row["state"]
			);
			$tran_arr[]=$temp;
		}
		echo json_encode($tran_arr);
    
?>