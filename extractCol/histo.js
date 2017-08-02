var horiz = true;

var canvas = document.querySelector("canvas"),
    context = canvas.getContext("2d"),
    width = canvas.width,
    height = canvas.height;

var brush = d3.brush()
    .on("start brush", brushed)
    .on("end", brushended);

var svg = d3.select("svg");

var image = new Image;
image.src = "i.png";
image.onload = loaded;

function loaded() {
  context.drawImage(this, 0, 0);

  svg.append("g")
      .attr("class", "brush")
      .call(brush)
      .call(brush.move, [[300, 130], [450, 160]]);
}
//Selection of area brushed (replacement of extent in previous d3 iteration)
function brushed() {			
  //console.log("new selection");
  var s = d3.event.selection,
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
	console.log(data.length);
	
	var roundx = Math.floor(dx),
		roundy = Math.floor(dy);
	var pixa = reorder(roundx, roundy, data);
	
	//placeholder for user value
	var cursor = Colors(255,32,32,255);
	searchArray(roundx,roundy,pixa,cursor);
  }
}

function brushended() {
  if (!d3.event.selection) {
	console.log("prompt appears here");
    /* histoarea.attr("d", null);
    histoline.attr("d", null); */
  }
}

function curveStepBelow(context) {
  var y0, i;
  return {
    lineStart: function() { y0 = NaN, i = 0; },
    lineEnd: function() {},
    point: function(x, y) {
      x -= y0 < y ? -0.5 : +0.5, y += 0.5;
      if (++i === 1) context.moveTo(x, y0 = y);
      else context.lineTo(x, y0), context.lineTo(x, y0 = y);
    }
  };
}

/**function barScaling(dx,dy, data) {
	if(horiz){
		console.log("horizontal is ", horiz);
		
		//generates a list of vertical pixels along the x-axis
		var n = 2;
		var pixa = [];
		for(var i = 0;i<dy;i++){
			for(var j = 0;j<4;j++){
				var tmp = data[4*((i*dx)+n)+j];
				pixa.push(tmp);
			}
		}
		console.log("pixa: ", pixa);
		
	}
}*/

var Colors = function(red,green,blue,alpha){
	return{
		"red" : red,
		"green" : green,
		"blue" : blue,
		"alpha" : alpha
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
	var pixa = [];//[[],[]];
	var row = 4 * dx;
	//console.log("dx,dy: ", dx, dy);
		
	//0-149 in sample
	for(var i=0;i<dx;i++){ 
		pixa[i] = [];
		for(var j=0;j<dy;j++){
			var n = 4*i;
			//console.log(data);
			pixa[i][j] = Colors(data[(j*dx*4) + n],data[(j*dx*4) + n+1],data[(j*dx*4) + n+2],data[(j*dx*4) + n+3]);
		}
	}
	//console.log(pixa[0][0]);
	//console.log(pixa[dx-1][dy-1]);
	return pixa;
	/**
	if(horiz){
		for(i=0;i<data-3;i+=3){
			for(j=0;j<dy;j++){
				
				if(i%dx===0)	//need to mod 'i' to check which 
				if()
			}
		}
	}
	if(!horiz){
		console.log("beep boop");
	}*/
}





