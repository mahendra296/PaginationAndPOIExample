var responseFunction;
function GetXmlHttpObject(handler)
{ 
   var objXmlHttp=null;
   if (navigator.userAgent.indexOf("Opera")>=0)
   {
      alert("This example doesn't work in Opera")
      return
   }
   if (navigator.userAgent.indexOf("MSIE")>=0)
   { 
      var strName="Msxml2.XMLHTTP"
      
      if (navigator.appVersion.indexOf("MSIE 5.5")>=0)
      {
         strName="Microsoft.XMLHTTP"
      } 
      try
      { 
         objXmlHttp=new ActiveXObject(strName)
         objXmlHttp.onreadystatechange=handler 
         return objXmlHttp
      } 
      catch(e)
      { 
        alert("Error. Scripting for ActiveX might be disabled") 
         return 
      } 
   } 
   if (navigator.userAgent.indexOf("Mozilla")>=0)
   {
      objXmlHttp=new XMLHttpRequest()
      objXmlHttp.onload=handler
      objXmlHttp.onerror=handler 
      return objXmlHttp
   }
} 

/*
 * function ajax_loadContent(url,queryString,response) {
 * responseFunction=response; //alert("url -- >> "+url) //alert("queryString -- >>
 * "+queryString) //alert("response -- >> "+response)
 * xmlHttp=GetXmlHttpObject(callbackFromAjaxAction) xmlHttp.open("POST", url ,
 * true) xmlHttp.setRequestHeader("Content-Type",
 * "application/x-www-form-urlencoded"); xmlHttp.send(queryString);
 * //alert('start animation') var progressBar= new DHTML_ProgressBar();
 * progressBar._createDiv(); }
 */
function ajax_loadContent(url,nameValueCollectionObj,response)
{
	var queryString;
	if( nameValueCollectionObj instanceof NameValueCollection)
	{
		queryString=nameValueCollectionObj.getQueryString();
	}else{
		queryString=nameValueCollectionObj;
	}
	// alert(url+" "+queryString);
	responseFunction=response;
	xmlHttp=GetXmlHttpObject(callbackFromAjaxAction)
	xmlHttp.open("POST", url , true)
   	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
	xmlHttp.send(queryString);
	// alert('start animation')
	// var progressBar= new DHTML_ProgressBar();
	// progressBar._createDiv();
}
function ajax_loadContentWithProgress(url,nameValueCollectionObj,response)
{
	var queryString;
	if( nameValueCollectionObj instanceof NameValueCollection)
	{
		queryString=nameValueCollectionObj.getQueryString();
	}else{
		queryString=nameValueCollectionObj;
	}
	// alert(url+" "+queryString);
	responseFunction=response;
	xmlHttp=GetXmlHttpObject(callbackFromAjaxActionWithProgress)
	xmlHttp.open("POST", url , true)
   	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
	xmlHttp.send(queryString);
	// alert('start animation')
	var progressBar= new DHTML_ProgressBar();
	progressBar._createDiv();
}
function ajax_loadContentWithProgressNew(url,nameValueCollectionObj,response)
{
	var queryString;
	if( nameValueCollectionObj instanceof NameValueCollection)
	{
		queryString=nameValueCollectionObj.getQueryString();
	}else{
		queryString=nameValueCollectionObj;
	}
	// alert(url+" "+queryString);
	responseFunction=response;
	xmlHttp=GetXmlHttpObject(callbackFromAjaxActionWithProgress)
	xmlHttp.open("POST", url , true)
   	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
	xmlHttp.send(queryString);
	// alert('start animation')
	var progressBar= new Wait_ProgressBar();
	progressBar._createDiv();
}
function callbackFromAjaxAction()
{
	if(xmlHttp.readyState==4)
	{	
		if(xmlHttp.status==200)
		{				
			// document.getElementById("DHTMLSuite_progressBar_divs_transparentDiv").style.display='none';
			// document.getElementById("DHTMLSuite_progressBar_contentDiv").style.display='none';
			var objType=typeof(responseFunction); 
			if(objType=="function" || objType=="object")
				responseFunction();
		}
	}
}
function callbackFromAjaxActionWithProgress()
{
	if(xmlHttp.readyState==4)
	{	
		if(xmlHttp.status==200)
		{				
			document.getElementById("DHTMLSuite_progressBar_divs_transparentDiv").style.display='none';
			document.getElementById("DHTMLSuite_progressBar_contentDiv").style.display='none';
			var objType=typeof(responseFunction); 
			if(objType=="function" || objType=="object")
				responseFunction();
		}
	}
}
/*
 * Generate Query String
 */
NameValueCollection = function()
{
	this.name=[];
	this.value=[];
	this.add=function(name,value)
	{
		this.name[this.name.length]=name;
		this.value[this.value.length]=value;
	}	
	this.getQueryString=function()
	{
		var queryString='';
		if(this.name.length==this.value.length)
		{
			for(var n=0;n<this.name.length;n++)
			{
				if(n>0)
				{
					queryString=queryString+"&";
				}
				if(this.name[n]=="action")
				{
					queryString=queryString+this.name[n]+"="+(this.value[n]);
				}else
				{
					queryString=queryString+this.name[n]+"="+encodeURIComponent(this.value[n]);
				}
			}
		}
		return queryString;
	}	
	this.getQueryStringXX= function()
	{
		var queryString='';
		if(this.name.length==this.value.length)
		{
			for(var n=0;n<this.name.length;n++)
			{
				if(n>0)
				{
					queryString=queryString+"&";
				}
				// tmpConverted=encodeURI(string.charAt(n));
				// encodeURIComponent().
				var tempValue=_escape(this.value[n]+'')
				queryString=queryString+this.name[n]+"="+tempValue;
			}
		}
		else{
			alert('index value of Name and Value must be same');
		}
		return queryString;
	}
}
/*
 * Purpose : There was problem while passing directly chars like +,-,>,<, etc..
 * from the queryString while using ajax with Get/Post method Objective :This
 * method will convert the chars in Hexadecimal values
 */
_escape= function(string)
{
	var tempString='';
	for(var n=0;n<string.length;n++)
	{
		var tmpConverted;
		switch(string.charAt(n))
		{
			case '*':
					tempString=tempString+"%2A";
				break;
			case '@':
					tempString=tempString+"%40";
				break;
			case '-':
					tempString=tempString+"%2D";
				break;
			case '_':
					tempString=tempString+"%5F";
				break;
			case '+':
					tempString=tempString+"%2B";
				break;
			case '.':
					tempString=tempString+"%2E";
				break;
			case '/':
					tempString=tempString+"%2F";
				break;
			default :
				tmpConverted=escape(string.charAt(n));
				if(tmpConverted.indexOf("%u")>=0)
					tempString=tempString+string.charAt(n);
				else
					tempString=tempString+tmpConverted;
		}
	}
return 	tempString;

}
function AjaxXMLReturn()
{
	this.evalute=true;
	this.errorType=0;
	this.errorMessage;
	this.evalData;
	this.othersData;
	this.parseNetXML=function(resData)
	{
		try{
		var tmpResData=resData;
// document.write("<pre>"+tmpResData+"</pre>");
		var errArray=tmpResData.split("<ErrMsg:netx>");
		if(errArray.length>0)
		{
			this.errorType=errArray[0];// should be consider trim ;
			tmpResData=errArray[1];
			errArray=tmpResData.split("<evalData:netx>");
			if(errArray.length>0)
			{
				this.errorMessage=errArray[0];// should be consider trim ;
				tmpResData=errArray[1];
				errArray=tmpResData.split("<othersData:netx>");
				if(errArray.length>0)
				{
					this.evalData=errArray[0];// should be consider trim ;
					if(this.evalute)
					{
						try{
						// alert(this.evalData);
						// document.write(this.evalData);
							eval(this.evalData);
						}catch(e)
						{
							logAjaxException("mode=0&jem=START"+escape(this.evalData)+"END");
							// alert("Ajax Eval Error::"+e);
							throw e;
						}
					}
					this.othersData=errArray[1];
				}
			}
		}
		}catch(e)
		{
				// alert("General Parse Error Ajax.js=="+resData)
				logAjaxException("mode=0&jem=--General Parse Error Ajax.js--"+escape(resData));
				// alert("Failed to load Page.Please press F5 to
				// refresh.[ecode:"+e+"]");
				throw e;
		}
	};
	this.showIfErrorXX=function()
	{	
		this.errorType=this.errorType.replace(/^\s+|\s+$/g, '');
		// alert(this.errorMessage)
		if(this.errorType=="2")
		{// validation error type is set to 2
			showErrorMessage_ajax(this.errorMessage);// need home.js
		}else if(this.errorType=="1")
		{// confirmation message 1
			showConfirmationMessage_ajax(this.errorMessage);// need home.js

		}else if(this.errorType=="3")
		{// bll Error
			showErrorMessage_ajax(this.errorMessage);// need home.js

		}else if(this.errorType=="4")
		{// for Eval
			showConfirmationMessage_ajax(this.errorMessage);// need home.js
		}
	};
	this.showIfError=function()
	{		
//		alert("this.errorType=="+this.errorType);
		this.errorType=this.errorType.replace(/^\s+|\s+$/g, '');
		errMsg=this.errorMessage.replace(/^\s+|\s+$/g, '');
		if(this.errorType=="2")
		{// validation error type is set to 2
			// consider that all validationErrorDiv
			if(document.getElementById('confirmMessageTextId')!='undefined' && document.getElementById('confirmMessageTextId')!=null){
			document.getElementById('confirmMessageTextId').innerHTML="<div class='error_box'>"+this.errorMessage+"</div>";
			document.getElementById('confirmMessageTextId').style.display="block";
			scrollToTop();
			}
			
		}else if(this.errorType=="1")
		{// confirmation message 1
			if(document.getElementById('confirmMessageTextId')!='undefined' && document.getElementById('confirmMessageTextId')!=null){
			if(errMsg!="")
			{	
			document.getElementById('confirmMessageTextId').innerHTML="<div class='error_box'>"+this.errorMessage+"</div>";
			document.getElementById('confirmMessageTextId').style.display="block";
			scrollToTop();
			}
			}
			
			if(document.getElementById('confirm_message_ajax')!=null) {
				confirm_interval_ajax=setInterval("autoHideConfirmMessage_ajax()",3500);			
				showConfirmMessage_ajax();
			}
		}else if(this.errorType=="3")
		{// bll Error
			if(document.getElementById('confirmMessageTextId')!='undefined' && document.getElementById('confirmMessageTextId')!=null){
				if(this.errorMessage.indexOf("error_box")<0 && this.errorMessage.indexOf("Please correct the following error(s):")>0)
				{
					document.getElementById('confirmMessageTextId').innerHTML="<div class='error_box'>"+this.errorMessage+"</div>";
					document.getElementById('confirmMessageTextId').style.display="block";
					scrollToTop();
				}	
				else if(this.errorMessage.indexOf("error_box")<0)
				{
					var comMsg="<span class=\"error\" align=\"left\" style=\"display:block;padding-top:11px;\">  Please correct the following error(s):<br><br></span><UL class=\"error\">";
					this.errorMessage=this.errorMessage.replace(/<\/?[^>]+(>|$)/g, "");
					this.errorMessage=this.errorMessage.replace(/^\s+|\s+$/g, '');
	
					document.getElementById('confirmMessageTextId').innerHTML="<div class='error_box'>"+comMsg+"<li>"+this.errorMessage+"</li></div></ul>";
					document.getElementById('confirmMessageTextId').style.display="block";
					scrollToTop();
				}else
				{
					document.getElementById('confirmMessageTextId').innerHTML=this.errorMessage;
					document.getElementById('confirmMessageTextId').style.display="block";
					scrollToTop();
				}
			}
			if(confirm_interval_ajax!=null){
				confirm_interval_ajax=setInterval("autoHideConfirmMessage_ajax()",3500);
				showConfirmMessage_ajax();
			}
		}else if(this.errorType=="4")
		{// for Eval
			topErrorMessage.innerHTML="<div class='error_box'>"+this.errorMessage+"</div>";// top-BLL-Erorr-message
			scrollToTop();
		}
		else if(this.errorType=="0")
		{// validation error type is set to 2
			// consider that all validationErrorDiv
			if(document.getElementById('confirmMessageTextId')!='undefined' && document.getElementById('confirmMessageTextId')!=null){
			document.getElementById('confirmMessageTextId').innerHTML=this.errorMessage;
			document.getElementById('confirmMessageTextId').style.display="block";
			}
		}

	}
	// this.getOthersData
}

// //////////////////confirmation error message//////////////
var confirm_interval_ajax;
function showConfirmMessage_ajax()
{
	var winW;
	var winH;
	
	if (parseInt(navigator.appVersion)>3) {
	 if (navigator.appName=="Netscape") {
	  winW = window.innerWidth;
	  winH = window.innerHeight;
	 }
	 if (navigator.appName.indexOf("Microsoft")!=-1) {
	  winW = document.body.offsetWidth;
	  winH = document.body.offsetHeight;
	 }
	}

// confirm_message_ajax.style.zIndex=100;
// confirm_message_ajax.style.display='block';
	
   var DivRef = document.getElementById('confirm_message_ajax');
   var IfrRef = document.getElementById('confirm_iframe_ajax');
  
  	DivRef.style.zIndex=100;
	DivRef.style.display='block';
	 
   DivRef.style.left=(winW/2)-200;
   DivRef.style.top=(winH/2)-10;
   
    DivRef.style.display = "block";
    IfrRef.style.width = DivRef.offsetWidth;
    IfrRef.style.height = DivRef.offsetHeight;
    IfrRef.style.top = DivRef.style.top;
    IfrRef.style.left = DivRef.style.left;
    IfrRef.style.zIndex = DivRef.style.zIndex - 1;
    IfrRef.style.display = "block";			
}
function hideConfirmMessage_ajax()
{	
	var DivRef = document.getElementById('confirm_message_ajax');
    var IfrRef = document.getElementById('confirm_iframe_ajax');
	confirm_message_ajax.style.zIndex=-1;
	confirm_message_ajax.style.display='none';
	DivRef.style.display = "none";
    IfrRef.style.display = "none";
	
}
function autoHideConfirmMessage_ajax()
{	
	hideConfirmMessage_ajax();
	clearInterval(confirm_interval_ajax);
}
// ////////////////////////////////////////////////////////////

DHTML_ProgressBar = function()
{
	this.divs_transparentDiv; // transparent Div
	this.divs_content; // center div to show the content
	this.height = 200;						// Default height
	this.width = 400;
	//alert("called1");// Default width
	this._createDiv =function()
	{
		// alert(document.getElementById("DHTMLSuite_progressBar_divs_transparentDiv")==null);
		if(document.getElementById("DHTMLSuite_progressBar_divs_transparentDiv")==null)
		{
			
			// Transparent Div
			this.divs_transparentDiv = document.createElement('DIV');
			this.divs_transparentDiv.className = 'progressBar_divs_transparentDiv';
			this.divs_transparentDiv.id = 'DHTMLSuite_progressBar_divs_transparentDiv';
			// this.divs_transparentDiv.innerHTML="";
			this.divs_transparentDiv.style.zIndex=10;
	    	this.divs_transparentDiv.style.position="absolute";
	    	this.divs_transparentDiv.style.background="#ffffff";
		
			// this.divs_transparentDiv.style.top =
			// Math.max(document.body.scrollTop,document.documentElement.scrollTop)
			// + 'px';
	    	// this.divs_transparentDiv.style.left =
			// Math.max(document.body.scrollLeft,document.documentElement.scrollLeft)
			// + 'px';
	    	
			this.divs_transparentDiv.style.left =0;
			this.divs_transparentDiv.style.top =0;
			this.divs_transparentDiv.style.width=document.body.scrollWidth;
			this.divs_transparentDiv.style.height=document.body.scrollHeight;
			
			this.divs_transparentDiv.style.filter="alpha(opacity=30)";
			if (navigator.userAgent.indexOf("Mozilla")>=0)
   			{
				this.divs_transparentDiv.style.opacity=.30;/* Transparency */
			}else
			{
				this.divs_transparentDiv.style.opacity=30;/* Transparency */
			}
			
			
			this.divs_transparentDiv.style.display="block";
			document.body.appendChild(this.divs_transparentDiv);
			// Content Div
			this.divs_content = document.createElement('DIV');
			// this.divs_content.className = 'progressBar_contentDiv';
			//this.divs_content.style.background="#F0F0F0";
			this.divs_content.style.background="#F0F0F0";
			this.divs_content.style.width="200px";
			this.divs_content.style.color="#4D4D4F";
			this.divs_content.style.textAlign="center";
			this.divs_content.style.border="3px solid #000000";
			this.divs_content.style.alignself="center";
			//alert(themePath);
			//alert(pleaseWaitVar);
			this.divs_content.id = 'DHTMLSuite_progressBar_contentDiv';
	    	this.divs_content.innerHTML = '<img src="'+themePath+'" style="margin: 5px 0px -8px 0px; padding: 0px;"/><p style="margin:0px 10px 10px 10px; font-family: Arial, Helvetica, sans-serif;font-size: 18px;color: #000000;font-weight:bold;"><br>&nbsp;&nbsp;'+pleaseWaitVar+'&nbsp;&nbsp;</p>';
	    	this.divs_content.style.zIndex=1;
	    	this.divs_content.style.position="fixed";
	    	this.divs_content.style.display="block";
	    	
	    	var topOffset = Math.max(document.body.scrollTop,document.documentElement.scrollTop);
	    	var bodyWidth, bodyHeight;	    	
	    	
	    	var tmpWidth = this.divs_content.clientWidth?this.divs_content.clientWidth:this.divs_content.offsetWidth;	
	    	var tmpHeight = this.divs_content.clientHeight?this.divs_content.clientHeight:this.divs_content.offsetHeight;
	    	
	    	var container_ID=document.getElementById("container_ID");
	    	if(container_ID!=null)
	    	{
	    		var brSize = this.getBrowserSize();
				bodyWidth = brSize[0];
				bodyHeight = brSize[1];
				
	    		var leftWidth=document.getElementById("container_ID").offsetLeft ;
		    	if(tmpWidth<=0) tmpWidth=100;
		    	var leftPoint = ((bodyWidth / 2)+leftWidth) - (tmpWidth / 2);
		    	// Setting width and height of left transparent div
		    	this.divs_content.style.left = leftPoint + 'px';
	    	}
	    	else
	    	{
	    		var brSize = this.__getBrowserSize();
				bodyWidth = brSize[0];
				bodyHeight = brSize[1];
				
	    		this.divs_content.style.left = Math.ceil(((bodyWidth - tmpWidth) / 2)-250) + 'px';
	    	}
	    	this.divs_content.style.top = (Math.ceil((bodyHeight - tmpHeight) / 2) +  topOffset) + 'px';	    	
	    	
	    	document.body.appendChild(this.divs_content);	    	
	    	// setTimeout(this._resize(),1);
		}else
		{
			var topOffset = Math.max(document.body.scrollTop,document.documentElement.scrollTop);
			var bodyWidth, bodyHeight;	  
			
			var tmpWidth = DHTMLSuite_progressBar_contentDiv.clientWidth?DHTMLSuite_progressBar_contentDiv.clientWidth:DHTMLSuite_progressBar_contentDiv.offsetWidth;	
	    	var tmpHeight = DHTMLSuite_progressBar_contentDiv.clientHeight?DHTMLSuite_progressBar_contentDiv.clientHeight:DHTMLSuite_progressBar_contentDiv.offsetHeight;
	    	
	    	var container_ID=document.getElementById("container_ID");
	    	if(container_ID!=null)
	    	{
	    		var brSize = this.getBrowserSize();
				bodyWidth = brSize[0];
				bodyHeight = brSize[1];
				
	    		var leftWidth=document.getElementById("container_ID").offsetLeft ;
	
		    	if(tmpWidth<=0) tmpWidth=100;
		    	var leftPoint = ((bodyWidth / 2)+leftWidth) - (tmpWidth / 2);
		    	// Setting width and height of left transparent div
		    	document.getElementById("DHTMLSuite_progressBar_contentDiv").style.left = Math.ceil(leftPoint) + 'px';
	    	}
	    	else
	    	{	
	    		var brSize = this.__getBrowserSize();
				bodyWidth = brSize[0];
				bodyHeight = brSize[1];
				
	    		document.getElementById("DHTMLSuite_progressBar_contentDiv").style.left = Math.ceil((bodyWidth - tmpWidth) / 2) + 'px';;
	    	}
	    	document.getElementById("DHTMLSuite_progressBar_contentDiv").style.top = (Math.ceil((bodyHeight - tmpHeight) / 2) +  topOffset) + 'px';

			document.getElementById("DHTMLSuite_progressBar_divs_transparentDiv").style.left =0;
			document.getElementById("DHTMLSuite_progressBar_divs_transparentDiv").style.top =0;
			document.getElementById("DHTMLSuite_progressBar_divs_transparentDiv").style.width=document.body.scrollWidth;
			document.getElementById("DHTMLSuite_progressBar_divs_transparentDiv").style.height=document.body.scrollHeight;
			document.getElementById("DHTMLSuite_progressBar_divs_transparentDiv").style.display='block';
			document.getElementById("DHTMLSuite_progressBar_contentDiv").style.display='block';
		}
	}
	this._hideDiv = function()
	{
		try{
			this.divs_transparentDiv.style.display="none";
			this.divs_content.style.display="none";
		}catch(e)
		{
			
		}
		try{
		document.getElementById("DHTMLSuite_progressBar_divs_transparentDiv").style.display="none";
		document.getElementById("DHTMLSuite_progressBar_contentDiv").style.display="none";
		}catch(e)
		{
			
		}
	}
	this._resize = function()
	{
		var st = Math.max(document.body.scrollTop,document.documentElement.scrollTop);
   		var sl = Math.max(document.body.scrollLeft,document.documentElement.scrollLeft);
   		// alert('st='+st + '\nsl=' +sl)
   		this.divs_content.style.top=200+st;
	    this.divs_content.style.left=430 + sl;
		window.scrollTo(sl,st);
		setTimeout('window.scrollTo(' + sl + ',' + st + ');',10);
	}
	this.__getBrowserSize = function()
	{
    	// var bodyWidth = document.documentElement.clientWidth;
    	// var bodyHeight = document.documentElement.clientHeight;
		var bodyWidth, bodyHeight; 
		if (self.innerHeight){ // all except Explorer
		   bodyWidth = self.innerWidth; 
		   bodyHeight = self.innerHeight; 
		}  else if (document.documentElement && document.documentElement.clientHeight) {
		   // Explorer 6 Strict Mode
		   bodyWidth = document.documentElement.clientWidth; 
		   bodyHeight = document.documentElement.clientHeight; 
		} else if (document.body) {// other Explorers
		   bodyWidth = document.body.clientWidth; 
		   bodyHeight = document.body.clientHeight; 
		} 
		return [bodyWidth,bodyHeight];		
	}
	this.getBrowserSize = function() {
		var bodyWidth, bodyHeight;

		bodyWidth = document.getElementById("container_ID").offsetWidth ;
		if (self.innerHeight){ // all except Explorer
			   bodyHeight = self.innerHeight; 
			}  else if (document.documentElement && document.documentElement.clientHeight) {
			   // Explorer 6 Strict Mode
			   bodyHeight = document.documentElement.clientHeight; 
			} else if (document.body) {// other Explorers
			   bodyHeight = document.body.clientHeight; 
			} 
		return [bodyWidth, bodyHeight];
	}
}
Wait_ProgressBar = function()
{
	this.divs_transparentDiv; // transparent Div
	this.divs_content; // center div to show the content
	this.height = 200;						// Default height
	this.width = 400;
	this._createDiv =function()
	{
		if(document.getElementById("DHTMLSuite_progressBar_divs_transparentDiv")==null || true)
		{
			
			// Transparent Div
			this.divs_transparentDiv = document.createElement('DIV');
			this.divs_transparentDiv.className = 'progressBar_divs_transparentDiv';
			this.divs_transparentDiv.id = 'DHTMLSuite_progressBar_divs_transparentDiv';
			// this.divs_transparentDiv.innerHTML="";
			this.divs_transparentDiv.style.zIndex=10;
	    	this.divs_transparentDiv.style.position="absolute";
	    	this.divs_transparentDiv.style.background="#ffffff";
		
			// this.divs_transparentDiv.style.top =
			// Math.max(document.body.scrollTop,document.documentElement.scrollTop)
			// + 'px';
	    	// this.divs_transparentDiv.style.left =
			// Math.max(document.body.scrollLeft,document.documentElement.scrollLeft)
			// + 'px';
	    	
			this.divs_transparentDiv.style.left =0;
			this.divs_transparentDiv.style.top =0;
			this.divs_transparentDiv.style.width=document.body.scrollWidth;
			this.divs_transparentDiv.style.height=document.body.scrollHeight;
			
			this.divs_transparentDiv.style.filter="alpha(opacity=30)";
			if (navigator.userAgent.indexOf("Mozilla")>=0)
   			{
				this.divs_transparentDiv.style.opacity=.30;/* Transparency */
			}else
			{
				this.divs_transparentDiv.style.opacity=30;/* Transparency */
			}
			
			
			this.divs_transparentDiv.style.display="block";
			document.body.appendChild(this.divs_transparentDiv);
			// Content Div
			this.divs_content = document.createElement('DIV');
			// this.divs_content.className = 'progressBar_contentDiv';
			this.divs_content.style.background="#F0F0F0";
			this.divs_content.style.width="800px";
			this.divs_content.style.color="#4D4D4F";
			this.divs_content.style.textAlign="center";
			this.divs_content.style.border="3px solid #000000";
			this.divs_content.style.alignself="center";
			
			//alert(themePath);
			//alert(waitMessage);
			this.divs_content.id = 'DHTMLSuite_progressBar_contentDiv';
	    	//this.divs_content.innerHTML = '<img src="'+themePath+'/loading-bar.gif"  style="margin: 5px 0px -8px 0px; padding: 0px;"/><H3><br>&nbsp;&nbsp;<B>'+waitMessage+'</B>&nbsp;&nbsp;</H3>';
			this.divs_content.innerHTML = '<p class="loading_img"></p><p style="margin:0px 10px 10px 10px; font-family: Arial, Helvetica, sans-serif;font-size: 18px;color: #000000;font-weight:bold;text-decoration: none;">'+waitMessage+'&nbsp;&nbsp;</p>';
	    	this.divs_content.style.zIndex=1;
	    	this.divs_content.style.position="fixed";
	    	this.divs_content.style.display="block";
	    	
	    	var topOffset = Math.max(document.body.scrollTop,document.documentElement.scrollTop);
	    	var bodyWidth, bodyHeight;	 
	    	
	    	var tmpWidth = this.divs_content.clientWidth?this.divs_content.clientWidth:this.divs_content.offsetWidth;	
	    	var tmpHeight = this.divs_content.clientHeight?this.divs_content.clientHeight:this.divs_content.offsetHeight;
	    	
	    	var container_ID=document.getElementById("container_ID");
	    	if(container_ID!=null)
	    	{
	    		var brSize = this.getBrowserSize();
				bodyWidth = brSize[0];
				bodyHeight = brSize[1];
				
	    		var leftWidth=document.getElementById("container_ID").offsetLeft ;
		    	if(tmpWidth<=0) tmpWidth=800;
		    	var leftPoint = ((bodyWidth / 2)+leftWidth) - (tmpWidth / 2);
		    	this.divs_content.style.left = leftPoint + 'px';
	    	}
	    	else
	    	{
	    		var brSize = this.__getBrowserSize();
				bodyWidth = brSize[0];
				bodyHeight = brSize[1];
				
				this.divs_content.style.left = (Math.ceil((bodyWidth - tmpWidth) / 3)-250) + 'px';;
	    	}
	    	this.divs_content.style.top = (Math.ceil((bodyHeight - tmpHeight) / 3) +  topOffset+100) + 'px';
	    	
	    	document.body.appendChild(this.divs_content);
	    	// setTimeout(this._resize(),1);
		}else
		{
			var topOffset = Math.max(document.body.scrollTop,document.documentElement.scrollTop);
			
			var bodyWidth, bodyHeight;	
			
			var tmpWidth = DHTMLSuite_progressBar_contentDiv.clientWidth?DHTMLSuite_progressBar_contentDiv.clientWidth:DHTMLSuite_progressBar_contentDiv.offsetWidth;	
	    	var tmpHeight = DHTMLSuite_progressBar_contentDiv.clientHeight?DHTMLSuite_progressBar_contentDiv.clientHeight:DHTMLSuite_progressBar_contentDiv.offsetHeight;
	    	
	    	var container_ID=document.getElementById("container_ID");
	    	if(container_ID!=null)
	    	{
	    		var brSize = this.getBrowserSize();
				bodyWidth = brSize[0];
				bodyHeight = brSize[1];
				
	    		var leftWidth=document.getElementById("container_ID").offsetLeft ;
		    	if(tmpWidth<=0) tmpWidth=100;
		    	var leftPoint = ((bodyWidth / 2)+leftWidth) - (tmpWidth / 2);
		    	
		    	// Setting width and height of left transparent div
		    	document.getElementById("DHTMLSuite_progressBar_contentDiv").style.left =leftPoint + 'px';
	    	}
	    	else
	    	{
	    		var brSize = this.__getBrowserSize();
				bodyWidth = brSize[0];
				bodyHeight = brSize[1];
				
				document.getElementById("DHTMLSuite_progressBar_contentDiv").style.left = Math.ceil((bodyWidth - tmpWidth) / 2) + 'px';
	    	}
	    	document.getElementById("DHTMLSuite_progressBar_contentDiv").style.top = (Math.ceil((bodyHeight - tmpHeight) / 2) +  topOffset) + 'px';

			document.getElementById("DHTMLSuite_progressBar_divs_transparentDiv").style.left =0;
			document.getElementById("DHTMLSuite_progressBar_divs_transparentDiv").style.top =0;
			document.getElementById("DHTMLSuite_progressBar_divs_transparentDiv").style.width=document.body.scrollWidth;
			document.getElementById("DHTMLSuite_progressBar_divs_transparentDiv").style.height=document.body.scrollHeight;
			document.getElementById("DHTMLSuite_progressBar_divs_transparentDiv").style.display='block';
			document.getElementById("DHTMLSuite_progressBar_contentDiv").style.display='block';
		}
	}
	this._hideDiv = function()
	{
		try{
			this.divs_transparentDiv.style.display="none";
			this.divs_content.style.display="none";
		}catch(e)
		{
			
		}
		try{
		document.getElementById("DHTMLSuite_progressBar_divs_transparentDiv").style.display="none";
		document.getElementById("DHTMLSuite_progressBar_contentDiv").style.display="none";
		}catch(e)
		{
			
		}
	}
	this._resize = function()
	{
		var st = Math.max(document.body.scrollTop,document.documentElement.scrollTop);
   		var sl = Math.max(document.body.scrollLeft,document.documentElement.scrollLeft);
   		// alert('st='+st + '\nsl=' +sl)
   		this.divs_content.style.top=200+st;
	    this.divs_content.style.left=430 + sl;
		window.scrollTo(sl,st);
		setTimeout('window.scrollTo(' + sl + ',' + st + ');',10);
	}
	this.__getBrowserSize = function()
	{
    	// var bodyWidth = document.documentElement.clientWidth;
    	// var bodyHeight = document.documentElement.clientHeight;
		var bodyWidth, bodyHeight; 
		if (self.innerHeight){ // all except Explorer
		   bodyWidth = self.innerWidth; 
		   bodyHeight = self.innerHeight; 
		}  else if (document.documentElement && document.documentElement.clientHeight) {
		   // Explorer 6 Strict Mode
		   bodyWidth = document.documentElement.clientWidth; 
		   bodyHeight = document.documentElement.clientHeight; 
		} else if (document.body) {// other Explorers
		   bodyWidth = document.body.clientWidth; 
		   bodyHeight = document.body.clientHeight; 
		} 
		return [bodyWidth,bodyHeight];		
	}
	this.getBrowserSize = function() {
		var bodyWidth, bodyHeight;

		bodyWidth = document.getElementById("container_ID").offsetWidth ;
		if (self.innerHeight){ // all except Explorer
			   bodyHeight = self.innerHeight; 
			}  else if (document.documentElement && document.documentElement.clientHeight) {
			   // Explorer 6 Strict Mode
			   bodyHeight = document.documentElement.clientHeight; 
			} else if (document.body) {// other Explorers
			   bodyHeight = document.body.clientHeight; 
			} 
		return [bodyWidth, bodyHeight];
	}
}
var commonFileUploadDivID;
function commonDeleteFile(row,key,isSavedFile,wCONTEXT,divID) {
	commonFileUploadDivID=divID;
	var url='';
	if(isSavedFile==1) {
		url=wCONTEXT+"/manageCommonFileUploadIntermediate.do?action=ajaxDeleteSavedFile&row="+row+"&key="+key;
	}else{
		url=wCONTEXT+"/manageCommonFileUploadIntermediate.do?action=ajaxDeleteTempUplodedFile&row="+row+"&key="+key;
	}
	ajax_loadContent(url,'',callBackFromCommonDeleteFile);
}
function callBackFromCommonDeleteFile()
{
	document.getElementById(commonFileUploadDivID).innerHTML=xmlHttp.responseText;
}
function AjaxThreadForHtmlResponse()
{
	this.url;
	this.requestQueue;
	this.putData=function(uniqHtmlID,queryStringOrData)
 	{
		if (typeof(this.requestQueue)=='undefined') 
		{
			this.requestQueue=new Array();			
		}
		else
		{
			if(typeof(this.requestQueue[uniqHtmlID])!='undefined')
			{
				alert("Rejected ::"+uniqHtmlID+" :: as is "+typeof(this.requestQueue[uniqHtmlID]));
				return;
			}
		}
		
		if(window.ActiveXObject) 
		{
			this.requestQueue[uniqHtmlID]=new ActiveXObject("Microsoft.XMLHTTP");			
		}
		else if(window.XMLHttpRequest) 
		{
			this.requestQueue[uniqHtmlID]=new XMLHttpRequest();			
		}
		else 
		{
			alert("Browser do not support req[]");
			return false;
		}
		
		this.requestQueue[uniqHtmlID].onreadystatechange=threadEvalResponseCallBack;
 		this.requestQueue[uniqHtmlID].open("POST",this.url,true);
		this.requestQueue[uniqHtmlID].setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
 		this.requestQueue[uniqHtmlID].send(queryStringOrData); 		
	}
}
function threadEvalResponseCallBack()
{
	if(typeof(ajaxThreadForHtmlResponse.requestQueue)=='object')
	{
		for(var elementid in ajaxThreadForHtmlResponse.requestQueue) 		
		{
			if(typeof(ajaxThreadForHtmlResponse.requestQueue[elementid])=='object')
			{
				if(ajaxThreadForHtmlResponse.requestQueue[elementid].readyState==4)
				{
					if(ajaxThreadForHtmlResponse.requestQueue[elementid].status == 200) 
					{
						try
						{
							requestdata=(ajaxThreadForHtmlResponse.requestQueue[elementid].responseText);							
							document.getElementById(elementid).innerHTML=requestdata;
							delete ajaxThreadForHtmlResponse.requestQueue[elementid];
						}catch(Ethen)
						{
							delete ajaxThreadForHtmlResponse.requestQueue[elementid];
							alert("There was a problem retrieving the XML data:\n");
						}
					}
					else 
					{	alert("1:There was a problem retrieving the XML data:\n"+t.requestQueue[elementid].statusText);
						delete ajaxThreadForHtmlResponse.requestQueue[elementid];
					}
				}
			}
		}
	}
}
function clearFilesFromSession(actionBasePath,key)
{
	var url=actionBasePath+"/manageAjaxRFQFileSpecification.do?";	
	var queryString="action=ajaxClearFilesFromSession";
	queryString+="&key="+key;
	xmlHttp=GetXmlHttpObject(tempHandlerForDoNothing)
	xmlHttp.open("POST", url , true)
   	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xmlHttp.send(queryString);
}
function tempHandlerForDoNothing()
{
}
// Variables for Ajax Error Log
var ajaxErrProjectID=0;
var ajaxErrCompanyUserID=0;
var ajaxErrParticipantID=0;
var CONTEXT="/esourcingWeb";

function logAjaxBidderException(message)
{
	// if(ajaxErrProjectID==0) alert("ajaxErrProjectID is zero");
	// if(ajaxErrCompanyUserID==0) alert("ajaxErrCompanyUserID is zero");
	// alert("Log:"+message);
	logAjaxException("mode=2&ajaxErrProjectID="+ajaxErrProjectID+"&ajaxErrCompanyUserID="+ajaxErrCompanyUserID+"&ajaxErrParticipantID="+ajaxErrParticipantID+"&jem="+message);
}
function logAjaxException(message)
{
	var url=CONTEXT+"/servlet/AjaxExceptionLog?";
	var xmlHttp=GetXmlHttpObject(tempHandlerForDoNothing);
	xmlHttp.open("POST", url , true)
   	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
	xmlHttp.send(message);
}
/*
 * window.onerror = function (err, file, line) { // if(ajaxErrProjectID==0)
 * alert("ajaxErrProjectID is zero"); // if(ajaxErrCompanyUserID==0)
 * alert("ajaxErrCompanyUserID is zero");
 * 
 * var message='Err:[' + err + ']In file:[' + file + ']At line:[' + line+']';
 * alert(message);
 * logAjaxException("mode=2&ajaxErrProjectID="+ajaxErrProjectID+"&ajaxErrCompanyUserID="+ajaxErrCompanyUserID+"&ajaxErrParticipantID="+ajaxErrParticipantID+"&jem="+encodeURIComponent(message)); //
 * alert('The following error occured: ' + err + '\n' +'In file: ' + file + //
 * '\n' +'At line: ' + line); throw err; return true; }
 */
function showConfirmationMessage_ajax(msg)
{
	showConfirmationMessage(msg);// need home.js
	
}
function showErrorMessage_ajax(msg)
{
	showErrorMessage(msg);// need home.js
}
function scrollToTop()
{
	$('.scrollup').click();
}