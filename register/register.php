<?php 
if(!isset($_POST['username'])||empty($_POST['username'])){
	echo "请输入用户名</br>";
	return false;
	}
if(!isset($_POST['password'])||empty($_POST['password'])){
	echo "请输入密码</br>";
	return false;
	}
if(!isset($_POST['checkpassword'])||empty($_POST['checkpassword'])){
	echo "请输入确认密码</br>";
	return false;
	}
if(!isset($_POST['address'])||empty($_POST['address'])){
	echo "请输入地址</br>";
	return false;
	}	
if($_POST['password']!=$_POST['checkpassword']){
	echo "密码与确认密码不一致</br>";
	return false;
	}
	$username=$_POST['username'];
	$password=$_POST['password'];
	$sex=$_POST['sex'];
	$address=$_POST['address'];
	
	//数据库操作
	$link=mysqli_connect("localhost","root","xUEBMI4oEQYNNqFj","library");
	mysqli_set_charset($link,"utf8");
	$query="INSERT INTO `users` (`username`, `password`, `sex`, `address`) 
						VALUES ('$username', '$password', '$sex', '$address');";
	$data=mysqli_query($link,$query);
	if (!$data) {
				die(mysqli_error($link));
				}
	//$res=mysqli_query($link,"select * from `books`");
	//echo $res['bookname`']
	
	
	echo "注册成功！</br>";