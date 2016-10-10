//************************************************************************* Globale Variablen
	var ajaxUrl = "http://localhost:3000/Get/";
	var jsonObject;
	var init = true;
	var sseOn = false;
  var mySeriesH = [];

//********************************************************************************************
//This one is executed after all the other scripts when Page is Ready
	$(window).bind('load', function(){
		//Do initial ajax call
		doAjax(); 
    //Initial Dropdown configuration
    initDropdowns();
    //Update the chart data
    updateChartData();
    //Crawl and show Metadata
    updateMetadata();
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
		};

		//****************************************Boards Dropdown
		$('#Boards').on('change', function(){
      setTimeout( dropdownBoardActionHighchart(), 0 ); //SetTimeout(X, 0) = Async call
      setTimeout( dropdownBoardActionPlotly(), 0 );
        
		});

		//****************************************IC/C Selection
		$('#Components').off().on('change', function(){
        setTimeout( dropdownComponentActionHighchart(), 0 );//SetTimeout(X, 0) = Async call
        setTimeout( dropdownComponentActionPlotly(), 0 );
		});

    $('#Charts').on('change', function(){
        var selected = $(this).val();
        if (selected === "Plotly"){
            $('#chart').find('.plot-container').show();
            $('#chart').find('.highcharts-container').hide();
        }
        if (selected === "Highcharts") {
          $('#chart').find('.highcharts-container').show();
          $('#chart').find('.plot-container').hide();
        }
    });
	});

//*********************************************************************** Server Sent Events Listeners
  var es = new EventSource("http://localhost:3000/sse");
  es.addEventListener("open",  function(event){
  }, false);
  
  es.addEventListener("message", function(event){
  	if (sseOn == true) {
		jsonObject = JSON.parse(event.data);
		($('#chart').highcharts() !== undefined) ? updateChartData() : null;
    updateMetadata();
	}
  }, false);
  
  es.addEventListener("error",  function(event){
  }, false);



//*********************************************************************** Helper Functions
  function initDropdowns(){

    if (jsonObject === undefined){
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
    
    $('#Charts').selectpicker('val', 'Highcharts');

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

            
            stopWorker();
      }, false);  
                  
      function stopWorker() { 
            w.terminate();
            w = undefined;
      }
}