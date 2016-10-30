var initMonitoring = false;

var dataCPU = [
	{ values: [0,50, 50],
	  rotation: 90,
	  text: ['free', 'used', ''],
	  textinfo: 'text',
	  textposition:'inside',
	  marker: {colors:['rgba(14, 127, 0, .5)', 'rgba(232, 226, 202, .5)', 'rgba(255, 255, 255, 0)']},
	  labels: ['free', 'used', ''],
	  hoverinfo: 'label',
	  hole: .25,
	  type: 'pie',
	  showlegend: false,
}];
var dataMem = [
  { values: [0,0, 50],
  rotation: 90,
  text: ['free', 'used', ''],
  textinfo: 'text',
  textposition:'inside',
  marker: {colors:['rgba(14, 127, 0, .5)', 'rgba(232, 226, 202, .5)', 'rgba(255, 255, 255, 0)']},
  labels: ['free', 'used', ''],
  hoverinfo: 'label',
  hole: .25,
  type: 'pie',
  showlegend: false,
}];

function updateMonitoringData(){

	var maxMemory = sidata.mem.total;
	var usedMemory = sidata.mem.used;
	var cpuLoad = sidata.currentLoad.currentload;

	dataCPU[0].values[0] = (50/100)*(100 - cpuLoad);
	dataCPU[0].values[1] = (50/100)*cpuLoad;
	dataMem[0].values[0] = (50/maxMemory)*(maxMemory - usedMemory);
	dataMem[0].values[1] = (50/maxMemory)*usedMemory;

	var layoutMem = {
	  title: 'Memory',
	  height: null,
	  width: null,
	  xaxis: {zeroline:false, showticklabels:false,
	             showgrid: false, range: [-1, 1]},
	  yaxis: {zeroline:false, showticklabels:false,
	             showgrid: false, range: [-1, 1]},
       margin: {
	    l: 50,
	    r: 50,
	    b: -1100,
	    t: 100,
	    pad: 4
	  },
	};
	var layoutCPU = {
	  title: 'CPU',
	  height: null,
	  width: null,
	  xaxis: {zeroline:false, showticklabels:false,
	             showgrid: false, range: [-1, 1]},
	  yaxis: {zeroline:false, showticklabels:false,
	             showgrid: false, range: [-1, 1]},
	  margin: {
	    l: 50,
	    r: 50,
	    b: -1100,
	    t: 100,
	    pad: 4
	  },
	};

	if (initMonitoring === false) {
		Plotly.newPlot('mem', dataMem, layoutMem);
		Plotly.newPlot('cpu', dataCPU, layoutCPU);
		initMonitoring = true;
	} else {
		Plotly.redraw('cpu');
		Plotly.redraw('mem');
	}
}
