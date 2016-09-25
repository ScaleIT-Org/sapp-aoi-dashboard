$(document).ready(function () {
    var chart = $('#chart').highcharts({
		// exporting: {
		// 	buttons: {
		// 		customButton: {
		// 			text: 'Randomize ',
		// 			onclick: function () {
		// 				for (i in this.series) {
		// 					var randomized = [];
		// 					data = this.series[i].data;
		// 					for (j in data) {
		// 						if (data[i].name != "Reference") {
		// 							xrand = Math.floor(Math.random() * (10-(-10)))+(-10)
		// 							yrand = Math.floor(Math.random() * (10-(-10)))+(-10)
		// 							randomized.push({x: data[j].x+xrand, y: data[j].y+yrand, text: data[j].text}); 	
		// 						}
		// 					}
		// 					this.series[i].setData(randomized);
		// 				}
		// 			}
		// 		},
		// 	}
		// },
        chart: {
            type: 'scatter',
            zoomType: 'xy',
            width: null,
            height: 600,
            events : {
            	load : function() {
						var seriesNr = 1;
						var chart = $('#chart').highcharts();

						for (b in jsonObject.BoardsUnderTest) {
							
							var seriesData = [];
							chart.addSeries({ 
								id: b,
								name: 'BoardsUnderTest '+b,
								showInLegend: false, 
								visible: false,
								data: []
							});
							
							var series = this.series[seriesNr];
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
								seriesData.push({x: x, y: y, text: label});
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
											x = null;
											y = null;
											done = false;
										}
									}
									series.setData(seriesData);
									mySeries.push(seriesData);
								} 
							}
						}

                }
            }
        },
        loading: {
            labelStyle: {
                //backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif")',
                //display: 'block',
                //width: '440px',
                //height: '200px',
                top: '45%',
                //backgroundColor: '#000'
            }
        },
		colors: ['#0000FF', '#fc9c3a', '#11a200', '#95c200' ],
        title: {
            text: 'SICK AOI Data X, Y Shift'
        },
        subtitle: {
            text: 'Auftrag 5855733'
        },
        xAxis: {
            title: {
                enabled: true,
                text: 'X-Axis'
            },
            min:-105,
        	max:105,
            //center Axis
            plotBands: [{
                from: -60,
                to: 0,
                color: '#a5d6a7',
                label:{text:'Toleranz -X',  verticalAlign: 'bottom', y: -3}
            },
			{
                from: 0,
                to: 60,
                color: '#a5d6a7',
                label:{text:'Toleranz X',  verticalAlign: 'bottom', y: -3}
            },
            {
                from: 60,
                to: 100,
                color: '#f4ff81',
                borderColor: 'yellow',
                label:{text:'Warnung X',  verticalAlign: 'bottom', y: -3}
            },
			{
                from: -100,
                to: -60,
                color: '#f4ff81',
                borderColor: 'yellow',
                label:{text:'Warnung -X',  verticalAlign: 'bottom', y: -3}
            }],
            plotLines: [{
			    color: 'black', // Color value
			    dashStyle: 'Solid', // Style of the plot line. Default to solid
			    value: 0, // Value of where the line will appear
			    width: 2 // Width of the line    
			  },
              {
                color: 'red', // Color value
                dashStyle: 'longdash', // Style of the plot line. Default to solid
                value: 100, // Value of where the line will appear
                //should be 180 according to spec
                width: 2, // Width of the line   
                label:{text:'Toleranz X'}
              },
			  {
                color: 'red', // Color value
                dashStyle: 'longdash', // Style of the plot line. Default to solid
                value: -100, // Value of where the line will appear
                //should be 180 according to spec
                width: 2, // Width of the line   
                label:{text:'Toleranz -X'}
              }],
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true
        },
        yAxis: {
            title: {
                text: 'Y-Axis'
            },
            // minRange:185,
            //min:0,
        	//max:150,
            //center Axsis
            plotLines: [{
			    color: 'black', // Color value
			    dashStyle: 'Solid', // Style of the plot line. Default to solid
			    value: 0, // Value of where the line will appear
			    width: 2 // Width of the line    
			  },
              {
                color: 'red', // Color value
                dashStyle: 'longdash', // Style of the plot line. Default to solid
                value: 140, // Value of where the line will appear
                //should be 140 according to spec
                width: 2, // Width of the line  
                label:{text:'Toleranz Y'} 
              }],
        },
        legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'top',
            x: 100,
            y: 70,
            floating: false,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
            borderWidth: 1
        },
        plotOptions: {
            scatter: {
                marker: {
                    radius: 5,
                    states: {
                        hover: {
                            enabled: true,
                            lineColor: 'rgb(100,100,100)'
                        }
                    }
                },
                states: {
                    hover: {
                        marker: {
                            enabled: false
                        }
                    }
                },
                tooltip: {
                    headerFormat: '<b>{series.name} </b><br>',
                    pointFormat: '<b>{point.text}</b> <br> {point.x} x, {point.y} y'
                }
            }
        },
        series: [{
			name: 'Reference',  
			showInLegend: false, 
            color: 'rgba(100, 100, 100, .5)',
            data: [[0, 0]]
        }]
    });
});



function dropdownBoardAction() {

    var chart = $('#chart').highcharts();
    //Hide all series 
    $(chart.series).each(function(){
        this.update({ showInLegend: false, visible: false});
    });

    //Show selected series
    var selected = $('#Boards').val();
    if(selected !== null) {
        selected.forEach(function(i) {
            var series = chart.get(i);
            series.update({ showInLegend: true, visible: true});
        });
    }
    chart.redraw();

};

function dropdownComponentAction() {
    var chart = $('#chart').highcharts();
    //chart.showLoading();
    //Show selected series
    var selected = $('#Components').val();
    var mySeriesIndex = 0;
    $(chart.series).each(function(){
        var newData = [];
        if(this.name !== "Reference"){
            this.update({data: mySeries[mySeriesIndex]})
            mySeries[mySeriesIndex].forEach(function(i) {
                if(selected !== null && i.text.startsWith(selected[0])){
                    newData.push({x: i.x, y: i.y, text: i.text});
                }
            });
            mySeriesIndex++;
        }
        (selected !== null && selected.length < 2)? this.update({data: newData}) : null;
        //In this case newData is empty
        (selected == null)? this.update({data: newData}) : null;
    });
    chart.redraw();
    //chart.hideLoading();
}
