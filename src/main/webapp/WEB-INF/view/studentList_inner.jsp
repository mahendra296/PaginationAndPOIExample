<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="sForm" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="sTag" uri="http://www.springframework.org/tags" %>
<table id="doctor" class="table table-striped">
	<thead>
    	<tr>
        	<th><sTag:message code="Name"/></th>
            <th><sTag:message code="Cast"/></th>
		</tr>
	</thead>	
<c:if test="${not empty listHuman}">
<tbody>
<c:forEach var="list" items="${listHuman}">
	<tr>
       	<td>${list.name}</td>
        <td>${list.cast}</td>
	</tr>
</c:forEach>
</c:if>
<c:if test="${empty listHuman}">
	<tr>
       	<td colspan="2"><sTag:message code="NoRecordFound"/></td>
	</tr>
</c:if>
</tbody>
</table>
<input type="hidden" name="total_Req" id="totalRechiddenId" value="${total_Req}">
