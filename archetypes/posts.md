---
title: "{{ replace .File.ContentBaseName "-" " " | title }}"
date: {{ .Date | time.Format "2006-01-02" }}
summary: ""
# projects: ["blog"]        # a folder name under content/projects/. Delete this line if none.
categories: ["Work"]        # Work, Fun, or Projects
tags: ["travel"]
draft: true                 # set false, or delete this line, to publish
---

<!-- Put photos in this folder. Reference each one by filename:
     ![Caption](photo-1.jpg)
     The first file with "featured" in its name becomes the card thumbnail. -->
