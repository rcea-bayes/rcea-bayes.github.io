# Website: 17th RCEA Bayesian Econometrics Workshop (Salzburg, 10–11 June 2027)

A static one-page site for GitHub Pages: plain HTML, CSS and a little JavaScript. There is no build step and no external requests (no Google Fonts, no trackers, no cookies).

- `index.html`: all content
- `assets/css/style.css`: University of Salzburg corporate design, with the same palette as the PLUS beamer theme in the slides:

  | Role | Colour |
  |---|---|
  | green | `#1a4c39` |
  | grey | `#8a8d8f` |
  | light | `#e9eeec` |
  | gold | `#b08d57` |
  | text | `#262626` |

  Headings are green, each with a green rule underneath.
- `assets/js/main.js`: mobile menu, highlighting of the current section in the menu, and the submission and registration buttons that follow the timeline (see below)
- `assets/img/hero.jpg`: header photo (the view over the Salzach to the old town and the fortress, 1600×1200, from Florian), under a green veil
- `assets/img/unisbg-logo-colour.png` and `unisbg-logo-white.png`: the official logo, rendered from `UNI_SBG_WBM_SafeZone_linksb_Farbe_RZ.pdf` (the file the slides use), with a small margin left around the seal. The white version is the same artwork recoloured. Do not use the old "PLUS" lion logo.

## Still to fill in

Every placeholder is wrapped in `class="tbd"` and shows with a yellow background. Before going live, run `grep -n tbd index.html` and fill in or remove each one:

- workshop email address (call for papers, contact)
- venue room and address
- welcome drinks (yes or no)
- hotel block
- further local organizers
- Claudio Morana's affiliation
- legal notice (Impressum)

The keynote card shows initials instead of a photo. A photo can go in once Christiane has agreed to it.

## Buttons that follow the timeline

The block `TIMELINE` at the top of `assets/js/main.js` holds the opening and closing times of the submission window (7 Jan – 15 Mar 2027) and the registration window (19 Apr – 7 May 2027). The two buttons in the "Call for papers" and "Registration" sections change by themselves:

- before a window: "opens on ..."
- during a window: an active button, but only once its `href` is filled in (the mailto link for submissions, the PLUS Veranstaltungen link for registration)
- after a window: "closed"

To preview another date, add `?now=2027-02-01` to the address.

## Registration and payment

Registration and payment run through the University of Salzburg's event system, "PLUS Veranstaltungen" (`apex.sbg.ac.at`, with card payment through the university's online payment platform "OZP"). This is the same system as for ESOBE 2022. Once the event exists there, enter its link as `href` under `registration` in the `TIMELINE` block of `assets/js/main.js`.

## Preview locally

From the folder above `website/`:

    python3 -m http.server 8027 --directory website

Then open http://localhost:8027.
