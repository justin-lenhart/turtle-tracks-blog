// Draws the flight map on /map/
// Data: static/data/flights.geojson  (served at /data/flights.geojson)

window.addEventListener('load', function () {

  // Blowfish's own script declares a global `const L`, which hides Leaflet's
  // `L` from any code that runs after it. Grabbing window.L here gets the real
  // Leaflet. Don't remove this line — the map breaks in confusing ways.
  const L = window.L;

  const map = L.map('map').setView([39.5, -98.35], 4);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap'
  }).addTo(map);

  fetch('/data/flights.geojson')
    .then(function (response) { return response.json(); })
    .then(function (data) {
      const layer = L.geoJSON(data, {

        // Airports become small circles
        pointToLayer: function (feature, latlng) {
          return L.circleMarker(latlng, {
            radius: 4,
            color: '#2563eb',
            fillColor: '#2563eb',
            fillOpacity: 0.9,
            weight: 1
          });
        },

        // Routes become thin lines
        style: { color: '#2563eb', weight: 1, opacity: 0.35 },

        // Click an airport to see its name
        onEachFeature: function (feature, layer) {
          const p = feature.properties || {};
          if (p.name) {
            const label = p.city ? p.name + '<br>' + p.city : p.name;
            layer.bindPopup('<b>' + label + '</b>');
          }
        }
      }).addTo(map);

      // The article column may still be sizing when this runs. Wait one frame
      // so Leaflet measures the real width — otherwise it sees a 0-wide map
      // and zooms all the way in to a blank grey square.
      requestAnimationFrame(function () {
        map.invalidateSize();
        map.fitBounds(layer.getBounds(), { padding: [20, 20] });
      });
    })
    .catch(function (err) {
      console.error('Could not load flight data:', err);
    });
});
