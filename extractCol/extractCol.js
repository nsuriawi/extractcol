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

function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}




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


var example = document.getElementById('example');
var context = example.getContext('2d');


displayImg();

function displayImg()
{
  smplImg = new Image();
  smplImg.src = 'somethingine2.png';
  smplImg.onload = function(){
    context.drawImage(smplImg, 0, 0);
	console.log("image exists");
  }
} 

$('#example').mousemove(function(e) {
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

function lerp(range,pixData)
{
	var v0 = range[0],
		v1 = range[1],
		r = pixData;
	
	var t = (r-v0)/(v1-v0);
	return t;
	//value = t * .25;
	//return value;
}

var svg = d3.select('svg')

var scale = d3.scale.linear()
.domain([20, 30])
.range([10, 450])

var brush = d3.svg.brush()
brush.x(scale)
brush.extent([22, 28])

brush.on('brushend', function() {
  console.log(brush.extent())
})

var g = svg.append('g')

brush(g)

g.attr('transform', 'translate(50, 50)')
g.selectAll('rect').attr('height', 30)
g.selectAll('.background')
  .style({ fill: '#4b9e9e', visibility: 'visible' })
g.selectAll('.extent')
  .style({ fill: '#78c5c5', visibility: 'visible' })
g.selectAll('.resize rect')
  .style({ fill: '#276c86', visibility: 'visible' })

