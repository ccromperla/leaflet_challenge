// Create Title Layers for Map Background
var topoMap = L.tileLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryTopo/MapServer/tile/{z}/{y}/{x}', {
	maxZoom: 20,
	attribution: 'Tiles courtesy of the <a href="https://usgs.gov/">U.S. Geological Survey</a>'
});

var streetMap = L.tileLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}', {
	maxZoom: 20,
	attribution: 'Tiles courtesy of the <a href="https://usgs.gov/">U.S. Geological Survey</a>'
});

var satMap = L.tileLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}', {
	maxZoom: 20,
	attribution: 'Tiles courtesy of the <a href="https://usgs.gov/">U.S. Geological Survey</a>'
});

//  Create a basemaps 
let baseMaps = {
    "Street" : streetMap,    
    "Topography" : topoMap,
    "Satellite" : satMap
};

// Create a map object 
var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5,
    layers: [topoMap, streetMap, satMap]
});

// Add tile layer to map 
topoMap.addTo(myMap);

// Add control layer to map
L.control.layers(baseMaps).addTo(myMap);