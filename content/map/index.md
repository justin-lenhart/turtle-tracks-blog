---
title: "Flight Map"
date: 2026-08-27
---

Every leg I've logged.

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
<div id="map" style="width:min(48rem, 92vw);height:520px;border-radius:8px;margin:1.5rem 0;"></div>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script src="/js/flight-map.js"></script>

<!--
  Map code:  static/js/flight-map.js
  Map data:  docs/map_data.geojson in the logbook repo on GitHub, read live.
             static/data/flights.geojson is the fallback if GitHub is unreachable.

  Keep the explicit width on the div above. Blowfish wraps article content in
  "max-w-fit", which shrinks to the text width. Without a width, the map
  collapses to a narrow strip on short pages.

  Keep the JavaScript in the .js file. Do not inline it here. A blank line
  inside an inline <script> ends the HTML block. Hugo then renders the rest as
  markdown.
-->
