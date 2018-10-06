angular.module('mainApp')
    .component('ttpMap', {
        templateUrl: 'main/ttp-map.component.html',
        controller: 'ttpMapController'
    })
    .controller('ttpMapController', ttpMapComponent);

ttpMapComponent.$inject = ['$http', 'mapboxglMapsData', '$scope'];

function ttpMapComponent($http, mapboxglMapsData, $scope) {
    // Nothing here!
    let $ctrl = this;

    $ctrl.$onInit = function () {
        $ctrl.styleUrl = 'mapbox://styles/vipermu/cjmx8a314d8xk2rlcnu6h2gu9';
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
                "url": $ctrl.styleUrl
            }
        };
        $ctrl.glLayers = [
            {
                "id": "tpublic",
                "source": "tPublicSource",
                "source-layer": "tPublicLayer",
                "type": "symbol",
                "events": {
                    onClick: function (map, feature, features) {
                        debugger;
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
        ];

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

    $ctrl.$postLink = function () {
        $scope.$on('mapboxglMap:styledata', function (angularEvent, mapboxglEvent) {
            $ctrl.map = mapboxglMapsData.getMaps()[0].mapInstance;
            onMapClick($ctrl.map);
        });
    };

    function onMapClick(map) {
        map.on('click', function (e) {
            // Query all the rendered points in the view
            let features = map.queryRenderedFeatures(e.point, {sourceLayer: ['tpublic']});
            if (features.length) {
                let clickedPoint = features[0];
                // 1. Fly to the point
                if (clickedPoint.geometry.type === 'Point') {
                    flyToStore(clickedPoint);
                    // 2. Close all other popups and display popup for clicked store
                    createPopUp(clickedPoint);
                }
            }
        });
    }

    function flyToStore(currentFeature) {
        $ctrl.map.flyTo({
            center: currentFeature.geometry.coordinates,
            zoom: 15
        });
    }

    function createPopUp(currentFeature) {
        var popUps = document.getElementsByClassName('mapboxgl-popup');
        // Check if there is already a popup on the map and if so, remove it
        if (popUps[0]) popUps[0].remove();
        var popup = new mapboxgl.Popup({closeOnClick: true})
            .setLngLat(currentFeature.geometry.coordinates);
        if (currentFeature.properties.type === 'BIKE') {
            let bikeStatus = currentFeature.properties.status === "OPN" ? "Disponible!" : "NO DISPONIBLE";
            let bikeStreet = currentFeature.properties.streetName;
            let bikeStreetNumber = currentFeature.properties.streetNumber;
            let bikeInfo;
            if (bikeStreetNumber != null) {
                bikeInfo = bikeStreet + ', ' + bikeStreetNumber;
            } else bikeInfo = bikeStreet;
            popup.setHTML('<h3>' + bikeStatus + '</h3>' +
                '<h4>' + bikeInfo + '</h4>')
                .addTo($ctrl.map);
        } else {
            popup.setHTML('<h3>' + currentFeature.properties.Xarxa + " " + currentFeature.properties.NOM_ESTACI + '</h3>' +
                '<h4>' + currentFeature.properties.Linia + '</h4>')
                .addTo($ctrl.map);
        }
    }
}
