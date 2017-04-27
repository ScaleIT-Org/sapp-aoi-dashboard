$(document).ready(function() {

	/*d3.jsonldVis({"No Data": 0}, '#chart4',     {
	  h: null, // height
	  w: 800, // width
	  maxLabelWidth: 250, // maximum label width
	  transitionDuration: 0, // transition duration, in ms
	  transitionEase: 'cubic-in-out', // transition easing function
	  minRadius: 30 ,// minimum node radius
	  scalingFactor: 5 // factor to scale node sizes
	});*/
});

var initialized = false;

function dropdownBoardActionJsonVis() {
}
function dropdownComponentActionJsonVis() {
}
function updateChartDataJsonVis(e) {

	if(jsonObject === undefined || initialized === true) {
		return;
	}

	//Delete previous chart
	//$('#chart4').empty();

	/*d3.jsonldVis(jsonObject, '#chart4',     {
	  h: null, // height
	  w: 800, // width
	  maxLabelWidth: 250, // maximum label width
	  transitionDuration: 0, // transition duration, in ms
	  transitionEase: 'cubic-in-out', // transition easing function
	  minRadius: 3 ,// minimum node radius
	  scalingFactor: 500 // factor to scale node sizes
	});*/

	initialized = true;
}