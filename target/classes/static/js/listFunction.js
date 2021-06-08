var confirmationMsg = '';
var queryString = '';
var confirmSucessMsg = '';

var linkObjPre = null;
var linkObjRPPPre = null;
var prePageNo = 1;
var progressBarNavigation;

var tmp_pageNo = 0;
var tmp_totalRecord = 0;
var tmp_recordsPerPage = 0;
var tmp_navigationVariableChar = '0';
var showingText='Showing';

function navigateAjax(linkObj, linkObjRPP, pageNo, totalRecord, recordsPerPage,
		navigationVariableChar) {
	/*
	 * pageNo=parseInt(pageNo); totalRecord=parseInt(totalRecord);
	 * recordsPerPage=parseInt(recordsPerPage);
	 */
	// //////page no/////////
	window.scrollTo(0,0);
	if (pageNo == 0)// next page
	{
		var pageNo_tmp = prePageNo + 1;
		if (pageNo_tmp > totalRecord) {
			return;
		}
		pageNo = pageNo_tmp;
	} else if (pageNo == -1)// last page
	{
		var total_page = Math.ceil(totalRecord / recordsPerPage);
		pageNo = total_page;
	} else if (pageNo == -2)// previous page
	{
		var pageNo_tmp = prePageNo - 1;
		if (pageNo_tmp <= 0) {
			return;
		}
		pageNo = pageNo_tmp;
	} else if (pageNo == -3)// Sort List
	{
		pageNo = pageNo_tmp;
	}

	

	if (navigationVariableChar == null) {
		navigationVariableChar = '0'
	} else if (navigationVariableChar == undefined) {
		navigationVariableChar = '0'
	}

	if (pageNo > 0) {
		if (navigationVariableChar == 1) { // case A
			window.document.forms[0].pageNo_A.value = pageNo;
			window.document.forms[0].recordsPerPage_A.value = recordsPerPage;
		} else if (navigationVariableChar == 2) { // case B
			window.document.forms[0].pageNo_B.value = pageNo;
			window.document.forms[0].recordsPerPage_B.value = recordsPerPage;
		} else {
			window.document.forms[0].pageNo.value = pageNo;
			window.document.forms[0].recordsPerPage.value = recordsPerPage;
		}
		prePageNo = pageNo;
	}

	// if success
	{

		// window.document.forms[0].submit();
		progressBarNavigation = new DHTML_ProgressBar();
		progressBarNavigation._createDiv();
		tmp_pageNo = pageNo;
		tmp_totalRecord = totalRecord;
		tmp_recordsPerPage = recordsPerPage;
		tmp_navigationVariableChar = navigationVariableChar;
		getListAndAppend();

		// showNavigation(tmp_pageNo, tmp_totalRecord, tmp_recordsPerPage,
		// tmp_navigationVariableChar);
	}
	var elms = document.querySelectorAll("[id='test_scriptrequisition']");
	if (elms != null && elms != undefined && elms != 'undefined') {
		for (var i = 0; i < elms.length; i++) {
			var str = elms[i].innerHTML;
			var obj = document.getElementById("menu" + str);
			if (obj != null) {
				(function($) {
					$(document).ready(function() {
						$('#menu' + str).dropit_requisition();
					});
				})(window.jQuery)

				obj.click();
			}
		}
	}

}
function navigateWOShowing(linkObj, linkObjRPP, pageNo, totalRecord,
		recordsPerPage, navigationVariableChar) {
	/*
	 * pageNo=parseInt(pageNo); totalRecord=parseInt(totalRecord);
	 * recordsPerPage=parseInt(recordsPerPage);
	 */
	// //////page no/////////
	if (pageNo == 0)// next page
	{
		var pageNo_tmp = prePageNo + 1;
		if (pageNo_tmp > totalRecord) {
			return;
		}
		pageNo = pageNo_tmp;
	} else if (pageNo == -1)// last page
	{
		var total_page = Math.ceil(totalRecord / recordsPerPage);
		pageNo = total_page;
	} else if (pageNo == -2)// previous page
	{
		var pageNo_tmp = prePageNo - 1;
		if (pageNo_tmp <= 0) {
			return;
		}
		pageNo = pageNo_tmp;
	} else if (pageNo == -3)// Sort List
	{
		pageNo = pageNo_tmp;
	}

	if (navigationVariableChar == null) {
		navigationVariableChar = '0'
	} else if (navigationVariableChar == undefined) {
		navigationVariableChar = '0'
	}

	if (pageNo > 0) {

		// window.document.forms[0].pageNo.value = pageNo;
		// window.document.forms[0].recordsPerPage.value = recordsPerPage;
		document.getElementById("pageNoId").value = pageNo;
		document.getElementById("recordsPerPageId").value = recordsPerPage;

		prePageNo = pageNo;
	}

	// if success
	{

		// window.document.forms[0].submit();
		/*
		 * progressBarNavigation = new DHTML_ProgressBar();
		 * progressBarNavigation._createDiv();
		 */
		tmp_pageNo = pageNo;
		tmp_totalRecord = totalRecord;
		tmp_recordsPerPage = recordsPerPage;
		tmp_navigationVariableChar = navigationVariableChar;
		getListAndAppend();

		// showNavigation(tmp_pageNo, tmp_totalRecord, tmp_recordsPerPage,
		// tmp_navigationVariableChar);
	}

}
function navigateAjaxOnlySort(orderBy, orderDirection, navigationVariableChar) {

	if (navigationVariableChar == null) {
		navigationVariableChar = '0'
	} else if (navigationVariableChar == undefined) {
		navigationVariableChar = '0'
	}

	if (navigationVariableChar == 1) { // case A
		window.document.forms[0].orderBy_A.value = orderBy;
		window.document.forms[0].orderDirection_A.value = orderDirection;
	} else if (navigationVariableChar == 2) { // case B
		window.document.forms[0].orderBy_B.value = orderBy;
		window.document.forms[0].orderDirection_B.value = orderDirection;
	} else {
		window.document.forms[0].orderBy.value = orderBy;
		window.document.forms[0].orderDirection.value = orderDirection;
	}

	// if success
	{

		progressBarNavigation = new DHTML_ProgressBar();
		progressBarNavigation._createDiv();

		getListAndAppend();

	}

}

function getListAndAppended(totalRecord) {
	showNavigation(tmp_pageNo, totalRecord, tmp_recordsPerPage,
			tmp_navigationVariableChar);
}
function getListAndAppendedWithoutShowing(totalRecord) {
	showNavigationWithoutShowing(tmp_pageNo, totalRecord, tmp_recordsPerPage,
			tmp_navigationVariableChar);
}
function showNavigationWithoutShowing(pageNo, totalRecord, recordsPerPage,
		navigationVariableChar) {
	var total_page = Math.ceil(totalRecord / recordsPerPage);
	var onclickSt = " ONCLICK=\"navigateWOShowing(null, this, " + pageNo + ", "
			+ totalRecord + ", " + recordsPerPage + ","
			+ navigationVariableChar + ");return false;\"";

	var data = "    <div class=\"page-nav page-nav-right\">";
	var space = "";
	var rpp = " <div class=\"page-nav page-nav-left\"> ";
	// if (total_page > 1)
	{/*
		 * 
		 * rpp += "Showing"; if (recordsPerPage == 10) { rpp += space + "<span
		 * class=\"current\">" + 10 + "</span>"; } else { onclickSt = "
		 * ONCLICK=\"navigateAjax(null, this, " + 1 + ", " + totalRecord + ", " +
		 * 10 + "," + navigationVariableChar + ");return false;\""; rpp += space + "<a
		 * href=# " + onclickSt + ">" + 10 + "</a>"; } if (recordsPerPage ==
		 * 25) { rpp += space + "<span class=\"current\">" + 25 + "</span>"; }
		 * else { onclickSt = " ONCLICK=\"navigateAjax(null, this, " + 1 + ", " +
		 * totalRecord + ", " + 25 + "," + navigationVariableChar + ");return
		 * false;\""; rpp += space + "<a href=# " + onclickSt + ">" + 25 + "</a>"; }
		 * if (recordsPerPage == 50) { rpp += space + "<span
		 * class=\"current\">" + 50 + "</span>"; } else { onclickSt = "
		 * ONCLICK=\"navigateAjax(null, this, " + 1 + ", " + totalRecord + ", " +
		 * 50 + "," + navigationVariableChar + ");return false;\""; rpp += space + "<a
		 * href=# " + onclickSt + ">" + 50 + "</a>"; } if (recordsPerPage ==
		 * 100) {
		 * 
		 * rpp += space + "<span class=\"current\">" + 100 + "</span>"; } else {
		 * onclickSt = " ONCLICK=\"navigateAjax(null, this, " + 1 + ", " +
		 * totalRecord + ", " + 100 + "," + navigationVariableChar + ");return
		 * false;\""; rpp += space + "<a href=# " + onclickSt + ">" + 100 + "</a>"; }
		 */
	}
	rpp += space + "</div>";

	if (total_page > 1 && pageNo > 1) {
		onclickSt = " ONCLICK=\"navigateWOShowing(this, null, " + 1 + ", "
				+ totalRecord + ", " + recordsPerPage + ","
				+ navigationVariableChar + ");return false;\"";

		data += space + "<a href=# " + onclickSt + ">" + "First" + "</a>";
		onclickSt = " ONCLICK=\"navigateWOShowing(this, null, " + -2 + ", "
				+ totalRecord + ", " + recordsPerPage + ","
				+ navigationVariableChar + ");return false;\"";
		data += space + "<a href=# " + onclickSt + ">" + "Previous" + "</a>";
	}
	{
		var startPage = 0;
		var upto = 0;

		var pageNo_tmp = pageNo;
		upto = pageNo_tmp + 4;
		startPage = pageNo_tmp;

		if (upto > total_page) {
			upto = total_page;
		}

		if (startPage == total_page) {
			upto = total_page;
			startPage = upto - 4;
		}
		if (startPage <= 0) {
			startPage = 1;
		}
		if (startPage != 1 && (upto - startPage) < 4) {

			startPage = (upto - 4);

			if (startPage <= 0) {
				startPage = 1;
			}
		}
		if (total_page >= 1) {
			while (startPage <= upto) {
				if (startPage == pageNo_tmp) {
					data += "<span class=\"current\">" + pageNo_tmp + "</span>";
				} else {
					onclickSt = " ONCLICK=\"navigateWOShowing(this, null, "
							+ startPage + ", " + totalRecord + ", "
							+ recordsPerPage + "," + navigationVariableChar
							+ ");return false;\"";

					data += "<a href=# " + onclickSt + ">" + startPage + "</a>";
				}
				startPage = startPage + 1;
			}
		}
	}
	{
		if (total_page > 1 && total_page != pageNo) {
			// /next
			onclickSt = " ONCLICK=\"navigateWOShowing(null, null, " + 0 + ", "
					+ totalRecord + ", " + recordsPerPage + ","
					+ navigationVariableChar + ");return false;\"";

			data += "<a href=# " + onclickSt + ">Next</a>";
			// /last
			onclickSt = " ONCLICK=\"navigateWOShowing(null, null, " + -1 + ", "
					+ totalRecord + ", " + recordsPerPage + ","
					+ navigationVariableChar + ");return false;\"";

			data += "<a href=# " + onclickSt + ">Last</a>";

		}
	}
	data += "</div>";
	/*
	 * data+="[tr=" + totalRecord + "][rpp=" + recordsPerPage + "][pno=" +
	 * pageNo + "][total_page=" + total_page + "][startPage=" + startPage +
	 * "][upto=" + upto + "]";
	 */
	data += rpp;
	document.getElementById("navigationControlId").innerHTML = data;
	// additional set values
	// document.getElementById("
	setNavigationParameterForAjaxWOShowing(window.document.forms[0], pageNo,
			totalRecord, recordsPerPage, navigationVariableChar);
}
function setNavigationParameterForAjaxWOShowing(formObj, pageNo, totalRecord,
		recordsPerPage, navigationVariableChar) {

	// formObj.pageNo.value = pageNo;
	// formObj.recordsPerPage.value = recordsPerPage;
	document.getElementById("pageNoId").value = pageNo;
	document.getElementById("recordsPerPageId").value = recordsPerPage;

	/*
	 * if (navigationVariableChar == '0') { formObj.pageNo.value = pageNo;
	 * formObj.recordsPerPage.value = recordsPerPage; } else if
	 * (navigationVariableChar == '1') { formObj.pageNo_A.value = pageNo;
	 * formObj.recordsPerPage_A.value = recordsPerPage; } else if
	 * (navigationVariableChar == '2') { formObj.pageNo_B.value = pageNo;
	 * formObj.recordsPerPage_B.value = recordsPerPage; }
	 */
}
function getListAndAppendedWithoutShowing1(totalRecord) {
	showNavigationWithoutShowing1(tmp_pageNo, totalRecord, tmp_recordsPerPage,
			tmp_navigationVariableChar);
}
function showNavigationWithoutShowing1(pageNo, totalRecord, recordsPerPage,
		navigationVariableChar) {
	var total_page = Math.ceil(totalRecord / recordsPerPage);
	var onclickSt = " ONCLICK=\"navigateAjax(null, this, " + pageNo + ", "
			+ totalRecord + ", " + recordsPerPage + ","
			+ navigationVariableChar + ");return false;\"";

	var data = "    <div class=\"page-nav page-nav-right\">";
	var space = "";
	var rpp = " <div class=\"page-nav page-nav-left\"> ";
	// if (total_page > 1)
	{/*
		 * 
		 * rpp += "Showing"; if (recordsPerPage == 10) { rpp += space + "<span
		 * class=\"current\">" + 10 + "</span>"; } else { onclickSt = "
		 * ONCLICK=\"navigateAjax(null, this, " + 1 + ", " + totalRecord + ", " +
		 * 10 + "," + navigationVariableChar + ");return false;\""; rpp += space + "<a
		 * href=# " + onclickSt + ">" + 10 + "</a>"; } if (recordsPerPage ==
		 * 25) { rpp += space + "<span class=\"current\">" + 25 + "</span>"; }
		 * else { onclickSt = " ONCLICK=\"navigateAjax(null, this, " + 1 + ", " +
		 * totalRecord + ", " + 25 + "," + navigationVariableChar + ");return
		 * false;\""; rpp += space + "<a href=# " + onclickSt + ">" + 25 + "</a>"; }
		 * if (recordsPerPage == 50) { rpp += space + "<span
		 * class=\"current\">" + 50 + "</span>"; } else { onclickSt = "
		 * ONCLICK=\"navigateAjax(null, this, " + 1 + ", " + totalRecord + ", " +
		 * 50 + "," + navigationVariableChar + ");return false;\""; rpp += space + "<a
		 * href=# " + onclickSt + ">" + 50 + "</a>"; } if (recordsPerPage ==
		 * 100) {
		 * 
		 * rpp += space + "<span class=\"current\">" + 100 + "</span>"; } else {
		 * onclickSt = " ONCLICK=\"navigateAjax(null, this, " + 1 + ", " +
		 * totalRecord + ", " + 100 + "," + navigationVariableChar + ");return
		 * false;\""; rpp += space + "<a href=# " + onclickSt + ">" + 100 + "</a>"; }
		 */
	}
	rpp += space + "</div>";

	if (total_page > 1 && pageNo > 1) {
		onclickSt = " ONCLICK=\"navigateAjax(this, null, " + 1 + ", "
				+ totalRecord + ", " + recordsPerPage + ","
				+ navigationVariableChar + ");return false;\"";

		data += space + "<a href=# " + onclickSt + ">" + "First" + "</a>";
		onclickSt = " ONCLICK=\"navigateAjax(this, null, " + -2 + ", "
				+ totalRecord + ", " + recordsPerPage + ","
				+ navigationVariableChar + ");return false;\"";
		data += space + "<a href=# " + onclickSt + ">" + "Previous" + "</a>";
	}
	{
		var startPage = 0;
		var upto = 0;

		var pageNo_tmp = pageNo;
		upto = pageNo_tmp + 4;
		startPage = pageNo_tmp;

		if (upto > total_page) {
			upto = total_page;
		}

		if (startPage == total_page) {
			upto = total_page;
			startPage = upto - 4;
		}
		if (startPage <= 0) {
			startPage = 1;
		}
		if (startPage != 1 && (upto - startPage) < 4) {

			startPage = (upto - 4);

			if (startPage <= 0) {
				startPage = 1;
			}
		}
		if (total_page >= 1) {
			while (startPage <= upto) {
				if (startPage == pageNo_tmp) {
					data += "<span class=\"current\">" + pageNo_tmp + "</span>";
				} else {
					onclickSt = " ONCLICK=\"navigateAjax(this, null, "
							+ startPage + ", " + totalRecord + ", "
							+ recordsPerPage + "," + navigationVariableChar
							+ ");return false;\"";

					data += "<a href=# " + onclickSt + ">" + startPage + "</a>";
				}
				startPage = startPage + 1;
			}
		}
	}
	{
		if (total_page > 1 && total_page != pageNo) {
			// /next
			onclickSt = " ONCLICK=\"navigateAjax(null, null, " + 0 + ", "
					+ totalRecord + ", " + recordsPerPage + ","
					+ navigationVariableChar + ");return false;\"";

			data += "<a href=# " + onclickSt + ">Next</a>";
			// /last
			onclickSt = " ONCLICK=\"navigateAjax(null, null, " + -1 + ", "
					+ totalRecord + ", " + recordsPerPage + ","
					+ navigationVariableChar + ");return false;\"";

			data += "<a href=# " + onclickSt + ">Last</a>";

		}
	}
	data += "</div>";
	/*
	 * data+="[tr=" + totalRecord + "][rpp=" + recordsPerPage + "][pno=" +
	 * pageNo + "][total_page=" + total_page + "][startPage=" + startPage +
	 * "][upto=" + upto + "]";
	 */
	data += rpp;
	document.getElementById("navigationControlId").innerHTML = data;
	// additional set values
	// document.getElementById("
	setNavigationParameterForAjax(window.document.forms[0], pageNo,
			totalRecord, recordsPerPage, navigationVariableChar);
}
function showNavigation(pageNo, totalRecord, recordsPerPage,
		navigationVariableChar) {
	var total_page = Math.ceil(totalRecord / recordsPerPage);
	var onclickSt = " ONCLICK=\"navigateAjax(null, this, " + pageNo + ", "
			+ totalRecord + ", " + recordsPerPage + ","
			+ navigationVariableChar + ");return false;\"";

	var data = "    <div class=\"page-nav page-nav-left\">";
	var space = "";
	var rpp = " <div class=\"page-nav page-nav-right\"> ";
	// if (total_page > 1)
	{

		// alert(showingText);
		rpp += showingText;

		if (recordsPerPage == 10) {
			rpp += space + "<span class=\"current\">" + 10 + "</span>";
		} else {
			onclickSt = " ONCLICK=\"navigateAjax(null, this, " + 1 + ", "
					+ totalRecord + ", " + 10 + "," + navigationVariableChar
					+ ");return false;\"";
			rpp += space + "<a href=# " + onclickSt + ">" + 10 + "</a>";
		}
		if (recordsPerPage == 25) {
			rpp += space + "<span class=\"current\">" + 25 + "</span>";
		} else {
			onclickSt = " ONCLICK=\"navigateAjax(null, this, " + 1 + ", "
					+ totalRecord + ", " + 25 + "," + navigationVariableChar
					+ ");return false;\"";
			rpp += space + "<a href=# " + onclickSt + ">" + 25 + "</a>";
		}
		if (recordsPerPage == 50) {
			rpp += space + "<span class=\"current\">" + 50 + "</span>";
		} else {
			onclickSt = " ONCLICK=\"navigateAjax(null, this, " + 1 + ", "
					+ totalRecord + ", " + 50 + "," + navigationVariableChar
					+ ");return false;\"";
			rpp += space + "<a href=# " + onclickSt + ">" + 50 + "</a>";
		}
		if (recordsPerPage == 100) {

			rpp += space + "<span class=\"current\">" + 100 + "</span>";
		} else {
			onclickSt = " ONCLICK=\"navigateAjax(null, this, " + 1 + ", "
					+ totalRecord + ", " + 100 + "," + navigationVariableChar
					+ ");return false;\"";
			rpp += space + "<a href=# " + onclickSt + ">" + 100 + "</a>";
		}
	}
	rpp += space + "</div>";

	if (total_page > 1 && pageNo > 1) {
		onclickSt = " ONCLICK=\"navigateAjax(this, null, " + 1 + ", "
				+ totalRecord + ", " + recordsPerPage + ","
				+ navigationVariableChar + ");return false;\"";

		data += space + "<a href=# " + onclickSt + ">" + "First" + "</a>";
		onclickSt = " ONCLICK=\"navigateAjax(this, null, " + -2 + ", "
				+ totalRecord + ", " + recordsPerPage + ","
				+ navigationVariableChar + ");return false;\"";
		data += space + "<a href=# " + onclickSt + ">" + "Previous" + "</a>";
	}
	{
		var startPage = 0;
		var upto = 0;

		var pageNo_tmp = pageNo;
		upto = pageNo_tmp + 4;
		startPage = pageNo_tmp;

		if (upto > total_page) {
			upto = total_page;
		}

		if (startPage == total_page) {
			upto = total_page;
			startPage = upto - 4;
		}
		if (startPage <= 0) {
			startPage = 1;
		}
		if (startPage != 1 && (upto - startPage) < 4) {

			startPage = (upto - 4);

			if (startPage <= 0) {
				startPage = 1;
			}
		}
		if (total_page >= 1) {
			while (startPage <= upto) {
				if (startPage == pageNo_tmp) {
					data += "<span class=\"current\">" + pageNo_tmp + "</span>";
				} else {
					onclickSt = " ONCLICK=\"navigateAjax(this, null, "
							+ startPage + ", " + totalRecord + ", "
							+ recordsPerPage + "," + navigationVariableChar
							+ ");return false;\"";

					data += "<a href=# " + onclickSt + ">" + startPage + "</a>";
				}
				startPage = startPage + 1;
			}
		}
	}
	{
		if (total_page > 1 && total_page != pageNo) {
			// /next
			onclickSt = " ONCLICK=\"navigateAjax(null, null, " + 0 + ", "
					+ totalRecord + ", " + recordsPerPage + ","
					+ navigationVariableChar + ");return false;\"";

			data += "<a href=# " + onclickSt + ">Next</a>";
			// /last
			onclickSt = " ONCLICK=\"navigateAjax(null, null, " + -1 + ", "
					+ totalRecord + ", " + recordsPerPage + ","
					+ navigationVariableChar + ");return false;\"";

			data += "<a href=# " + onclickSt + ">Last</a>";

		}
	}
	data += "</div>";
	/*
	 * data+="[tr=" + totalRecord + "][rpp=" + recordsPerPage + "][pno=" +
	 * pageNo + "][total_page=" + total_page + "][startPage=" + startPage +
	 * "][upto=" + upto + "]";
	 */
	data += rpp;
	document.getElementById("navigationControlId").innerHTML = data;
	// additional set values
	// document.getElementById("
	setNavigationParameterForAjax(window.document.forms[0], pageNo,
			totalRecord, recordsPerPage, navigationVariableChar);
}
function setNavigationParameterForAjax(formObj, pageNo, totalRecord,
		recordsPerPage, navigationVariableChar) {
	if (navigationVariableChar == '0') {
		formObj.pageNo.value = pageNo;
		formObj.recordsPerPage.value = recordsPerPage;
	} else if (navigationVariableChar == '1') {
		formObj.pageNo_A.value = pageNo;
		formObj.recordsPerPage_A.value = recordsPerPage;
	} else if (navigationVariableChar == '2') {
		formObj.pageNo_B.value = pageNo;
		formObj.recordsPerPage_B.value = recordsPerPage;
	}
}
function navigate(pageNo) {
	if (window.document.forms[0].SelectedMenuID.value == "0")
		
	window.document.forms[0].pageNo.value = pageNo;
	window.document.forms[0].submit();
}
function sort(orderBy, orderDirection) {
	
	window.document.forms[0].orderBy.value = orderBy;
	window.document.forms[0].orderDirection.value = orderDirection;
	window.document.forms[0].submit();
}
// navigationVariableChar
function resetNavigateValueForOthersBackList() {
	window.document.forms[0].rowKey_A.value = "-1";
	window.document.forms[0].pageNo_A.value = "1";

	window.document.forms[0].rowKey_B.value = "-1";
	window.document.forms[0].pageNo_B.value = "1";
}
function resetNavigateValue() {
	window.document.forms[0].rowKey.value = "-1";
	window.document.forms[0].pageNo.value = "1";
	window.document.forms[0].orderBy.value = "1";
	window.document.forms[0].recordsPerPage.value = "10";
	window.document.forms[0].orderDirection.value = "0";

	window.document.forms[0].rowKey_A.value = "-1";
	window.document.forms[0].pageNo_A.value = "1";
	window.document.forms[0].orderBy_A.value = "1";
	window.document.forms[0].recordsPerPage_A.value = "10";
	window.document.forms[0].orderDirection_A.value = "0";

	window.document.forms[0].rowKey_B.value = "-1";
	window.document.forms[0].pageNo_B.value = "1";
	window.document.forms[0].orderBy_B.value = "1";
	window.document.forms[0].recordsPerPage_B.value = "10";
	window.document.forms[0].orderDirection_B.value = "0";
}
function navigate(pageNo, navigationVariableChar) {
	

	if (navigationVariableChar == 1) { // case A
		window.document.forms[0].pageNo_A.value = pageNo;
	} else if (navigationVariableChar == 2) { // case B
		window.document.forms[0].pageNo_B.value = pageNo;
	} else {
		window.document.forms[0].pageNo.value = pageNo;
	}
	window.document.forms[0].submit();
}
function navigateRPP(pageNo, navigationVariableChar, recordsPerPage) {
	

	if (navigationVariableChar == 1) { // case A
		window.document.forms[0].pageNo_A.value = pageNo;
		window.document.forms[0].recordsPerPage_A.value = recordsPerPage;
	} else if (navigationVariableChar == 2) { // case B
		window.document.forms[0].pageNo_B.value = pageNo;
		window.document.forms[0].recordsPerPage_B.value = recordsPerPage;
	} else {
		window.document.forms[0].pageNo.value = pageNo;
		window.document.forms[0].recordsPerPage.value = recordsPerPage;
	}
	window.document.forms[0].submit();
}

function setShowingRecordsPerPage(recordsPerPage) {
	window.document.forms[0].recordsPerPage_A.value = recordsPerPage;
	window.document.forms[0].submit();
}

function sort(orderBy, orderDirection, navigationVariableChar) {
	

	if (navigationVariableChar == 1) { // case A
		window.document.forms[0].orderBy_A.value = orderBy;
		window.document.forms[0].orderDirection_A.value = orderDirection;

	} else if (navigationVariableChar == 2) {
		// case B
		window.document.forms[0].orderBy_B.value = orderBy;
		window.document.forms[0].orderDirection_B.value = orderDirection;
	} else {
		window.document.forms[0].orderBy.value = orderBy;
		window.document.forms[0].orderDirection.value = orderDirection;
	}
	window.document.forms[0].submit();
}
function sortInnerPage(orderBy, orderDirection, navigationVariableChar) {
	

	if (navigationVariableChar == 1) { // case A
		window.document.forms[0].orderBy_A.value = orderBy;
		window.document.forms[0].orderDirection_A.value = orderDirection;

	} else if (navigationVariableChar == 2) {
		// case B
		window.document.forms[0].orderBy_B.value = orderBy;
		window.document.forms[0].orderDirection_B.value = orderDirection;
	} else {
		window.document.forms[0].orderBy.value = orderBy;
		window.document.forms[0].orderDirection.value = orderDirection;
	}
	window.document.forms[0].submit();
}

function setKey(rowKey) {
	window.document.forms[0].rowKey.value = rowKey;
}

function lB(rowKey) {
	window.document.forms[0].SelectedMenuID.value = lBSelectedMenuID;
	setKey(rowKey);
	window.document.forms[0].action = lBAction;
	window.document.forms[0].submit();
}

function lM(rowKey, extraPara) {
	window.document.forms[0].SelectedMenuID.value = lMSelectedMenuID;
	setKey(rowKey);
	window.document.forms[0].action = lMAction;
	window.document.forms[0].submit();
}

function lV(rowKey, extraPara) {
	setKey(rowKey);
	if (extraPara == 'PreviewOnly') {
		window.document.forms[0].SelectedMenuID.value = lPVSelectedMenuID;
		window.document.forms[0].action = lPVAction;
	} else {
		window.document.forms[0].SelectedMenuID.value = lVSelectedMenuID;
		window.document.forms[0].action = lVAction;
	}
	window.document.forms[0].submit();

}

function lD(rowKey, extraPara) {
	window.document.forms[0].SelectedMenuID.value = lDSelectedMenuID;
	setKey(rowKey);
	window.document.forms[0].action = lDAction;
	window.document.forms[0].submit();
}
var listFunctionGlobalObject;
function lalde(imgObj, rowKey, extraPara) {
	listFunctionGlobalObject = imgObj;
	// deactivate.gif
	if (imgObj.src.indexOf("deactivate.gif") > 0) {
		lde(rowKey, extraPara);
	} else {
		la(rowKey, extraPara);
	}
}
function la(rowKey, extraPara) {
	window.document.forms[0].SelectedMenuID.value = laSelectedMenuID;
	// setKey(rowKey);
	window.document.forms[0].action = laAction;
	window.document.forms[0].submit();
}

function lde(rowKey, extraPara) {
	window.document.forms[0].SelectedMenuID.value = ldeSelectedMenuID;
	// setKey(rowKey);
	window.document.forms[0].action = ldeAction;
	window.document.forms[0].submit();
}

function lsi(rowKey, extraPara) {
	alert('Coming Soon');
}

function lap(rowKey, extraPara) {
	window.document.forms[0].SelectedMenuID.value = lapSelectedMenuID;
	setKey(rowKey);
	window.document.forms[0].action = lapAction;
	window.document.forms[0].submit();
}
function ldap(rowKey, extraPara) {
	window.document.forms[0].SelectedMenuID.value = ldapSelectedMenuID;
	setKey(rowKey);
	window.document.forms[0].action = ldapAction;
	window.document.forms[0].submit();
}
function lar(rowKey, extraPara) {
	window.document.forms[0].SelectedMenuID.value = larSelectedMenuID;
	setKey(rowKey);
	window.document.forms[0].action = larAction;
	window.document.forms[0].submit();
}

function lCt(rowKey, extraPara) {
	window.document.forms[0].SelectedMenuID.value = lCtSelectedMenuID;
	setKey(rowKey);
	openChat(rowKey, extraPara);
}

function lel(rowKey, extraPara) {

	window.document.forms[0].SelectedMenuID.value = lelSelectedMenuID;
	setKey(rowKey);
	window.document.forms[0].action = lelAction;
	window.document.forms[0].submit();
}

function lem(rowKey, extraPara) {
	window.document.forms[0].SelectedMenuID.value = lemSelectedMenuID;
	setKey(rowKey);
	window.document.forms[0].action = lemAction;
	window.document.forms[0].submit();
}
function ldup(rowKey, extraPara) {
	window.document.forms[0].SelectedMenuID.value = ldupSelectedMenuID;
	setKey(rowKey);
	window.document.forms[0].action = ldupAction;
	window.document.forms[0].submit();
}
function lrfiS(rowKey, extraPara) {
	window.document.forms[0].SelectedMenuID.value = lrfiSSelectedMenuID;
	setKey(rowKey);
	window.document.forms[0].action = lrfiSAction;
	window.document.forms[0].submit();
}
function lP(rowKey, extraPara) {
	window.document.forms[0].SelectedMenuID.value = lPSelectedMenuID;
	myInputPrompt.setImgPath('<%=SysSetting.IMG_PATH%>/theme_less');
	myInputPrompt.show(
			myInputPrompt.topCnf('Do you want to Deactivate Admin?'),
			myInputPrompt.bottomBtn('Yes', 'yesOnClick;', 'No', ''), 0, 0,
			false);
	window.document.forms[0].submit();
}
function lR(rowKey, extraPara) {
	window.document.forms[0].SelectedMenuID.value = lRSelectedMenuID;
	setKey(rowKey);
	window.document.forms[0].action = lRAction;
	window.document.forms[0].submit();
}
function lC(rowKey, extraPara) {
	window.document.forms[0].SelectedMenuID.value = lCSelectedMenuID;
	setKey(rowKey);
	window.document.forms[0].action = lCAction;
	window.document.forms[0].submit();

	myInputPrompt.setImgPath('<%=SysSetting.IMG_PATH%>/theme_less');
	myInputPrompt.show(
			myInputPrompt.topCnf('Do you want to Deactivate Admin?'),
			myInputPrompt.bottomBtn('Yes', 'yesOnClick;', 'No', ''), 0, 0,
			false);
}
function laT(rowKey, extraPara) {
	window.document.forms[0].SelectedMenuID.value = laTSelectedMenuID;
	setKey(rowKey);
	window.document.forms[0].action = laTAction;
	window.document.forms[0].submit();
}
function lF(rowKey, extraPara) {
	window.document.forms[0].SelectedMenuID.value = lFSelectedMenuID;
	setKey(rowKey);
	window.document.forms[0].action = lFAction;
	window.document.forms[0].submit();
}
function lrfiR(rowKey, extraPara) {
	window.document.forms[0].SelectedMenuID.value = lrfiRSelectedMenuID;
	setKey(rowKey);
	window.document.forms[0].action = lrfiRAction;
	window.document.forms[0].submit();
}
function lpBlock(rowKey, extraPara) {
	alert("PrintBlock");
}
function lrfpR(rowKey, extraPara) {
	window.document.forms[0].SelectedMenuID.value = lrfpRSelectedMenuID;
	setKey(rowKey);
	window.document.forms[0].action = lrfpRAction;
	window.document.forms[0].submit();
}
function lBD(rowKey, extraPara) {
	window.document.forms[0].SelectedMenuID.value = lBDSelectedMenuID;
	setKey(rowKey);
	window.document.forms[0].action = lBDAction;
	window.document.forms[0].submit();
}
function lst(rowKey, extraPara) {
	window.document.forms[0].SelectedMenuID.value = lstSelectedMenuID;
	setKey(rowKey);
	window.document.forms[0].action = lstAction;
	window.document.forms[0].submit();
}

function lbb(rowKey, extraPara) {
	window.document.forms[0].SelectedMenuID.value = lbbSelectedMenuID;
	setKey(rowKey);
	window.document.forms[0].action = lbbAction;
	window.document.forms[0].submit();
}

function lib(rowKey, extraPara) {
	window.document.forms[0].SelectedMenuID.value = libSelectedMenuID;
	setKey(rowKey);
	window.document.forms[0].action = libAction;
	window.document.forms[0].submit();
}
function lop(rowKey, extraPara) {
	window.document.forms[0].SelectedMenuID.value = lopSelectedMenuID;
	setKey(rowKey);
	window.document.forms[0].action = lopAction;
	window.document.forms[0].submit();
}
function lba(rowKey, extraPara) {
	window.document.forms[0].SelectedMenuID.value = lbaSelectedMenuID;
	setKey(rowKey);
	window.document.forms[0].action = lbaAction;
	window.document.forms[0].submit();
}
function lre(rowKey, extraPara) {
	window.document.forms[0].SelectedMenuID.value = lreSelectedMenuID;
	setKey(rowKey);
	window.document.forms[0].action = lreAction;
	window.document.forms[0].submit();
}
function lrpw(rowKey, extraPara) {
	window.document.forms[0].SelectedMenuID.value = lrPwSelectedMenuID;
	setKey(rowKey);
	window.document.forms[0].action = lrPwAction;
	window.document.forms[0].submit();
}
function lpap(rowKey, extraPara) {
	window.document.forms[0].SelectedMenuID.value = lpapSelectedMenuID;
	setKey(rowKey);
	window.document.forms[0].action = lapAction;
	window.document.forms[0].submit();
}
function lpdap(rowKey, extraPara) {
	window.document.forms[0].SelectedMenuID.value = lpdapSelectedMenuID;
	setKey(rowKey);
	window.document.forms[0].action = lpdapAction;
	window.document.forms[0].submit();
}
function lprap(rowKey, extraPara) {
	window.document.forms[0].SelectedMenuID.value = lprapSelectedMenuID;
	setKey(rowKey);
	window.document.forms[0].action = lprapAction;
	window.document.forms[0].submit();
}
function lMAsP(rowKey, extraPara) {
	
	setKey(rowKey);
	window.document.forms[0].action = lMAsPAction;
	window.document.forms[0].submit();
}
function lMAsL(rowKey, extraPara) {
	
	setKey(rowKey);
	window.document.forms[0].action = lMAsLAction;
	window.document.forms[0].submit();
}
function lrfiAddendum(rowKey, extraPara) {
	
	setKey(rowKey);
	window.document.forms[0].action = lrfiAddendumAction;
	window.document.forms[0].submit();
}
function lrfpAddendum(rowKey) {
	
	setKey(rowKey);
	window.document.forms[0].action = lrfpAddendumAction;
	window.document.forms[0].submit();
}
function lweightage(rowKey) {
	
	setKey(rowKey);
	window.document.forms[0].action = lweightageAction;
	window.document.forms[0].submit();
}
function lPurgeAdmin(rowKey) {
	
	setKey(rowKey);
	window.document.forms[0].action = lPurgeAction;
	window.document.forms[0].submit();
}
function lReports(rowKey) {
	window.document.forms[0].SelectedMenuID.value = lReportsSelectedMenuID;
	setKey(rowKey);
	window.document.forms[0].action = lReportsAction;
	window.document.forms[0].submit();
}
function lrfiAddendumForClosed(rowKey) {
	
	setKey(rowKey);
	window.document.forms[0].action = lrfiAddendumForClosedAction;
	window.document.forms[0].submit();
}
function lrfpAddendumForClosed(rowKey) {
	window.document.forms[0].SelectedMenuID.value = navigateAjax;
	setKey(rowKey);
	window.document.forms[0].action = lrfpAddendumForClosedAction;
	window.document.forms[0].submit();
}

function flb(rowKey, extraPara) {
	window.document.forms[0].SelectedMenuID.value = flbSelectedMenuID;
	setKey(rowKey);
	window.document.forms[0].action = flbAction;
	window.document.forms[0].submit();
}

function limDt(rowKey, extraPara) {
	window.document.forms[0].SelectedMenuID.value = lImportDetailsSelectedMenuID;
	setKey(rowKey);
	window.document.forms[0].action = lImportDetailsAction;
	window.document.forms[0].submit();
}

function lCate(rowKey, extraPara) {
	window.document.forms[0].SelectedMenuID.value = ICategorizationSelectedMenuID;
	setKey(rowKey);
	window.document.forms[0].action = ICategorizationAction;
	window.document.forms[0].submit();
}

function lImgV(rowKey, extraPara) {
	window.document.forms[0].SelectedMenuID.value = IImagesSelectedMenuID;
	setKey(rowKey);
	window.document.forms[0].action = IImagesAction;
	window.document.forms[0].submit();
}

// ///////////////////////////
function getListAndAppendedlm(totalRecord) {
	//alert("getListAndAppendedlm : " + totalRecord)
	showNavigationlm(tmp_pageNo, totalRecord, tmp_recordsPerPage,
			tmp_navigationVariableChar);
}
function showNavigationlm(pageNo, totalRecord, recordsPerPage,navigationVariableChar) 
{
	var total_page = Math.ceil(totalRecord / recordsPerPage);
	var onclickSt = " ONCLICK=\"navigateAjax(null, this, " + pageNo + ", "
			+ totalRecord + ", " + recordsPerPage + ","
			+ navigationVariableChar + ");return false;\"";
	
	
	var html = "<div class=\"pageno-div\"><div class=\"pageno\">";
	/*if (true) 
	{
		html += "<a class=\"larrow\">&nbsp;</a>";
	} 
	else 
	{
		html += "<a class=\"larrow\">&nbsp;</a>";
	}
	for (var i = 0; i < 5; i++) 
	{
		// <a href=\"#\" class=\"current\">2</a>
		html += "<a href=\"#\">1</a>";
	}
	if (true) 
	{
		html += "<a class=\"rarrow\">&nbsp;</a>";
	} 
	else 
	{
		html += "<a class=\"rarrow\">&nbsp;</a>";
	}*/
	
	if (total_page > 1 && pageNo > 1) 
	{
		onclickSt = " ONCLICK=\"navigateAjax(this, null, " + 1 + ", "
				+ totalRecord + ", " + recordsPerPage + ","
				+ navigationVariableChar + ");return false;\"";

		html += "<a href=# " + onclickSt + " class=\"larrow\">&nbsp;</a>";
		/*onclickSt = " ONCLICK=\"navigateAjax(this, null, " + -2 + ", "
				+ totalRecord + ", " + recordsPerPage + ","
				+ navigationVariableChar + ");return false;\"";
		html += "<a href=# " + onclickSt + " class=\"rarrow\">&nbsp;</a>";*/
	}
	{
		var startPage = 0;
		var upto = 0;

		var pageNo_tmp = pageNo;
		upto = pageNo_tmp + 4;
		startPage = pageNo_tmp;

		if (upto > total_page) {
			upto = total_page;
		}

		if (startPage == total_page) {
			upto = total_page;
			startPage = upto - 4;
		}
		if (startPage <= 0) {
			startPage = 1;
		}
		if (startPage != 1 && (upto - startPage) < 4) {

			startPage = (upto - 4);

			if (startPage <= 0) {
				startPage = 1;
			}
		}
		if (total_page >= 1) 
		{
			while (startPage <= upto) 
			{
				if (startPage == pageNo_tmp) 
				{
					//data += "<span class=\"current\">" + pageNo_tmp + "</span>";
					onclickSt = " ONCLICK=\"navigateAjax(this, null, "
						+ startPage + ", " + totalRecord + ", "
						+ recordsPerPage + "," + navigationVariableChar
						+ ");return false;\"";
					
					html += "<a href=# " + onclickSt + "class=\"current\">" + pageNo_tmp + "</a>";
				} 
				else 
				{
					onclickSt = " ONCLICK=\"navigateAjax(this, null, "
							+ startPage + ", " + totalRecord + ", "
							+ recordsPerPage + "," + navigationVariableChar
							+ ");return false;\"";

					html += "<a href=# " + onclickSt + ">" + startPage + "</a>";
				}
				startPage = startPage + 1;
			}
		}
	}
	
	{
		if (total_page > 1 && total_page != pageNo) 
		{
			// /next
			/*onclickSt = " ONCLICK=\"navigateAjax(null, null, " + 0 + ", "
					+ totalRecord + ", " + recordsPerPage + ","
					+ navigationVariableChar + ");return false;\"";

			//data += "<a href=# " + onclickSt + ">Next</a>";
			html += "<a href=# " + onclickSt + " class=\"larrow\">&nbsp;</a>";*/
			// /last
			onclickSt = " ONCLICK=\"navigateAjax(null, null, " + -1 + ", "
					+ totalRecord + ", " + recordsPerPage + ","
					+ navigationVariableChar + ");return false;\"";

			//data += "<a href=# " + onclickSt + ">Last</a>";
			html += "<a href=# " + onclickSt + " class=\"rarrow\">&nbsp;</a>";

		}
	}
	
	
	onclickSt = " ONCLICK=\"navigateAjax(null, this, " + 1 + ", "
	+ totalRecord + ", (document.getElementById('navigationDropdownSelectId').value)," + navigationVariableChar
	+ ");return false;\"";
	
	html += "</div><div class=\"record-div\"> <span>Display # Records:</span><div class=\"normal-select\" id=\"navigationDropdownId\" "+onclickSt+"><select id=\"navigationDropdownSelectId\">";
	{
		html += "<option value=\"0\"></option>";	
		if (recordsPerPage == 10) 
		{
			html += "<option value=\"10\" selected>10</option>";
		}
		else
		{
			html += "<option value=\"10\">10</option>";
		}
		if (recordsPerPage == 25) 
		{
			html += "<option value=\"25\" selected>25</option>";
		}
		else
		{
			
			html += "<option value=\"25\">25</option>";
		}
		if (recordsPerPage == 50) 
		{
			html += "<option value=\"50\" selected>50</option>";
		}
		else
		{
			
			html += "<option value=\"50\">50</option>";
		}
		if (recordsPerPage == 100) 
		{
			html += "<option value=\"100\" selected>100</option>";
		}
		else
		{
			
			html += "<option value=\"100\">100</option>";
		}
	}
	html += "</select></div>" ;
	html += "</div>";
	html += "</div>";
	
	// java script to convert fancy combo
	document.getElementById("navigationControlId").innerHTML = html;
	dropdownView("navigationDropdownId");
	
	setNavigationParameterForAjax(window.document.forms[0], pageNo,
			totalRecord, recordsPerPage, navigationVariableChar);
}

