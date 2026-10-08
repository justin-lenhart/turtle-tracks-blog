---
# Posts join this project with:  projects: ["simple-enviro-tracker"]
title: "simple-enviro-tracker"
description: "A pocket-sized temperature and humidity sensor that shows up natively in Apple Home."
kind: electronics
status: complete
---
An M5StickC Plus and a DHT20 sensor running
[HomeSpan](https://github.com/HomeSpan/HomeSpan), so it pairs with the Home
app directly over Wi-Fi with no bridge. The screen shows the current reading
and a graph of the last 1 to 72 hours; a small web page on the device lists
the last 24 hours.

Built in a hurry after a water heater flooded a condo.

{{< github repo="justin-lenhart/simple-enviroment-monitor" showThumbnail=true >}}

![Device](IMG_4230.jpeg "Temperature in yellow, humidity in blue, one hour of history")
