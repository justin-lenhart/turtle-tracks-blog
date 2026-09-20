# Turtle Tracks

Hugo + Blowfish, hosted on Cloudflare Workers. Live at [https://www.turtle-tracks.com](https://www.turtle-tracks.com)

Sections 1 to 3 are for every trip. Sections 4 to 8 are reference.

## 1. Write a post

**Create the post.** This command makes the folder and a pre-filled `index.md`:

```
hugo new content posts/2026.09.20-city-name/index.md
```

Each post is one folder: `content/posts/YYYY.MM.DD-slug/index.md`. Put the
photos in the same folder.

**Add photos.** Drag the photos into the post folder. Then run this command
inside the post folder:

```
sips -Z 2000 *.jpg *.jpeg *.JPG *.JPEG
```

The command scales each photo to 2000 px on the long side. It keeps the
shape and does not crop. It rewrites the files in place. A 3-5 MB phone photo
becomes about 1 MB. Run it only on new photos, because it also scales small
images up.

Hugo cannot read HEIC files (the iPhone default). Convert them first:

```
sips -s format jpeg -Z 2000 photo.HEIC --out photo.jpg
```

Reference a photo in the post with `![Caption](photo-1.jpg)`. A file with
`featured` in its name becomes the card thumbnail.

**Front matter cheat sheet.** Front matter is the block at the top of `index.md`.


| Field        | Pick from                                                                     | Notes                                                                                  |
| ------------ | ----------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `categories` | `Work`, `Fun`, `Projects`                                                     | What kind of post is this?                                                             |
| `tags`       | `travel`, `woodworking`, `hiking`, `smartHome`, `electronics`, `hugo`, `meta` | What is the post about? New tags are fine.                                             |
| `projects`   | a folder name under `content/projects/`                                       | Example: `["bread-box"]`. Use the FOLDER name, not the title. Delete the line if none. |
| `draft`      | `true` / `false`                                                              | `true` = not published. Set `false` or delete the line to publish.                     |




## 2. Preview locally

This command serves the site at [http://localhost:1313](http://localhost:1313).
The `-D` flag includes drafts.

```
hugo server -D --disableFastRender --noHTTPCache
```

If the command stops with `open .../public/...: not a directory`, a stale
file is in the generated `public/` folder. Run `rm -rf public`. Then run the
command again.

## 3. Publish

`git push` is the deploy. Cloudflare sees the push, runs `build.sh`, and
redeploys in about one minute. Watch progress in the Worker's **Deployments**
tab on the [Cloudflare dashboard](https://dash.cloudflare.com/fb90c5484e857484c4d69a2226ea081e/workers/services/view/turtle-tracks-blog/production/domains).

```
git add -A
git commit -m "New post: ..."
git push
```



## 4. Pages I edit now and then

**Hotel Tracker** -- `content/hotel-tracker/index.md`. The table at the top is
the index. Each row links to a `## Hotel {#some-id}` section on the same
page. A comment at the top of the file gives the steps. Put photos in
`content/hotel-tracker/`.

**Front page photos** -- every image in `assets/img/favorites/` appears on the
front page, sorted by filename. A `01-` prefix puts a photo first. To add a
photo, shrink it (section 1) and put it in the folder. To delete a photo,
delete its file. To show only the first 9, change `favorites` in
`content/_index.md` to `favorites limit="9"`. Tiles are 2 per row on phones
and 3 per row on larger screens. `layouts/shortcodes/favorites.html` sets
that.

**Flight map** -- the map reads `docs/map_data.geojson` from the logbook repo
on GitHub. It updates a few minutes after the logbook pushes a new export.
There is nothing to copy. `static/data/flights.geojson` is the fallback for
when GitHub is unreachable. Replace it with a fresh export now and then.
Click a route to see legs flown, block, and credit. The map code is
`static/js/flight-map.js`.

**Projects** -- a project is a folder under `content/projects/` with an
`_index.md` inside. It is `_index.md`, not `index.md`, because the page lists
other pages (its update posts). A post joins a project with
`projects: ["folder-name"]` in its front matter. A project appears on
`/projects/` only after one post references it. `["Walnut Bread Box"]`
instead of `["bread-box"]` creates a second, empty project with no warning.

**About** -- `content/about.md`.

## 5. Settings

All config is in `config/_default/`.


| To change                                             | File                | Section                   |
| ----------------------------------------------------- | ------------------- | ------------------------- |
| Site title, author name/photo/links                   | `languages.en.toml` | `[params.author]`         |
| Top nav / footer links                                | `menus.en.toml`     | `[[main]]` / `[[footer]]` |
| Homepage layout, recent-post count                    | `params.toml`       | `[homepage]`              |
| What shows on a post (date, word count, author, tags) | `params.toml`       | `[article]`               |
| Color scheme, dark mode                               | `params.toml`       | top of file               |
| Theme, baseURL, taxonomies                            | `hugo.toml`         |                           |
| Markdown settings (`unsafe = true`, do not change)    | `markup.toml`       |                           |


**Post metadata toggles** (`[article]` in `params.toml`): `showDate`,
`showDateUpdated` ("last modified"), `showWordCount` ("638 words"),
`showReadingTime` ("3 min read").

**Date format** (`dateFormat` in `languages.en.toml`). Go uses a reference
date, not `YYYY-MM-DD` placeholders. The reference values are always
`Mon Jan 2 15:04:05 MST 2006`. Arrange them in the shape you want.


| Set it to                 | You get                   |
| ------------------------- | ------------------------- |
| `2 January 2006`          | 27 August 2026            |
| `January 2, 2006`         | August 27, 2026           |
| `Jan 2, 2006`             | Aug 27, 2026              |
| `2006-01-02`              | 2026-08-27                |
| `Monday, January 2, 2006` | Thursday, August 27, 2026 |


**Taxonomies.** The `projects:` front matter works because `hugo.toml` lists
`project = "projects"` under `[taxonomies]`. The same applies to `tags` and
`categories`.

## 6. Repo layout

```
turtle-tracks-blog/
├── archetypes/                     templates for `hugo new`
│   ├── default.md
│   └── posts.md                    pre-fills a new post
├── assets/                         files Hugo PROCESSES (resize, minify)
│   └── img/
│       ├── avatar.jpeg             author image -> "img/avatar.jpeg" in config
│       ├── BlogLogo.png
│       └── favorites/              photos on the front page
├── config/
│   └── _default/                   all settings (see section 5)
├── content/
│   ├── _index.md                   homepage intro text + favorite photos
│   ├── about.md
│   ├── hotel-tracker/
│   │   └── index.md                hotel gym table + per-hotel notes/photos
│   ├── map/
│   │   └── index.md                Leaflet map page
│   ├── posts/
│   │   └── 2026.08.26-start-a-blog/
│   │       ├── index.md
│   │       └── featured_....jpeg   "featured" in the name = card thumbnail
│   └── projects/
│       ├── _index.md               /projects/ landing page
│       ├── blog/_index.md
│       └── bread-box/_index.md
├── static/                         files copied VERBATIM, no processing
│   ├── data/flights.geojson        map fallback data
│   └── js/flight-map.js            map code
├── themes/
│   └── blowfish/                   git submodule, never edit in here
├── .gitmodules                     records the theme submodule
├── build.sh                        Cloudflare runs this
├── wrangler.toml                   Worker name + assets dir
├── README.md
└── TODO.md

generated, gitignored, never committed:
├── public/                         the built site
└── resources/                      Hugo's image-processing cache
```

`_index.md` **vs** `index.md`**.** `_index.md` is a list page. It contains other
pages (posts, projects). `index.md` is a single page. It can hold photos but
not child pages.

`assets/` **vs** `static/`**.** Hugo processes files in `assets/` (resize,
optimize). Paths are relative to `assets/`, for example `img/avatar.jpeg`.
Hugo copies files in `static/` byte for byte. Hugo serves
`static/data/flights.geojson` at `/data/flights.geojson`.

## 7. Theme maintenance

**Update Blowfish.** The theme is a git submodule. The repo stores only a
pointer to one theme commit. An update moves that pointer. Do this when
`hugo server` warns that the module "is not compatible with this Hugo version":

```
git submodule update --remote --merge
git add themes/blowfish
git commit -m "Update Blowfish"
git push
```

**Customize one piece of the theme.** Copy the file from
`themes/blowfish/layouts/...` into `layouts/` at the same path. Edit the copy.
Never edit inside `themes/`. A theme update overwrites it.

## 8. Resources & links

- [Blowfish docs](https://blowfish.page/docs/) (shortcodes, front matter, config)
- [Bear note](bear://x-callback-url/open-note?id=BA93DC3B-E9B1-4686-AC60-1845AC6E4C68)
- [Lempa Video 1/2 - Build Static Site](https://www.youtube.com/watch?v=MX4yy1dTVYg&t=820s)
- [Lempa Video 2/2 - Publish Static Site](https://www.youtube.com/watch?v=FZMgUSlNp-0&list=PLL2R0PhD_K3E&index=3)
- [Cloudflare deployment dashboard](https://dash.cloudflare.com/fb90c5484e857484c4d69a2226ea081e/workers/services/view/turtle-tracks-blog/production/domains)



## Issues

- [ ] something needs to be changed in taxonomies for project handling? where is that?