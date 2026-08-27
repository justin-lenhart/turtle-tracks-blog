##### Useful  settings:

 **hugo.toml is in** `config/_default`

- Theme         -- `config/_default/hugo.toml`
- **site title       --** `config/_default/languages.en.toml` 
- Layout        -- [homepage] / `config/_default/params.toml`
  - i.e. page vs profile; show recent posts, etc.
- Author info   --  [params.author] / `config/_default/languages.en.toml`

`_index.md` --> list/section pages that contain other child pages
`index.md1 --> creates a 'bundle' page that cannot have child pages

##### Organization:
* posts go under /content/posts/YYYY-MM-DD-slug

turtle-tracks-blog/
├── archetypes/                     templates used by `hugo new`
│   └── posts/
│       └── index.md                scaffolds a whole post bundle
├── assets/                         files Hugo PROCESSES (resize, minify)
│   └── img/
│       └── avatar.jpg              author image -> "img/avatar.jpg" in config
├── config/
│   └── _default/
│       ├── hugo.toml               theme, baseURL, taxonomies
│       ├── languages.en.toml       site title, [params.author]
│       ├── markup.toml             unsafe=true lives here (don't touch)
│       ├── menus.en.toml           nav
│       ├── module.toml             empty; only used for Hugo Modules
│       └── params.toml             [homepage], [article], theme options
├── content/
│   ├── _index.md                   homepage intro text
│   ├── about/
│   │   └── index.md
│   ├── posts/
│   │   ├── _index.md               titles the /posts/ list page
│   │   └── 2026-08-26-first-post/
│   │       ├── index.md
│   │       ├── featured.jpg        auto-detected card thumbnail
│   │       └── photo1.jpg
│   ├── projects/
│   │   ├── _index.md               /projects/ landing page
│   │   ├── bread-box/
│   │   │   └── _index.md           kind: physical
│   │   └── turtle-tracks/
│   │       └── _index.md           kind: software
│   └── maps/
│       ├── _index.md
│       ├── flights/
│       │   └── index.md            Leaflet + flights.geojson
│       └── places/
│           └── index.md            Leaflet + data/places.yaml
├── data/                           structured data you hand-maintain
│   └── places.yaml
├── i18n/                           empty; theme supplies translations
├── layouts/                        YOUR template overrides (empty for now)
├── static/                         files copied VERBATIM, no processing
│   └── data/
│       └── flights.geojson
├── themes/
│   └── blowfish/                   git submodule — never edit in here
├── .gitignore
├── .gitmodules                     records the theme submodule
├── build.sh                        Cloudflare runs this
├── wrangler.toml                   Worker name + assets dir
├── README.md
└── TODO.md

generated — gitignored, never committed:
├── public/                         the built site
└── resources/                      Hugo's image-processing cache

| Type        | What             | Examples |
| ------------- |:-------------: | -------:|
| categories    | Whate *shape*? |Work, Fun, Project                                |
| tags          | centered       | `woodwork`, `national-park`, `development`,      |
| projects      | are neat       | `turtle-tracks`, `bread-box`, `financial-tracker`|

##### Useful terminal commands
**Deploy local site**
`hugo server -D --disableFastRender --noHTTPCache` 

##### Resources & links
[Bear note](bear://x-callback-url/open-note?id=BA93DC3B-E9B1-4686-AC60-1845AC6E4C68)
[Blowfish ]
[Lempa Video 1/2 - Build Static Site](https://www.youtube.com/watch?v=MX4yy1dTVYg&t=820s)
[Lempa Video 2/2 - Publish Static Site](https://www.youtube.com/watch?v=FZMgUSlNp-0&list=PLL2R0PhD_K3E&index=3)


##### Issues
[ ] something needs to be changed in taxonomies for project handling? where is that? 
---

##### Dates & post metadata

Date format lives in `config/_default/languages.en.toml`:

`dateFormat = "2 January 2006"`

Go uses a **reference date** instead of `YYYY-MM-DD` placeholders. The magic
numbers are always `Mon Jan 2 15:04:05 MST 2006` — you rearrange those exact
values into the shape you want. `2` = day, `January` = month, `2006` = year.

| Set it to | You get |
| --- | --- |
| `2 January 2006` | 27 August 2026 |
| `January 2, 2006` | August 27, 2026 |
| `Jan 2, 2006` | Aug 27, 2026 |
| `2006-01-02` | 2026-08-27 |
| `01/02/2006` | 08/27/2026 |
| `Monday, January 2, 2006` | Thursday, August 27, 2026 |

Show/hide the bits around it — all in `[article]` / `config/_default/params.toml`:

- `showDate` -- the date itself
- `showDateUpdated` -- "last modified" date
- `showWordCount` -- the "638 words" text
- `showReadingTime` -- "3 min read"

##### How projects work

A project is a **folder** under `content/projects/`, with an `_index.md` inside.
It uses `_index.md` (not `index.md`) because the page lists other pages — its
update posts.

A post joins a project with one line of front matter:

`projects: ["bread-box"]`

**The value must match the FOLDER NAME, not the title.** `content/projects/bread-box/`
means posts say `["bread-box"]`. Writing `["Walnut Bread Box"]` silently creates a
second, empty project.

This works because `project = "projects"` is listed under `[taxonomies]` in
`config/_default/hugo.toml`. Without that line the `projects:` front matter does
nothing at all.

A project only appears on `/projects/` once at least one post references it.

##### assets/ vs static/

- **`assets/`** -- Hugo processes these (resizes, optimizes). Paths are relative
  to `assets/` itself, so the author image is `img/avatar.jpg`, **not**
  `assets/img/avatar.jpg`. Getting this wrong produces a confusing
  `security.http.urls` error that has nothing to do with security.
- **`static/`** -- copied byte-for-byte. `static/data/flights.geojson` is served
  at `/data/flights.geojson`.

##### Updating things

**Refresh the flight map** -- re-export from the logbook repo and overwrite
`static/data/flights.geojson`. Nothing else to change.

**Update the Blowfish theme** -- the theme is a git submodule, so the repo stores
only a pointer to one theme commit. Updating means moving that pointer:

```
git submodule update --remote --merge
git add themes/blowfish
git commit -m "Update Blowfish"
git push
```

**Customize one piece of the theme** -- copy that single file from
`themes/blowfish/layouts/...` into `layouts/` at the same path, then edit your
copy. Never edit inside `themes/`; updates would overwrite it.

##### Publishing

`git push` is the deploy. Cloudflare sees the push, runs `build.sh`, and
redeploys. Watch progress in the Worker's **Deployments** tab.

```
git add -A
git commit -m "New post: ..."
git push
```

##### Gotchas that already cost time

- **Don't use `hugo --quiet` when something is wrong.** It hides real build
  errors. Run plain `hugo`.
- **An empty file builds "successfully."** A 0-byte `build.sh` exits 0 in
  milliseconds and deploys nothing. Check `wc -c` before committing a new file.
- **Editing isn't committing.** Twice a fix was correct on disk but never
  committed. `git status` should be clean before you go looking for other causes.
- **Don't add a second `[taxonomies]` block** to `hugo.toml`. Blowfish already
  defines one (tag/category/author/series); a second block replaces it instead of
  extending it. Add new lines inside the existing block.
- **Cloudflare doesn't clone submodules.** `build.sh` runs
  `git submodule update --init --recursive --depth 1` for that reason. Without
  it Hugo builds zero pages and reports success.
