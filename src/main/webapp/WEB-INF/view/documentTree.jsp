<%@page import="com.example.myapp.common.General"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="bean" uri="http://www.springframework.org/tags" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Insert title here</title>
<link href="css/tree.css" rel="stylesheet" type="text/css">
<link href="css/common.css" rel="stylesheet" type="text/css">
<script type="text/javascript" src="js/ajax.js"></script>
<script type="text/javascript" src="js/listFunction.js"></script>
<script type="text/javascript" src="js/popup.js"></script>
<script type="text/javascript" src="js/documentTree.js"></script>
<script type="text/javascript" src="js/jquery.min.js"></script>
<script type="text/javascript">
var imgPathWithTheme="<%=request.getContextPath()%>/img/";
var pleaseWaitVar="please Wait";
var contextPath="/myapp";
function pageLoaded() 
{
	initPopupOnLoad();
}
function saveCategoryForRoot()
{		
	document.getElementById("data_commonPopup_detailDiv").innerHTML='<ul class="popup_form"><li><label><b>Folder Name</b> <div id="popup_form_right"><input type=text  name=folderOrDocName style=width:180px id=folderOrDocName maxlength=500  /></div></label></li></ul>';
	openCommonYNPopup(null);
	beforeOpenCommonPopup('Create Folder', null, '', "","saveCancelPopupButtonDiv",3);
}
function commSaveCancelPanSaveClick()
{
	if(commYNPan_actionId==3)
	{
	}
	saveCategory();
}
function saveCategory()
{
	/* if(window.document.forms[0].documentID.value>0)	
	{
		window.document.forms[0].action=contextPath+"/saveDocument";
		window.document.forms[0].submit();
	}
	else
	{
		window.document.forms[0].action=contextPath+"/saveDocument";
		window.document.forms[0].method="post";
		window.document.forms[0].submit();
	} */	
	nameValueCollection= new NameValueCollection();
	if(window.document.forms[0].documentID.value>0)	
	{
		if(window.document.forms[0].isSubcategory.value==1)
		{	
			nameValueCollection.add("documentID",window.document.forms[0].documentID.value);
			nameValueCollection.add("folderOrDocName",document.getElementById("folderOrDocName").value);
			window.document.forms[0].documentID.value=0;
			window.document.forms[0].isSubcategory.value=0;
			ajax_loadContent(contextPath+"/saveSubDocument?",nameValueCollection,saveCategoryResponse);
		}
		else
		{
			nameValueCollection.add("documentID",window.document.forms[0].documentID.value);
			nameValueCollection.add("folderOrDocName",document.getElementById("folderOrDocName").value);
			nameValueCollection.add("oldFolderOrDocName",document.getElementById("oldFolderOrDocNameID").value);
			window.document.forms[0].documentID.value=0;
			window.document.forms[0].isSubcategory.value=0;
			commonPopup_messageDiv.display="none";
			ajax_loadContent(contextPath+"/updateSubDocument?",nameValueCollection,saveCategoryResponse);
		}
	}
	else
	{  
		nameValueCollection.add("folderOrDocName",document.getElementById("folderOrDocName").value);
		window.document.forms[0].documentID.value=0;
		window.document.forms[0].isFolderOrDocument.value=0;
		ajax_loadContent(contextPath+"/saveDocument?",nameValueCollection,saveCategoryResponse);
	}
}
function saveCategoryResponse()
{
	if(xmlHttp.readyState==4)
	{	
		if(xmlHttp.status==200)
		{	
			if(errorHandling(xmlHttp.responseText))
			{	
				refreshTree();
				popupBoxClose();
			}	
		}
	}
}
function refreshTree()
{
	document_Tree.clearNodesForReferesh();
	treeView.innerHTML=document_Tree.toStringForDocumentBank(); 
	document.getElementById("folderOrDocName").value="";
}
function errorHandling(responseText)
{
	var xmlReturn=responseText.split("<sep>");
	eval(xmlReturn[1]);
	if(xmlReturn[0]=="0")
	{		
		if(document.getElementById("error_box")!=null)
			document.getElementById("error_box").style.display="none";				
		return true;
	}	
	else if(xmlReturn[0]=="1")
	{
		//validation error type is set to 2			
		if(document.getElementById("error_box")!=null) 
		{
			document.getElementById("error_box").innerHTML="Folder Not Created";
			document.getElementById("error_box").style.display="block";
		}
		return false;	
	}
	else if(xmlReturn[0]=="2")
	{
		//validation error type is set to 2
		if(document.getElementById("error_box")!=null) 
		{
			document.getElementById("error_box").innerHTML="Folder All Ready Exist";
			document.getElementById("error_box").style.display="block";
		}
		return false;	
	}
	else if(objAjaxXMLReturn.errorType=="3")
	{
		//bll Error
		if(document.getElementById("error_box")!=null) 
		{ 
			document.getElementById("error_box").innerHTML=objAjaxXMLReturn.errorMessage;
			document.getElementById("error_box").style.cssText="width:558px;";
			document.getElementById("error_box").style.display="block";
		}
		return false;	
	}
	else if(objAjaxXMLReturn.errorType=="4")
	{
		//for Eval
		if(document.getElementById("error_box")!=null) 
		{
			document.getElementById("error_box").innerHTML=objAjaxXMLReturn.errorMessage;
			document.getElementById("error_box").style.cssText="width:558px;";
			document.getElementById("error_box").style.display="block";
		}
		return false;	
	}
			
}
function addSubDocument(documentID,documentName)
{
	window.document.forms[0].documentID.value=documentID;
	window.document.forms[0].isSubcategory.value=1;
	document.getElementById("data_commonPopup_detailDiv").innerHTML='<ul class="popup_form"><li><label>Folder Name</b> <div id="popup_form_right"><input type=text  name=folderOrDocName style=width:180px id=folderOrDocName maxlength=500  /></div></label></li></ul>';
	openCommonYNPopup(null);
    beforeOpenCommonPopup('Add SubFolder', null, '', "","saveCancelPopupButtonDiv",2);

}
document_Tree=new document_dTree('document_Tree')
document_Tree.icon = 
{        
	root		: null,           
	folder		: null,             
	folderOpen	:  null,                 
	node		: null, 
	empty		: 'img/empty.gif',      
	join		: null,       
	joinBottom	: null,                 
	plus		: 'img/closeFolder.png',       
	plusBottom	: 'img/closeFolder.png',                
	minus		: 'img/openFolder.png',      
	minusBottom	: 'img/openFolder.png',                
	nlPlus		: 'img/plus.gif',       
	nlMinus		: 'img/minus.gif'
		
};                                                                                                             
document_Tree.add(0,-1,'<b style=\"font-size: 14px;\">Document</b>');
</script>
</head>
<body onload="pageLoaded();">
${jScript}
<div class="container-fluid">
<hr>
<form action="">
	<input type="hidden" name="documentID" value="0">
	<input type="hidden" name="isSubcategory" value="0">
	<input type="hidden" name="isFolderOrDocument" value="0">
	<input type="hidden" name="oldFolderOrDocName" id="oldFolderOrDocNameID">
	<div style="padding: 20px 0px 0px 13px; text-decoration: none; border-bottom: none; border-left: none; border-right: none; margin-top: 0px !important;" class="dash">
		<a href="javascript: document_Tree.openAll();">
			<bean:message code="ExpandAll" />
		</a> | 
		<a href="javascript: document_Tree.closeAll();">
			<bean:message code="CollapseAll" />
		</a>
	</div>
	<br>

	<div class="dash" style="padding: 0px 0px 0px 13px;" >
		<a href="#" onclick="saveCategoryForRoot()" title="NewFolder"><b><img src="img/addDocBank.png"></b></a> 
		<a href="#" onclick="saveCategoryForRoot()" title="NewFolder"><b> <bean:message code="NewFolder" /></b></a>
	</div>
	<br />
	<br />					
	<div id="treeView" style="height:  400px;overflow: auto;" class="document_dTree">
		<script type="text/javascript">
			document.write(document_Tree.toStringForDocumentBank());
		</script>
	</div>
	<!-- <div id="myModal" class="modal">
  		<div class="modal-content">
    		<span class="close" onclick="popupClose();return false;">&times;</span>
    		<p>Enter Folder Name : </p>
    		<input type="text"  name="folderOrDocName" style="width:180px" id="folderOrDocName" maxlength="500"  />
  		</div>
	</div> -->
</form>
</div>
<%@include file="include/popup.jsp" %>
</body>
</html>