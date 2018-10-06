angular.module('mainApp')
    .component('ttpMap', {
        templateUrl: 'main/ttp-map.component.html',
        controller: 'ttpMapController'
    })
    .controller('ttpMapController', ttpMapComponent);

ttpMapComponent.$inject = ['$http', 'mapboxglMapsData'];

function ttpMapComponent($http, mapboxglMapsData) {
    // Nothing here!
    let $ctrl = this;
    $ctrl.defaultURL = 'bicingStyleURL2';
    $ctrl.bicingStyleURL = 'mapbox://styles/vipermu/cjmwf4b777c2x2snxvhcqn55y';
    $ctrl.bicingStyleURL2 = 'mapbox://styles/vipermu/cjmx2tgp11a5p2rqzhnevkz9c';
    $ctrl.publicTransportStyleURL = 'mapbox://styles/vipermu/cjmx2mr0043so2smtwjj13sul';
    $ctrl.altUrl = 'mapbox://styles/vipermu/cjmx2mr0043so2smtwjj13sul';

    $ctrl.$onInit = function () {
        $ctrl.glControls = {
            geolocate: {
                enabled: true,
                options: {
                    position: 'bottom-right'
                }
            },
            geocoder: {
                enabled: true,
                options: {
                    position: 'top-left',
                    accessToken: mapboxgl.accessToken
                }
            },
            navigation: {
                enabled: true,
                options: {
                    position: 'bottom-right'
                }
            }
        };
        $ctrl.glSources = {
            "tPublicSource": {
                "type": "vector",
                "url": $ctrl.publicTransportStyleURL
            }
        };
        $ctrl.glLayers = [
            {
                "id": "tpublic",
                "source": "tPublicSource",
                "source-layer": "tPublicLayer",
                "type": "symbol",
                "paint": {
                    "fill-color": "#00ffff",
                    "text-field": "HELLO"
                },
                "events": {
                    onClick: function (map, feature, features) {
                        // Here, you have the feature clicked
                        let popUps = document.getElementsByClassName('mapboxgl-popup');
                        // Check if there is already a popup on the map and if so, remove it
                        if (popUps[0]) popUps[0].remove();
                        let popup = new mapboxgl.Popup({closeOnClick: true})
                            .setLngLat(feature.geometry.coordinates)
                            .setHTML(
                                '<h4>' + feature.properties.NOM_ESTACI + '</h4>' +
                                '<p><b>Linea: </b>' + feature.properties.Linia + '</p>' +
                                '<p><b>Intercanvis: </b>' + feature.properties.INTERCANVI + '</p>'
                            )
                            .addTo(map);

                        // Fly to clicked point!

                        map.flyTo({
                            center: feature.geometry.coordinates,
                            zoom: 15
                        });
                    },
                }
            },
            {
                "id": "stations",
                "source": "tPublicSource",
                "source-layer": "tPublicLayer",
                "type": "symbol",
                "paint": {
                    "fill-color": "#00ffff",
                    "text-field": "HELLO"
                },
                "events": {
                    onClick: function (map, feature, features) {
                        debugger;
                        // Here, you have the feature clicked
                        let popUps = document.getElementsByClassName('mapboxgl-popup');
                        // Check if there is already a popup on the map and if so, remove it
                        if (popUps[0]) popUps[0].remove();
                        debugger;
                        let popup = new mapboxgl.Popup({closeOnClick: true})
                            .setLngLat(feature.geometry.coordinates)
                            .setHTML(
                                '<h4>' + feature.properties.NOM_ESTACI + '</h4>' +
                                '<p><b>Linea: </b>' + feature.properties.Linia + '</p>' +
                                '<p><b>Intercanvis: </b>' + feature.properties.INTERCANVI + '</p>'
                            )
                            .addTo(map);

                        // Fly to clicked point!

                        map.flyTo({
                            center: feature.geometry.coordinates,
                            zoom: 15
                        });
                    },
                }
            },
        ];

        // // Add interactivity
        // let map = mapboxglMapsData.getMaps()[0].mapInstance;
        // // Add an event listener for when a user clicks on the map
        // map.on('click', function (e) {
        //     // Query all the rendered points in the view
        //     let features = map.queryRenderedFeatures(e.point, {sourceLayer: ['tpublic']});
        //     if (features.length) {
        //         let clickedPoint = features[0];
        //         // 1. Fly to the point
        //         flyToStore(clickedPoint);
        //         // 2. Close all other popups and display popup for clicked store
        //         createPopUp(clickedPoint);
        //         // 3. Highlight listing in sidebar (and remove highlight for all other listings)
        //         let activeItem = document.getElementsByClassName('active');
        //         if (activeItem[0]) {
        //             activeItem[0].classList.remove('active');
        //         }
        //         // Find the index of the store.features that corresponds to the clickedPoint that fired the event listener
        //         let selectedFeature = clickedPoint.properties.address;
        //
        //         for (let i = 0; i < stores.features.length; i++) {
        //             if (stores.features[i].properties.address === selectedFeature) {
        //                 selectedFeatureIndex = i;
        //             }
        //         }
        //         // Select the correct list item using the found index and add the active class
        //         let listing = document.getElementById('listing-' + selectedFeatureIndex);
        //         listing.classList.add('active');
        //     }
        // });

        // Get data
        // $http.get('data/E50m_XF_CAT_v1_PTT.geojson').then((response, status) => {
        //     // Get geojson from file.
        //     $ctrl.glSources = [
        //         {
        //             id: 'bcn',
        //             type: 'geojson',
        //             data: response.data,
        //         }
        //     ];
        //
        //     $ctrl.glLayers = [
        //         {
        //             id: 'layerTest',
        //             source: 'bcn',
        //             type: 'circle',
        //             paint: {
        //                 'circle-radius': 23,
        //                 'circle-color': '#FF1A47',
        //                 'circle-opacity': 0.7,
        //                 'circle-stroke-width': 2,
        //                 'circle-stroke-color': '#FF0033'
        //             }
        //         }
        //     ];
        //
        //     // For each coordinate
        //     const BCN_ZONE = 31;
        //     const BCN_HEMI = 'N'
        //
        //     // Convert from UTM to LatLng
        //     $ctrl.glSources[0].data.features.map(d => {
        //         const X = d.geometry.coordinates[0];
        //         const Y = d.geometry.coordinates[1];
        //         const CONVERTED_RESULT = L.utm({x: X, y: Y, zone: BCN_ZONE, band: 'N'}).latLng();
        //         d.geometry.coordinates[0] = CONVERTED_RESULT.lng;
        //         d.geometry.coordinates[1] = CONVERTED_RESULT.lat;
        //     });
        //     debugger;
        //     // Instance of the map
        //     //mapboxglMapsData.getMapById('myMap');
        // });
    };
}
