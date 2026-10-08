---
title: "The Logbook Behind the Map"
date: 2026-10-08
summary: "Where the flight map on this site comes from: a pilot logbook that fills itself from my airline's schedule exports, lives on a server in my closet, and publishes a map every time I fly."
projects: ["logbook"]        # TODO: create content/projects/logbook/_index.md, or delete this line
categories: ["Projects"]
tags: ["flying", "python", "homelab"]
draft: true
---

<!-- DRAFT. Facts below are taken from the logbook repo README. Anything I
     could not confirm from the repo is marked TODO. -->

The [map on this site](/map/) is the visible end of a much larger thing. This
post is about the rest of it.

## The problem

Airline pilots keep a logbook. The FAA wants one, the next employer wants one,
and the numbers in it (total time, time by aircraft, night, landings) are what
every application form asks for. The traditional answer is a paper book or a
subscription app, and both mean typing every leg in by hand after a trip.

My airline's scheduling system, SkedPlus, will export a trip as a text file.
Every leg, every time, every aircraft. The whole logbook project exists to
turn that export into a logbook entry without me touching a keyboard.

## How it works

1. **Drag files into a folder.** After a trip, I export the pairing from
   SkedPlus and drop the file into a synced folder on my Mac. When the
   monthly schedule drops, the planned trips go into a sibling folder.
2. **The server picks them up.** [Syncthing](https://syncthing.net) carries
   the folder to the home server, and a systemd path unit watches it. A new
   file triggers the importer within a minute or two. No terminal.
3. **The importer does the thinking.** It converts every time to UTC using
   each airport's time zone, splits night time and night landings by FAA
   currency rules (one hour after sunset to one hour before sunrise),
   ignores deadheads for flight time but keeps them for duty, and catches
   the usual schedule weirdness: cancelled days, reassigned trips, same-station
   air returns.
4. **It writes to Grist.** The logbook itself is a self-hosted
   [Grist](https://www.getgrist.com) document: trips, duty periods, flights,
   airports, aircraft. Grist is the single source of truth; everything else
   reads from it.
5. **It publishes the map.** After every actual import, the tool regenerates
   a GeoJSON file of every flown route and pushes it to GitHub Pages. The map
   on this site fetches that file directly, so it updates itself.

Anything that fails lands in a `failed/` folder with a log explaining why,
and that folder syncs back to the Mac so I actually see it.

## Looking at it

Grist has native charts, but for anything beyond the basics there's a
[Metabase](https://www.metabase.com) instance alongside it (the
`logbook-visualize` repo) with dashboards for monthly hours, planned-versus-
actual, and a page that mirrors the FAA 8710 application matrix so filling out
a form is a matter of copying numbers. Everything is on the home network over
Tailscale only. The map is the only public piece.

<!-- TODO: screenshot of a Grist or Metabase dashboard, with any identifying
     numbers you don't want public cropped out. -->

## History

It started on Airtable in <!-- TODO: year -->, which was fine until it wasn't:
the free tier's record limit, the API rate limit, and a logbook that lived on
someone else's server. The cutover to Grist on the home server happened on
23 July 2026. Airtable survives only as a frozen backup of the pre-cutover
data.

<!-- TODO: anything about the historical import (docs/historical-logbook-import.md)
     — how the pre-SkedPlus years got in? -->

## The map on this site

Forty lines of Leaflet and a GeoJSON URL. The map was the feature that made me
leave WordPress; there it needed a paid plan to allow plugins, here it's a
text file. It reads the logbook's published data on every page load and
falls back to a local copy if GitHub is unreachable.

{{< github repo="justin-lenhart/logbook" showThumbnail=true >}}
{{< github repo="justin-lenhart/logbook-visualize" showThumbnail=true >}}
