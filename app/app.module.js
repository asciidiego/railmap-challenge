angular.module('mainApp', ['ui-leaflet', 'mapboxgl-directive'])
    .run([function () {
        // mapboxgl.accessToken = 'pk.eyJ1IjoiZGllZ292aW5jZW50IiwiYSI6ImNqbXc5dXZ6dTM1d2gzcG54b2M1MGcxanQifQ.nD824m9yj3YBlAtnVixV7A';
        mapboxgl.accessToken = 'pk.eyJ1IjoidmlwZXJtdSIsImEiOiJjam13YnVkejcwZ3JjM2txbHY4aXp6bmpyIn0.qEG1rRwkJ3WPxnMbh4dRbQ';
    }]);