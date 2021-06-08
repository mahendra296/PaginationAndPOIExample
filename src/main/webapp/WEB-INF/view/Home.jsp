<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="sForm" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="sTag" uri="http://www.springframework.org/tags" %>
<!DOCTYPE html>
<html>
	<head>
		<%@include file="include/Head.jsp" %>
		<title><sTag:message code="Home"/></title>
		<link href="css/Common.css" rel="stylesheet" type="text/css">
		<sTag:eval expression="@environment.getProperty('default.page.size')" var="pageSize"></sTag:eval>
	</head>
	<body>
		<div class="container-fluid">
			<div>
				<c:if test="${not empty successMsg}">
					<h3 class="successClass">${successMsg}</h3>
				</c:if>
				<c:if test="${not empty errMsg}">
					<h3 class="errClass">${errMsg}</h3>
				</c:if>
			</div>
			<div class="row">
				
				<div class="col-4">
					<a href="${pageContext.request.contextPath}/showaddhuman" class="btn btn-primary btn-block">Add Student</a>					
				</div>
				<div class="col-4">
					<a href="${pageContext.request.contextPath}/studentList" class="btn btn-primary btn-block">Student List</a>
				</div>
				<div class="col-4">
					<a href="${pageContext.request.contextPath}/downloadExcel" class="btn btn-primary btn-block">download Excel</a>	
				</div>
			</div>
			<div>
				<div>
					<h2><sTag:message code="TotalRecords"/> :: ${totalItems}</h2>
				</div>
				<c:choose>
					<c:when test="${not empty listHuman}">
						<table class="table">
							<tr>
								<th><sTag:message code="Name"/></th>
								<th><sTag:message code="Cast"/></th>
								<th><sTag:message code="Action"/></th>
							</tr>
							<c:forEach items="${listHuman}" var="human">
								<tr>
									<td>${human.name}</td>
									<td>${human.cast}</td>
									<td>
										<a href="${pageContext.request.contextPath}/updatehuman/${human.humanId}" class="btn btn-primary">Update</a>
										<a href="${pageContext.request.contextPath}/deletehuman/${human.humanId}" class="btn btn-danger">Delete</a>
									</td>
								</tr>
							</c:forEach>
						</table>
					</c:when>
					<c:otherwise>
						<h3 class="col-md-4 offset-4 mt-4"><sTag:message code="NoRecordFound"/></h3>
					</c:otherwise>
				</c:choose>
			</div>
			<div id="paginateDiv"></div>
		</div>
	</body>
	<%@include file="include/pageName.jsp" %>
	<script type="text/javascript">
	$(document).ready(function(){
		var totalPages = Math.ceil(${totalItems}/${pageSize});
		if(totalPages > 1){
			$('#paginateDiv').append("<ul id='appendLine' class='pagination'>");
			for(var i=1; i<=totalPages; i++){
				if(i == ${currentPage}){
					$('#appendLine').append("<li class='page-item active'><a class='page-link' href='#'>" + i + "</a></li>");
				} else {
					$('#appendLine').append("<li><a class='page-link' href='${pageContext.request.contextPath}/page/" + i + "'" + ">" + i + "</a></li>");
				}
			}
			$('#paginateDiv').append("</ul>");
		}
	});
	</script>
</html>