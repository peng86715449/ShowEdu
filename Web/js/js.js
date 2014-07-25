window.onload=initAll;
function initAll(){
	onMouseNav();
	t_baaner();
	time();
};
function t_baaner(){
	var oBanner=document.getElementById('main_banner');
	var oBanUl=oBanner.getElementsByTagName('ul')[0];
	var oBanLi=oBanUl.getElementsByTagName('li');
	for(var i=0; i<oBanLi.length; i++){
		oBanLi[i].onmouseover=function(){
			for(var j=0; j<oBanLi.length; j++){
				startMove(oBanLi[j],{width:40})
			};
			startMove(this, {width:620})
		};
	};
};

function onMouseNav(){
	var oTnav=document.getElementById('tnav');
	var oLeftMenu=getByClass(oTnav, 'left_menu')[0];
	var aMenuLi=oLeftMenu.getElementsByTagName('li');
	var oRightInner=getByClass(oTnav, 't_option');
	
	for(var i=0; i<aMenuLi.length; i++){
		aMenuLi[i].index=i;
		aMenuLi[i].onmouseover=function(){
			for(var j=0; j<aMenuLi.length; j++){
				aMenuLi[j].className='';
				oRightInner[j].style.display='none';
			};
			this.className='curr';
			oRightInner[this.index].style.display='block';
		};
	};
};
function  startMove(obj, json, fnEnd){
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		var bStop=true;
		for(var attr in json){
			var iCur=0;
				if(attr=='opacity'){
					iCur=iMath.round(parseFloat(getStyle(obj, attr))*100);
				}else{
					iCur=parseInt(getStyle(obj, attr));
				};
			var iSpeed=(json[attr]-iCur)/6;
				iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
			if(iCur!=json[attr]){
				bStop=false;
			};
			if(attr=='opacity'){
				obj.style.filter='alpha(opacity:'+(iCur+iSpeed)+')';
				obj.style.opacity=(iCur+iSpeed)/100;
			}else{
				obj.style[attr]=(iCur+iSpeed)+'px';
			};
		};
		if(bStop){
			clearInterval(obj.timer);
			if(fnEnd){
				fnEnd();
			};
		};
	}, 30);
};
function  getStyle(obj, name){
	if(obj.currentStyle){
		return obj.currentStyle[name];
	}else{
		return getComputedStyle(obj, false)[name];
	}
};
function getByClass(oParent, sClass){
	var aEle=oParent.getElementsByTagName('*');
	var aResult=[];
	var className;
	var classList;
	for(var i=0; i<aEle.length; i++){
		className = aEle[i].className;
		classList = className.split(' ');
		if(classList.length>0){
			for(var j=0; j<classList.length; j++){
				if(classList[j].indexOf(sClass)>=0){
					aResult.push(aEle[i]);
				};
			};
		}else if(className.length>0){
			if(className==sClass){
				aResult.push(aEle[i]);
			};
		};		
	};
	return aResult;
};
function time(){
	t_div = document.getElementById('showtime');
	var now=new Date()
	t_div.innerHTML = now.getFullYear() +"年"+(now.getMonth()+1)+"月"+now.getDate()+"日  "+now.getHours()+"时"+now.getMinutes()+"分"+now.getSeconds()+"秒";
	setTimeout(time,1000);
}
