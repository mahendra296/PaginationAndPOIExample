<%@page import="com.example.myapp.common.General"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Insert title here</title>
<script type="text/javascript" src="js/ajax.js"></script>
<script type="text/javascript" src="js/listFunction.js"></script>
<script type="text/javascript">
var themePath="img/loading-bar.gif";
var pleaseWaitVar="please Wait";
function pageLoaded() 
{
	var totalRec = 0;
	var pageIndex = parseInt(window.document.forms[0].pageNo.value);
	var recordsPerPage = parseInt(window.document.forms[0].recordsPerPage.value);
	navigateAjax(null, null, pageIndex, totalRec, recordsPerPage, '0');
}
function getListAndAppend()
{
	var pageIndex=window.document.forms[0].pageNo.value;
	var recordsPerPage=window.document.forms[0].recordsPerPage.value;
	var orderBy=window.document.forms[0].orderBy.value;
	var orderDirection=window.document.forms[0].orderDirection.value;
	
	var url = "${pageContext.request.contextPath}/ajaxStudentList"; //&pageNo="+pageIndex+"&orderBy=0&orderDirection=0&recordsPerPage="+recordsPerPage;
	var nameValueCollectionObj = new NameValueCollection();
	nameValueCollectionObj.add("pageNo",pageIndex);
	nameValueCollectionObj.add("orderBy",orderBy);
	nameValueCollectionObj.add("orderDirection",orderDirection);
	nameValueCollectionObj.add("recordsPerPage",recordsPerPage);
	
	ajax_loadContent(url,nameValueCollectionObj,getListAndAppendCallback);
}
function getListAndAppendCallback()
{
	progressBarNavigation._hideDiv();
	var totalRecHiddenVar;
	var data;
	data=xmlHttp.responseText;
	var check=data.trim(); 
	var studentListViewVar=document.getElementById('studentListView');
	var pageIndex=window.document.forms[0].pageNo.value;
	
	studentListViewVar.innerHTML="";
	if(check!='404404')
	{
		studentListViewVar.innerHTML+=data;
		//$("#updating_bar").hide();
		//changeThreeDot();
	}
	else
	{
		//$("div#updating_bar").show();
		//$("#updating_bar").hide();
		 $("div#listing_auction_box").show();
	}	
	
	//initPopupOnLoad();
	
	totalRecHiddenVar=document.getElementById('totalRechiddenId').value;
	//loadDotDownMenu();
	//k3Clock();
	getListAndAppended(totalRecHiddenVar);
}
</script>
</head>
<body onload="pageLoaded();">
<form action="">


<%-- <input type="hidden" name="pageNo" value="<%=General.chkHTMLStr(request.getParameter("pageNo"))%>" />
<input type="hidden" name="recordsPerPage" value="<%=General.chkHTMLStr(request.getParameter("recordsPerPage"))%>" />
<input type="hidden" name="orderBy" value="<%=General.chkHTMLStr(request.getParameter("orderBy"))%>" />
<input type="hidden" name="orderDirection" value="<%=General.chkHTMLStr(request.getParameter("orderDirection"))%>" /> --%>
<div id="studentListView"></div>

<div id="navigationControlId"></div>
<input type="hidden" name="pageNo" value="${pageNo}" />
<input type="hidden" name="recordsPerPage" value="${recordsPerPage}" />
<input type="hidden" name="orderBy" value="${orderBy}" />
<input type="hidden" name="orderDirection" value="${orderDirection}" />

</form>
</body>
</html>