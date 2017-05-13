<?php

        $dbc = mysqli_connect("localhost","root","xUEBMI4oEQYNNqFj","library");
		mysqli_set_charset($dbc,"utf8");
		$userid=$_COOKIE["user_id"];
		$query1="SELECT id,bookid ,state,commandid FROM transaction where executorid='$userid'";
		$data = mysqli_query($dbc,$query1);
		if (!$data) {
						die(mysqli_error($dbc));
					}
		$i=0;
		if(mysqli_num_rows($data)==0){
			$tran_arr=null;
		}else{
		while($row = mysqli_fetch_array($data))
		{
			$query2="SELECT bookname, writer, cover FROM books WHERE id = ".$row['bookid'];
			$data2 = mysqli_query($dbc,$query2);
			$row2 = mysqli_fetch_array($data2);
			if($row['commandid']){
			$query3="SELECT username FROM users WHERE userid = ".$row['commandid'];
			$data3 = mysqli_query($dbc,$query3);
			$row3 = mysqli_fetch_array($data3);
			}else{
				$row3["username"]=null;
			}
			$temp=Array(
				"transactionid"=>$row["id"],
				"bookname"=>$row2["bookname"],
				"writer"=>$row2["writer"],
				"cover"=>$row2["cover"],
				"commander"=>$row3["username"],
				"state"=>$row["state"]
			);
			$tran_arr[]=$temp;
		}
		}
		echo json_encode($tran_arr);
    
?>