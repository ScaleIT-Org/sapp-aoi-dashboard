//************************************************************************* Globale Variablen
	var ajaxUrl = "http://localhost:3000/Get/";
	var jsonObject;
  var sidata;
	var init = true;
	var sseOn = true;

//********************************************************************************************
//This one is executed after all the other scripts when Page is Ready
	$(window).bind('load', function(){
		//Do initial ajax call
    initDropdowns();
    if (jsonObject === undefined) {
      doAjax();
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
	     $(this).addClass('active');
	     $('#StartSSE').removeClass('active');
		};

		//****************************************Stop SSE Buttong
		document.getElementById("StartSSE").onclick = function () { 
			sseOn = true;
			$(this).addClass('active');
		    $('#StopSSE').removeClass('active');
        es = new EventSource("http://localhost:3000/sse");
        startSSEListeners();
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
        if (selected === "Plotly"){
            $('#chart').find('.highcharts-container').hide();
            $('#chart2').find('.plot-container').show();
            $('#chart3').find('.plot').hide();
        }
        if (selected === "Highcharts") {
          $('#chart').find('.highcharts-container').show();
          $('#chart2').find('.plot-container').hide();
          $('#chart3').find('.plot').hide();
        }
        if (selected === "Plottable") {
          $('#chart').find('.highcharts-container').hide();
          $('#chart2').find('.plot-container').hide();
          $('#chart3').find('.plot').show();
        }
    });
	});

//*********************************************************************** Server Sent Events Listeners
  var es = new EventSource("http://localhost:3000/sse");
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
  



//*********************************************************************** Helper Functions
  function initDropdowns(){

    $('#Charts').selectpicker('val', 'Plottable');

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
              //Initial Dropdown configuration
              initDropdowns();
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
                        console.log("task.js cannot be accessed from origin 'null'")
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
            
          stopWorker();
      }, false);  
                  
      function stopWorker() { 
        if (w != undefined) {
          w.terminate();
          w = undefined;
        }
      }
}