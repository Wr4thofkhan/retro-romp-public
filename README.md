# Retro ROMp Public

A free, no-login, static retro game player. No backend, no build step, no
account, no paid services, no API keys. Plain HTML / CSS / JS that GitHub
Pages can serve as-is.

**The core rule — download-only:** nothing streams from Google Drive and
nothing plays straight out of Drive. A visitor downloads a game file to
their own phone or tablet first, then loads it on the device, and only then
does a green **Play** button appear. A game that has not been downloaded has
**no Play button**, only **Download from Drive**. Nobody can upload to,
delete from, or change Saud's Drive folder from this site.

No ROM files or copyrighted game files are included in this site.

## Files

| File | What it is |
|---|---|
| `index.html` | The whole app: systems grid, featured library, On This Device, Vimm's Vault, player |
| `styles.css` | NeoStation-style dark-slate UI (`#111216`), violet `#7c5cff` selection, green Play buttons |
| `app.js` | Search, IndexedDB library, file loading, EmulatorJS player, Vimm's tabs, Share |
| `data.js` | Featured library (59 games) and the bundled Vimm's catalogs (310 games) |
| `manifest.json` | PWA manifest (name Retro ROMp Public, standalone, theme `#111216`) |
| `icon.svg` | Inline SVG gamepad icon referenced by the manifest (no binary icons) |
| `.nojekyll` | Empty file so GitHub Pages serves the files as-is |
| `README.md` | This file |

## Deploy to GitHub Pages (for a non-developer)

1. Create a new public repository on GitHub (for example `retro-romp-public`).
2. Upload **all** the files in this folder to that repository (drag them in
   on github.com, or use GitHub Desktop). Keep the file names exactly as
   they are, all in the top level of the repository.
3. In the repository, go to **Settings > Pages**.
4. Under **Build and deployment > Source**, choose **Deploy from a branch**.
5. Choose the `main` branch and the `/ (root)` folder, then click **Save**.
6. Wait a minute or two. GitHub will show your site address, something
   like `https://<your-username>.github.io/retro-romp-public/`.
7. Open that address on a phone or tablet and check the systems grid loads.
   Share that link with friends — that is the whole site.

The same files also work on Netlify or Vercel (drag the folder in as a
static site), but GitHub Pages is the intended home and needs no setup
beyond the steps above.

## Sharing the Google Drive folder — Saud, do this once

Friends do **not** have to ask permission to download every game, as long
as Saud shares the Drive folder as **"Anyone with the link, Viewer"**.
That is the whole setup — no per-file sharing, no per-game permission
requests. Then friends can download any game with **no Google account, no
login, and no permission request**.

Step by step:

1. Open Google Drive.
2. Right-click the **"Games and ROMS"** folder, choose **Share > Share**.
3. Under **General access**, change it to **"Anyone with the link"** and
   set the role to **"Viewer"**.
4. Click **Copy link / Done**.

That is it. The link the site uses is already the folder link:

`https://drive.google.com/drive/folders/1winQ_bLs3MbU_NFDQerKHrX3TDzC3ZEI`

> **Important:** if the folder is left as restricted / only specific
> people, every friend **will** hit a "Request access" prompt per file, so
> this setting is what makes it work. "Viewer" is read-only: friends can
> download, but they cannot upload to, delete from, or change anything in
> the folder.

Downloads from Vimm's Lair need no Drive permission at all.

## How a friend downloads a game and plays it

1. Open the site link on their phone or tablet. No login, no account.
2. Pick a system, or a featured game, and tap **Download from Drive**.
   The real shared Drive folder opens in a new tab. Find the game file in
   the folder and download it to the device.
   - Or, in **Vimm's Vault**, tap a game's **Vimm's page** link, download
     the ROM from Vimm's themselves (no Drive permission needed), and come
     back here.
3. Back on the site, go to **On This Device** and tap **Load the
   downloaded file** (or drag the file onto the drop zone) and pick the
   file they just downloaded.
4. The file is saved in the browser's IndexedDB **on that device only** —
   it is never uploaded anywhere.
5. Only now does a green **Play** button appear on that game. Tap it and
   play locally, with touch controls or a Bluetooth / USB controller.

To play the same game on another device, repeat the download + load steps
on that device. Saves stay on the device they were made on.

## What is in the site

- **Home = systems grid, 11 sections:** SNES, NES, Genesis, N64,
  PlayStation, Arcade, Master System, PC Engine, Neo Geo, Atari, ROM Hacks.
  Each card shows the game count; clicking a section opens its page with a
  banner and a "← All systems" back button.
- **Featured library: 59 games** — SNES 8, NES 8, Genesis 8, N64 6,
  PlayStation 6, Arcade 8, Master System 4, PC Engine 4, Neo Geo 3,
  Atari 2, ROM Hacks 2 (the two hacks are clearly labelled fan-made).
- **Search** filters the featured library, matching words in any order and
  matching numbers to Roman numerals ("2" finds "II", "3" finds "III").
- **On This Device library + drop zone / file picker** for
  `.zip .smc .sfc .nes .md .bin .sms .z64 .n64 .v64 .pce .sgx .a26 .a78
  .a52 .lnx .7z` (`.nfo` and `desktop.ini` are ignored).
- **Playback with EmulatorJS 4.2.3** from `cdn.emulatorjs.org`
  (`EJS_pathtodata = https://cdn.emulatorjs.org/stable/data/`).
  Cores: SNES snes9x, NES fceumm, Genesis genesis_plus_gx, Master System
  smsplus, N64 mupen64plus_next by default with a per-game core switcher
  to parallel_n64 (default parallel_n64 for X-Men vs. Street Fighter 64,
  which black-screens on mupen64plus_next), PC Engine / SuperGrafx
  mednafen_pce, Neo Geo fbneo (note: `neogeo.zip` BIOS needed), Atari
  stella2014 for 2600 with 7800 / 5200 / Lynx resolved per file at play
  time, PlayStation pcsx_rearmed. Player is one screen tall with a pinned
  header, full-screen button, and EmulatorJS touch controls. If a game
  fails to start or stays black, a clear error with a way back to the
  library is shown — never a silent black screen. N64 gets up to 120
  seconds before timing out.
- **Vimm's Vault:** one tab per console with a Vimm's vault — SNES,
  PlayStation, NES, Genesis, Master System, Nintendo 64, TurboGrafx-16
  (also covers SuperGrafx), Atari 2600, Atari 5200, Atari 7800, Lynx —
  each with its own bundled catalog, per-console count (the count = how
  many entries are bundled in that tab, labelled as such), a per-console
  search box (same any-order-words + Roman-numeral matching), cover art,
  and a link on each game to that game's own Vimm's download page
  (`https://vimm.net/vault/?p=list&system=<SYSTEM>&q=<title>`), plus a
  "Search all of Vimm's" box that opens
  `https://vimm.net/vault/?p=list&q=<query>`. Bundled counts: SNES 60,
  PlayStation 40, NES 50, Genesis 40, Master System 25, N64 30,
  TurboGrafx-16 20, Atari 2600 15, Atari 5200 10, Atari 7800 10, Lynx 10
  (310 total). There are also Neo Geo and Arcade tabs that say plainly
  "Vimm's has no Neo Geo Vault" / "Vimm's has no Arcade Vault" — no games
  listed there, no fake links. The full SNES vault on Vimm's holds over
  4,100 games (verified: 4,147 known media, No-Intro dat 2026-11-20);
  the bundled catalog is a selection, and "Search all of Vimm's" reaches
  the rest.
- **Cover art:** Libretro Thumbnails on GitHub first
  (`raw.githubusercontent.com/libretro-thumbnails/libretro-thumbnails/
  master/Named_Boxarts/<system folder>/<title> (USA).png`), with an
  `onerror` fallback to a styled letter tile with the game's initials —
  never a broken image. No ScreenScraper, IGDB, SteamGridDB, MobyGames,
  The Cover Project, or VGBoxArt.
- **Share control** copies the page URL to the clipboard (it does not use
  `navigator.share` with `location.href` as a self-share).
- **Installable as a PWA** on Android (manifest + SVG icon); layout is
  responsive for phones and tablets, portrait and landscape.

## Honest limits — what this site does NOT do

- **RetroAchievements is NOT implemented.** EmulatorJS does not implement
  it, so it is stated plainly on the page rather than pretended.
- **Saves are stored locally** on the device, not synced to Google Drive.
  There is no cloud save sync in this static site.
- **No Dreamcast.** Dreamcast games are played in the separate Flycast
  app, not here.
- **Actual gameplay needs a real ROM file the visitor supplies.** The site
  ships no games and no download links for individual game files; the
  Download button opens the shared Drive folder, and Vimm's links open
  Vimm's. Actual EmulatorJS gameplay was **not** verified here — it needs
  a real ROM file on a real device/browser, which this build environment
  does not have.
- **Vimm's is links only.** The site never downloads from Vimm's itself:
  Vimm's blocks automated fetches with a Cloudflare check. The visitor
  downloads the ROM from Vimm's themselves, then uses "Add the ROM" (the
  file picker) to play it.
- **No save states with thumbnails, fast-forward / rewind, cheat codes,
  auto-save on exit, netplay, shaders / bezels, integer scaling, custom
  touch skins, per-game button remapping, or full controller-driven UI**
  beyond what EmulatorJS itself provides in its player. Those were in the
  original wish list; this static build does not add them on top of
  EmulatorJS, rather than pretending they exist.
- **No Drive API / API key.** The site does not list Drive files via the
  API and does not need one — the Download button opens the shared folder
  and the visitor picks the file there. That also means there is no
  in-site download progress bar for Drive downloads; the browser's own
  download handles progress.
- **No folder scan.** The file picker loads files the visitor picks; it
  does not scan a folder or SD card recursively (browser file pickers on
  phones do not reliably offer that).
- **Cover art is best-effort.** Libretro's box-art names do not always
  match a game's display title, so some cards fall back to the initials
  tile. That is by design, not a broken image.
- **Cast button:** there is no in-page Chromecast picker and no cast
  button in this build — screen mirroring (for example Samsung Smart View)
  is the route to a TV, as the original spec noted the in-app browser has
  no cast picker.
