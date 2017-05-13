//javascript


$(document).ready(function(){
	var name=getCookie("username");
	if(name){
		$("#header #user_name").html(name);

	}
	jQuery.get("/library/user/usermsg.php",function(data){
		var usermsg_json=JSON.parse(data);
		$(".name span").html(usermsg_json.username);
		$(".id span").html(usermsg_json.userid);
		$(".sex span").html(usermsg_json.sex);
		$(".address span").html(usermsg_json.address);
	});
	jQuery.get("/library/mysubmittransactions.php",function(data){
		if(data=="null"){
			$(".submit_deal .list_header").html("<p>什么都没有啦 ╮(╯▽╰)╭</p>");
			return false;
		}
		var submitdeal_json=JSON.parse(data);
		for(var i=0;i<submitdeal_json.length;i++){
			
			var submitdom="<div class=\"mycommand\"><div class=\"namewriter\">";
			submitdom +="<p>"+submitdeal_json[i].bookname+"</p>";
			submitdom +="<p>"+submitdeal_json[i].writer+"</p></div>";
			submitdom +="<div class=\"COVER\">";
			submitdom +="<img src=\""+submitdeal_json[i].cover+"\" height=\"90%\"/></div>";
			submitdom +="<div class=\"STATE\" style=\"width:70px;\">";
			submitdom +="<p>"+submitdeal_json[i].state+"</p></div>";
			submitdom +="<div class=\"receiver\" style=\"width:70px;\">";
			submitdom +="<p>"+submitdeal_json[i].receiver+"</p></div>";
			submitdom +="<div class=\"DEALID\" style=\"width:50px;\">";
			submitdom +="<p>"+submitdeal_json[i].transactionid+"</p></div>";
			submitdom +="<button class=\"finish\">完成订单</button></div>";
			submitdom +="<div style=\"clear:both;\"></div>";
			$(".submit_deal").append(submitdom); 
			
		}
	});
	jQuery.get("/library/mygettransactions.php",function(data){
		if(data=="null"){
			$(".get_deal .list_header").html("<p>什么都没有啦 ╮(╯▽╰)╭</p>");
			return false;
		}
		var getdeal_json=JSON.parse(data);
		for(var i=0;i<getdeal_json.length;i++){
			var submitdom="<div class=\"myget\"><div class=\"namewriter\">";
			submitdom +="<p>"+getdeal_json[i].bookname+"</p>";
			submitdom +="<p>"+getdeal_json[i].writer+"</p></div>";
			submitdom +="<div class=\"COVER\">";
			submitdom +="<img src=\""+getdeal_json[i].cover+"\" height=\"90%\"/></div>";
			submitdom +="<div class=\"STATE\" style=\"width:70px;\">";
			submitdom +="<p>"+getdeal_json[i].state+"</p></div>";
			submitdom +="<div class=\"receiver\" style=\"width:70px;\">";
			submitdom +="<p>"+getdeal_json[i].commander+"</p></div>";
			submitdom +="<div class=\"DEALID\" style=\"width:50px;\">";
			submitdom +="<p>"+getdeal_json[i].transactionid+"</p></div></div>";
			submitdom +="<div style=\"clear:both;\"></div>";
			$(".get_deal").append(submitdom); 
			
		}
	});
	$(".submit_deal").delegate("button","click",function(){
		var deal_id=$(this).prev().text();
		var mymessage=confirm("完成订单？");
		if(mymessage==true)
		{
			jQuery.get("/library/finish.php?deal_id="+deal_id,function(data,status){
				if(status="success"){
					alert(data);
				}
				else
					alert("发生错误");
				location.reload();
			});
		}
	}); 
	$("#callback").click(function(){
		location.href="/Library/index.html";
		
	});
});

function getCookie(c_name)
{
if (document.cookie.length>0)
  {
  c_start=document.cookie.indexOf(c_name + "=");
  if (c_start!=-1)
    { 
    c_start=c_start + c_name.length+1 ;
    c_end=document.cookie.indexOf(";",c_start);
    if (c_end==-1) c_end=document.cookie.length;
    c_val=decodeURI(document.cookie.substring(c_start,c_end));
	return c_val;
    } 
  }
return false;
}