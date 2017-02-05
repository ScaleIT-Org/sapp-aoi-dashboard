var plot;
$(document).ready(function() {

	// SCATTER PLOT
	var xScale = new Plottable.Scales.Linear();
	var yScale = new Plottable.Scales.Linear();

	var xAxis = new Plottable.Axes.Numeric(xScale, "bottom");
  	var yAxis = new Plottable.Axes.Numeric(yScale, "left");

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


  	//LABELS
  	var plotHeading = new Plottable.Components.TitleLabel("SICK AOI DATA X, Y Shift", "0").yAlignment("center")
  	var plotHeading2 = new Plottable.Components.Label("Auftrag 5855733", "0").yAlignment("center").padding(10);

  	//Putting all together
	var plotAndBand = new Plottable.Components.Group([bandPlot, plot]);
 	var gridlines =  new Plottable.Components.Gridlines(xScale, yScale);
    var cg = new Plottable.Components.Group([plotAndBand, gridlines]);

	var chart = new Plottable.Components.Table([
        [null, plotHeading],
        [null, plotHeading2],
        [yAxis, cg],
        [null,  xAxis]
      	]);
  	chart.renderTo("#chart3");

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

	//RESIZE EVENT
	window.addEventListener("resize", function() {
	  plot.redraw();
	});

	$('#chart3').attr('height', 600);
	$('#chart3').attr('width', "95%");
	$('#chart3').attr('style', "display: block; margin: auto; overflow: visible;");

});

function dropdownBoardActionPlottable() {
	dropdownAction();
}

function dropdownComponentActionPlottable() {
	dropdownAction();
}

function dropdownAction() {
	if(tempData === undefined) {
		return;
	}
	var colors = ['#0000FF', '#fc9c3a', '#11a200', '#95c200'];
	var cIndex = 0;
	var data = [{"board": "", "label": "Reference" ,"x": 0, "y": 0, "radius": 13, "color": "#000000"}];

	var selectedBoards = $('#Boards').val();
    var selectedComponents = $('#Components').val();

	for(b in tempData.data) {
		for (sb in selectedBoards) {
			if(b.startsWith(selectedBoards[sb])) {
				for(i in tempData.data[b][0]) {
					for (sc in selectedComponents) {
						if(tempData.data[b][0][i].text.startsWith(selectedComponents[sc])) {
							data.push({"board": b, "label": tempData.data[b][0][i].text ,"x": tempData.data[b][0][i].x, "y": tempData.data[b][0][i].y, "radius": 13, "color": colors[cIndex]});
						}
					}
				};
			}
		}
		cIndex++;
	}

	dataset.data(data);
	plot.redraw();
}

var tempData;
var dataset;
function updateChartDataPlottable(e) {
	//console.log(e.data);
	tempData = e;
	var colors = ['#0000FF', '#fc9c3a', '#11a200', '#95c200'];
	var cIndex = 0;
	var data = [{"board": "", "label": "Reference" ,"x": 0, "y": 0, "radius": 13, "color": "#000000"}];

	for(b in e.data) {
		for(i in e.data[b][0]) {
			data.push({"board": b, "label": e.data[b][0][i].text ,"x": e.data[b][0][i].x, "y": e.data[b][0][i].y, "radius": 13, "color": colors[cIndex]});
		};
		cIndex++;
	}
	dataset = new Plottable.Dataset(data)
	plot.addDataset(dataset);
	dataset.data(data);
	dropdownBoardActionPlottable();
	plot.redraw();
}