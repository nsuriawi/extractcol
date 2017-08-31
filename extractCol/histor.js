var horiz = true,
	bar   = false, //no color bar is selected to start
	s;
	
var canvas = document.querySelector("canvas"),
    context = canvas.getContext("2d"),
    width = canvas.width,
    height = canvas.height;

var brush = d3.brush()
    .on("start brush", brushed)
    .on("end", brushended);

	
var svg = d3.select("svg");

var colorScale = d3.scaleLinear()
    .domain([0,1]);

var image = new Image;
image.src = "i2.png";
image.onload = loaded;

function loaded() {
  context.drawImage(this, 0, 0);

  svg.append("g")
      .attr("class", "brush")
      .call(brush)
      //.call(brush.move, [[300, 130], [450, 160]]);
}
//Selection of area brushed (replacement of extent in previous d3 iteration)
function brushed() {	
	s = d3.event.selection;
/*   var s = d3.event.selection,
      x0 = s[0][0],
      y0 = s[0][1],
      dx = s[1][0] - x0,
      dy = s[1][1] - y0,
      max = 0;
	  
  //checking whether bar is longer vertically or horizontally
  if(dx>=dy){horiz = true;}else{horiz =false;}		
  console.log("dx: ", dx, " dy: ", dy);
  
  if (dx && dy) {
	//data for the "extent" in brush
    var data = context.getImageData(x0, y0, dx, dy).data;			
	var cursor = Colors(255,32,32,255);//placeholder for user value
	console.log(data.length);
	
	
	var roundx = Math.floor(dx),
		roundy = Math.floor(dy);
		
	var pixa = reorder(roundx, roundy, data); //need (reorder) this line to happen after brushended, the domain is being preset before user entry.
	searchArray(roundx,roundy,pixa,cursor);
	//console.log(colorScale.range);
  } */
}

function brushended(){
	if(bar == false){
		console.log("prompt appears here");
		 var pMod = picoModal([
		  "<h1>Adjust Scale Below</h1>",
		  "Scale Min:<div id='scale_min' contentEditable='true'>" +
			  ((document.getElementById("scale_min")) ? document.getElementById("scale_min").textContent : 0) + "</div>",
		  "Scale Max:<div id='scale_max' contentEditable='true'>" +
			  ((document.getElementById("scale_max")) ? document.getElementById("scale_max").textContent : 1) + "</div>"
		].join("\n"))
		  .beforeClose(function(modal){
			colorScale.domain([
			  parseFloat(modal.modalElem().childNodes[2].textContent),
			  parseFloat(modal.modalElem().childNodes[4].textContent)
			])
			//document.getElementById("scale_min").innerText = colorScale.domain()[0]
			//document.getElementById("scale_max").innerText = colorScale.domain()[1]
			var d1 = document.getElementById("scale_min").innerText;
			var d2 = document.getElementById("scale_max").innerText;
			colorScale.domain[0] = d1;
			colorScale.domain[1] = d2;
			//console.log("The domain currently: ", colorScale.domain[0],", ", colorScale.domain[1]);
		  })
		  .afterClose(function(modal){
			//document.getElementById("scale_min").innerText = colorScale.domain()[0]
			//document.getElementById("scale_max").innerText = colorScale.domain()[1]
			var d1 = document.getElementById("scale_min").innerText;
			var d2 = document.getElementById("scale_max").innerText;
			console.log("d1 = ", d1, "d2 = ", d2);
			colorScale.domain[0] = d1;
			colorScale.domain[1] = d2;
			console.log("The domain ending with: ", colorScale.domain[0],", ", colorScale.domain[1]);
			  //var s = d3.event.selection,
			var	  x0 = s[0][0],
				  y0 = s[0][1],
				  dx = s[1][0] - x0,
				  dy = s[1][1] - y0,
				  max = 0;
				  
			  //checking whether bar is longer vertically or horizontally
			  if(dx>=dy){horiz = true;}else{horiz =false;}		
			  console.log("dx: ", dx, " dy: ", dy);
			  
			  //if (dx && dy) {
				//data for the "extent" in brush
				var data = context.getImageData(x0, y0, dx, dy).data;			
				var cursor = Colors(255,32,32,255);//placeholder for user value
				console.log(data.length);
				
				
				var roundx = Math.floor(dx),
					roundy = Math.floor(dy);
					
				var pixa = reorder(roundx, roundy, data); //need (reorder) this line to happen after brushended, the domain is being preset before user entry.
				searchArray(roundx,roundy,pixa,cursor);
				//console.log(colorScale.range);
			  //}
		  })
		  .show()
		  //bar = true;
	}
	//Another method would be created and used to store color values when using brush the second time.
}

/*var Colors = function(red,green,blue){//,alpha){
	this.red = red;
	this.green = green;
	this.blue = blue;
		//"alpha" : alpha
}*/


var Colors = function(red,green,blue){//,alpha){
	return{
		"red" : red,
		"green" : green,
		"blue" : blue,
		//"alpha" : alpha
	};

};

function searchArray(dx, dy, pixa, cursor){
//Searching array for cursor specific pixel
	var t0 = performance.now();
	
	for(var i=0;i<dx;i++)
	{
		for(var j=0;j<dy;j++)
		{
			if (JSON.stringify(cursor) === JSON.stringify(pixa[i][j]))
			{
				//console.log("found it!");
				break;
			}
		}
	}
	var t1 = performance.now();
	console.log("Call to searchArray took " + (t1 - t0) + " milliseconds.")
}

//two dimensional array: [dx,dy] = RGBA values (make an object)
function reorder(dx,dy,data) {
	var data = data;
	colorRef = {};
	var pixa = [];
	var oneD =[];
	var row = 4 * dx;
	console.log(colorScale.domain()[0],", ", colorScale.domain()[1]);
	
	if(horiz){
		//0-149 in sample
		for(var i=0;i<dx;i++){ 
			pixa[i] = [];
			for(var j=0;j<dy;j++){
				var n = 4*i;
				pixa[i][j] = Colors(data[(j*dx*4) + n],data[(j*dx*4) + n+1],data[(j*dx*4) + n+2]);//,data[(j*dx*4) + n+3]);
			}
		}
		//console.log(pixa);
		//oneD is a single row selected to make searchArray faster
		if(bar == false){
			var half = Math.floor(dy/2)
			var colorRange = [];
			var colorDomain = [];
				for(var i=0;i<dx;i++){
					var p =  pixa[i][half];
					var hex = "#" + ("000000" + rgbToHex(p["red"], p["green"], p["blue"])).slice(-6);
					colorDomain.push(colorScale.domain()[0]+((colorScale.domain()[1]-colorScale.domain()[0])/dx * i));
					colorRange.push(hex);
					oneD.push(pixa[i][half]);
				}
			colorScale.range(colorRange).domain(colorDomain);
			console.log("Domain: ", colorDomain);
			console.log(colorRange);
			//colorScale.range(colorRange);
			colorRange.forEach(function(d,i){
				colorRef[d] = colorDomain[i];
			})
			if( colorRange.length > 2 ){
				nearest = nearestColor.from( colorRange );
			}
			
			console.log(colorScale(0.1));
			bar = true;
			return oneD;
			
		}
		return pixa;
	}
	if(!horiz){
		for(var i=0;i<dy;i++){ 
			pixa[i] = [];
			for(var j=0;j<dx;j++){
				var n = 4*i;
				pixa[i][j] = Colors(data[(j*dy*4) + n],data[(j*dy*4) + n+1],data[(j*dy*4) + n+2]);//,data[(j*dy*4) + n+3]);
			}
		}
		if(bar == false){
			var half = Math.floor(dx/2)
			var colorRange = [];
			var colorDomain = [];
			//console.log(pixa); pixa seems to be fine, so p is being improperly chosen
				for(var i=0;i<dy;i++){
					var p =  pixa[half][i]; //fix this line
					console.log(p);
					var hex = "#" + ("000000" + rgbToHex(p["red"], p["green"], p["blue"])).slice(-6);
					colorDomain.push(colorScale.domain()[0]+((colorScale.domain()[1]-colorScale.domain()[0])/dx * i));
					console.log(hex);
					colorRange.push(hex);
					oneD.push(pixa[half][i]);
				}
			console.log(oneD);
			console.log(colorRange);
			colorScale.range(colorRange).domain(colorDomain);
			
			colorRange.forEach(function(d,i){
				colorRef[d] = colorDomain[i];
			})
			if( colorRange.length > 2 ){
				nearest = nearestColor.from( colorRange );
			}
			
			console.log(colorScale(0.1));
			return oneD;
		}
		return pixa;
	}
}

function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}

/**click to identify RGB value
function convertNum(pixelData)
{
	var redRange = [255,0],
		redCol = pixelData[0],
		blueRange = [255,0],
		blueCol = pixelData[2]
		var t = 0;
		
	
	if(pixelData[0] === 255 && pixelData[1] === 255 && pixelData[2] === 255){
		//console.log("White");
		t = 0;
	}
	if(pixelData[0] === 255 && pixelData[1] < 255 && pixelData[2] < 255){
		//console.log("Red");
		t = lerp(blueRange, blueCol);
		t = t * -.25;
	}
	if(pixelData[0] < 255 && pixelData[1] < 255 && pixelData[2] === 255){
		//console.log("Blue");
		t = lerp(redRange, redCol);
		t = t * .25;
	}
	return t;
}
function findPos(obj) {
    var curleft = 0, curtop = 0;
    if (obj.offsetParent) {
        do {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
        return { x: curleft, y: curtop };
    }
    return undefined;
}
/**
function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}
$('#example').click(function(e) {
    var pos = findPos(this);
    var x = e.pageX - pos.x;
    var y = e.pageY - pos.y;
    var coord = "x=" + x + ", y=" + y;
    var c = this.getContext('2d');
    var p = c.getImageData(x, y, 1, 1).data;
	var t = convertNum(p);	
	//setter(p);
    var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
    $('#status').html(coord + "<br>" + hex + "<br>" + t);
	
});
*/
/**
  svg.on("mousemove", function() {
      var pos = findPos(canvas);
      var x = d3.event.pageX - pos.x;
      var y = d3.event.pageY - pos.y;
      var coord = "x=" + x + ", y=" + y;
      var p = context.getImageData(x, y, 1, 1).data; 
      var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
      console.log([coord,hex].join(" "));
      console.log([nearest(hex),colorRef[nearest(hex)]].join(":"))
      d3.select("#color-block")
        .style("background-color",hex);
      d3.select("#color-value")
        .text(colorRef[nearest(hex)])
      d3.select("#color-hex")
        .text(hex)
  });
  */