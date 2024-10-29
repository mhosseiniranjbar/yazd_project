// Initialize Neshan Map
const map = new ol.Map({
    maptype: 'neshan',
    target: 'map',
    key: 'web.4beb3f2468444c7a82692aef82946064',
    poi: true,
    traffic: true,
    view: new ol.View({
        center: ol.proj.fromLonLat([54.3569, 31.8974]), // Centered on Yazd
        zoom: 12
    })
});

// Function to add a marker to the map with a custom icon
	function addMarker(latitude, longitude) {
    const marker = new ol.Feature({
        geometry: new ol.geom.Point(
            ol.proj.fromLonLat([longitude, latitude]) // Convert coordinates to map projection
        ),
    });

    // Marker style with your custom icon
    marker.setStyle(new ol.style.Style({
        image: new ol.style.Icon({
            src: './Images/mapmarker.png', // Custom marker icon path
            scale: 0.1, // Adjust the size of the icon as needed
            anchor: [0.5, 1], // Position icon based on its center
        })
    }));

    // Add marker to a vector layer
    const vectorSource = new ol.source.Vector({
        features: [marker],
    });

    const markerLayer = new ol.layer.Vector({
        source: vectorSource,
    });

    // Add marker layer to the map
    map.addLayer(markerLayer);
}

// Event listeners for map clicks to select locations and add markers
map.on("click", function (event) {
    const coordinates = ol.proj.toLonLat(event.coordinate);
    const [lon, lat] = coordinates;
    const pickupInput = document.getElementById("pickup-location");
    const dropoffInput = document.getElementById("dropoff-location");

    if (pickupInput === document.activeElement) {
        pickupInput.value = `Lat: ${lat.toFixed(4)}, Lon: ${lon.toFixed(4)}`;
        addMarker(lat, lon); // Place a marker on the selected pickup location
    } else if (dropoffInput === document.activeElement) {
        dropoffInput.value = `Lat: ${lat.toFixed(4)}, Lon: ${lon.toFixed(4)}`;
        addMarker(lat, lon); // Place a marker on the selected dropoff location
    }
});

// Form submission handler
document.getElementById('booking-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const pickupLocation = document.getElementById('pickup-location').value;
    const dropoffLocation = document.getElementById('dropoff-location').value;
    const serviceType = document.getElementById('service-type').value;
    const pickupTime = document.getElementById('pickup-time').value;

    console.log(`Booking Details:
        Pickup: ${pickupLocation},
        Dropoff: ${dropoffLocation},
        Service: ${serviceType},
        Time: ${pickupTime}`);

    alert('Your booking has been confirmed!');
});
