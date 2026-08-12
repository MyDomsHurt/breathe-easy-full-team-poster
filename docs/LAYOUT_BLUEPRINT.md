# Breathe-Easy Full Team Poster — Layout Blueprint

**Source of truth:** `assets/reference/poster.jpg`  
**Source size:** 784 × 1168 px (aspect ≈ 0.6712, portrait ~2:3)  
**Rule:** Match exact placement, proportions, spacing, and visual treatments. No redesign.

---

## 1. Canvas & scaling model

| Property | Value |
|---|---|
| Design width | 784 px |
| Design height | 1168 px |
| Aspect ratio | `784 / 1168` |
| Page chrome | Light cool-white page; poster stage centered |
| Desktop | Stage width up to ~900px, keep aspect |
| Mobile | Scale stage to `min(100vw − padding, max)`; **do not reflow** sections into a different hierarchy |
| Print | Same aspect; hide non-poster chrome |

**CSS stage pattern:**

```css
.poster {
  position: relative;
  width: min(100%, 900px);
  aspect-ratio: 784 / 1168;
  margin-inline: auto;
  overflow: hidden;
}
.poster > * {
  position: absolute; /* major blocks */
}
```

All block positions use **percentages of the stage**, never fixed px that break aspect scaling (except hairline borders / shadows that can use small px).

---

## 2. Zone map (vertical)

Heights are approximate % of stage height, refined during static lock against the reference.

| Zone | y% range | Purpose |
|---|---|---|
| **A. Header** | 0 – 9% | Wordmark left; circular skyline + slogan right |
| **B. Hero** | 9 – 32% | `TEAM BREATHE-EASY` · metallic total · `TOTAL TEAM POINTS` · wrapping waves |
| **C. Mid split** | 32 – 58% | Quote on dark wave (left) · Crew Leaderboard card (right) |
| **D. Lower split** | 52 – 82% | Weekly chart (left) · Performance Snapshot 2×2 (right) · tagline pill |
| **E. Skyline footer** | 78 – 100% | Tagline pill · HK skyline + mountain + water · footer taglines |

Zones **overlap slightly** on purpose: waves and cards interlock (leaderboard overlaps mid/lower; chart/snapshot sit into skyline fade). Do not force non-overlapping CSS grid rows if that breaks the poster.

---

## 3. Block-level blueprint

### A. Header

| Element | Approx box | Notes |
|---|---|---|
| Wordmark group | left ~3–42%, top ~2–8% | Wave mark + “Breathe-Easy” + “AC CLEANING CREW” / “HONG KONG” |
| Circular skyline badge | right ~72–82%, top ~1.5–7% | Circle stroke, skyline icon inside |
| Slogan | right ~82–96%, top ~2–7.5% | 3 lines: CLEAN AIR. / BETTER LIFE. / HONG KONG. |
| Soft wave texture | full width, behind logos | Very light blue ribbons |

**Brand note:** Poster wave mark + “AC CLEANING CREW HONG KONG” — **not** the older snowflake / “AIRCON CLEANING” mark.

### B. Hero number

| Element | Approx box | Notes |
|---|---|---|
| Label | center, ~9.5–12% | `TEAM BREATHE-EASY` · wide tracking · mid gray-blue |
| Metallic total | ~10.5–93% × ~12–27% | ~82% stage width; 3D sculpted blue; heavy soft shadow |
| Sub-label | center, ~28–32% | `TOTAL TEAM POINTS` · navy · letterspaced · diamond accent |
| Hero waves | full width, wrap number | Multi-layer light + mid blue splash ribbons |

### C. Mid split

| Element | Approx box | Notes |
|---|---|---|
| Dark quote wave | left ~0–50% × ~36–58% | Deep navy freeform wave; white italic quote |
| Quote text | within left wave | “Every clean system…” + “— Breathe-Easy Crew” |
| Leaderboard card | ~38–97% × ~36–64% | Rounded navy card; measured ~59% W × ~27% H of stage |
| LB header | top of card | CREW LEADERBOARD / THIS MONTH + trophy |
| LB rows | 5 equal rows | Rank badge · avatar · name/role · points · ↑delta% |
| LB footer | bottom of card | `POINTS RESET IN N DAYS` + blue dot |

**Rank colours (poster):** 1 blue · 2 teal · 3 green · 4 purple · 5 orange.

### D. Lower split

| Element | Approx box | Notes |
|---|---|---|
| Chart card | ~3–50% × ~54–80% | Light rounded card; title + bars + line + Y axis 0–6K |
| Chart mountain | bottom of chart card | Soft blue mountain wash under plot |
| Snapshot title | above 2×2, right column | `PERFORMANCE SNAPSHOT` |
| Snapshot grid | ~50–97% × ~62–82% | 2×2 light metric cards |
| Metric cards | 4 cells | Icon · label · value · ↑delta vs last month |
| Tagline pill | ~50–95% × ~82–86% | Dark navy pill under snapshot |

**Chart poster series:** W1 3210 · W2 4180 · W3 5040 · W4 5670 · W5 6680 (labels on bars; line + arrow through tops).

**Snapshot poster values:** Jobs 312 ↑18% · Clean Air 96% ↑8% · Filters 278 ↑15% · Energy 1,245 kWh ↑14%.

### E. Skyline footer

| Element | Approx box | Notes |
|---|---|---|
| Skyline + mountain | full width ~84–94% | HK silhouette + Lion Rock right · blue monochrome |
| Water | below skyline | Horizontal waves + reflections |
| Footer line 1 | center ~94–96% | WE CLEAN SYSTEMS. WE PROTECT BREATHS. |
| Footer line 2 | center ~96–99% | WE ARE BREATHE-EASY. with coloured dots |

---

## 4. Z-order (back → front)

1. Stage background (soft white / paper grain optional)  
2. Ambient wave textures (header, hero, mid ribbons)  
3. Dark mid wave (quote support)  
4. Header logos + slogan  
5. Hero label + metallic number + total label  
6. Quote text  
7. Leaderboard card  
8. Chart card + snapshot cards  
9. Tagline pill  
10. Skyline + water  
11. Footer copy  

---

## 5. Colour tokens (from poster sampling)

Use these as CSS custom properties. Refine hex during static lock with eyedropper on reference.

| Token | Approx | Usage |
|---|---|---|
| `--be-navy-deep` | `#001B40` | Leaderboard fill, tagline pill, dark wave |
| `--be-navy` | `#0A2A5C` | Wordmark, labels |
| `--be-metal-dark` | `#0E4FA0` | Number bevels |
| `--be-metal` | `#1E6BC8` | Number face |
| `--be-metal-light` | `#4A8FE0` | Number highlights |
| `--be-sky` | `#6BB0E8` | Waves, chart line |
| `--be-bar` | `#2F7FD4` | Chart bars (gradient allowed) |
| `--be-card` | `#F7F9FC` | Light cards |
| `--be-page` | `#F8F8F8` | Page / stage ground |
| `--be-muted` | `#7A8BA0` | Secondary labels |
| `--be-delta` | `#1FA971` | Up arrows / % |
| `--rank-1` … `--rank-5` | blue / teal / green / purple / orange | Rank badges |

---

## 6. Typography

| Role | Treatment |
|---|---|
| Wordmark “Breathe-Easy” | Bold sans, brand navy, title case with hyphen |
| Sub-brand | Small caps / tracked uppercase, two lines under wordmark |
| Hero label / total label | Uppercase, wide letter-spacing |
| Metallic number | Ultra-bold condensed-ish display; 3D treatment |
| Quote | Italic serif *or* italic sans matching poster (lock to poster) |
| Leaderboard names | Bold uppercase white |
| Roles | Small uppercase muted |
| Section titles | Bold uppercase navy / white on navy cards |
| Body metrics | Bold tabular-ish numbers |

Prefer system stack first: `"Segoe UI", system-ui, -apple-system, sans-serif` unless a webfont already matches the poster. Do **not** introduce decorative fonts absent from the poster.

---

## 7. Asset inventory

| Asset | Path | Method |
|---|---|---|
| Reference poster | `assets/reference/poster.jpg` | Copied from Downloads |
| Wordmark | `assets/logos/wordmark.svg` or `.png` | Extract / redraw from header |
| Skyline badge | `assets/logos/skyline-badge.svg` | Extract / redraw |
| Hero waves | `assets/waves/hero-waves.svg` | Multi-layer SVG or PNG extract |
| Mid waves | `assets/waves/mid-waves.svg` | Includes dark quote band support |
| Chart ground | `assets/waves/chart-ground.svg` | Soft mountain under chart |
| Skyline strip | `assets/skyline/hk-skyline.svg` | Bottom illustration |
| Icons | `assets/icons/{wind,shield,droplet,leaf,trophy,diamond}.svg` | Match poster line weight |
| Avatars | `assets/avatars/{matthew,tiago,nick,alun,iggi}.png` | Crop from leaderboard; monogram fallback |
| Number digits (optional) | `assets/numbers/` | Only if CSS metallic fails lock |

---

## 8. Live data fields (powered later)

See `data/poster.json` after Stage 4. Live:

- `totalTeamPoints`
- Each technician: rank, name, role, points, deltaPct, avatar
- `pointsResetInDays`
- `weekly[]` points series
- Snapshot metrics + deltas

Static copy stays in markup or `copy` object (quote, titles, footer).

---

## 9. Visual decisions log

| Date | Decision | Rationale |
|---|---|---|
| 2026-08-12 | Percentage absolute layout on fixed-aspect stage | Preserves poster proportions at any width |
| 2026-08-12 | Poster branding over snowflake logo set | Visual contract = poster image only |
| 2026-08-12 | No mobile reflow hierarchy | “Exact layout” requirement; scale instead |
| 2026-08-12 | CSS metallic first, digit assets fallback | Prefer data-driven single text node |
| 2026-08-12 | Seed data from poster numbers | Broader scoreboard repo not found on disk |

---

## 10. Static lock checklist

Compare browser capture at 784px stage width against reference:

- [ ] Header logos align and scale  
- [ ] Metallic number size, weight, shadow, wave wrap  
- [ ] Quote position on dark wave  
- [ ] Leaderboard card position, radius, row spacing, trophy  
- [ ] Chart bar heights/labels and line path  
- [ ] Snapshot 2×2 alignment and icon style  
- [ ] Tagline pill  
- [ ] Skyline + water + footer  
- [ ] Overall white space / gaps match  

Only after this checklist is satisfied: wire data + interactivity.
