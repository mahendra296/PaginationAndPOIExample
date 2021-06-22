<%@ page language="java" pageEncoding="UTF-8"%>
<div id="commonPopupDiv" class="popup_block" style="width: 680px; float: left; display: none; margin-top: -181px;">
	<div class="popup_heading">
		<span id="commonPopup_titleDiv"></span>
	</div>

	<div id="commonPopup_alertMessageDiv" style="display: none;"></div>
	<div id="error_box"  class="error_box_Div" style="display: none;"></div>
	<div id="error_box2" style="display: none; background-position: 21px 10px;"></div>
	<div id="popup_txt">
		<h2>
			<span id="commonPopup_messageDiv"></span>
		</h2>
		<ul id="popoupname">
			<div id="commYNPan_error"></div>
			<span id="commonPopup_detailDiv"></span>
		</ul>
	</div>


	<div align="center" style="margin: 20px 0px 20px 0px !important; display: block;" id="commonPopup_buttonDiv">
		<br>
	</div>

	<a href="#?w=580" rel="commonPopupDiv" class="poplight" style="display: none" id="openPopup"></a> 
</div>
<div style="display: none;" id="data_commonPopup_detailDiv"></div>
<div style="display: none;" id="yesNoPopupButtonDiv">
	<a class="login" href="#" title="<bean:message code="YES" />" onclick="if(commYNPanYesClickHeader()){commYNPanYesClick()};return false;"><bean:message code="YES" /></a> 
	<a class="login" href="#" title="<bean:message code="NO" />" onclick="commYNPanNoClick();return false;"><bean:message code="NO" /></a>
</div>
<div style="display: none;" id="saveCancelPopupButtonDiv">
	<a class="login" href="#" onclick="commSaveCancelPanSaveClick();return false;" title="<bean:message code="Save" />"><bean:message code="Save" /></a>
	<a class="login" href="#" onclick="commSaveCancelPanCancelClick();return false;"><bean:message code="Cancel" /></a>
</div>
<script>
var commYNPan_actionId = "";
var commYNPan_detailDivIdExtra = "";
var commonPopup_titleDivObj = document.getElementById("commonPopup_titleDiv");
var commonPopup_alertMessageDivObj = document.getElementById("commonPopup_alertMessageDiv");
var commonPopup_messageDivObj = document.getElementById("commonPopup_messageDiv");
var commonPopup_detailDivObj = document.getElementById("commonPopup_detailDiv");
var commonPopup_buttonDivObj = document.getElementById("commonPopup_buttonDiv");

function beforeOpenCommonPopup(titleText, alertMessage, message, detailDivId, buttonDivId, actionId) 
{

	if (actionId == null || actionId == "") 
	{
		actionId = null;
	}
	if (titleText == null) 
	{
		titleText = "ProcurePort";
	}
	if (titleText == "") 
	{
		titleText = "&nbsp;";
	}
	if (alertMessage == null || alertMessage == "") 
	{
		alertMessage = "";
	}
	if (message == null) 
	{
		message = "Are you sure?";
	}
	if (detailDivId == null || detailDivId == "") 
	{
		detailDivId = "data_commonPopup_detailDiv";
	}
	else 
	{
		commYNPan_detailDivIdExtra = detailDivId;
	}
	if (buttonDivId == null || buttonDivId == "") 
	{
		buttonDivId = "yesNoPopupButtonDiv";
	}

	var data_commonPopup_detailDivObj = document.getElementById(detailDivId);
	var data_commonPopup_buttonDivObj = document.getElementById(buttonDivId);

	commYNPan_actionId = actionId;
	commonPopup_titleDivObj.innerHTML = titleText;
	commonPopup_alertMessageDivObj.innerHTML = alertMessage;
	commonPopup_messageDivObj.innerHTML = message;
	data_commonPopup_detailDivObj.style.display = "none";
	//commonPopup_detailDivObj.appendChild(data_commonPopup_detailDivObj);
	commonPopup_detailDivObj.innerHTML = data_commonPopup_detailDivObj.innerHTML;
	data_commonPopup_detailDivObj.innerHTML="";
	commonPopup_buttonDivObj.innerHTML = data_commonPopup_buttonDivObj.innerHTML;
}

</script>
