$(function () {
			  $('.grid-stack').gridstack({

			  // turns animation on
			  animate: true,

			  // amount of columns
			  width: 12,

			  // maximum rows amount
			  height: 0, 

			  // widget class
			  item_class: 'grid-stack-item',

			  // class for placeholder
			  placeholder_class: 'grid-stack-placeholder',

			  // text for placeholder
			  placeholderText: '',

			  // draggable handle selector
			  handle: '.grid-stack-item-content',

			  // class for handle
			  handleClass: null,

			  // one cell height
			  cell_height: 60,

			  // vertical gap size
			  vertical_margin: 20,

			  // if false it tells to do not initialize existing items
			  auto: true,
			  
			  // minimal width.
			  min_width: 768,

			  // enable floating widgets
			  float: false,

			  // vertical gap size
			  vertical_margin: 20,

			  // makes grid static
			  static_grid: false,

			  // if true the resizing handles are shown even the user is not hovering over the widget
			  always_show_resize_handle: false,

			  // allows to owerride jQuery UI draggable options
			  draggable: {handle: '.grid-stack-item-content', scroll: true, appendTo: 'body'},

			  // allows to owerride jQuery UI resizable options
			  resizable: {autoHide: true, handles: 'sw, se'},

			  // disallows dragging of widgets
			  disableDrag: false,

			  // disallows resizing of widgets
			  disableResize: false,

			  // if `true` turns grid to RTL. 
			  // Possible values are `true`, `false`, `'auto'`
			  rtl: 'auto',

			  // if `true` widgets could be removed by dragging outside of the grid
			  removable: true,

			  // time in milliseconds before widget is being removed while dragging outside of the grid
			  removeTimeout: 2000,

			  });
			  $('.grid-stack').on('resizestop', function (event, ui) {
				//console.debug(ui.element[0].offsetHeight);
				//console.debug(ui.element[0].attributes.getNamedItem("data-gs-width").value);
				//Highchart Resize
				Highcharts.charts.forEach(function(entry) {
				 	entry.reflow();
				});
				//Plotly Resize
				var update = {
				  width: ui.element[0].offsetWidth,  // or any new width
				  height: ui.element[0].offsetHeight-20  // " "
				};
				try{Plotly.relayout(ui.element[0].getElementsByClassName("js-plotly-plot")[0].id, update)}catch(e){};
			  });
			  new function () {
 
                this.grid = $('.grid-stack').data('gridstack');
                this.addNewWidget = function () {
                    var node = {
                                x: 0,
                                y: 999,
                                width: 2,
                                height: 6,
                                content: '<ul style="padding:8px">'
                            };
                    node.content += '<li><a class="btn btn-primary btn-md" id="newHighchart" onclick="newHighchart(this)">+ Plot (Highcharts)</a> </li> <br>' ;
                    node.content += '<li><a class="btn btn-primary btn-md" id="newPlotly" onclick="newPlotly(this)">+ Plot (Plotly)</a> </li> <br>';
                    node.content += '<li><a class="btn btn-primary btn-md" id="newPlotable" onclick="newPlotable(this)">+ Plot (Plotable)</a> </li> <br>';
                    node.content += '<li><a class="btn btn-primary btn-md" id="newJsonVis" onclick="newJsonvis(this)">+ JsonVis </a> </li> <br>';
                    node.content += '<li><a class="btn btn-primary btn-md" id="newVisjs" onclick="newVisjs(this)">+ Network Graph (VisJs) </a> </li> <br>';
                    node.content += '<li><a class="btn btn-primary btn-md" id="newMetadata" onclick="newMetadata(this)">+ Metadata </a> </li> <br>';
                    node.content += '<li><input type="text" class="form-control" id="iframeWidget" placeholder="iframe URL" ><font size="1.5">Example:http://localhost:3001</font><br><a class="btn btn-primary btn-xs" id="newUrl" onclick="newIframe(this)"> Ok </a>';
                    node.content += '</ul>';

                    this.grid.addWidget($('<div><div class="grid-stack-item-content panel panel-primary" style="box-shadow: 2px 2px 20px grey;">' + node.content + '</div></div>'),
                            node.x, node.y, node.width, node.height, true);
                    return false;
                }.bind(this);
                $('#add-new-widget').click(this.addNewWidget);
            };
});
			function newHighchart(gridElement){
				//remove Buttons
				var node = gridElement.parentNode.parentNode.parentNode;
				while (node.firstChild) {
				    node.removeChild(node.firstChild);
				}
				//Resize Widget
				$('.grid-stack').data('gridstack').resize(
				    node.parentNode, 6, 8
				);
				//add Chart
				$('.grid-stack').data('gridstack').setAnimation(false);
				
				genGridElement(node, "Tree Graph (JsonVis)");
				node.lastChild.setAttribute("style", "margin-left: -5%");

	            var chart = $('#'+ node.lastChild.getAttribute('id')).highcharts(highchartsOptions);
	            $('.grid-stack').data('gridstack').setAnimation(true);
	            updateChartData();
	        }
	        function newPlotly(gridElement){
				//remove Buttons
				var node = gridElement.parentNode.parentNode.parentNode;
				while (node.firstChild) {
				    node.removeChild(node.firstChild);
				}
				//Resize Widget
				$('.grid-stack').data('gridstack').resize(
				    node.parentNode, 6, 8
				);
				//add Chart
				$('.grid-stack').data('gridstack').setAnimation(false);

				genGridElement(node, "Tree Graph (JsonVis)");
				node.lastChild.setAttribute("style", "margin-left: -5%; height: calc(100% - 50px);");

				var copiedLayout = jQuery.extend({}, layout)
	            Plotly.newPlot(node.lastChild.getAttribute('id'), mySeries, copiedLayout);
	            $('.grid-stack').data('gridstack').setAnimation(true);
	        }
	        function newPlotable(gridElement){
				//remove Buttons
				var node = gridElement.parentNode.parentNode.parentNode;
				while (node.firstChild) {
				    node.removeChild(node.firstChild);
				}
				//Resize Widget
				$('.grid-stack').data('gridstack').resize(
				    node.parentNode, 6, 8
				);
				//add Chart
				$('.grid-stack').data('gridstack').setAnimation(false);
				var ul = document.createElementNS("http://www.w3.org/2000/svg", "svg");
				var uid = ("w").concat(Math.floor((1 + Math.random()) * 0x10000).toString(16));
				ul.setAttribute("id", uid);

				ul.setAttribute("style", ' overflow: auto; height: calc(100% - 30px); width: 100%');
				//Top bar
				var legend = document.createElement('legend')
				var header = document.createTextNode("Plottable");
				legend.setAttribute("style", 'height: 30px; width: 100%; margin: 0px;');
				legend.appendChild(header);
				node.appendChild(legend);
				node.appendChild(ul);

	            var plot;

	            var xScale = new Plottable.Scales.Linear();
				var yScale = new Plottable.Scales.Linear();

				var xAxis = new Plottable.Axes.Numeric(xScale, "bottom");
				var yAxis = new Plottable.Axes.Numeric(yScale, "left");

				var plotHeading = new Plottable.Components.TitleLabel("SICK AOI DATA X, Y Shift", "0").yAlignment("center")
				var plotHeading2 = new Plottable.Components.Label("Auftrag 5855733", "0").yAlignment("center").padding(10);
	            
	            plot = new Plottable.Plots.Scatter()
				  .x(function(d) { return d.x; }, xScale)
				  .y(function(d) { return d.y; }, yScale)
			  	  .size(function(d) { return d.radius; })
				  .attr("fill", function(d) { return d.color; });

				//BAND PLOT
				var bands = [
			  		{"name":"warnung",  "low": -100, "high": -60, "color": "#f4ff81"},
			  		{"name":"toleranz",  "low": -60, "high": 60, "color": "#a5d6a7"},
			  		{"name":"warnung",  "low": 60, "high": 100, "color": "#f4ff81"}
				];

				var bandPlot = new Plottable.Plots.Rectangle()
			  	.y(0)
			  	.y2(function() { return bandPlot.height(); })
			  	.x(function(d) { return d.low; }, xScale)
			  	.x2(function(d) { return d.high; })
			  	.attr("fill", function(d) { return d.color})
			  	.addDataset(new Plottable.Dataset(bands));

			  	var plotAndBand = new Plottable.Components.Group([bandPlot, plot]);
			 	var gridlines =  new Plottable.Components.Gridlines(xScale, yScale);
			    var cg = new Plottable.Components.Group([plotAndBand, gridlines]);

				var chart = new Plottable.Components.Table([
			        [null, plotHeading],
			        [null, plotHeading2],
			        [yAxis, cg],
			        [null,  xAxis]
			      	]);
			  	chart.renderTo('#'+uid);

			  	//Tooltip

				var tooltipAnchorSelection = plot.foreground().append("circle").attr({
				  r: 3,
				  opacity: 0,
				});

				var tooltipAnchor = $(tooltipAnchorSelection.node());
				tooltipAnchor.tooltip({
				  animation: false,
				  container: "body",
				  placement: "auto",
				  title: "text",
				  trigger: "manual",
				  html: true,
				});

				// Setup Interaction.Pointer
				var pointer = new Plottable.Interactions.Pointer();
				pointer.onPointerMove(function(p) {
				  var closest = plot.entityNearest(p);
				  if (closest) {
				    tooltipAnchorSelection.attr({
				      cx: closest.position.x,
				      cy: closest.position.y,
				      "data-original-title": "BoardsUnderTest " + closest.datum.board + "<br>" + closest.datum.label + "<br>" + closest.datum.x + "x, " + closest.datum.y + "y",
				    });
				    tooltipAnchor.tooltip("show");
				  }
				});

				pointer.onPointerExit(function() {
				  tooltipAnchor.tooltip("hide");
				});

				pointer.attachTo(plot);

			  	plot.redraw();
			  	plottablePlots.push(plot);
			  	updateChartData();
	            $('.grid-stack').data('gridstack').setAnimation(true);
	        }
	        function newJsonvis(gridElement){
	        	//remove Buttons
				var node = gridElement.parentNode.parentNode.parentNode;

				//Resize Widget
				$('.grid-stack').data('gridstack').resize(
				    node.parentNode, 6, 8
				);
				//add Chart
				$('.grid-stack').data('gridstack').setAnimation(false);

				genGridElement(node, "Tree Graph (JsonVis)");
				node.lastChild.setAttribute("style", 'overflow: auto; height: calc(100% - 30px); width: 100%');

	            	d3.jsonldVis(jsonObject, '#'+node.lastChild.getAttribute('id'),     {
					  h: null, // height
					  w: 800, // width
					  maxLabelWidth: 250, // maximum label width
					  transitionDuration: 0, // transition duration, in ms
					  transitionEase: 'cubic-in-out', // transition easing function
					  minRadius: 3 ,// minimum node radius
					  scalingFactor: 500 // factor to scale node sizes
					});
	            setTimeout(function(){$('.grid-stack').data('gridstack').setAnimation(true);}, 500);
	        }
	        function newVisjs(gridElement){
				//remove Buttons
				var node = gridElement.parentNode.parentNode.parentNode;
				//Resize Widget
				$('.grid-stack').data('gridstack').resize(
				    node.parentNode, 6, 10
				);
				$('.grid-stack').data('gridstack').setAnimation(false);
				
				genGridElement(node, "Network Graph (Visjs)")
				
				var loading = document.createElement('div');
				loading.setAttribute("id", "visjsload");
				node.insertBefore(loading, node.childNodes[1]);
	            network = new vis.Network(node.lastChild, data, options);
				$('.grid-stack').data('gridstack').setAnimation(true);
	            updateChartData();
	        }
			function newMetadata(gridElement){
				//remove Buttons
				var node = gridElement.parentNode.parentNode.parentNode;

				//Resize Widget
				$('.grid-stack').data('gridstack').resize(
				    node.parentNode, 4, 5
				);
				//add Chart
				$('.grid-stack').data('gridstack').setAnimation(false);

				genGridElement(node, "Metadata")
				node.lastChild.setAttribute("style", 'margin-left: 20px')

				if (jsonObject === undefined){
			        return;
			      } 
			      var str = "";
			      for (i in jsonObject){
			            if (i != "BoardsUnderTest") {
			            str += i + ""+" : "+ jsonObject[i]+""+"<br>";
			            }
			      }
			      node.lastChild.innerHTML = str
	            $('.grid-stack').data('gridstack').setAnimation(true);
			}
			function newIframe(gridElement){
				//remove Buttons
				var node = gridElement.parentNode.parentNode.parentNode;
				var url = $("#iframeWidget").val();
				
				if(!url.startsWith("http://")) {
					url = "http://".concat(url);
				}
				//Resize Widget
				$('.grid-stack').data('gridstack').resize(
				    node.parentNode, 6, 8
				);
				//add Chart
				$('.grid-stack').data('gridstack').setAnimation(false);
				
				genGridElement(node, "iframe")


	            var ifrm = document.createElement("iframe");

		        ifrm.setAttribute("src", url);
				ifrm.setAttribute("frameborder", "0");
				ifrm.setAttribute("scrolling", "yes");
		        ifrm.style.width = "100%";
		        ifrm.style.height = "95%";
		        node.lastChild.appendChild(ifrm);
	            $('.grid-stack').data('gridstack').setAnimation(true);
			}

			function genGridElement(node, title) {
				while (node.firstChild) {
				    node.removeChild(node.firstChild);
				}
				var ul = document.createElement('div');
				var uid = ("w").concat(Math.floor((1 + Math.random()) * 0x10000).toString(16));
				ul.setAttribute("id", uid);
				ul.setAttribute("style", 'height: calc(100% - 30px); width: 100%  margin:0');
				//Top bar
				var legend = document.createElement('legend')
				var header = document.createTextNode(title);
				var closeButton = document.createElement('button')
				var closeButtonSpan = document.createElement('span')
				closeButtonSpan.className = "glyphicon glyphicon-remove-circle";
				closeButton.className = "btn btn-xs btn-default pull-right removeWidget";
				legend.setAttribute("style", 'height: 30px; width: 100%; margin: 0px;');
				legend.appendChild(header);
				closeButton.appendChild(closeButtonSpan);
				legend.appendChild(closeButton);//'<button type="button" class="btn btn-default removeWidget" aria-label="Left Align"><span class="glyphicon glyphicon-remove-circle" aria-hidden="true"></span></button>')
				node.appendChild(legend);

				node.appendChild(ul);
			}


			$(document).on('click', '.removeWidget', function (e) {
			    e.preventDefault();
			    var grid = $('.grid-stack').data('gridstack'),
			        el = $(this).closest('.grid-stack-item')

			    grid.remove_widget(el);
			});


//********************************************************************************************DASHBOARD-INITIALISATION 
//This one is executed after all the other scripts when Page is Ready

		function initDashboard() {
			var node = {
                x: 0,
                y: 999,
                width: 2,
                height: 6,
                content: '<ul style="padding:8px">'
            };

			//Metadata Widget
	        var test = $('.grid-stack').data('gridstack').addWidget($('<div><div class="grid-stack-item-content panel panel-primary" style="box-shadow: 2px 2px 20px grey;"></div></div>'),
	                node.x, node.y, node.width, node.height, true);

			var tempElement = document.createElement("div");
			var tempElement2 = document.createElement("div");
			var tempElement3 = document.createElement("div");
			
	        newMetadata(test[0].firstChild.appendChild(tempElement).appendChild(tempElement2).appendChild(tempElement3));

			
	        //Default Widget

	        node.content += '<li><a class="btn btn-primary btn-md" id="newHighchart" onclick="newHighchart(this)">+ Plot (Highcharts)</a> </li> <br>' ;
	        node.content += '<li><a class="btn btn-primary btn-md" id="newPlotly" onclick="newPlotly(this)">+ Plot (Plotly)</a> </li> <br>';
	        node.content += '<li><a class="btn btn-primary btn-md" id="newPlotable" onclick="newPlotable(this)">+ Plot (Plotable)</a> </li> <br>';
	        node.content += '<li><a class="btn btn-primary btn-md" id="newJsonVis" onclick="newJsonvis(this)">+ JsonVis </a> </li> <br>';
	        node.content += '<li><a class="btn btn-primary btn-md" id="newVisjs" onclick="newVisjs(this)">+ Network Graph (VisJs) </a> </li> <br>';
	        node.content += '<li><a class="btn btn-primary btn-md" id="newMetadata" onclick="newMetadata(this)">+ Metadata </a> </li> <br>';
	        node.content += '<li><input type="text" class="form-control" id="iframeWidget" placeholder="iframe URL" ><font size="1.5">Example:http://localhost:3001</font><br><a class="btn btn-primary btn-xs" id="newUrl" onclick="newIframe(this)"> Ok </a>';
	        node.content += '</ul>';

	        $('.grid-stack').data('gridstack').addWidget($('<div><div class="grid-stack-item-content panel panel-primary" style="box-shadow: 2px 2px 20px grey;">' + node.content + '</div></div>'),
	                node.x, node.y, 3, node.height, true);
	    }