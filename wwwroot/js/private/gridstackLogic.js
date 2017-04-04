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
			  removeTimeout: 2000

			  });
			  new function () {
 
                this.grid = $('.grid-stack').data('gridstack');
                this.addNewWidget = function () {
                    var node = {
                                x: 0,
                                y: 999,
                                width: 2,
                                height: 5,
                                content: '<ul style="padding:8px">'
                            };
                    node.content += '<li><a class="btn btn-primary btn-md" id="newHighchart" onclick="newHighchart(this)">+ Plot (Highcharts)</a> </li> <br>' ;
                    node.content += '<li><a class="btn btn-primary btn-md" id="newPlotly" onclick="newPlotly(this)">+ Plot (Plotly)</a> </li> <br>';
                    node.content += '<li><a class="btn btn-primary btn-md" id="newPlotable" onclick="newPlotable(this)">+ Plot (Plotable)</a> </li> <br>';
                    node.content += '<li><a class="btn btn-primary btn-md" id="newJsonVis" onclick="newJsonvis(this)">+ JsonVis </a> </li> <br>';
                    node.content += '<li><a class="btn btn-primary btn-md" id="newMetadata" onclick="newMetadata(this)">+ Metadata </a> </li> <br>';
                    node.content += '<li><input type="text" class="form-control" id="iframeWidget" placeholder="iframe URL" ><font size="1.5">Example:http://localhost:3000/machine1</font><br><a class="btn btn-primary btn-xs" id="newUrl" onclick="newIframe(this)"> Ok </a>';
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
				var ul = document.createElement('ul');
				var uid = ("w").concat(Math.floor((1 + Math.random()) * 0x10000).toString(16));
				ul.setAttribute("id", uid);
				node.appendChild(ul);

	            var chart = $('#'+ uid).highcharts(highchartsOptions);
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
				var ul = document.createElement('ul');
				var uid = ("w").concat(Math.floor((1 + Math.random()) * 0x10000).toString(16));
				ul.setAttribute("id", uid);
				node.appendChild(ul);

	            Plotly.newPlot(uid, mySeries, layout);
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
				node.appendChild(ul);

	            var plot;
	            
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
			  	plot.redraw();
			  	plottablePlots.push(plot);
			  	updateChartData();
	            $('.grid-stack').data('gridstack').setAnimation(true);
	        }
	        function newJsonvis(gridElement){
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
				var ul = document.createElement('ul');
				var uid = ("w").concat(Math.floor((1 + Math.random()) * 0x10000).toString(16));
				ul.setAttribute("id", uid);
				ul.setAttribute("style", 'overflow: scroll;');
				node.appendChild(ul);

	            	d3.jsonldVis(jsonObject, '#'+uid,     {
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
			function newMetadata(gridElement){
				//remove Buttons
				var node = gridElement.parentNode.parentNode.parentNode;
				while (node.firstChild) {
				    node.removeChild(node.firstChild);
				}
				//Resize Widget
				$('.grid-stack').data('gridstack').resize(
				    node.parentNode, 4, 5
				);
				//add Chart
				$('.grid-stack').data('gridstack').setAnimation(false);
				var ul = document.createElement('ul');
				var legend = document.createElement('legend')
				var header = document.createTextNode("Metadata");
				var uid = ("w").concat(Math.floor((1 + Math.random()) * 0x10000).toString(16));
				ul.setAttribute("id", uid);
				legend.appendChild(header);
				node.appendChild(legend);
				node.appendChild(ul);

				if (jsonObject === undefined){
			        return;
			      } 
			      var str = "";
			      for (i in jsonObject){
			            if (i != "BoardsUnderTest") {
			            str += i + ""+" : "+ jsonObject[i]+""+"<br>";
			            }
			      }
			      document.getElementById(uid).innerHTML = str
	            $('.grid-stack').data('gridstack').setAnimation(true);
			}
			function newIframe(gridElement){
				//remove Buttons
				var node = gridElement.parentNode.parentNode.parentNode;
				var url = $("#iframeWidget").val();
				while (node.firstChild) {
				    node.removeChild(node.firstChild);
				}
				//Resize Widget
				$('.grid-stack').data('gridstack').resize(
				    node.parentNode, 6, 8
				);
				//add Chart
				$('.grid-stack').data('gridstack').setAnimation(false);
				var ul = document.createElement('ul');
				var uid = ("w").concat(Math.floor((1 + Math.random()) * 0x10000).toString(16));
				ul.setAttribute("id", uid);
				node.appendChild(ul);

	            var ifrm = document.createElement("iframe");

		        ifrm.setAttribute("src", url);
				ifrm.setAttribute("frameborder", "0");
				ifrm.setAttribute("scrolling", "no");
		        ifrm.style.width = "100%";
		        ifrm.style.height = "95%";
		        node.appendChild(ifrm);
	            $('.grid-stack').data('gridstack').setAnimation(true);
			}