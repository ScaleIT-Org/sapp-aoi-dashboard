  // create an array with nodes
    var nodes = new vis.DataSet([
        {id: 1, label: 'Boards'},
    ]);

    // create an array with edges
    var edges = new vis.DataSet([
        {from: 1, to: 3}
    ]);


    // provide the data in the vis format
    var data = {
        nodes: nodes,
        edges: edges
    };
    var options = {
        autoResize: true,
        height: '100%',
        width: '100%',

        manipulation: {
            enabled: false,
            initiallyActive: false,
            addNode: true,
            addEdge: true,
            editEdge: true,
            deleteNode: true,
            deleteEdge: true,
        },
        layout: {
            improvedLayout:true
        }
    };

var network;
$(document).ready(function() {
    // create a network
    //var container = document.getElementById('mynetwork');
    // initialize your network!
    //network = new vis.Network(container, data, options);
});

    function dropdownBoardActionVisjs() {
    }
    function dropdownComponentActionVisjs() {
    }
    function updateChartDataVisjs(e) {
        var tmpNodes = [{id: 1, label: 'Boards'}];
        var tmpedges =[];
        var nodeId = 2;
        for(b in e.data) {
            tmpNodes.push({id: nodeId, label: b});
            tmpedges.push({from: 1, to: nodeId});
            var originID = nodeId;
            nodeId++;
            for(i in e.data[b][0]) {
                tmpNodes.push({id: nodeId, label: e.data[b][0][i].text});
                tmpedges.push({from: originID, to: nodeId});
                nodeId++;
            }
        }
        if (network !== undefined){
            network.setData({nodes: new vis.DataSet(tmpNodes), edges: new vis.DataSet(tmpedges)});
            network.on("stabilizationProgress", function(params) {
                    var maxWidth = 496;
                    var minWidth = 20;
                    var widthFactor = params.iterations/params.total;
                    var width = Math.max(minWidth,maxWidth * widthFactor);

                    //document.getElementById('bar').style.width = width + 'px';
                    document.getElementById('visjsload').style.cssText= 'font-size: 30px; cursor: pointer; text-align:center;';
                    document.getElementById('visjsload').innerHTML = "Loading: " + Math.round(widthFactor*100) + '%';
                });
            network.once("stabilizationIterationsDone", function() {
                document.getElementById('visjsload').innerHTML = '100%';
                var elem = document.getElementById('visjsload');
                elem.parentNode.removeChild(elem);
                //document.getElementById('bar').style.width = '496px';
                //document.getElementById('loadingBar').style.opacity = 0;
                // really clean the dom element
                //setTimeout(function () {document.getElementById('loadingBar').style.display = 'none';}, 500);
            });
        } 
    }