function lists(obj){
	this.o=obj;
	this.comList=document.querySelector(".com-box .content");
	this.comtips=document.querySelector(".com-box .tips");
	this.nowList=document.querySelector(".now-box .content");
	this.nowtips=document.querySelector(".now-box .tips");
	this.title=document.querySelector("[type=text]");
}
lists.prototype.todo=function(){
    this.title.onkeydown=function(e){
  	    var ev=e||window.event;
  	    if(ev.keyCode=='13'){//如果按下回车键
  	     	var val=this.value;
  	     	 if(val.length==0){
            alert('输入不能为空');
              return;
        		}    
        var data=getData();
	        data.push({
                 title:val,
	            status:false
	           })
	        this.value="";
	        saveData(data);
	        reload()
         }
     }
}
lists.prototype.getData(){
	var data=JSON.parse(localStorage.getItem("todos"));//获取存储在本地的todos的键值
	return data||[];
}
lists.prototype.saveData(data){
	localStorage.setItem('todos',JSON.stringify(data));
}
lists.prototype.reload(){
          	var nowStr="";
          	var conStr="";
          	var nowNum=0;
          	var conNum=0;
          	var data=getData();
          	for (var i = 0; i < data.length; i++) {
          		if(data[i].status==false){
          			nowStr+="<li><input type='checkbox' onclick=changeStatus("+i+",true)><div class='content-list'contenteditable onblur=changeContent("+i+",this.innerHTML)>"+data[i].title+"</div><div class='del-btn'  onclick=del("+i+")><span></span></div></li>";
          			nowNum++;
          		}else{
          			conStr+="<li><input type='checkbox' checked onclick=changeStatus("+i+",false)><div class='content-list' contenteditable onblur=changeContent("+i+",this.innerHTML)>"+data[i].title+"</div><div class='del-btn'  onclick=del("+i+") ><span></span></div></li>";
          			conNum++;
          		}
          	};
lists.prototype.del(i){
          	var data=getData();
          	data.splice(i,1);
          	saveData(data);
          		reload();
          }
lists.prototype.changeStatus(i,sta){
          	var data=getData();
          	data[i].status=sta;
          	saveData(data);
          	reload();
          }
lists.prototype.changeContent(i,text){
          	var data=getData();
          	data[i].title=text;
          		saveData(data);
          }

