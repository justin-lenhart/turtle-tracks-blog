---
title: How this came to be"
date: 2026-08-20
summary: "When the good idea fairy finally visits."
tags: ["dev", "project"]
categories: ["Blog"]
---

# My First Blog Post

A short blurb of how this blog started

#### Background
I've long been a 'techy' and 'hobby' person, especially in comparison to the people I work with, love, and surround myself in. I've built several custom tools for things such as expense and pilot hours tracking. On my few off days, you can often find me at a local wood workshop attempting to learn some new woodworking skill or constructing a trinket of some sort or another for a loved one. I've used more markdown editors, vector designers, IDEs, email clients, and such than I could possibly tally. I have both Home Assistant and HomeKit running at my house. Right now, connected to my home network is a Raspberry Pi 4B hosting PhotoPrism At the same time, my job involves traveling to MANY unique locations across the United States, and if I can get more than 7 days off from work in a row, you'll find me strapping my 60L backpack on for a 4 day backpacking hike through a wilderness where I will likely see more bears than humans. I love to take photos of beautiful landscapes and scenery - even if the photos never quite do justice to reality. 

While my life isn't particularly special, I've always thought it'd be pretty awesome to document all of these various projects and travels. Maybe more for my personal consumption, but still out there, in case anyone else finds the stuff I do interesting. To that end, I've been wanting to start a blog for well over three years. I initially signed up for a WordPress(.com) account sometime in 2024, and handed over a few bucks for a custom domain name. I didn't like it. 

My inner nerd hated how a supposedly 'quick start' template was forced on me. I wanted to see the source code of the site, not preview thumbnails for the ungodly amount of themes available. I wanted something simple, not convulted and overly complex AI-generated designs. Some time has gone between that original WordPress sign up and now, but I learned of something crucial - the missing link - static sites. Just a few .toml and .md files which a generator converts into a website that can be as simple or as complex as I make it. 

#### Design Requirements
1. An input system that allows me to seamlessly and quickly record what I want to write about. A system that let's me open my laptop and write a quick 'something' during the 20 minutes I have in between flights, or the 30 minute lunch break I give myself while working on a project. While nerdy and willing to work the nitty details for initial setup, the actual posting of content must be simple. 
2. Allows posting of photographs from my PhotoPrism instance. 
3. Allows text based editing of the site. i.e., cannot be anything resembling the WordPress.com website 'creator' (I am unsure what WordPress actually calls their system)

That's about it. 

##### The Tools:
1. Hugo - for the static site generation
2. Blowfish - for the website template
3. CloudFlare Workers - for hosting
4. Cursor - for website editing
5. Obsidian - for posting
6. PhotoPrism - for photo storage

**Rational**
Hugo seemed like the least friction. A simple `brew install hugo` installed it. Blowfish, if you have not heard of it, is AWESOME. This is my first go at making a static site, so I have no baseline, but Blowfish gives a VERY wide array of tools for site creation. Indeed, I seriously doubt I will be lacking for any sort of desired feature. Of note, Blowfish supports direct in-frame Youtube videos, GitHub repositories, and many other content options. This is (mostly) achieved via a  something they call 'short code', which are tidbits of code you place in the markdown files comprising your site pages. 

![On the ramp](photo1.jpg)