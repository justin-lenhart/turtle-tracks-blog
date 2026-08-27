##### Useful  settings: 

 **hugo.toml is in `config/_default`**

* Theme         -- `config/_default/hugo.toml`
* **site title       -- `config/_default/languages.en.toml`** 
* Layout        -- [homepage] / `config/_default/params.toml`
    * i.e. page vs profile; show recent posts, etc. 
* Author info   --  [params.author] / `config/_default/languages.en.toml`

`_index.md` --> list/section pages that contain other child pages
`index.md1 --> creates a 'bundle' page that cannot have child pages


##### Organization:
└── content
    └── about
    |   └── index.md  
    ├── posts
    |   ├── 2026.08.26
    |   |────── photo1.jpg
    |   |   └── index.md 
    |   ├── happy
    |   |   └── ness.md  // <- https://example.org/posts/happy/ness/
    |   └── secondpost.md  // <- https://example.org/posts/secondpost/
    └── quote
        ├── first.md       // <- https://example.org/quote/first/
        └── second.md      // <- https://example.org/quote/second/