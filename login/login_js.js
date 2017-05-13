//login
$(document).ready(function(){
	$("#login").click(function(){
		var	username=$("#username").val();
		var	password=$("#password").val();
		$.post("login.php",{
			username:username,
			password:password,
		},
		function(data,status){
			if(status!="success")
				alert("????:"+status);
			else
				//$("#response").html(data);
			eval(data);
		}
		);
	});
	
	$("#register").click(function(){
		location.href="/Library/register/register.html";
	});
});