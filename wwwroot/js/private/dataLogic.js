//************************************************************************* Globale Variablen
	var ajaxUrl = "http://localhost:3000/Get/";
	var jsonObject;
  	var sidata;
	var init = true;
	var sseOn = false;
	var socket;

//********************************************************************************************
//This one is executed after all the other scripts when Page is Ready
	$(window).bind('load', function(){
		//Do initial ajax call
    initDropdowns();
    if (jsonObject === undefined) {
      doAjax();
      initDropdowns();
    } else {
      //Update the chart data
      updateChartData(); 
      //Crawl and show Metadata
      updateMetadata();
    }
	});

//*********************************************************************** Register I/O Handlers
$(document).ready(function () {

    var chart = $('#chart').highcharts();

	//****************************************Save Config Buttong
	document.getElementById("SaveConfig").onclick = function () { 
		ajaxUrl = $("#ajaxconfig").val(); 
		doAjax();
	};

	//****************************************Stop SSE Buttong
	document.getElementById("StopSSE").onclick = function () { 
		 sseOn = false;
   es.close();
     $(this).addClass('active');
     $('#StartSSE').removeClass('active');
	};

	//****************************************Start SSE Buttong
	document.getElementById("StartSSE").onclick = function () { 
		sseOn = true;
		$(this).addClass('active');
	    $('#StopSSE').removeClass('active');
    es = new EventSource($("#sseconfig").val());
    startSSEListeners();
	};

	//****************************************Stop WebSocket Buttong
	document.getElementById("StopWebSocket").onclick = function () {
	     $(this).addClass('active');
	     $('#StartWebSocket').removeClass('active');
	     socket.disconnect();
	};

	//****************************************Start WebSocket Buttong
	document.getElementById("StartWebSocket").onclick = function () { 
		if ('WebSocket' in window){
	    /* WebSocket is supported. You can proceed with your code*/
			$(this).addClass('active');
	    	$('#StopWebSocket').removeClass('active');
			 socket = io($("#wsconfig").val());
			 socket.on('json', function(msg){
			    jsonObject = msg;
			    ($('#chart').highcharts() !== undefined) ? updateChartData() : null;
			    updateMetadata();
			  });
	    } else {
	   	/*WebSockets are not supported. Try a fallback method like long-polling etc*/
	   	alert("WebSockets are not supported by your Broser")
		} 
	};

	//****************************************Boards Dropdown
	$('#Boards').off().on('change', function(){
	  setTimeout( dropdownBoardActionHighchart(), 0 ); //SetTimeout(X, 0) = Async call
	  setTimeout( dropdownBoardActionPlotly(), 0 );
	  setTimeout( dropdownBoardActionPlottable(), 0 );
	});

	//****************************************IC/C Selection
	$('#Components').off().on('change', function(){
	  setTimeout( dropdownComponentActionHighchart(), 0 );//SetTimeout(X, 0) = Async call
	  setTimeout( dropdownComponentActionPlotly(), 0 );
	  setTimeout( dropdownComponentActionPlottable(), 0 );
	});

    $('#Charts').off().on('change', function(){
        var selected = $(this).val();
        if (selected === "Highcharts") {
          $('#chart').show();
          $('#chart2').hide();
          $('#chart3').hide();
          //$('#chart4').hide();
        }
        if (selected === "Plotly"){
          $('#chart').hide();
          $('#chart2').show();
          $('#chart3').hide();
          //$('#chart4').hide();
        }
        if (selected === "Plottable") {
          $('#chart').hide();
          $('#chart2').hide();
          $('#chart3').show();
          //$('#chart4').hide();
        }
        if (selected === "jsonVis") {
          $('#chart').hide();
          $('#chart2').hide();
          $('#chart3').hide();
          $('#chart4').show();
        }
    });
    //*********************************************************************** Server Sent Events Listeners
    var es = new EventSource($("#sseconfig").val());
    startSSEListeners();
    function startSSEListeners() {
      es.addEventListener("open",  function(event){
      }, false);
      
      es.addEventListener("message", function(event){
        if (sseOn == true) {
        jsonObject = JSON.parse(event.data).data;
        sidata = JSON.parse(event.data).si;
        ($('#chart').highcharts() !== undefined) ? updateChartData() : null;
        setTimeout(updateMonitoringData(), 0 );
        updateMetadata();
      }
      }, false);
      
      es.addEventListener("error",  function(event){
      }, false);
    }
	});


//*********************************************************************** Helper Functions
  function initDropdowns(){

    $('#Charts').selectpicker('val', 'Plotly');

    if (jsonObject === undefined){
      $('.selectpicker').trigger('change');
      return;
    } 

    //Set Data
    for (b in jsonObject.BoardsUnderTest) {
      // Add options to Bootstrap-Select 
      $("#Boards").append($('<option>', {value: b,text: b}));
      $('.selectpicker').selectpicker('refresh');

      var chart = $('#chart').highcharts();
      chart.addSeries({ 
            id: b,
            name: 'BoardsUnderTest '+b,
            showInLegend: false, 
            visible: false,
            data: []
      });

    }

    //Default configuration
    //$('#Boards').selectpicker('selectAll');
    //$('#Boards').selectpicker('deselectAll');
    $('#Boards').selectpicker('val', '3827582');

    //select from C, IC
    //$('#Components').selectpicker('selectAll');
    //$('#Components').selectpicker('deselectAll');
    $('#Components').selectpicker('val', 'C');

    //$('#Boards').selectpicker('refresh');
    //$('#Components').selectpicker('refresh');
    $('.selectpicker').trigger('refresh');
    $('.selectpicker').trigger('change');
}

function doAjax() {           
   $.ajax({
        dataType: 'jsonp',
        data: "data=yeah",                      
        jsonp: 'callback',
        url: ajaxUrl,
        async: false,                     
        success: function(data) {
              jsonObject = data;
              //Update the chart data
              updateChartData();
              //Crawl and show Metadata
              updateMetadata();
        }
  });
}

//Crawl and show Json Metadata
function updateMetadata() {
      if (jsonObject === undefined){
        return;
      } 
      var str = "";
      for (i in jsonObject){
            if (i != "BoardsUnderTest") {
            str += i + ""+" : "+ jsonObject[i]+""+"<br>";
            }
      }
      document.getElementById("meta").innerHTML = str
 }

function updateChartData() {
      if (jsonObject === undefined){
        return;
      } 
      // Check for Web worker support!
      if (typeof(Worker) !== "undefined") {
            // Check if Web worker already exists!
      if (typeof(w) == "undefined") {
                  try {
                    w = new Worker("./js/private/task.js");
                  }catch(err){
                        console.log("task.js cannot be accessed from origin 'null'");
                        var e = {data: localWorker({data: jsonObject})};
                        updateChartDataHighchart(e);
                        updateChartDataPlotly(e);
                        updateChartDataPlottable(e);
                        updateChartDataJsonVis(e);
                        return;
                  }

                  //Start Web Worker Crawling Data
                  w.postMessage(jsonObject); // Send data to our worker.     
            } else {
                  console.log("worker busy")
            }
      } else {
            alert("Your Browser does not Support Web Workers")
      }

      w.addEventListener('message', function(e) {
          updateChartDataHighchart(e);
          updateChartDataPlotly(e);
          updateChartDataPlottable(e);
          updateChartDataJsonVis(e);
            
          stopWorker();
      }, false);  
                  
      function stopWorker() { 
        if (w != undefined) {
          w.terminate();
          w = undefined;
        }
      }
}
function localWorker(e) {
  var jsonObject = e.data;
  var result = {}
  for (b in jsonObject.BoardsUnderTest) {
    var seriesData = [];
    var components = [];
    var integratedCircuits = [];
              
    var Board = jsonObject.BoardsUnderTest[b].ComponentsUnderTest;
    for (i in Board)
    { 
      if (i.startsWith('C')) {
        //COMPONENT
        var x = null, y = null, label = "";
        for (j in Board[i].TestFeature)
        {
          if(x === null) {
            x = parseInt(Board[i].TestFeature[j].Value);
          } else {
            y = parseInt(Board[i].TestFeature[j].Value);
          }
          label = i;
        }
      seriesData.push({x: x, y: y, text: label});
      components.push({x: x, y: y, text: label});
      }
      if(i.startsWith('IC') ){
        //INTEGRATED CIRCUIT

        var x = null, y = null, label = "";
        for (j in Board[i].TestFeature)
        {
          var done = false;
          if(x === null) {
            x = parseInt(Board[i].TestFeature[j].Value);
          } else {
            y = parseInt(Board[i].TestFeature[j].Value);
            done = true;
          }
          label = i;
          if(done === true) {
            seriesData.push({x: x, y: y, text: label});
            integratedCircuits.push({x: x, y: y, text: label});
            x = null;
            y = null;
            done = false;
          }
        }

      } 
    }
    result[b] = [seriesData, components, integratedCircuits]; 
  }
  return result;
}