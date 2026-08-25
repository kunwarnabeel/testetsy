# Olive & Burgundy wedding site — replica

A hand-built replica of the reference Canva wedding-site design. Nothing was copied from
the reference's source; the design was measured with the browser inspector (colours, type
sizes, coordinates) and rebuilt from scratch. All artwork is generated originals.

```bash
python -m http.server 5173
```

---

## The geometry system

The reference is a Canva site, so **every coordinate and type size is a percentage of the
page width** and the whole layout scales fluidly with the viewport. The replica uses the
same system via CSS container queries:

```css
.pg{container-type:inline-size}
.e { left:calc(var(--x) * 1cqw);  top:calc(var(--y) * 1cqw);
     font-size:calc(var(--s) * 1cqw) }
```

So `--x:41.55` means "41.55% of the page width from the left", and `--s:2.52` means
"2.52% of the page width tall". Page heights come from the same ratio (`H / W × 100`).

| Page | Height (cqw) |
|---|---|
| envelope | 100vh |
| home | 225.5 |
| details | 371 |
| story | 132 |
| rsvp | 236 |

---

## Colour tokens

| Token | Hex | Measured as | Where |
|---|---|---|---|
| `--olive` | `#4D502D` | rgb(77,80,45) | envelope page + home text |
| `--wine` | `#50202C` | rgb(80,32,44) | Kindly / RSVP / Please / buttons |
| `--seal` | `#250F14` | rgb(37,15,20) | wax-seal monogram, timeline text |
| `--ink` | `#000000` | rgb(0,0,0) | details headings + all body copy |
| `--paper` | `#FFFFFF` | — | page background |

The background is **plain white**, not a cream paper texture.

## Type

The reference ships four obfuscated Canva fonts with their name tables stripped. They were
identified by decompressing the WOFFs to TTF and rendering specimens against Google Fonts
candidates:

| Role | Reference | Replica substitute | Used for |
|---|---|---|---|
| serif | transitional serif, lining figures | **EB Garamond** | eyebrows, dates, timeline, buttons |
| script | high-contrast copperplate | **Pinyon Script** | all display words |
| script 2 | condensed spiky script | **Italianno** | wax-seal monogram only |
| sans | Canva Sans | **Figtree** | body copy, "click to go back" |

### Type scale (cqw)

| Element | Size |
|---|---|
| page eyebrow (`THE FINER`, `WILL YOU BE`) | 6.6 |
| page display script (`Details`, `Story`) | 5.8 |
| footer names + date | 4.6 |
| home `Scarlett` / `Liam` / `&` | 7.5 / 6.6 / 4.9 |
| home `11` / `August` / `2027` | 5.4 / 6.6 / 4.9 |
| home `R` / `SVP` / `Kindly` / `Here` | 8.0 / 5.7 / 4.0 / 3.9 |
| home `Details` circle script / eyebrow | 6.0 / 2.9 |
| envelope `Introducing` / `James'` / `the` | 2.52 / 3.81 / 2.69 |
| details section headings | 3.6 (`Ceremony of Love` 2.9) |
| details timeline | 1.9 uppercase |
| body copy | 1.6, line-height 2.3 |
| `click to go back` | 1.2, weight 700 |

---

## Animation

The reference has **no entrance or scroll animations**. The only motion is:

```css
transition: transform .3s ease;   /* on every clickable element */
:hover { transform: scale(1.05) }
```

plus the ticking countdown. The replica matches this exactly.

---

## Page structure

**0 · envelope** — white, centred: `Introducing` / `the James'` lockup, sealed envelope with
monogrammed wax seal and a floral sprig, `Click to Open` / `The Magic…`

**1 · home** — collage on white: open envelope with painted liner, olive names card, ivory
date card, florals; then three differently-shaped portals (burgundy circle → Details, cream
paper slip with wax seal → RSVP, polaroid cluster → Love Story); then one full-bleed painted
band carrying the countdown *and* the footer.

**2 · details** — painted hero band, then intro, `Ceremony of Love`, a **horizontal**
five-stop timeline with icons on a ruled line, `Transport`, `Travel + Stay` with two burgundy
pill buttons, `Dress to Impress` with four colour swatches, `Gift Registry` on a paper slip,
FAQ in **two columns**, painted footer band.

**3 · story** — painted hero band, three tilted photo frames with a wax seal, story copy in a
right-hand column, painted footer band.

**4 · rsvp** — painted hero band, wax-seal paper slip reading `PLEASE / Rsvp / BELOW`, body
copy with a bold clause, then the form: rounded text inputs and **pale pink pill** radio
options with a burgundy pill submit — matching Canva's native form element.

---

## Assets

Generated originals in `assets/` (full-resolution sources kept in `assets/_src/`):
envelope closed + open, olive card, ivory card, two floral clusters, sprig, wax seal,
divider, olive-grove painting, paper texture, and five timeline icons.

Re-cutting an alpha from a source:

```bash
magick _src/NAME.png -resize 1000x -alpha set -bordercolor white -border 1 -fuzz 18% -fill none -draw "alpha 0,0 floodfill" -shave 1x1 -trim +repage NAME.png
```

Use `-fuzz 4%` for near-white subjects or the floodfill eats the subject.

---

## Known gaps vs the reference

- Photo slots are placeholders — the reference uses the couple's own photos.
- The florals are single composite images; the reference layers ~130 individual flower PNGs.
- The countdown is native JS; the reference embeds tickcounter.com through Canva.
- Fonts are the closest Google Fonts matches, not the exact Canva faces.

`_v1-own-design.html.bak` / `css/_v1-own-design.css.bak` hold the earlier original design.
