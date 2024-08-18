var liveLocationTracker = {
    map: null,
    marker: null,
    circle: null,
    watchId: null,

    init: function() {
        this.map = L.map('map').setView([14.0860746, 100.608406], 25); // Set initial zoom level to 15

        // Add Location Control
        L.control.locate({
            position: 'topright',
            drawCircle: true,
            follow: true,
            setView: false, 
            keepCurrentZoomLevel: true,
            markerStyle: {
                radius: 8,
                fillColor: '#ff7800',
                color: '#000',
                weight: 1,
                opacity: 0.8,
                fillOpacity: 0.8
            },
            circleStyle: {
                color: '#ff7800',
                weight: 1,
                opacity: 0.8,
                fillOpacity: 0.1
            },
            icon: 'fa fa-location-arrow',
            iconLoading: 'fa fa-spinner fa-spin',
            metric: true,
            onLocationError: function(e) {
                alert(e.message);
            }
        }).addTo(this.map);

        this.startTracking();
    },

    startTracking: function() {
        if (!navigator.geolocation) {
            console.log("Your browser doesn't support geolocation feature!");
        } else {
            this.watchId = navigator.geolocation.watchPosition(
                this.getPosition.bind(this),
                this.handleError.bind(this),
                {
                    enableHighAccuracy: true,
                    maximumAge: 0,
                    timeout: 10000
                }
            );
        }
    },

    getPosition: function(position) {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;
        var accuracy = position.coords.accuracy;
        // Remove previous marker and circle if they exist
        if (this.marker) {
            this.map.removeLayer(this.marker);
        }

        if (this.circle) {
            this.map.removeLayer(this.circle);
        }

        // Create new marker and circle
        this.marker = L.marker([lat, long]).addTo(this.map);
        this.circle = L.circle([lat, long], { radius: accuracy }).addTo(this.map);

        // Set the map view to the user's location with a close zoom level
        this.map.setView([lat, long], 15); // Set zoom level to 15 for close view

        console.log("Your coordinate is: Lat: " + lat + " Long: " + long + " Accuracy: " + accuracy + " meters");
    },

    handleError: function(error) {
        console.error("Error getting location: ", error.message);
        navigator.geolocation.clearWatch(this.watchId);
    }
};

// Initialize the live location tracker
liveLocationTracker.init();