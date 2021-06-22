getBrowserSize = function() 
{
	var bodyWidth, bodyHeight;

	bodyWidth = document.getElementById("container_ID").offsetWidth ;
	if (self.innerHeight)
	{ 
		bodyHeight = self.innerHeight; 
	}
	else if (document.documentElement && document.documentElement.clientHeight) 
	{
		// Explorer 6 Strict Mode
		bodyHeight = document.documentElement.clientHeight; 
	} 
	else if (document.body) 
	{
		// other Explorers
		bodyHeight = document.body.clientHeight; 
	} 
	return [bodyWidth, bodyHeight];
}
__getBrowserSize = function()
{
	// var bodyWidth = document.documentElement.clientWidth;
	// var bodyHeight = document.documentElement.clientHeight;
	var bodyWidth, bodyHeight; 
	if (self.innerHeight)
	{ 
		// all except Explorer
	   	bodyWidth = self.innerWidth; 
	   	bodyHeight = self.innerHeight; 
	}  
	else if (document.documentElement && document.documentElement.clientHeight) 
	{
		// Explorer 6 Strict Mode
	   	bodyWidth = document.documentElement.clientWidth; 
	   	bodyHeight = document.documentElement.clientHeight; 
	} 
	else if (document.body) 
	{
		// other Explorers
	   	bodyWidth = document.body.clientWidth; 
	   	bodyHeight = document.body.clientHeight; 
	} 
	return [bodyWidth,bodyHeight];		
}
var loadPoplight = true;
function initPopupOnLoad() 
{
	$("a.poplight[href^=#]").click(function() 
	{
		if (!loadPoplight) 
		{
			loadPoplight = true;
			return false;
		}
		var popID = $(this).attr("rel"); // Get Popup Name
		var popURL = $(this).attr("href"); // Get Popup href to
		// define size

		// Pull Query & Variables from href URL
		var query = popURL.split("?");
		var dim = query[1].split("&");
		var popWidth = dim[0].split("=")[1]; // Gets the
		// first query
		// string value

		var commonPopup_cng_one= '';
		if((document.getElementById("data_commonPopup_detailDiv_new_1") != null) && (document.getElementById("data_commonPopup_detailDiv_new_1") != undefined) && (document.getElementById("data_commonPopup_detailDiv_new_1") != ''))
		{
			commonPopup_cng_one =document.getElementById("data_commonPopup_detailDiv_new_1").innerHTML;
		}
		if((commonPopup_cng_one != "") && (commonPopup_cng_one != null) && (commonPopup_cng_one != undefined))
		{
			$("#" + popID)
			.fadeIn()
			.css({
				"width" : Number(popWidth)
			})
			.prepend(
				"<a href=\"#\" class=\"close_new_1\" onclick=\"popupBoxClose();return false;\">&nbsp;</a>");
		}
		else
		{
			$("#" + popID).fadeIn().css({"width" : Number(popWidth)})
				.prepend(
					"<a href=\"#\" class=\"close\" onclick=\"popupBoxCloseMain();return false;\">&nbsp;</a>");
		}
		var popMargTop = ($("#" + popID).height() + 80) / 2;
		var popMargLeft = ($("#" + popID).width() );

		var winW;

		if (parseInt(navigator.appVersion) > 3) 
		{
			if (navigator.appName == "Netscape") 
			{
				winW = window.innerWidth;
				winH = window.innerHeight;
			}
			if (navigator.appName.indexOf("Microsoft") != -1) 
			{
				winW = document.body.offsetWidth;
				winH = document.body.offsetHeight;
			}
		}
		winW = Math.max(document.body.scrollTop,
		document.documentElement.scrollTop);
						
		var container_ID=document.getElementById("container_ID");
		var leftWidth=0;
		var leftPoint=300;
		if(container_ID!=null)
		{
			var brSize = getBrowserSize();
			bodyWidth = brSize[0];
			bodyHeight = brSize[1];
							
			leftWidth=document.getElementById("container_ID").offsetLeft ;

			if(popMargLeft<=0) popMargLeft=415;
			var leftPoint = ((bodyWidth / 2)+leftWidth) - (popMargLeft / 2);
		}
						
		// Apply Margin to Popup
		$("#" + popID).css({
			"left" : leftPoint+'px',
			"top" : winW
		});
		
		$("body").append("<div id=\"fade\"></div>"); // Add the fade layer to bottom of the body tag.
		$("#fade").css({
			"filter" : "alpha(opacity=80)"
		}).fadeIn(); // Fade in the fade layer
		popupBoxLoaded();
		return false;
		});
	
	try 
	{
		$("a.close, #fade").live("click", popupBoxClose);
	} 
	catch (e) 
	{
		
	}
}

function popupBoxCloseMain()
{
	try 
	{
		popupBoxClosePageWise();
	} 
	catch (e) 
	{
		popupBoxClose();				
	}
}
function commSaveCancelPanCancelClick() 
{
	try 
	{
		commSaveCancelPanCancelClickOuter();
	}
	catch (e) 
	{
		popupBoxClose();
	}
}
function popupBoxClose()
{
	popupBoxBeforeClose();
	if(document.getElementById("error_box") !=null)
	{
		document.getElementById("error_box").style.display = "none";
		document.getElementById("error_box").innerHTML = "";
	}

	$('#data_commonPopup_detailDiv').html('');
	
	if (commYNPan_detailDivIdExtra!=undefined && commYNPan_detailDivIdExtra != null && commYNPan_detailDivIdExtra != "")
		$("#" + commYNPan_detailDivIdExtra).hide();
	
	$('#commonPopup_messageDiv').html('');
	if(document.getElementById("error_box_new_1") != null)
		$('#commonPopup_messageDiv_new_1').html('');

	$("#fade , .popup_block").fadeOut(function() {
	
	}); // fade them both out
	
	return false;
}
function popupBoxLoaded() 
{
}
function popupBoxBeforeClose() 
{
}
function openCommonYNPopup(linkId) 
{
	if (linkId == null) 
	{
		document.getElementById("openPopup").click();
	}
	else 
	{
		document.getElementById(linkId).click();
	}
}