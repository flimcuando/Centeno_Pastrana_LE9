var overDate = new Object();
overDate.year = 2013;
overDate.month = 0; //Need to minus 1 by real month
overDate.day = 1;
overDate.hour = 23;
overDate.min = 59;
overDate.sec = 0;

var deltaDate = 1000 * 60 * 60 * 24 * 2;//due date + 2days

var NowTime = new Date();  
var EndTime= new Date();
EndTime.setFullYear(overDate.year, overDate.month, overDate.day);  
EndTime.setHours(overDate.hour);
EndTime.setMinutes(overDate.min);
EndTime.setSeconds(overDate.sec);

var EndTimeMsg = EndTime.getFullYear() + "Year";  
EndTimeMsg = EndTimeMsg + (EndTime.getMonth()+1) + "Month";  
EndTimeMsg = EndTimeMsg + (EndTime.getDate()) + "Day";  
EndTimeMsg = EndTimeMsg + (EndTime.getHours()) + "Hour";  
EndTimeMsg = EndTimeMsg + (EndTime.getMinutes()) + "Min";  
EndTimeMsg = EndTimeMsg + (EndTime.getSeconds()) + "Second";  
function GetRTime(){  
  
	NowTime = new Date();  
	var nMS=EndTime.getTime() - NowTime.getTime();  
	var nD=Math.floor(nMS/(1000 * 60 * 60 * 24));  
	var nH=Math.floor(nMS/(1000*60*60)) % 24;  
	var nM=Math.floor(nMS/(1000*60)) % 60;  
	var nS=Math.floor(nMS/1000) % 60;  
	var nMS=Math.floor(nMS/100) % 10;  
	if(nD>= 0){  
		document.getElementById("RemainD").innerHTML=nD;  
		document.getElementById("RemainH").innerHTML=nH;  
		document.getElementById("RemainM").innerHTML=nM;  
		document.getElementById("RemainS").innerHTML=nS + "." + nMS;  
	}  
	else {
		EndTime = new Date(NowTime.getTime() + deltaDate);
		//document.getElementById("CountMsg").innerHTML=EndTimeMsg+" Past";  
	}  
	setTimeout("GetRTime()",100);  
}  
window.onload=function(){  
	document.getElementById("EndTimeMsg").innerHTML=EndTimeMsg;  
	GetRTime();  
}  