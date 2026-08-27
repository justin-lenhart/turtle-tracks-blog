---
title: "Flight Map"
---

Every leg I've logged.

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
<div id="map" style="height:480px;border-radius:8px;margin:1.5rem 0;"></div>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script>
  var m = L.map('map').setView([39.5, -104.9], 6);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    {maxZoom:19, attribution:'&copy; OpenStreetMap'}).addTo(m);
  L.marker([38.755,-109.754]).addTo(m).bindPopup('KCNY');
</script>