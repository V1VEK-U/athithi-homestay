ATHITHI HOMESTAY — WEBSITE (with live Content Manager)
======================================================

A responsive website for Athithi Homestay, Ezhome, Kannur, Kerala, built with
REAL photos and details. It now includes a free, live Content Manager so the
owner can edit text and photos online and have the site update automatically.

HOW TO VIEW LOCALLY
-------------------
Open "index.html" in a browser to preview. (When opened directly from disk it
shows the built-in default content; the live editor works once hosted online —
see SETUP-GUIDE.txt.)

FILE STRUCTURE
--------------
athithi-site/
├── index.html         ← the website
├── style.css          ← styling
├── script.js          ← loads content from content/site.json and renders it
├── content/
│   └── site.json      ← ALL editable text + gallery list (the CMS edits this)
├── admin/             ← the Content Manager (Decap CMS)
│   ├── index.html
│   └── config.yml     ← defines what the owner can edit
├── images/            ← photos (uploads land in images/uploads/)
├── netlify.toml       ← hosting config
├── SETUP-GUIDE.txt    ← step-by-step: put it online + turn on the editor
└── README.txt         ← this file

LIVE EDITING (after hosting — see SETUP-GUIDE.txt)
--------------------------------------------------
- Visit  your-site/admin  and log in (Netlify Identity, invite-only).
- Edit hero text, About, Rooms, Attractions, Reviews, Contact and Gallery.
- Upload or replace images right in the browser.
- Click Publish — the live site updates for everyone in under a minute.
- No downloading or replacing files. Changes are stored on the server (via
  your GitHub repo) and served to all visitors.

The "Manage site" link at the very bottom of the website opens the editor.
Visitors can click it but cannot log in without your email + password.

CONTACT (shown on the site)
---------------------------
Athithi Home Stay, Ezhome, Kannur, Kerala – 670303
Phone : +91 70255 00164     Email : prabhakarankc1234@gmail.com
Map   : 12.0371851, 75.2874954

SOURCES REVIEWED
----------------
Kerala Tourism, StayHats, Zotel, eDetails (athithihomestay), the property's
Google listing, and Kannur Airport tourism page (attraction photos).
