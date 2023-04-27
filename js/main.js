// author: Wren Barnhart, date: 2023

function initialize() {
	
	
	//define an array of objects representing the four largest municipalities in Quebec
	

	//function to create a table with cities and their populations
	function loadMap(){
        
        
        //create a basemap style. You can find other options at https://leaflet-extras.github.io/leaflet-providers/preview/
	var CartoDB_Positron = L.tileLayer(
		'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', 
		{
			attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
			subdomains: 'abcd'
		}
	)
	//add this basemap style to a JS object, to which you could also add other baselayers. This object is loaded as a basemap selector as seen further down
	var baseLayers = {
		"CartoDB": CartoDB_Positron
		//,...
	};
	// create the map
	var mymap = L.map('mapdiv', {
		center: [39.50, -98.58]
		,zoom: 4
		,maxZoom: 18
		,minZoom: 3
		,layers: CartoDB_Positron
	});
        
       const GAHTmarkerOptions = {
           radius: 5,
           fillColor: "#753757",
           color: "#fc0384",
           weight: 5,
           opacity: 1,
           fillOpacity: 0.5
       }
       
       const CommMarkerOptions = {
           radius: 5,
           fillColor: "#deb385",
           color: "#cc700e",
           weight: 5,
           opacity: 1,
           fillOpacity: 0.5
       }
       
       const BillsmarkerOptions = {
           fillColor: "#407537",
           color: "#56f03c",
           weight: 5,
           opacity: 1,
           fillOpacity: 0.5
       }
       
       const PopmarkerOptions = {
           fillColor: "#3c66f0",
           color: "#0841ff",
           weight: 5,
           opacity: 1,
           fillOpacity: 0.5
       }
		
	// parse json object (var geojsonData) and turn into loadable layer
        GAHTLayer = addGeoJSONLayer(GAHTData, GAHTmarkerOptions, false, "", "LongLabel");
        BillsLayer = addGeoJSONLayer(antiLGBTBills_byState, BillsmarkerOptions, true, "Count", "Bills", 2);
        TransPopLayer = addGeoJSONLayer(LGBTPopData, PopmarkerOptions, true, "Trans Pop", "Trans Pop", 7);
        LGPopLayer = addGeoJSONLayer(LGBTPopData, PopmarkerOptions, true, "Gay Pop", "Gay Pop", 7);
        BiPopLayer = addGeoJSONLayer(LGBTPopData, PopmarkerOptions, true, "Bi Pop", "Bi Pop", 7);
        CommCenterLayer = addGeoJSONLayer(CommCenterData, CommMarkerOptions, false, "", "Center Name");
        
        console.log(antiLGBTBills);
        
        var overlayMaps = {
            "Known HRT Providers": GAHTLayer,
            "Anti-LGBT Bills": BillsLayer,
            "Trans Population": TransPopLayer,
            "Lesbian & Gay Population": LGPopLayer,
            "Bisexual Population": BiPopLayer,
            "LGBT Community Centers": CommCenterLayer
        };
	
        var layerControl = L.control.layers(overlayMaps).addTo(mymap);
	//add geojsonData to map
	//GAHTLayer.addTo(mymap);// add json element to map
   // BillsLayer.addTo(mymap);
   // PopLayer.addTo(mymap);
	
	//declare basemap selector widget
	var lcontrol = L.control.layers(baseLayers);
	//add it to the map
	lcontrol.addTo(mymap);
        
		
	};
    

    
   
    
    //call the function which will create your HTML table
	loadMap();
    
    
    
    
    function addGeoJSONLayer(jsonData, marker, scaleRadius, radiusData, popUpData, radiusDenom) {
        console.log(scaleRadius);
        geojsonLayer = L.geoJSON(jsonData, {
            pointToLayer: function(feature, latlng){
                if(!scaleRadius) {
                    console.log(0);
                    return L.circleMarker(latlng, marker).bindPopup(feature.properties[popUpData]).openPopup();
                } else {
                    console.log(feature.properties[radiusData]);
                    return L.circleMarker(latlng, marker).setRadius(parseInt(feature.properties[radiusData])/radiusDenom).bindPopup(feature.properties[popUpData]).openPopup();
                }
            }
        });
        
        return geojsonLayer;
    }
    
}

window.onload = initialize();