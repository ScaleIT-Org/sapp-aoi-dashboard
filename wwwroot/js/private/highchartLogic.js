var mySeriesH = [];
var highchartsOptions = {
        // exporting: {
        //  buttons: {
        //      customButton: {
        //          text: 'Randomize ',
        //          onclick: function () {
        //              for (i in this.series) {
        //                  var randomized = [];
        //                  data = this.series[i].data;
        //                  for (j in data) {
        //                      if (data[i].name != "Reference") {
        //                          xrand = Math.floor(Math.random() * (10-(-10)))+(-10)
        //                          yrand = Math.floor(Math.random() * (10-(-10)))+(-10)
        //                          randomized.push({x: data[j].x+xrand, y: data[j].y+yrand, text: data[j].text});  
        //                      }
        //                  }
        //                  this.series[i].setData(randomized);
        //              }
        //          }
        //      },
        //  }
        // },
        chart: {
            type: 'scatter',
            zoomType: 'xy',
            width: null,
            events : {
                load : function() {/*
                        if (jsonObject === undefined){
                          return;
                        } 
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
                                    mySeriesH.push(seriesData);
                                } 
                            }
                        }*/
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
    }

$(document).ready(function () {
    var chart = $('#chart').highcharts(highchartsOptions);
});




function dropdownBoardActionHighchart() {

    highchartElements = document.getElementsByClassName("highcharts-container");
    for (var i = 0; i < highchartElements.length; ++i) {
        var item = highchartElements[i];  

        var chart = $('#'+item.parentNode.id).highcharts();
        //Hide all series 
        $(chart.series).each(function(){
            this.update({ showInLegend: false, visible: false});
        });

        //Show selected series
        var selected = $('#Boards').val();
        if(selected !== null) {
            selected.forEach(function(i) {
                var series = chart.get(i);
                (series != null) ? series.update({ showInLegend: true, visible: true}) : null;
            });
        }
        chart.redraw();
    }
};

function dropdownComponentActionHighchart() {
    highchartElements = document.getElementsByClassName("highcharts-container");
    for (var i = 0; i < highchartElements.length; ++i) {
        var item = highchartElements[i];  
        if (mySeriesH.length === 0){return;};
        var chart = $('#'+item.parentNode.id).highcharts();
        //chart.showLoading();
        //Show selected series
        var selected = $('#Components').val();
        var mySeriesHIndex = 0;
        $(chart.series).each(function(){
            var newData = [];
            if(this.name !== "Reference"){
                this.update({data: mySeriesH[mySeriesHIndex]});
                mySeriesH[mySeriesHIndex].forEach(function(i) {
                    if(selected !== null && i.text.startsWith(selected[0])){
                        newData.push({x: i.x, y: i.y, text: i.text});
                    }
                });
                mySeriesHIndex++;
            }
            (selected !== null && selected.length < 2)? this.update({data: newData}) : null;
            //In this case newData is empty
            (selected == null)? this.update({data: newData}) : null;
        });
        chart.redraw();
        //chart.hideLoading();
    }
}

function updateChartDataHighchart(e) {
    highchartElements = document.getElementsByClassName("highcharts-container");
    for (var i = 0; i < highchartElements.length; ++i) {
        var item = highchartElements[i];  

        var chart = $('#'+item.parentNode.id).highcharts();
                if (chart !== undefined) {
                      mySeriesH = [];
                      var answer = e.data;
                      //Update Dropdown Menue
                      for (b in jsonObject.BoardsUnderTest) {
                            if (chart !== undefined && !chart.get(b)) {
                                  //Create new Series
                                  //$("#Boards").append($('<option>', {value: b,text: b}));
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

                            mySeriesH.push(answer[b][0]);
                      }
                      dropdownBoardActionHighchart();
                }
    }
}
