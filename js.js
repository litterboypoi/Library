//javascript
$(document).ready(function(){
	var name=getCookie("username");
	
	//获取books表内容并显示
	jQuery.get("/library/givebooks.php",function(data){
		var booksjson=JSON.parse(data);
		//alert(booksjson.length);
		for(var i=0;i<booksjson.length;i++){
			var bookdom="<div class=\"BOOK\">";
			bookdom +="<p class=\"name\" name=\""+booksjson[i].id+"\">"+booksjson[i].bookname+"</p>";
			bookdom +="<p>"+booksjson[i].writer+"</p>";
			bookdom +="<div class=\"cover\">";
			bookdom +="<img src=\""+booksjson[i].cover+"\" height=\"100%\"/></div>";
			bookdom +="<div class=\"remain\">";
			bookdom +="<span>该书还剩<span>"+booksjson[i].margin+"</span>本</span>";
			bookdom +="<button class=\"borrow\">我要借书</button></div></div>";
			$(".book_list").append(bookdom); 
		}
	});
	jQuery.get("/library/givetransactions.php",function(data){
		var trans_json=JSON.parse(data);
		//alert(booksjson.length);
		for(var i=0;i<trans_json.length;i++){
			var dealdom="<div class=\"DEAL\"><div class=\"book_name\">";
			dealdom +="<p>"+trans_json[i].bookname+"</p>";
			dealdom +="<p>"+trans_json[i].writer+"</p></div>";
			dealdom +="<div class=\"book_cover\">";
			dealdom +="<img src=\""+trans_json[i].cover+"\" height=\"90%\"/></div>";
			dealdom +="<div class=\"w_user\">";
			dealdom +="<p>"+trans_json[i].username+"</p></div>";
			dealdom +="<div class=\"w_address\">";
			dealdom +="<p>"+trans_json[i].address+"</p></div>";
			dealdom +="<div class=\"state\">";
			dealdom +="<p>"+trans_json[i].state+"</p></div>";
			dealdom +="<div class=\"deal_id\">";
			dealdom +="<p>"+trans_json[i].transactionid+"</p></div>";
			dealdom +="<button class=\"receive\">帮他完成</button></div></div>";
			dealdom +="<div style=\"clear:both;\"></div>";
			$("#deal_list").append(dealdom); 
		}
	});
	//显示用户名
	if(name){
		$("#header #user_name").html(name);
		
	}
	//borrow book
	$(".book_list").delegate("button","click",function(){
		var margin=$(this).prev().children("span").text();
		var bookid=$(this).parent().siblings(".name").attr("name");
		//alert(bookname);
		if(margin<=0){
		alert("该书余量不足");
		}
		else{
				var check1=confirm("你要借这本书是吗？");
				if(check1==true)
				{
					jQuery.get("/library/borrow.php?BOOK="+bookid,function(data,status){
					if(status="success"){
						alert(data);
						
					}
					else
						alert("发生错误");
					location.reload(true);
					});
				}
			}
	});
	//receive transaction
	$("#deal_list").delegate("button","click",function(){
		var deal_id=$(this).prev().text();
		var mymessage=confirm("你要帮他借这本书是吗？");
		if(mymessage==true)
		{
			jQuery.get("/library/receive.php?deal_id="+deal_id,function(data,status){
				if(status="success"){
					alert(data);
				}
				else
					alert("发生错误");
				location.reload();
			});
		}
	}); 
	$("#user_face").click(function(){
		if(!name){
		location.href="/Library/login/login.html";
		}else{
			location.href="/Library/user/usermsg.html";
		}
		
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

