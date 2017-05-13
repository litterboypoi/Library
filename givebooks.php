<?php

        $dbc = mysqli_connect("localhost","root","xUEBMI4oEQYNNqFj","library");
		mysqli_set_charset($dbc,"utf8");
		
		$query1="SELECT * FROM books";
		$data = mysqli_query($dbc,$query1);
		$i=0;
		while($row = mysqli_fetch_array($data))
		{
			$books_arr[]=$row;
		}
		
			echo json_encode($books_arr);