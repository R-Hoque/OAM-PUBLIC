//Requires Underscore.js, Backbone.js, esri-leaflet.js

//Namespace
_SPDEV.LeafletWMSLayers = {};

_SPDEV.LeafletWMSLayers.DATA_EXAMPLE = [
	{
		alias: 'ESP Length of Growing Period',
		serviceURL: 'http://dev.harvestchoice.org/arcgis/services/gatesesp/AgriculturalContext/MapServer/WMSServer',
		layers: '13',
		state: false,
		mapLayer : null,
		type: "WMS",
		mapServer: 'ArcGIS',
		showLegend: true
	},
];


// The collection view that serves as the checkbox list to turn on/off wms layers
_SPDEV.LeafletWMSLayers.SelectionListCollectionView = Backbone.View.extend({
	
	initialize: function () {
		
		var self = this;
		
    	// Create an array property that will store model views contained in this collection view
    	this.componentViews = [];
    	
    	// Loop thru the collection
    	this.collection.forEach( function(colModel, index) {
    		
    		// Create a view for each model contained in this view's referenced collection - each view is a WMS list-item			
		    var modelView = new  self.modelView({model:colModel});
		    
		    // Store this in the collection view's componentView array
		    self.componentViews.push(modelView);
		});
	},
	
	// This view's wrapper tag is a ul
	tagName: 'ul',
	
	// This view's wrapper css class
	className: 'contextual-layers-list',
	
	// rendering function for this view
	render: function(){
		
		var self = this;
		
		// Render and append each model view of collection (table rows)
		_.each(this.componentViews, function(view){
			
			// Render the component view
			view.render();
			
			// Append the view to this collection view element
			self.$el.append(view.el);
			
		});	
	    
	},
	
	// The model view for each model in this collection view
	modelView: Backbone.View.extend({
		
		initialize: function(){
			
			// Listen for changes on the model's "state" attribute; true means the WMS layer should be 'on'
			this.model.bind('change:state', this.onStateChange, this);
		},
		
		
		tagName: 'li',
		
		// When this view is click, fire the onClick function
		events: {'click': 'onClick'},
		
		className: 'checkbox-list-item list-level-1',
		
		// The view's html template
		template: _.template('<div class="filterItem"><%= alias %></div>'),
		
		// Render this view
		render: function(){
			
			this.$el.append(this.template(this.model.attributes));
		},
		
		// Function for view click event
		onClick: function(e){
 			
 			 
 			var self = this;
 			
 			// Loop through all models in the parent collection
 			this.model.collection.each(function(colModel, i){
 				
 				// For all model's except the one linked to this view
 				if(colModel !== self.model){
 					
 					//Reset state to false
 					colModel.set({'state': false});
 				}
 			});
 			
 			// Whatever the state was before the user click, make it opposite.  (If it was checked, uncheck it). 
 			var state = !this.model.get('state');
 			
 			// Set the new model 'state' value
 			this.model.set({'state': state});
 			
	 	},
	 	
	 	// When the model's state attribute changes, this function fires;  this will add/remove map layer, check uncheck checkboxes
		onStateChange: function(){
			// Get the model's 'state' attribute
			var state = this.model.get('state');
			
			// state == true
 			if(state) {
 				// Set the view css class appropriately
 				this.$el.addClass('selected');
 				this.model.collection.map.addLayer(this.model.get('mapLayer'));
 						
 			}
 			else {
 				this.$el.removeClass('selected');
 				this.model.collection.map.removeLayer(this.model.get('mapLayer'));
 			}
		}
		
	}),
	
});

// Backbone collection to hold the WMS-layer models
_SPDEV.LeafletWMSLayers.Collection = Backbone.Collection.extend({
	
	constructor: function (options) {
    				
    	Backbone.Collection.apply( this, {model: Backbone.Model.extend()} );	
    		
	},
			
	// Initialize the collection
	init: function(map, data) {
		
		//This will be set to Leaflet map
		this.map = map
		
		var self = this;
		

		// Loop through the incoming object array	
		_.each(data, function(rec){
			
			// create a new attribute that stores the WMS as a leaflet layer; different depending the 'mapServer' property
			if(rec['type'] === 'WMS') {
				/*
				rec['mapLayer'] = L.esri.dynamicMapLayer(rec['serviceURL'], {
									opacity : rec['opacity'],
									layers:rec['layers']
							});
							*/
				rec['mapLayer'] = L.tileLayer.wms(rec['serviceURL'], {
				    layers: rec['layers'],
				    format: 'image/png',
				    transparent: true,
				    attribution: ""
				});
			}
			else if (rec['mapServer'] === 'GeoServer') {
				// TODO: work out code for GeoServer
			}
			
			// Use this record to creata a Backbone model, add the model to the collection 			
			this.add(new  Backbone.Model(rec));
			
	  	}, this);	
	}	
});


// Collection view - each model view in the collection view is a legend for a given WMS in the collection 
_SPDEV.LeafletWMSLayers.LegendCollectionView = Backbone.View.extend({
	
	initialize: function () {
		
		var self = this;
		
    	// Create an array property that will store model views contained in this collection view
    	this.componentViews = [];
    	
    	//var views = this.componentViews;
    	
    	// Create a view for each model contained in this view's referenced collection
    	this.collection.forEach( function(colModel, index) {   			
		    var modelView = new  self.modelView({model:colModel});
		    self.componentViews.push(modelView);
		});
	},
	
	// ID for the collection view's wrapper element
	id : 'wmsLegend',
	
	render: function(){
		
		var self = this;
		
		// Render and append each model view of collection (table rows)
		_.each(this.componentViews, function(view){
			
			// Render the component view
			view.render();
			
			// Append the view
			self.$el.append(view.el);
			
		});	
	    
	},
	
	// Model view used in this collection view
	modelView: Backbone.View.extend({
		
		initialize: function(){
			
			// Listen for changes to model's 'state'  attribute
			this.model.bind('change:state', this.onStateChange, this);
		},
		
		// CSS classes for model view's wrapper element.  The cloak class hides the view (display:none) on initial load
		className: 'wms-legend-wrapper cloak',
		
		// When the model's state attribute gets changes
		onStateChange: function(){
			// Get the new state
			var state = this.model.get('state');
			
 			if(state) {
 				// Stop cloaking the legend - i.e., show it
 				this.$el.removeClass('cloak');					
 			}
 			else {
 				// Hide the legend
 				this.$el.addClass('cloak');
 			}
 			
 			if(this.model.collection.where({'state': true}).length === 0) {
 				this.$el.parent().hide();
 			}
 			else {
 				this.$el.parent().show();
 			}
		},
		
		render: function(){
					
			var legendObj,
				mapServer,
				esriLegendUrl,
				type,
				serviceURL,
				visibleLayerIndices,
				alias,
				self,
				layers,
				showLegend,url,img;
				
			mapServer = this.model.get('mapServer');
			type = this.model.get('type');
			serviceURL = this.model.get('serviceURL');
			alias = this.model.get('alias');
			self = this;
			
			self.$el.append('<p class="legend-header">'+ alias + '</p>')
			// Build legend for ArcGIS WMS
			if(this.model.get('showLegend') !== true) {
				
				var message = $('<p class="no-legend">No legend available.</p>');
				self.$el.append(message);
				return;
			}
		
			if(type === 'WMS') {
				
				esriLegendUrl = this.model.get('esriLegendURL');
				
				if(mapServer === 'ArcGIS' && esriLegendUrl !== null){
					
					
					layers = this.model.get('esriLegendLayers');
					
					// Do an ajax call to get the legend json
					$.ajax({
					  'dataType': "jsonp",
					  'url': esriLegendUrl + '/legend?f=json',
					  'success': function(data){
					  				
					  				var legendObj;
					  				
								  	legendObj = data;
								 	
								 	// Add a Header to this legend
								 	//self.$el.append('<header class="legend-header">' + alias + '</header>');
								 	
								 	// Loop through all layers in the legend
								 	for(var i = 0, iMax = legendObj.layers.length; i < iMax; i++) {
								 		
								 		// If this layer index is one of those shown in the WMS, then add it to the legend
								 		if(layers.indexOf(legendObj.layers[i].layerId) > -1 ) {
									 		
									 		var layer = legendObj.layers[i];
									 		
									 		// Create a section and header for this layer
									 		var layerSection;
									 		
									 		if(layers.length > 1) {
									 			layerSection = $('<div class="wms-legend-layer"><div class="layer-header">' 
									 								+ layer.layerName 
									 								+ '</div></div>');
									 		} else {
									 			layerSection = $('<div class="wms-legend-layer"></div>');
									 		}
									 		//  Create a wrapper for the layer items
									 		var layerItemList = $('<ul class="layer-item-list" ></ul>');
									 		
									 		// loop thru all the layer legend items
									 		for(var j = 0, jMax = layer.legend.length; j < jMax; j++) {
									 			
									 			var layerItem = layer.legend[j];
									 			
									 			// Create a list item to hold the image swatch and the label for this item
									 			var li = $('<li class="layer-item"><div class="clearfix"><div class="left swatch"><img src="'
									 							+ esriLegendUrl + '/' + layer.layerId + '/images/' 
									 							+ layerItem.url + '" /></div><div class="label">' 
									 							+ layerItem.label + '</div></div></li>');
									 			
									 			// Append to the wrapper
									 			$(layerItemList).append(li);
									 		}
									 		
									 		// Append the list to the section wrapper 
									 		$(layerSection).append(layerItemList);
									 		
									 		// Append the section to the legend wrapper
									 		self.$el.append(layerSection);
								 		}
								 	}
							 	
				 	
								  },
								  
								  'error': function(response) {
								  	
								  	// TODO: error handling
								  	console.error(response);
								  }
								});
								
				}else if(mapServer === 'ArcGIS' || mapServer === "GeoServer" ) {
					
					layers = this.model.get('layers').split(',');
					
					for(var i = 0; i < layers.length; i++){
						//url = serviceURL + '?request=GetLegendGraphic%26version=1.3.0%26format=image/png%26layer='+ layers[i].toString();
						url = serviceURL + '?request=GetLegendGraphic&Version=1.0.0&format=image/png&layer='+ layers[i].toString();
						
						var img = $('<img src="'+ url +'" />');
						
						self.$el.append(img);
					}
				}
				
				
				
			}

 				
		}

	}),
	
});
