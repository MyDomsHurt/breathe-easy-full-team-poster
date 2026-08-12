# Breathe-Easy — Full Team Performance Poster (Living)

## Live site

**https://mydomshurt.github.io/breathe-easy-full-team-poster/**

Repo: https://github.com/MyDomsHurt/breathe-easy-full-team-poster

Interactive, data-driven recreation of the **Breathe-Easy Performance Poster** for the Hong Kong AC cleaning crew.

**Visual contract:** `assets/reference/poster.jpg` is the single source of truth for layout, proportions, and treatment. This is not a redesign.

## Quick start

```bash
cd /Users/jefflamb/breathe-easy-poster
python3 -m http.server 8765
# open http://127.0.0.1:8765/
```

> Modules load `data/poster.json` via `fetch` — use a local server (not `file://`).

## Update live numbers

Edit **`data/poster.json`**:

| Field | Controls |
|---|---|
| `totalTeamPoints` | Hero total (see note below) |
| `technicians[]` | Rank, name, role, points, delta%, avatar |
| `period.pointsResetInDays` | Leaderboard footer countdown |
| `weekly[]` | Chart bars + line |
| `snapshot.*` | Performance snapshot metrics + deltas |

Refresh the page after saving.

### Metallic total note

Stage 3 static lock uses **poster-extracted hero art** (`assets/waves/hero-with-number.png`) so the sculpted metallic `24,780` matches the poster exactly.

To drive the total from JSON with CSS metallic text:

1. In `js/main.js`, set `liveNumber: true`
2. That swaps hero art to `assets/waves/hero-bg.png` (number knocked out) and reveals the CSS number

Digit-sprite / pre-rendered number packs for arbitrary totals can be added under `assets/numbers/` if CSS fidelity is insufficient.

## Structure

```
assets/     logos, waves, skyline, icons, avatars, reference poster
css/        poster layout, metallic number, components, interactive
js/         data-loader, render, chart, interactivity, main
data/       poster.json (data contract)
docs/       LAYOUT_BLUEPRINT.md
PROGRESS.md stage log + visual comparison notes
```

## Print

Use the browser Print dialog. `@media print` hides page chrome and keeps the poster stage.

## Docs

- [`docs/LAYOUT_BLUEPRINT.md`](docs/LAYOUT_BLUEPRINT.md) — zones, percentages, assets, lock checklist  
- [`PROGRESS.md`](PROGRESS.md) — stage-by-stage notes for human fidelity review  

## Technicians (seed)

Matthew (Team Lead), Tiago, Nick, Alun, Iggi — ranks and colours as on the poster.
