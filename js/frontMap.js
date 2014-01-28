_SPDEV.FrontMap = {};

_SPDEV.FrontMap.init = function(){
	
	// GET MAP SIZE DEPENDING ON SCREEN SIZE ONLOAD:

	var margin = {top: 0, left: 0, bottom: 0, right: 0},
	   width = parseInt(d3.select('#mmmap').style('width')),
	   width = width - margin.left - margin.right,
	   mapRatio = .448,
	   height = width * mapRatio;

	var projection = d3.geo.equirectangular()
    	.scale(width / 6.2)
    	.translate([ width / 2, width / 3.7]);

	var path = d3.geo.path()
	    .projection(projection);

	var svg = d3.select("#mmmap").append("svg")
	    .attr("width", width)
	    .attr("height", height);

	// CONSTRUCT THE STATIC COUNTRY INFOBOXES
  var tt_Bolivia = d3.select("#mmmap").append("div").attr("class", "mminfo top").attr("id","tt_Bolivia").attr("title", "Bolivia");
	//remove Kenya for now
	//var tt_Kenya = d3.select("#mmmap").append("div").attr("class", "mminfo top").attr("id","tt_Kenya").attr("title", "Kenya");
	var tt_Nepal = d3.select("#mmmap").append("div").attr("class", "mminfo top").attr("id","tt_Nepal").attr("title", "Nepal");
	var tt_Malawi = d3.select("#mmmap").append("div").attr("class", "mminfo bottom").attr("id","tt_Malawi").attr("title", "Malawi");

	// PLACE THEM ON THE MAP RELATIVE TO THE MAP SIZE, THEN POPULATE THEM
  tt_Bolivia.attr("style", "left:" + width/4.7 + "px;top:" + height/2.2 + "px").html("<div class='mmtitle'><a href='application.php?dg=Bolivia'>BOLIVIA <img src='img/mmLogo.png' style='margin-top:-6px;'/></a></div><div class='mmactivities'>6,568 ACTIVITIES</div>");
	//Remove Kenya For now
	//tt_Kenya.attr("style", "left:" + width/2 + "px;top:" + height/2.75 + "px").html("<div class='mmtitle'><a href='application.php?dg=Kenya'>KENYA <img src='img/mmLogo.png' style='margin-top:-6px;'/></a></div><div class='mmactivities'>2,243 ACTIVITIES</div>");
	tt_Nepal.attr("style", "left:" + width/1.58 + "px;top:" + height/5.3 + "px").html("<div class='mmtitle'><a href='application.php?dg=Nepal'>NEPAL <img src='img/mmLogo.png' style='margin-top:-6px;'/></a></div><div class='mmactivities'>21,600 ACTIVITIES</div>");
	tt_Malawi.attr("style", "left:" + width/2.03 + "px;top:" + height/1.4 + "px").html("<div class='mmtitle'><a href='application.php?dg=Malawi'>MALAWI <img src='img/mmLogo.png' style='margin-top:-6px;'/></a></div><div class='mmactivities'>5,500 ACTIVITIES</div>");
	
  // HOLD RENDERING UNTIL THE DATA LOADS
	queue()
	    .defer(d3.json, "js/data/d3-world.json")
	    .defer(d3.tsv, "js/data/world-country-names.tsv")
	    .await(ready);

function ready(error, world, names) {
	   // TRANSLATE FROM TOPOJSON, ADD TITLE AND GEOMETRY
	   var countries = topojson.feature(world, world.objects.countries).features;
	   countries.forEach(function(d) {
	      d.name = names.filter(function(n) { return d.id == n.id; })[0].name;
	   });
	   var country = svg.selectAll(".mmcountry").data(countries);
	   country.enter().insert("path").attr("class", function(d, i) {
	     return countrySpecific(d, i);
	   }).attr("title", function(d, i) {
	     return d.name;
	   }).attr("d", path);
	   
	   // LINK THE HOVER STATE TRIGGERS:
	   a = d3.selectAll(".countrySelected");
	   b = d3.selectAll(".mminfo");
	   
	   a.on("mouseover", function(d) {
	     d3.selectAll("[title=" + d.name + "]").classed("mminfoActive",true);
	   });
	   
	   a.on("mouseout", function(d) {
	     d3.selectAll("[title=" + d.name + "]").classed("mminfoActive",false);
	   });
	   
	   b.on("mouseover", function(d) {
	     d3.selectAll("[title=" + this.title + "]").classed("countryActive",true);
	   });
	   
	   b.on("mouseout", function(d) {
	     d3.selectAll("[title=" + this.title + "]").classed("countryActive",false);
	   });

 }
 
 // IDENTIFY THE FOCUS COUNTRIES
 function countrySpecific(d, i) {
   //if (d.name == 'Bolivia' || d.name == 'Kenya' || d.name == 'Malawi' || d.name == 'Nepal') return 'mmcountry countrySelected'
   if (d.name == 'Bolivia' || d.name == 'Malawi' || d.name == 'Nepal') return 'mmcountry countrySelected';
   else return 'mmcountry';
 }

	
};

 