	var mySeries = [{
		  id: "ref",
		  x: [0],
		  y: [0],
		  mode: 'markers',
		  type: 'scatter',
		  name: 'Reference',
		  showlegend: false,
		  visible: true,
		  text: ['Reference'],
		  marker: {
		  	color: 'rgba(100, 100, 100, 0.5)',
		  	size: 12
		  }
		}];
	var seriesBackup = [{
		  id: "ref",
		  x: [0],
		  y: [0],
		  mode: 'markers',
		  type: 'scatter',
		  name: 'Reference',
		  showlegend: false,
		  visible: true,
		  text: ['Reference'],
		  marker: {
		  	color: 'rgba(100, 100, 100, 0.5)',
		  	size: 12
		  }
		}];
		var layout = {
			hovermode:'closest',
			width: null,
			height: null,
			legend: {"orientation": "h"},
		  	title:'SICK AOI DATA X, Y Shift <br> <span style="font-size: 10pt">Auftrag 5855733</span>',
		  	colors: ['#0000FF', '#fc9c3a', '#11a200', '#95c200' ],
		  	xaxis: {
		  		range: [-120, 120]
		  	},
		  	'shapes': [
		        {
		            type: 'rect',
		            // x-reference is assigned to the x-values
		            xref: 'x',
		            // y-reference is assigned to the plot paper [0,1]
		            yref: 'paper',
		            "layer": "below",
		            x0: -100,
		            y0: -100,
		            x1: 100,
		            y1: 100,
		            fillcolor: '#f4ff81',
		            opacity: 1,
		            line: {
		                width: 0
		            }
		        },
		        {
		            type: 'rect',
		            // x-reference is assigned to the x-values
		            xref: 'x',
		            // y-reference is assigned to the plot paper [0,1]
		            yref: 'paper',
		            "layer": "below",
		            x0: -60,
		            y0: -100,
		            x1: 60,
		            y1: 100,
		            fillcolor: '#a5d6a7',
		            opacity: 1,
		            line: {
		                width: 0
		            }
		        },
		        {
		            'type': 'line',
		            "layer": "below",
		            yref: 'paper',
		            'x0': 100,
		            'y0': -100,
		            'x1': 100,
		            'y1': 200,
		            'line': {
		                'color': 'red',
		                'width': 2,
		                'dash': 'dash',
		            },
		        },
		        {
		            'type': 'line',
		            "layer": "below",
		            xref: 'paper',
		            'x0': -120,
		            'y0': 140,
		            'x1': 140,
		            'y1': 140,
		            'line': {
		                'color': 'red',
		                'width': 2,
		                'dash': 'dash',
		            },
		        },
		    ],
		  annotations: [
			    {
			      x: 30,
			      y: 0,
			      "xref": "x", 
	    		  "yref": "paper",
			      text: 'Toleranz X',
			      showarrow: false,
			      
			    },
			    {
			      x: -30,
			      y: 0,
			      "xref": "x", 
	    		  "yref": "paper",
			      text: 'Toleranz -X',
			      showarrow: false,
			      
			    },
			    {
			      x: 80,
			      y: 0,
			      "xref": "x", 
	    		  "yref": "paper",
			      text: 'Warnung X',
			      showarrow: false,
			      
			    },
			    {
			      x: -80,
			      y: 0,
			      "xref": "x", 
	    		  "yref": "paper",
			      text: 'Warnung -X',
			      showarrow: false,
			      
			    },
			    {
			      x: 0,
			      y: 147,
			      "xref": "paper", 
	    		  "yref": "y",
			      text: 'Toleranz y',
			      showarrow: false,
			      
			    },
			    {
			      x: 93,
			      y: 1,
			      "xref": "x", 
	    		  "yref": "paper",
			      text: 'Toleranz X',
			      showarrow: false,
			    }
			  ]
		};
	$(document).ready(function () {
		var data = []
		var addIndex = 1;
		var seriesNr = 1;
		colors = ['#0000FF', '#fc9c3a', '#11a200', '#95c200' ]
		/*for (b in jsonObject.BoardsUnderTest) {
			
			var seriesData = {
				id: b,
				x: [],
				y: [],
				mode: 'markers',
				type: 'scatter',
				name: 'BoardsUnderTest '+b,
				showlegend: true,
		  		visible: false,
				text: [],
				hoverinfo: "x+y+text",
				marker: {
				  	size: 12,
				  	color: colors[seriesNr - 1]
				}
			};

			seriesNr++;			
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
				seriesData.x.push(x);
				seriesData.y.push(y);
				seriesData.text.push(label);
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
							seriesData.x.push(x);
							seriesData.y.push(y);
							seriesData.text.push(label);
							x = null;
							y = null;
							done = false;
						}
					}
					mySeries[addIndex] = seriesData;
					seriesBackup[addIndex] = (JSON.parse(JSON.stringify(seriesData)));
					addIndex++;
				} 
			}
		}*/
		Plotly.newPlot('chart2', mySeries, layout);
	});

	function dropdownBoardActionPlotly() {
	    //Hide all series 
	    mySeries.forEach(function(i) {
	    	if (i.id != "ref") {
	    		i.visible = false;
	    	}
	    });

	    //Show selected series
	    var selected = $('#Boards').val();
	    if(selected !== null) {
	        selected.forEach(function(i) {
	        	mySeries.forEach(function(j) {
	        		if (j.id === i) {
			    		j.visible = true;
	        		}
			    });
	        });
	    }
	    
	    plotlyElements = document.getElementsByClassName("js-plotly-plot");
	    for (var i = 0; i < plotlyElements.length; ++i) {
	        var item = plotlyElements[i]; 
	    	Plotly.redraw(item.id);


	    }
	}

	function dropdownComponentActionPlotly() {
	    //Show selected series
	    var selected = $('#Components').val();
	    var mySeriesIndex = 0;
	    
	    seriesBackup.forEach(function(j){
	        var newData = [];

	        var plotData = document.getElementById('chart2');
	        plotData.data[mySeriesIndex].x = JSON.parse(JSON.stringify(j.x));
	        plotData.data[mySeriesIndex].y = JSON.parse(JSON.stringify(j.y));
	        plotData.data[mySeriesIndex].text = JSON.parse(JSON.stringify(j.text));

	        var newX = [];
	        var newY = [];
	        var newText = [];

	        var index = 0;
	        j.text.forEach(function(i) {
	            if(selected !== null && selected.length < 2 && i.startsWith(selected[0])){
	            	newX.push(j.x[index])
	            	newY.push(j.y[index])
	            	newText.push(j.text[index])
	            } else if (selected !== null && selected.length === 2) {
	            	newX.push(j.x[index])
	            	newY.push(j.y[index])
	            	newText.push(j.text[index])
	            } 
	            index++;
	        });
	        plotData.data[mySeriesIndex].x = newX;
	        plotData.data[mySeriesIndex].y = newY;
	        plotData.data[mySeriesIndex].text = newText;
	        mySeriesIndex++;

	    });
	    plotlyElements = document.getElementsByClassName("js-plotly-plot");
	    for (var i = 0; i < plotlyElements.length; ++i) {
	        var item = plotlyElements[i]; 
	    	Plotly.redraw(item.id);
	    }
	}

	function updateChartDataPlotly(e) {

	    var seriesNr = 1;
	    var addIndex = 1;
		colors = ['#0000FF', '#fc9c3a', '#11a200', '#95c200' ]
	    for(b in e.data) {
	    	var seriesData = {
				id: b,
				x: [],
				y: [],
				mode: 'markers',
				type: 'scatter',
				name: 'BoardsUnderTest '+b,
				showlegend: true,
		  		visible: false,
				text: [],
				hoverinfo: "x+y+text",
				marker: {
				  	size: 12,
				  	color: colors[seriesNr - 1]
				}
			};
			seriesNr++;
			for(i in e.data[b][0]) {
				seriesData.x.push(e.data[b][0][i].x);
				seriesData.y.push(e.data[b][0][i].y);
				seriesData.text.push(e.data[b][0][i].text);
			};
			mySeries[addIndex] = seriesData;
			seriesBackup[addIndex] = (JSON.parse(JSON.stringify(seriesData)));
			addIndex++;

	    };
		dropdownBoardActionPlotly();
		dropdownComponentActionPlotly();
	}



