//
$(document).ready(function(){
	$("#submit").click(function(){
		var	username=$("#username").val();
		var	password=$("#password").val();
		var	checkpassword=$("#checkpassword").val();
		var	sex=$("#sex").val();
		var	address=$("#address").val();
		$.post("./register.php",{
			username:username,
			password:password,
			checkpassword:checkpassword,
			sex:sex,
			address:address,
		},
		function(data,status){
			if(status!="success")
				alert("发生错误:"+status);
			else{
				$("#response").html(data);
				location.href="/Library/login/login.html";
			}
		}
		);
	});
});
