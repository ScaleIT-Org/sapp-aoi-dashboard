//************************************************************************* Globale Variablen
	var ajaxUrl = "http://localhost:3000/Get/";
	var jsonObject;
  var sidata;
	var init = true;
	var sseOn = true;
	var socket;

//********************************************************************************************
//This one is executed after all the other scripts when Page is Ready


//*********************************************************************** Register I/O Handlers
$(document).ready(function () {

	//****************************************Save Config Buttong
	document.getElementById("SaveConfig").onclick = function () { 
		alert("Machine Label Saved") 
	};

	//****************************************Stop SSE Buttong
	document.getElementById("StopSSE").onclick = function () { 
     $(this).addClass('active');
     $('#StartSSE').removeClass('active');
	};

	//****************************************Start SSE Buttong
	document.getElementById("StartSSE").onclick = function () { 

		$(this).addClass('active');
	    $('#StopSSE').removeClass('active');
	};

	

    
  //*********************************************************************** Server Sent Events Listeners
  var es = new EventSource("http://localhost:49551/sse/");
  startSSEListeners();
  function startSSEListeners() {
    es.addEventListener("open",  function(event){
    }, false);
    
    es.addEventListener("message", function(event){
      if (sseOn == true) {
      jsonObject = JSON.parse(event.data).data;
      sidata = JSON.parse(event.data).si;
      setTimeout(updateMonitoringData(), 0 );
    }
    }, false);
    
    es.addEventListener("error",  function(event){
    }, false);
  }
});