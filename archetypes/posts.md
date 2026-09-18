---
title: "{{ replace .File.ContentBaseName "-" " " | title }}"
date: {{ .Date | time.Format "2006-01-02" }}
summary: ""
# projects: ["blog"]        # folder name under content/projects/, or delete this line
categories: ["Work"]        # Work, Fun, or Projects
tags: ["travel"]
draft: true                 # change to false (or delete the line) to publish
---

<!-- Photos: drop them in this folder and reference them by filename, e.g.
     ![Caption](photo-1.jpg)
     The first file whose name contains "featured" becomes the card thumbnail. -->
