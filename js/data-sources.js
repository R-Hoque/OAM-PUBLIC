_SPDEV.DataSources = {};


//The top portion of the datasources contains the configurations needed to add new datagroups (countries)
//and to add new indicator layers (WMS url's)

_SPDEV.DataSources.ContextualLayers = {
      
	'Bolivia': [
	    {
		    alias: 'Total Poblacion 2001',
		    serviceURL: 'http://54.226.197.17:8080/geoserver/oam/wms',
		    layers: 'oam:BolivianIndicators2001',
		    state: false,
		    mapLayer : null,
		    format: 'img/png',
		    transparent: true,
		    type: "WMS",
		    mapServer: 'GeoServer',
		    showLegend: true,
		    
	    },
		    {
		    alias: 'Total Poblacion 2010',
		    serviceURL: 'http://54.226.197.17:8080/geoserver/oam/wms',
		    layers: 'oam:BolivianIndicators2010',
		    state: false,
		    mapLayer : null,
		    format: 'img/png',
		    transparent: true,
		    type: "WMS",
		    mapServer: 'GeoServer',
		    showLegend: true,
	    },
		    {
		    alias: 'Percent Extreme Pobreza',
		    serviceURL: 'http://54.226.197.17:8080/geoserver/oam/wms',
		    layers: 'oam:BolivianIndicatorsPov',
		    state: false,
		    mapLayer : null,
		    format: 'img/png',
		    transparent: true,
		    type: "WMS",
		    mapServer: 'GeoServer',
		    showLegend: true,
	    }],
	'Kenya': [
	    {
		    alias: 'Population 2010',
		    serviceURL: 'http://54.226.197.17:8080/geoserver/oam/wms',
		    layers: 'oam:kenya_population',
		    state: false,
		    mapLayer : null,
		    format: 'img/png',
		    transparent: true,
		    type: "WMS",
		    mapServer: 'GeoServer',
		    showLegend: true,
	    },
	    {
		    alias: 'Poverty 2010',
		    serviceURL: 'http://54.226.197.17:8080/geoserver/oam/wms',
		    layers: 'oam:kenya_poverty',
		    state: false,
		    mapLayer : null,
		    format: 'img/png',
		    transparent: true,
		    type: "WMS",
		    mapServer: 'GeoServer',
		    showLegend: true,
	    }],
	   
	   //WMS Inidcators for Honduras
	   'Honduras': [
	    {
		    alias: 'Poverty 2010',
		    serviceURL: 'http://54.226.197.17:8080/geoserver/oam/wms',
		    layers: 'oam:Honduras_socioeco',
		    state: false,
		    mapLayer : null,
		    format: 'img/png',
		    transparent: true,
		    type: "WMS",
		    mapServer: 'GeoServer',
		    showLegend: true,
	    },
	    {
	    	
	    	alias: 'Malnutrition 2010',
		    serviceURL: 'http://54.226.197.17:8080/geoserver/oam/wms',
		    layers: 'oam:honduras_dhs_2005_wgs84',
		    state: false,
		    mapLayer : null,
		    format: 'img/png',
		    transparent: true,
		    type: "WMS",
		    mapServer: 'GeoServer',
		    showLegend: true,
	    },	
	        {
	    	
	    	alias: 'Population 2011',
		    serviceURL: 'http://54.226.197.17:8080/geoserver/oam/wms',
		    layers: 'oam:Honduras_socioeco_Population',
		    state: false,
		    mapLayer : null,
		    format: 'img/png',
		    transparent: true,
		    type: "WMS",
		    mapServer: 'GeoServer',
		    showLegend: true,
	    	
	    }],
	    //NEPAL WMS Indicators
	'Nepal': [
	    {
		    alias: 'Malnutrition 2011',
		    serviceURL: 'http://54.226.197.17/:8080/geoserver/oam/wms',
		    layers: 'oam:Nepal_mal_2011',
		    state: false,
		    mapLayer : null,
		    format: 'img/png',
		    transparent: true,
		    type: "WMS",
		    mapServer: 'GeoServer',
		    showLegend: true,
	    }],
	    
	    //Malawi WMS Indicators
	 'Malawi': [
	    {
		    alias: 'Malawi Malnutrition',
		    serviceURL: 'http://54.226.197.17:8080/geoserver/oam/wms',
		    layers: 'oam:Malawi_Malnutrition',
		    state: false,
		    mapLayer : null,
		    format: 'img/png',
		    transparent: true,
		    type: "WMS",
		    mapServer: 'GeoServer',
		    showLegend: true,
	    },
	     {
		    alias: 'Malawi Pop Density',
		    serviceURL: 'http://54.226.197.17:8080/geoserver/oam/wms',
		    layers: 'oam:Malawi_Population',
		    state: false,
		    mapLayer : null,
		    format: 'img/png',
		    transparent: true,
		    type: "WMS",
		    mapServer: 'GeoServer',
		    showLegend: true,
	   

	    }]
	    
	
};
//For data to show up on the map you must load the IATI data into the database
//and then configure a new 'data group' here.

_SPDEV.DataSources.Data = {
	Donor : {
		DEFAULT_CLUSTER_TAXONOMY_ID: 15,
		FILTER_TAXONOMY_IDS: '15',
		UPDATE_CHANNEL: 'updateWorldBankData',
		DATAGROUP_IDS: [773],
		COUNTRY_IDS: [],
		ORG_ROLE_ID: 496,
		mapLayerId: 'wbLocations',
		displayOnLoad: false,
		prefilters: null,
		filterStore: null,
		locationsObj: null,
		taxonomyClassifications: null,
		isActive: false,
		clusterLayerManager: null,
		facetFilterWrapper: null,
		overviewChartWrapper:null
	},
	Gov : null /*{
		DEFAULT_CLUSTER_TAXONOMY_ID: 15,
		FILTER_TAXONOMY_IDS: '15',
		UPDATE_CHANNEL: 'updateGovData',
		DATAGROUP_IDS: [769],
		COUNTRY_IDS: [50],
		displayOnLoad: true,
		filterStore: null,
		mapLayerId: 'boliviaLocations',
		locationsObj: null,
		taxonomyClassifications: null,
		isActive: true,
		clusterLayerManager: null,
		facetFilterWrapper: null,
		overviewChartWrapper:null
	},*/
	

	
};

_SPDEV.DataSources.DataGroups  = {
	
	'Bolivia' : {
		ID: 'Bolivia',
		DEFAULT_CLUSTER_TAXONOMY_ID: 15,
		FILTER_TAXONOMY_IDS: '15',
		UPDATE_CHANNEL: 'updateGovData',
		DATAGROUP_IDS: [769],
		COUNTRY_IDS: [50],
		ORG_ROLE_ID: 496,
		displayOnLoad: true,
		filterStore: null,
		mapLayerId: 'boliviaLocations',
		locationsObj: null,
		taxonomyClassifications: null,
		isActive: true,
		clusterLayerManager: null,
		facetFilterWrapper: null,
		overviewChartWrapper:null,
		initialMapView: {lat:-16.5, lng: -67, zoom: 5}
	},
		'Colombia' : {
		ID: 'Colombia',
		DEFAULT_CLUSTER_TAXONOMY_ID: 15,
		FILTER_TAXONOMY_IDS: '15',
		UPDATE_CHANNEL: 'updateGovData',
		DATAGROUP_IDS: [810],
		COUNTRY_IDS: [72],
		ORG_ROLE_ID: 496,
		displayOnLoad: true,
		filterStore: null,
		mapLayerId: 'colombiaLocations',
		locationsObj: null,
		taxonomyClassifications: null,
		isActive: true,
		clusterLayerManager: null,
		facetFilterWrapper: null,
		overviewChartWrapper:null,
		initialMapView: {lat:-2.2, lng: -75.5, zoom: 5}
	},
	
	'Nepal' : {
		ID: 'Nepal',
		DEFAULT_CLUSTER_TAXONOMY_ID: 15,
		FILTER_TAXONOMY_IDS: '15',
		UPDATE_CHANNEL: 'updateGovData',
		DATAGROUP_IDS: [772],
		COUNTRY_IDS: [179],
				ORG_ROLE_ID: 496,
		displayOnLoad: true,
		filterStore: null,
		mapLayerId: 'boliviaLocations',
		locationsObj: null,
		taxonomyClassifications: null,
		isActive: true,
		clusterLayerManager: null,
		facetFilterWrapper: null,
		overviewChartWrapper:null,
		initialMapView: {lat:28.3, lng:82.5, zoom: 7}
	},
	
	'Malawi' : {
		ID: 'Malawi',
		DEFAULT_CLUSTER_TAXONOMY_ID: 15,
		FILTER_TAXONOMY_IDS: '15',
		UPDATE_CHANNEL: 'updateGovData',
		DATAGROUP_IDS: [771],
		COUNTRY_IDS: [157],
				ORG_ROLE_ID: 496,
		displayOnLoad: true,
		filterStore: null,
		mapLayerId: 'boliviaLocations',
		locationsObj: null,
		taxonomyClassifications: null,
		isActive: true,
		clusterLayerManager: null,
		facetFilterWrapper: null,
		overviewChartWrapper:null,
		initialMapView: {lat:-13, lng:34, zoom: 6}
	},
	
	'Kenya' : {
		ID: 'Kenya',
		DEFAULT_CLUSTER_TAXONOMY_ID: 15,
		FILTER_TAXONOMY_IDS: '15',
		UPDATE_CHANNEL: 'updateGovData',
		DATAGROUP_IDS: [770],
		COUNTRY_IDS: [139],
				ORG_ROLE_ID: 496,
		displayOnLoad: true,
		filterStore: null,
		mapLayerId: 'kenyaLocations',
		locationsObj: null,
		taxonomyClassifications: null,
		isActive: true,
		clusterLayerManager: null,
		facetFilterWrapper: null,
		overviewChartWrapper:null,
		initialMapView: {lat:0.386, lng:37.97, zoom: 6}
	},
	
	'Haiti' : {
		ID: 'Haiti',
		DEFAULT_CLUSTER_TAXONOMY_ID: 15,
		FILTER_TAXONOMY_IDS: '15',
		UPDATE_CHANNEL: 'updateGovData',
		DATAGROUP_IDS: [786],
		COUNTRY_IDS: [119],
				ORG_ROLE_ID: 496,
		displayOnLoad: true,
		filterStore: null,
		mapLayerId: 'haitiLocations',
		locationsObj: null,
		taxonomyClassifications: null,
		isActive: true,
		clusterLayerManager: null,
		facetFilterWrapper: null,
		overviewChartWrapper:null,
		initialMapView: {lat:18.9, lng:-73.1, zoom: 8}
	},
	
		
	'Honduras' : {
		ID: 'Honduras',
		DEFAULT_CLUSTER_TAXONOMY_ID: 15,
		FILTER_TAXONOMY_IDS: '15',
		UPDATE_CHANNEL: 'updateGovData',
		DATAGROUP_IDS: [787],
		COUNTRY_IDS: [122],
				ORG_ROLE_ID: 496,
		displayOnLoad: true,
		filterStore: null,
		mapLayerId: 'hondurasLocations',
		locationsObj: null,
		taxonomyClassifications: null,
		isActive: true,
		clusterLayerManager: null,
		facetFilterWrapper: null,
		overviewChartWrapper:null,
		initialMapView: {lat:14.1, lng:-86.5, zoom: 7}
	}
};

_SPDEV.DataSources.init = function(map, filterControlWrapper){
	
	var dataSource, sectorLanguage;
	

	amplify.publish('waitingForData');
	
	_loadingCtr = new _SPDEV.DataSources.countdownThenCall(function(){
		amplify.publish('dataRetrieved');
	});
	
	// Add a "Charts" section to control panel
	var chartsContentWrapper = _SPDEV.ActivityChart.chartControl('#controls', _SPDEV.Config.ControlPanel.SECTION_HEADER.replace('###label###', 'CHARTS')); 

	sectorLanguage = 'english'; 
		
	if(_SPDEV.DataSources.Data.Gov.ID === 'Bolivia') {
		sectorLanguage = 'spanish';
	}
	
	// Loop thru data sources
	for(var i in _SPDEV.DataSources.Data) {
		
		// Increment the loading counter once for ever data source
		_loadingCtr('++');
		
		// Namespace shortcut
		dataSource = _SPDEV.DataSources.Data[i];
		
		// Create a FilterStore
		dataSource.filterStore = new _SPDEV.FilterSelectionStore(dataSource.DEFAULT_CLUSTER_TAXONOMY_ID,
			  																 dataSource.UPDATE_CHANNEL, {classificationPrefilters: [ dataSource.DATAGROUP_IDS, dataSource.COUNTRY_IDS]});
		
		dataSource.listView = new _SPDEV.ListView.Manager(dataSource.UPDATE_CHANNEL, dataSource.DATAGROUP_IDS[0], dataSource.COUNTRY_IDS[0], sectorLanguage);
		
		$('#listView').append(dataSource.listView.el);
		
		if(dataSource.isActive) {
			$(dataSource.listView.el).show();
		}
		
		
		// Some of the app features are dependent on the returns of multiple ajax calls; $.when fires callback only when ALL have returned
		$.when( 	
			$.ajax({
				'type': 'POST',
				'data': {'taxonomyIds': dataSource.FILTER_TAXONOMY_IDS, 'dataGroupId': dataSource.DATAGROUP_IDS.toString(), 'countryIds': dataSource.COUNTRY_IDS.toString(), language: sectorLanguage},
				'dataType': "json",
			  	'url': 'php/getTaxonomyClassifications.php',
				}),
			$.ajax({
				'type': 'POST',
				data: {dataGroupId: dataSource.DATAGROUP_IDS.toString(), countryIds: dataSource.COUNTRY_IDS.toString(), orgRole: dataSource.ORG_ROLE_ID},
				'dataType': "json",
			  	'url': 'php/getOrgs.php',
			  	}),
			$.ajax({
				'type': 'POST',
				'data': {'summaryTaxonomyId' : dataSource.DEFAULT_CLUSTER_TAXONOMY_ID, 'dataGroupId': dataSource.DATAGROUP_IDS.toString(), 'countryIds': dataSource.COUNTRY_IDS.toString()},
			  	'dataType': "json",
			  	'url': 'php/getLocationsByTax.php',
			  	}),
		  	
			  	
			  	{dataSource: dataSource}
		  	).then( 
		  		// Success
		  		function(dbTaxonomyClassifications, dbOrgs, points, ds){ 
		  			
		  			var dataSource,
		  				facet,
		  				chart,
		  				postData,
		  				facetFilterCollection,
		  				view,
		  				options;
		  			
		  			options = {topN : 15};
		  			
		  			// Shortcut
		  			dataSource = ds.dataSource;
		  			
		  			// Wrapper for this data source's facet filters
		  			dataSource.facetFilterWrapper = $('<div class="' + dataSource.mapLayerId + 'Wrapper data-source-control-wrapper"></div>').prependTo(filterControlWrapper);
		  			
		  			// Wrapper for this data source's charts
		  			dataSource.chartsWrapper = $('<div class="' + dataSource.mapLayerId + 'Wrapper data-source-control-wrapper"></div>').appendTo(chartsContentWrapper);
		  			
		  			// Store all a data sources facet filters
		  			dataSource.facets = {};
		  			
					// create facet filters for "taxonomy" type facets
					_.each(dbTaxonomyClassifications[0], function(tax, i){

							options.active = false;
							options.showColors = false;
							
						// Package up facet info in a form we can use 
						var facet = new QClusterLeafletLayer.FacetColorLibrary(tax.t_id, tax.name, tax.classifications, {id: 'c_id', name: 'name'}, {maxColors : 15});
						
						// store this facet
						dataSource.facets[facet.id] = facet;
						
						// create a chart that summarizes activities by this facet
						var chart = new _SPDEV.ActivityChart.Chart(points[0], 'php/getLocationsByTax.php', null, 'php/filterLocationsReportByTax.php', facet, dataSource.chartsWrapper, dataSource.UPDATE_CHANNEL);
						
						// Store taxonomy classifications by taxonomy ID in the Filter Store
						dataSource.filterStore.classifications[facet.id] = [];
						
						// Set facet filter options specific to 'sector' facet
						if(facet.name.toLowerCase() === 'sector') {
							
							// This filter control will be active
							options.active = true;
							
							// Map cluster donuts initially summarize sectors, so show the sector colors
							options.showColors = true;
						}
						
						// Create a facet filter
						_SPDEV.FacetFilter.init(facet, 'taxonomy', dataSource.filterStore, dataSource.facetFilterWrapper, options);
						
					});
					
					
					// Now do Org related stuff
					facet = null;
					facetFilterCollection = null;
					chart = null;
					view = null;
					options = {topN : 15};
					
					// See comments above; same routine as a taxonomy facet
					facet = new QClusterLeafletLayer.FacetColorLibrary('org', 'Organization', dbOrgs[0], {id: 'o_id', name: 'name'}, {maxColors : 15});
					
					dataSource.facets['org'] = facet;				
					
					postData = {'dataGroupId': dataSource.DATAGROUP_IDS.toString(), 'countryIds': dataSource.COUNTRY_IDS.toString(), orgRole: dataSource.ORG_ROLE_ID};
						
					chart = new _SPDEV.ActivityChart.Chart(null, 'php/getLocationsByOrg.php', postData, 'php/filterLocationsReportByOrg.php', facet, dataSource.chartsWrapper, dataSource.UPDATE_CHANNEL);
								
					_SPDEV.FacetFilter.init(facet, 'organization', dataSource.filterStore, dataSource.facetFilterWrapper, options);
		
					// Show the facet filters and charts for the default data source
					if(dataSource.displayOnLoad) {
						$(dataSource.facetFilterWrapper).show();
						$(dataSource.chartsWrapper).show();
					}
					
					$(window).trigger('resize');
					
					// Create the map layer with clustered points
					dataSource.locationsObj = new _SPDEV.Locations.Collection();
					dataSource.locationsObj.init(points[0], map, {
																	layerId: dataSource.mapLayerId,
																	displayOnLoad: dataSource.displayOnLoad,
																	reportByTaxonomyId: dataSource.DEFAULT_CLUSTER_TAXONOMY_ID, 
																	updateChannel: dataSource.UPDATE_CHANNEL,
																	clusterChartType : 'donut',
																	useClassificationColors : true,
																	pointTaxonomyClassifications: dataSource.facets,
																	otherClassificationColor:'#666666',
																	displayOnLoad: dataSource.displayOnLoad
																});
	
					
					//  Reference the cluster layer manager
					dataSource.clusterLayerManager = dataSource.locationsObj.clusterLayerManager;
					
					_loadingCtr('--');

				},
			  	
			  	// Failure	- stop the spinner
		  		function(a1, a2){ 
		  			
		  			_loadingCtr('--');
			  		
			  		});
	}	

	var donorState = function() {
		// If this data source already active, exit
		if($('#viewControl_donor').hasClass('VCactive')) {
			return
		}
		
		// Switch data source
		_SPDEV.DataSources.switchSource('Gov', 'Donor', map);
		
		// Toggle CSS for the toggler
		$('#viewControl_donor').toggleClass('VCactive', true);
		$('#viewControl_gov').toggleClass('VCactive', false);
		$('#viewControl_toggle').toggleClass('donor', true);
	};
	
	var govState = function() {
		if($('#viewControl_gov').hasClass('VCactive')) {
			return;
		}
		_SPDEV.DataSources.switchSource('Donor', 'Gov', map);
		
		$('#viewControl_gov').toggleClass('VCactive', true);
		$('#viewControl_donor').toggleClass('VCactive', false);
		$('#viewControl_toggle').toggleClass('donor', false);
	};
	
	// Click events for data source toggle
	$('#viewControl_donor').on('click', function(){
		donorState();
	});
	
	$('#viewControl_toggle').on('click', function() {
		if ($('#viewControl_donor').hasClass('VCactive')) {
			govState();
		} else {
			donorState();
		}
	});
	
	// See comments above
	$('#viewControl_gov').on('click', function(){
		govState();
	});

	
};

// Manage a toggle in data source
_SPDEV.DataSources.switchSource = function(from, to, map){
		var dsFrom = _SPDEV.DataSources.Data[from];
		
		dsFrom.isActive = false;
		$(dsFrom.chartsWrapper).hide();
		$(dsFrom.facetFilterWrapper).hide();
		$(dsFrom.listView.el).hide();
		map.removeLayer(dsFrom.clusterLayerManager.layer);
		dsFrom.clusterLayerManager.displayState = false;
		dsFrom.locationsObj.displayState = false;
		
		_SPDEV.DataSources.Data[to].isActive = true;
		
		var dsTo = _SPDEV.DataSources.Data[to];
		dsTo.isActive = true;
		$(dsTo.chartsWrapper).show();
		$(dsTo.facetFilterWrapper).show();
		$(dsTo.listView.el).show();
		map.addLayer(dsTo.clusterLayerManager.layer);
		dsTo.clusterLayerManager.displayState = true;
		dsTo.locationsObj.displayState = true;
		dsTo.clusterLayerManager.clusterPoints();
};

_SPDEV.DataSources.countdownThenCall = function(fn){
	
	var self = this;
	
	this.finishedCalls = 0;
	
	return function(direction){
		if(direction === '++'){
			self.finishedCalls++;
		}else{
			self.finishedCalls--;
		}
		if (self.finishedCalls === 0){
			fn();
		}
	};
};

