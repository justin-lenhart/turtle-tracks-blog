---
title: "Flight Map"
---

Flights I've logged as an airline pilot.

<!--
  The data lives at  static/data/flights.geojson  and is served at /data/flights.geojson
  To refresh it, re-export from the logbook repo and overwrite that file.
-->

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
<div id="map" style="height:520px;border-radius:8px;margin:1.5rem 0;"></div>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script>
  // Base map
  const map = L.map('map').setView([39.5, -98.35], 4);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap'
  }).addTo(map);

  // Load the flight data and draw it
  fetch('/data/flights.geojson')
    .then(response => response.json())
    .then(data => {
      const layer = L.geoJSON(data, {

        // Airports become small circles
        pointToLayer: (feature, latlng) => L.circleMarker(latlng, {
          radius: 4,
          color: '#2563eb',
          fillColor: '#2563eb',
          fillOpacity: 0.9,
          weight: 1
        }),

        // Routes become thin lines
        style: { color: '#2563eb', weight: 1, opacity: 0.35 },

        // Click an airport to see its name
        onEachFeature: (feature, layer) => {
          const p = feature.properties || {};
          if (p.name) {
            layer.bindPopup(p.city ? `<b>${p.name}</b><br>${p.city}` : `<b>${p.name}</b>`);
          }
        }
      }).addTo(map);

      // Zoom to fit everything
      map.fitBounds(layer.getBounds(), { padding: [20, 20] });
    });
</script>
