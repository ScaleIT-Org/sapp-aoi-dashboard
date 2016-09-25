//************************************************************************* Globale Variablen
	var ajaxUrl = "http://localhost:3000/Get/";
	var jsonObject = {};
	var init = true;
	var sseOn = true;
	var mySeries = [];

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
        dropdownBoardAction();
		});

		//****************************************IC/C Selection
		$('#Components').off().on('change', function(){
        dropdownComponentAction();
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
	}
  }, false);
  
  es.addEventListener("error",  function(event){
  }, false);



//*********************************************************************** Helper Functions
  function initDropdowns(){

            for (b in jsonObject.BoardsUnderTest) {
              // Add options to Bootstrap-Select 
              $("#Boards").append($('<option>', {value: b,text: b}));
              $('.selectpicker').selectpicker('refresh');
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
            success: function(data) {
                  jsonObject = data;
            }
      });
}

//Crawl and show Json Metadata
function updateMetadata() {
      var str = "";
      for (i in jsonObject){

            if (i != "BoardsUnderTest") {
            str += i + ""+" : "+ jsonObject[i]+""+"<br>";
            }
      }
      document.getElementById("meta").innerHTML = str
 }

function updateChartData() {
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

            var chart = $('#chart').highcharts();
            if (chart !== undefined) {
                  mySeries = [];
                  var answer = e.data;

                  //Update Dropdown Menue
                  for (b in jsonObject.BoardsUnderTest) {
                        if (chart !== undefined && !chart.get(b)) {
                              //Create new Series
                              $("#Boards").append($('<option>', {value: b,text: b}));

                              //Set New Entry to Active
                              //$("#Boards").selectpicker('val', ($("#Boards").selectpicker('val') == null)? [b] : $("#Boards").selectpicker('val').concat([b]));

                              $('.selectpicker').selectpicker('refresh');

                              chart.addSeries({ 
                                    id: b,
                                    name: 'BoardsUnderTest '+b,
                                    showInLegend: false, 
                                    visible: false,
                                    data: []
                              });
                        }
                  }

                  //Update Chart Series
                  for (b in answer) {
                        var series = chart.get(b);
                        var selected = $('#Components').val();

                        (selected !== null && selected.length == 2)? series.setData(answer[b][0]) : null;
                        (selected !== null && selected.length == 1 && selected[0] == "C")? series.setData(answer[b][1]) : null ;
                        (selected !== null && selected.length == 1 && selected[0] == "IC")? series.setData(answer[b][2]) :  null;
                        (selected == null)? series.setData([]) : null;
                        
                        mySeries.push(answer[b][0]);
                  }
            }
            stopWorker();
      }, false);  
                  
      function stopWorker() { 
            w.terminate();
            w = undefined;
      }
}