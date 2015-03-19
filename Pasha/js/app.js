//CSS Hook to return Hex value rather than rgb value
$.cssHooks.backgroundColor = {
    get: function(elem) {
        if (elem.currentStyle)
            var bg = elem.currentStyle["backgroundColor"];
        else if (window.getComputedStyle)
            var bg = document.defaultView.getComputedStyle(elem,
                null).getPropertyValue("background-color");
        if (bg.search("rgb") == -1)
            return bg;
        else {
            bg = bg.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
            function hex(x) {
                return ("0" + parseInt(x).toString(16)).slice(-2);
            }
            return "#" + hex(bg[1]) + hex(bg[2]) + hex(bg[3]);
        }
    }
}


//add two hex values together to get a new color
function addHexColor(c1, c2) {
  //remove "#" from beginning of hex string
  c1 = c1.slice(1);
  c2 = c2.slice(1);

  //preform addition and get new hex string
  var hexStr = (parseInt(c1, 16) + parseInt(c2, 16)).toString(16);
  while (hexStr.length < 6) { hexStr = '0' + hexStr; } // Zero pad.
  
  //add "#" to beginning to hex string
  hexStr = "#" + hexStr;
  //console.log(hexStr);
  
  
  return hexStr;
  
}

//function to lighten/darken a color by a percentage.
//positive to lighten color and negative to darken color.
function shadeColor(color, percent) {   
    var colorInt=parseInt(color.slice(1),16),
    
    tint = percent < 0 ? 0 : 255,
    shade = percent < 0 ? percent*-1 : percent,
    
    //convert hex to RGB
    R = colorInt >> 16,
    G = colorInt >> 8 & 0x00FF,
    B = colorInt & 0x0000FF;
    
    //get darken/lighten RGB values by percent
    R = Math.round((tint-R)*shade)+R;
    G = Math.round((tint-G)*shade)+G;
    B = Math.round((tint-B)*shade)+B;
    
    //revert RGB to hex
    var hexStr = (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
    
    return "#" + hexStr;
}

function changeColor() {
  var r = $("#red").val();
  var g = $("#green").val();
  var b = $("#blue").val();
  $("#canvas").css("background-color", "rgb(" + r + "," + g +", " + b + ")");
}

$("input[type=range]").change(changeColor);

//set initial color	
$("#canvas").css("background-color", "#000000");


//when black circle is clicked shadeColor function is called with negative percent and color is set
$("#shade").click(function(){
	var darkenColor = shadeColor($("#canvas").css("background-color"),-.1);
	$("#canvas").css("background-color", darkenColor);

});

//when white circle is clicked shadeColor function is called with positive percent and color is set
$("#tint").click(function(){
	var darkenColor = shadeColor($("#canvas").css("background-color"),.1);
	$("#canvas").css("background-color", darkenColor);
});

