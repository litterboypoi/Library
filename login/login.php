<?php
//开启一个会话
session_start();
$home_url = "/Library/index.html";
//若是用户未登录，即未设置$_SESSION[""user_id""]时，履行以下代码
if(!isset($_SESSION["user_id"])){
    //if(isset($_POST["submit"])){//用户提交登录表单时履行如下代码
        $dbc = mysqli_connect("localhost","root","xUEBMI4oEQYNNqFj","library");
		mysqli_set_charset($dbc,"utf8");
		$user_username = $_POST["username"];
        $user_password = $_POST["password"];
        if(!empty($user_username)&&!empty($user_password)){
            //MySql中的SHA()函数用于对字符串进行单向加密
            $query = "SELECT userid, username FROM users WHERE username = '$user_username' AND password = '$user_password'";
            $data = mysqli_query($dbc,$query);
						if (!$data) {
							die(mysqli_error($dbc));
						  }
            //用用户名和暗码进行查询，若查到的记录正好为一条，则设置SESSION和COOKIE，同时进行页面重定向
            if(mysqli_num_rows($data)==1){
                $row = mysqli_fetch_array($data);
                $_SESSION["user_id"]=$row["userid"];
                $_SESSION["username"]=$row["username"];
                setcookie("user_id",$row["userid"],time() + 60*60*24*30,"/");
                setcookie("username",$row["username"],time() + 60*60*24*30,"/");
                echo "window.location='/Library/index.html'";
            }else{//若查到的记录不合错误，则设置错误信息
                echo("alert(\"Sorry， you must enter a valid username and password to log in.\")");
            }
        }else{
			echo("alert(\"Sorry， you must enter a valid username and password to log in.\")");
        }
    //}
}else{//若是用户已经登录，则直接跳转到已经登录页面
    
    echo "window.location='/Library/index.html'";
}
?>





