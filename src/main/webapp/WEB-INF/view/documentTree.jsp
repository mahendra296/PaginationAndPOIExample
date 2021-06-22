<%@page import="com.example.myapp.common.General"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="bean" uri="http://www.springframework.org/tags" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Insert title here</title>
<link href="css/tree.css" rel="stylesheet" type="text/css">
<script type="text/javascript" src="js/ajax.js"></script>
<script type="text/javascript" src="js/listFunction.js"></script>
<script type="text/javascript" src="js/popup.js"></script>
<script type="text/javascript" src="js/documentTree.js"></script>
<script type="text/javascript" src="js/jquery.min.js"></script>
<script type="text/javascript">
var imgPathWithTheme="<%=request.getContextPath()%>/img/";
var pleaseWaitVar="please Wait";
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
document_Tree.add(0,-1,'<b style=\'font-size: 14px;\'><h1>Document</h1></b>');
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