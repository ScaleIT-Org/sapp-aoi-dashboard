self.addEventListener('message', function(e) {
	var jsonObject = e.data;
	var result = {}
	for (b in jsonObject.BoardsUnderTest) {
		var seriesData = [];
		var components = [];
		var integratedCircuits = [];
							
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
			components.push({x: x, y: y, text: label});
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
						integratedCircuits.push({x: x, y: y, text: label});
						x = null;
						y = null;
						done = false;
					}
				}

			} 
		}
		result[b] = [seriesData, components, integratedCircuits];	
	}
	self.postMessage(result);
	
}, false);