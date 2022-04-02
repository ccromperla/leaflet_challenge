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
    "Street": streetMap,
    "Topography": topoMap,
    "Satellite": satMap
};

// Create a map object 
var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5,
    layers: [topoMap, streetMap, satMap]
});

// Add tile layer to map 
topoMap.addTo(myMap);

// Variable to hold earthquake data layer
let earthquakes = new L.layerGroup();

//  Get earthquake data & add to layer group
// Use d3 to call USGS GeoJson API 
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function (earthquakeData) {

    // console.log(earthquakeData);

    // Function to determine plot point color 
    function plotColor(depth) {
        if (depth > 90)
            return "#fc1c03";
        else if (depth > 70)
            return "#fc5203";
        else if (depth > 50)
            return "#fc9003";
        else if (depth > 30)
            return "#fcc203";
        else if (depth > 10)
            return "#fcf803";
        else
            return "#98fc03";
    }

    // Function that determines the size of the radius 
    function radiusSize(mag) {
        if (mag == 0)
            return 1; //shows a zero mag earthquke 
        else
            return (mag * 5); // size will be distinuished based on its magnitude
    }

    // Create a function that will add style to point
    function dataStyle(feature) {
        return {
            opacity: 0.5,
            fillOpacity: 0.5,
            fillColor: plotColor(feature.geometry.coordinates[2]),
            color: "000000",
            radius: radiusSize(feature.properties.mag),
            weight: 0.5
        }

    }

    // Add GeoJSON Data to earthquakes layer group
    L.geoJson(earthquakeData, {
        // Make a feature marker that is a circle 
        pointToLayer: function(feature, latLng) {
            return L.circleMarker(latLng);
        },
        // Set mar ker style
        style : dataStyle,
        // POPuPS!
    }).addTo(earthquakes);
});

// Add earthquake layer to the map 
earthquakes.addTo(myMap);

let overlays = {
    "Earthquakes" : earthquakes
};

// Add control layer to map
L.control
    .layers(baseMaps, overlays)
    .addTo(myMap);