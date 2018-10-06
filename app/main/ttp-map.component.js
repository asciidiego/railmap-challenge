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

    $ctrl.$onInit = function () {
        $ctrl.glStyle = 'mapbox://styles/mapbox/streets-v9';
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

        // Get data-set
        $http.get('data/E50m_XF_CAT_v1_PTT.geojson').then((response, status) => {
            // Process data
            let processed_features = response.data.features.map(d => {
                const BCN_ZONE = 31;
                const X = d.geometry.coordinates[0];
                const Y = d.geometry.coordinates[1];
                let processed = L.utm({x: X, y: Y, zone: BCN_ZONE, band: 'N'}).latLng();
                d.geometry.coordinates[0] = processed.lng;
                d.geometry.coordinates[1] = processed.lat;
                return d;
            });
            response.data.features = processed_features;
            let source = {
                id: 'bcn',
                type: 'geojson',
                data: response.data,
            };
            // Add to layers
            let layer = {
                id: 'main_stations',
                source: 'bcn',
                type: 'circle',
                paint: {
                    'circle-radius': [
                        'interpolate', ['linear'], ['zoom'],
                        4, 1,
                        22, 24,
                    ],
                    'circle-color': '#FF1A47',
                    'circle-opacity': 0.7,
                },
                events: {
                    onClick: function (map, feature, features) {
                        debugger;
                    }
                }
            };
            // Push to layer and source
            $ctrl.glSources = source;
            $ctrl.glLayers = layer;
        });
    };
}
