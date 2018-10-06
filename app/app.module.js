angular.module('mainApp', ['ui-leaflet', 'mapboxgl-directive', 'ui.router', 'ngPinchZoom'])
    .run([function () {
        // Mine
        mapboxgl.accessToken = 'pk.eyJ1IjoiZGllZ292aW5jZW50IiwiYSI6ImNqbXc5dXZ6dTM1d2gzcG54b2M1MGcxanQifQ.nD824m9yj3YBlAtnVixV7A';

        // Victor
        // mapboxgl.accessToken = 'pk.eyJ1IjoidmlwZXJtdSIsImEiOiJjam13YnVkejcwZ3JjM2txbHY4aXp6bmpyIn0.qEG1rRwkJ3WPxnMbh4dRbQ';
    }])
    .config(function ($stateProvider) {
        var mainState = {
            name: 'default',
            url: '/',
            templateUrl: 'main/ttp-map.view.html'
        };

        var svgState = {
            name: 'schematic',
            url: '/map',
            templateUrl: 'main/ttp-schematic.view.html'
        };

        $stateProvider.state(mainState);
        $stateProvider.state(svgState);
    })
    .controller('SvgMapController', SvgMapController)

SvgMapController.$inject = [];

function SvgMapController() {
    let $ctrl = this;
    $ctrl.zoomIn = function () {
        // d3.select('#staticMap')
        //     .attr('transform', 'scale(5)')
        //     .transition()
        //     .duration(1500)
        //     .attr('transform', 'scale(2)');
    };
}