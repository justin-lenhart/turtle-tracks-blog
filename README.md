# Turtle Tracks

Hugo + Blowfish, hosted on Cloudflare Workers. Live at [https://www.turtle-tracks.com](https://www.turtle-tracks.com)

The first three sections are the ones you use every trip. Everything after that
is reference.

## 1. Write a post

**Create it** (makes the folder and a pre-filled `index.md`):

```
hugo new content posts/2026.09.20-city-name/index.md
```

Posts live in `content/posts/YYYY.MM.DD-slug/index.md`, one folder per post.
Photos go in the same folder.

**Add photos**: drag them into the post folder, then shrink them (phone photos
are 3-5 MB each; this makes them ~1 MB). Run inside the post folder:

```
sips -Z 2000 *.jpg *.jpeg *.JPG *.JPEG
```

It scales the whole photo so the long side is 2000 px, keeps the shape (no
cropping, any orientation), and rewrites the files in place. Only run it on
fresh photos: it also scales small images UP. HEIC files (iPhone default) must
be converted first, Hugo can't read them:

```
sips -s format jpeg -Z 2000 photo.HEIC --out photo.jpg
```

Reference a photo in the post with `![Caption](photo-1.jpg)`. A file with
`featured` in its name becomes the card thumbnail automatically.

**Front matter cheat sheet** (the block at the top of `index.md`):


| Field        | Pick from                                                                     | Notes                                                                                     |
| ------------ | ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `categories` | `Work`, `Fun`, `Projects`                                                     | Big picture: what shape is this?                                                          |
| `tags`       | `travel`, `woodworking`, `hiking`, `smartHome`, `electronics`, `hugo`, `meta` | What is it about? Add new ones freely.                                                    |
| `projects`   | a folder name under `content/projects/`                                       | e.g. `["bread-box"]`. Must match the FOLDER name, not the title. Delete the line if none. |
| `draft`      | `true` / `false`                                                              | `true` = not published. Delete the line or set `false` to go live.                        |




## 2. Preview locally

Opens at [http://localhost:1313](http://localhost:1313) (`-D` includes drafts):

```
hugo server -D --disableFastRender --noHTTPCache
```

If it stops with an error like `open .../public/...: not a directory`, a stale
file is sitting in the generated `public/` folder. Delete it and rerun:
`rm -rf public`

## 3. Publish

`git push` is the deploy. Cloudflare sees the push, runs `build.sh`, and
redeploys in about a minute. Watch progress in the Worker's **Deployments**
tab ([Cloudflare dashboard](https://dash.cloudflare.com/fb90c5484e857484c4d69a2226ea081e/workers/services/view/turtle-tracks-blog/production/domains)).

```
git add -A
git commit -m "New post: ..."
git push
```



## 4. Pages I edit now and then

**Hotel Tracker** -- `content/hotel-tracker/index.md`. The table at the top is
the index; each row links to a `## Hotel {#some-id}` section further down the
same page. Instructions are in a comment at the top of that file. Photos go in
`content/hotel-tracker/` next to `index.md`.

**Front page photos** -- every image in `assets/img/favorites/` appears on the
front page automatically, sorted by filename (a `01-` prefix puts one first).
Add a photo: shrink it (section 1) and drop it in the folder. Remove a photo:
delete the file. Nothing to edit. To cap how many show, change `favorites`
in `content/_index.md` to `favorites limit="9"`. Tiles are 2 per row on
phones and 3 per row on larger screens; that is set in
`layouts/shortcodes/favorites.html`.

**Flight map** -- re-export from the logbook repo and overwrite
`static/data/flights.geojson`. Nothing else to change.

**Projects** -- a project is a **folder** under `content/projects/` with an
`_index.md` inside (`_index.md`, not `index.md`, because the page lists other
pages: its update posts). Posts join it with `projects: ["folder-name"]` in
their front matter. A project only appears on `/projects/` once at least one
post references it. Writing `["Walnut Bread Box"]` instead of `["bread-box"]`
silently creates a second, empty project.

**About** -- `content/about.md`.

## 5. Settings

All config is in `config/_default/`:


| Want to change                                        | File                | Section                   |
| ----------------------------------------------------- | ------------------- | ------------------------- |
| Site title, author name/photo/links                   | `languages.en.toml` | `[params.author]`         |
| Top nav / footer links                                | `menus.en.toml`     | `[[main]]` / `[[footer]]` |
| Homepage layout, recent-post count                    | `params.toml`       | `[homepage]`              |
| What shows on a post (date, word count, author, tags) | `params.toml`       | `[article]`               |
| Color scheme, dark mode                               | `params.toml`       | top of file               |
| Theme, baseURL, taxonomies                            | `hugo.toml`         |                           |
| Markdown settings (`unsafe = true`; don't touch)      | `markup.toml`       |                           |


**Post metadata toggles** (`[article]` in `params.toml`): `showDate`,
`showDateUpdated` ("last modified"), `showWordCount` ("638 words"),
`showReadingTime` ("3 min read").

**Date format** (`dateFormat` in `languages.en.toml`): Go uses a reference date
instead of `YYYY-MM-DD` placeholders. The magic values are always
`Mon Jan 2 15:04:05 MST 2006`; rearrange them into the shape you want.


| Set it to                 | You get                   |
| ------------------------- | ------------------------- |
| `2 January 2006`          | 27 August 2026            |
| `January 2, 2006`         | August 27, 2026           |
| `Jan 2, 2006`             | Aug 27, 2026              |
| `2006-01-02`              | 2026-08-27                |
| `Monday, January 2, 2006` | Thursday, August 27, 2026 |


**Taxonomies**: `projects:` front matter only works because
`project = "projects"` is listed under `[taxonomies]` in `hugo.toml`. Same for
`tags` and `categories`.

## 6. Repo layout

```
turtle-tracks-blog/
├── archetypes/                     templates used by `hugo new`
│   ├── default.md
│   └── posts.md                    pre-fills a new post
├── assets/                         files Hugo PROCESSES (resize, minify)
│   └── img/
│       ├── avatar.jpeg             author image -> "img/avatar.jpeg" in config
│       ├── BlogLogo.png
│       └── favorites/              photos shown on the front page
├── config/
│   └── _default/                   all settings (see section 5)
├── content/
│   ├── _index.md                   homepage intro text + favorite photos
│   ├── about.md
│   ├── hotel-tracker/
│   │   └── index.md                hotel gym table + per-hotel notes/photos
│   ├── map/
│   │   └── index.md                Leaflet + flights.geojson
│   ├── posts/
│   │   └── 2026.08.26-start-a-blog/
│   │       ├── index.md
│   │       └── featured_....jpeg   "featured" in the name = card thumbnail
│   └── projects/
│       ├── _index.md               /projects/ landing page
│       ├── blog/_index.md
│       └── bread-box/_index.md
├── static/                         files copied VERBATIM, no processing
│   ├── data/flights.geojson
│   └── js/flight-map.js
├── themes/
│   └── blowfish/                   git submodule — never edit in here
├── .gitmodules                     records the theme submodule
├── build.sh                        Cloudflare runs this
├── wrangler.toml                   Worker name + assets dir
├── README.md
└── TODO.md

generated — gitignored, never committed:
├── public/                         the built site
└── resources/                      Hugo's image-processing cache
```

`_index.md` **vs** `index.md`: `_index.md` = a list/section page that contains
other pages (posts, projects). `index.md` = a single page bundle; it can hold
photos but not child pages.

`assets/` **vs** `static/`: Hugo processes `assets/` (resizes, optimizes);
paths are relative to `assets/` itself, e.g. `img/avatar.jpeg`. `static/` is
copied byte-for-byte; `static/data/flights.geojson` is served at
`/data/flights.geojson`.

## 7. Theme maintenance

**Update Blowfish** -- the theme is a git submodule, so the repo stores only a
pointer to one theme commit. Updating means moving that pointer. Do this when
`hugo server` warns that the module "is not compatible with this Hugo version":

```
git submodule update --remote --merge
git add themes/blowfish
git commit -m "Update Blowfish"
git push
```

**Customize one piece of the theme** -- copy that single file from
`themes/blowfish/layouts/...` into `layouts/` at the same path, then edit your
copy. Never edit inside `themes/`; updates would overwrite it.

## 8. Resources & links

- [Blowfish docs](https://blowfish.page/docs/) (shortcodes, front matter, config)
- [Bear note](bear://x-callback-url/open-note?id=BA93DC3B-E9B1-4686-AC60-1845AC6E4C68)
- [Lempa Video 1/2 - Build Static Site](https://www.youtube.com/watch?v=MX4yy1dTVYg&t=820s)
- [Lempa Video 2/2 - Publish Static Site](https://www.youtube.com/watch?v=FZMgUSlNp-0&list=PLL2R0PhD_K3E&index=3)
- [Cloudflare deployment dashboard](https://dash.cloudflare.com/fb90c5484e857484c4d69a2226ea081e/workers/services/view/turtle-tracks-blog/production/domains)



## Issues

- [ ] something needs to be changed in taxonomies for project handling? where is that?