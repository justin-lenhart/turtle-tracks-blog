// Draws the flight map on /map/
//
// The map reads its data from the logbook repo on GitHub. It updates when
// the logbook pushes a new export. There is nothing to copy.
// If GitHub is unreachable, the map reads the local copy at
// static/data/flights.geojson (served at /data/flights.geojson). Replace that
// copy with a fresh export now and then.

var DATA_URL = 'https://raw.githubusercontent.com/justin-lenhart/logbook/main/docs/map_data.geojson';
var FALLBACK_URL = '/data/flights.geojson';

// Grist stores block and credit as decimal hours. 1.75 means 1:45.
function hoursToClock(h) {
  if (typeof h !== 'number' || isNaN(h)) return '?';
  var total = Math.round(h * 60);
  var hh = Math.floor(total / 60);
  var mm = total % 60;
  return hh + ':' + (mm < 10 ? '0' : '') + mm;
}

function routePopup(p) {
  var lines = [
    '<b>' + p.origin + ' &#8644; ' + p.destination + '</b>',
    (p.count || 0) + (p.count === 1 ? ' leg' : ' legs')
  ];
  if (typeof p.avg_block === 'number') {
    lines.push('Block avg ' + hoursToClock(p.avg_block) +
      ' (' + hoursToClock(p.min_block) + ' to ' + hoursToClock(p.max_block) + ')');
  }
  if (typeof p.avg_credit === 'number') {
    lines.push('Credit avg ' + hoursToClock(p.avg_credit));
  }
  return lines.join('<br>');
}

function airportPopup(p) {
  var label = p.city ? p.name + '<br>' + p.city : p.name;
  return '<b>' + label + '</b>';
}

function fetchJson(url) {
  return fetch(url).then(function (response) {
    if (!response.ok) throw new Error(url + ' returned ' + response.status);
    return response.json();
  });
}

window.addEventListener('load', function () {

  // Blowfish declares a global `const L`. It hides Leaflet's `L` from code
  // that runs after it. window.L is the real Leaflet. Do not remove this
  // line. Without it, the map breaks with no clear error.
  const L = window.L;

  const map = L.map('map').setView([39.5, -98.35], 4);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap'
  }).addTo(map);

  fetchJson(DATA_URL)
    .catch(function (err) {
      console.warn('Logbook data unavailable, using local copy:', err);
      return fetchJson(FALLBACK_URL);
    })
    .then(function (data) {
      var routeStyle = { color: '#2563eb', weight: 1, opacity: 0.35 };
      var routeHover = { color: '#2563eb', weight: 2, opacity: 0.9 };

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

        // Routes: a 1 px line is too thin to click. Each route is drawn
        // twice. Leaflet draws the LineString as a wide invisible line, the
        // click target, with this style. onEachFeature adds the thin visible
        // line on top. Airports keep the style from pointToLayer.
        style: function (feature) {
          if (feature.geometry.type === 'LineString') {
            return { color: '#2563eb', weight: 10, opacity: 0 };
          }
          return {};
        },

        onEachFeature: function (feature, layer) {
          const p = feature.properties || {};

          if (p.origin && p.destination) {
            var visible = L.polyline(layer.getLatLngs(), routeStyle)
              .addTo(map);
            layer.bindPopup(routePopup(p));
            layer.on('mouseover', function () { visible.setStyle(routeHover); });
            layer.on('mouseout', function () { visible.setStyle(routeStyle); });
            layer.on('popupopen', function () { visible.setStyle(routeHover); });
            layer.on('popupclose', function () { visible.setStyle(routeStyle); });
          } else if (p.name) {
            layer.bindPopup(airportPopup(p));
          }
        }
      }).addTo(map);

      // Move the airport circles above the wide invisible lines so the
      // circles stay clickable.
      layer.eachLayer(function (l) {
        if (l instanceof L.CircleMarker) l.bringToFront();
      });

      // The article column may still be sizing when this runs. Wait one
      // frame so Leaflet measures the real width. Without the wait, Leaflet
      // sees a 0 px wide map and shows a blank grey square.
      requestAnimationFrame(function () {
        map.invalidateSize();
        map.fitBounds(layer.getBounds(), { padding: [20, 20] });
      });
    })
    .catch(function (err) {
      console.error('Could not load flight data:', err);
    });
});
