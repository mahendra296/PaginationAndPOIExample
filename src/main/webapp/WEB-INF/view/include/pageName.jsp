 <%
	String pgInfoData="";
	pgInfoData+="\n\n"+(this.getClass().getName()).replace("org.apache.jsp.","D:\\WS\\npp\\nppWeb\\WebContent\\").replaceAll("\\.","\\\\").replace("_jsp",".jsp");
	out.print("<input type='hidden' value='"+pgInfoData.trim()+"'/>");
%>