# Journal — commercemarketplace.adobe.com replica run

## Extract — 10 typed pages captured live, cap model and header contract recorded (2026-10-20)

- Inputs: `stardust/.labs/run.json` → source `http://commercemarketplace.adobe.com/` (serves https), gate breakpoints `desktop,mobile` → 1440 and 360.
- Discovery: the runner could not reach the inventory (curl over http → 406); `https://…/sitemap.xml` answers 200 with 4,068 URLs (≈3,970 one-segment extension/theme product pages, 16 category trees). Junk-filtered 2 (`/test-input-onclick-…`, `/service-unavailable`). Plan rewritten in `stardust/.labs/site-plan.json` (4,066 pages, technique recorded as requested).
- Selection (page-type checklist first): home · `/extensions.html` · `/themes.html` · `/extensions/sales.html` · `/extensions/featured-extensions.html` · `/themes/industry/apparel.html` · two extension product pages (Amasty, Plumrocket) · privacy policy · terms.
- Crawl: `crawl.mjs --dynamics --concurrency 3` → 10/10 live, Playwright headless was not challenged. Vision check: all rendered; the featured-extensions and apparel categories list 0 products on the live site (captured state, replicate as captured).
- Census at 1440 + 360: Adobe Clean family (adobe-clean / AdobeCleanBold / AdobeCleanMedium), text #333, links #1979c3, primary CTA orange #eb5202, dark strips #202021, 4px radius, ad-hoc scale.
- Fonts: Adobe Clean is a proprietary Adobe face self-hosted by the source with no CORS → not rehosted on the new domain; substitute Source Sans 3 (OFL, metric-close) with the brand family first in every stack. Expected permanent width-probe residual.
- Cap model (cap-probe): content shell 1200px on listing/product/static; home fluid — recorded in DESIGN.json `extensions.breakpoints` (capRegister lists 3 single-module caps, kept as source behaviour).
- Header contract: chrome-explore found the header root but recorded 0 controls at 1440/390 (Magento jQuery-UI menu; no hover/click states surfaced). Header behaviour will be verified by motion observation at recreation.
- Page types: landing 1 · listing 5 · program 2 · static 2.
- Brand surface + descriptive docs: `_brand-extraction.json`, `PRODUCT.md`, `DESIGN.md`, DESIGN.json `extensions.modules[]` (17 candidates: product-card-grid ×5, facets-sidebar ×5, listing-toolbar ×5, breadcrumbs ×9, product-gallery ×2, purchase-panel ×2, hero-carousel, featured-category-tiles, resource-cards, footer-columns ×10, search-strip ×10 …), typed `slots` per page, `brand-review.html` (tensions: T-scale, T-radius-vocab, T-cta-vocab, T-logo-variants, T-color-imbalance + 3 inferred).
- Provenance: 10/10 live. Captured locale roots: none (no capture gaps).

## Preserve direction — verbatim promotion, 1-entry register, dynamics triaged, martech scaffolded off (2026-10-20)

- Promoted `stardust/current/{PRODUCT.md,DESIGN.md,DESIGN.json}` verbatim to the root; `stardust/direction.md` written (preserve mode); 10 pages → directed.
- Register: R-01 only (Adobe Clean → Source Sans 3, licensing-forced, applied). No audit run — otherwise a pure replica. No `--target-breakpoints`: source breakpoints kept.
- Publish decision recorded in `stardust/eds-conversion-log.md` (publish, owner decision up front).
- Dynamics: detect on 4 archetypes + reach from crawl → 46 findings; plan with `--target-origin` (6/6 first-party APIs host-bound), `--chrome`, `--martech`. Curated `stardust/dynamic-features.md` (46 rows, all with a disposition; the draft's 6 decided-out commerce rows became interim link-outs to the source store with the backend named as owner decision — a hands-off run never decides out) and `dynamic-features-plan.md` (D0–D5).
- Martech: the source answers 406 to non-browser fetches, so spec-martech ran over the browser-rendered captures (`stardust/spec/spec.config.json` + signals built from `current/pages/*.html`): OneTrust (domain script 3f974ff3-…), GA4 gtag, Optimizely, Adobe Commerce events, Bazaarvoice, New Relic. Contract + hand-off written; gtag and Optimizely routes added from rendered evidence (detector missed the post-load gtag injection); `scripts/martech.js` scaffolded with every part disabled.

## Recreate / source-fidelity-gate — listing archetype (extensions-html) gated (2026-10-20)

- Shared canon established: `stardust/prototypes/canon.css` + `canon.js` (tokens, Source Sans 3 @font-face with `size-adjust: 98%`, header, dark search strip, breadcrumbs, page title, footer), `listing.css`, product-card family in `stardust/replica/units.json`.
- Gate: 1440 1.49% / Δh 0 / 0 🔴 / clipped 0; 360 1.33% / Δh 0 / 0 🔴 / clipped 0; cap-probe PASS; 3 iterations per width + full confirmation. Motion: 7 observed, 7 implemented, 3 dead (scroll header morph, category hover, OneTrust class).
- Residuals: uniform ~1.4% font-substitution (R-01); live counters frozen as captured; live mobile quirks replicated, not fixed. Note: gate.sh --full at 360 reused the 1440 unit cache (false FAIL) — standalone unit-geometry at 360 passes.

## Recreate / source-fidelity-gate — static archetype (privacy-policy) gated (2026-10-20)

- 1440 2.87% / Δh 0 / 0 🔴 / clipped 0; 360 5.79% (peak band 10.4%) / Δh 0 / 0 🔴; cap-probe PASS; 1 iteration + confirmation per width; motion 2/2 (canon).
- Residuals: R-01 line-break shifts in long paragraphs; 360 footer crop 3.33% vs 2% chrome bar (canon footer, font metrics).
- Canon back-port requests (compensated in static.css): .page-title-wrapper margin-bottom 50px; .page-main padding-top 30px (68px ≤991px); .page-title line-height 1.1; CMS breadcrumbs are ul.items inside .column.main. Apply at C0 foundation.
- Instrument note: units live cache is not per width — confirm unit FAILs with standalone runs.

## Recreate / source-fidelity-gate — landing archetype (index) gated (2026-10-20)

- 1440 1.22% / 360 1.29%, Δh 0 both, clipped 0, cap-probe PASS, 3 iterations per width.
- 3 🔴 justified: hero slide link text on live embeds PageBuilder inline `<style>` with a per-request class name — unmatchable; hrefs + visible labels match.
- Motion: carousel autoplay 4 s / 0.5 s slide + dot click (`landing.js`, restoreAtDelivery), category/learn-more/dot hovers, dot focus.
- Residuals: R-01 wraps in 2 resource-card paragraphs (units FAIL on 1 text element); 360 footer crop 2.73% (1 px offset + AA).
- Canon back-port: footer margin-top 75px excludes home (`body:not(.cms-index-index)`); home content full width.

## Recreate — program archetype (amasty) in progress; session paused at context limit (2026-10-20)

- Prototype `amasty-module-price-history-html-proposed.html` + `program.css`: 1440 1.83% Δh 0, 360 3.22% Δh 0 (pixel rounds). Hidden gallery/review controls added after the first --full round (10/18 🔴) — not yet re-checked.
- Remaining (progress.json `program.next`): --full confirmation at 1440 + 360, cap-probe, header/footer crops, motion observe/compare; then state advance + gate ledger line.
- Canon back-port queue (apply at C0): footer margin/become-partner band; in-main breadcrumbs on product/CMS pages; .page-main padding-top 30px (68px ≤767/991px); .page-title-wrapper 50px; title line-height 1.1; home footer margin exclusion; 360 footer 1 px offset.

## Recreate / source-fidelity-gate — program archetype (amasty) gated; all four templates pass, prototype tables written (2026-10-20)

- Confirmation `--full` rounds: 1440 1.69% Δh 0, 360 3.22% Δh 0; content-diff 0 structural 🔴 at both; clip-probe 0; cap-probe PASS at 2560; overflow ok.
- Fixes this session: horizontal-ratio gallery thumbs fitted to 80 px height (`gallery-thumb--fit-h`, mirrors fotorama ratio classes); headline/title-wrapper `overflow:hidden` dropped (substitute face's inline box 5 px taller — clip-probe red, no visual change).
- Motion: button hover #0265dc→#0054b6 130 ms, side-nav colour/background transitions, contents scroll-spy (`program.js`) — all at parity; gallery clicks, side-nav hover, header morph dead on live; OneTrust `checked` left to the martech contract.
- Chrome-parity deltas are R-01 glyph metrics only (header +2 px text boxes, footer ±2–4 px), same as the other archetypes.
- Instrument note: unit-geometry's origin cache (`stardust/current/measure/<slug>-units.json`) has no width key — clear it before switching widths, or 360 compares against 1440 geometry (and vice versa). Prototype tables re-run per width with a fresh cache: 1440 3/4 + 1 override, 360 2/4 + 2 overrides → 4 delivered at both. Overrides (R-01 card rewraps on the home page, thumb family absent at 360 on both sides) live in `gates/prototypes-<w>/overrides.json`.

## Migrate plan — four gated archetypes rendered, sibling renders queued per template (2026-10-20)

- `migrate.mjs render` on the archetypes: rendered 4, refused 0 (index, extensions-html, amasty-module-price-history-html, privacy-policy-cookie-restriction-mode). "Broken" link counts are hrefs to pages outside the 10-page scope — E2 repoints them to the source host.
- Modules declared per archetype (chrome modules — search strip, become-a-partner band, footer columns — belong to the foundation header/footer).
- Sibling render units (`stardust/migrate/progress.json`): listing 4, program 1, static 1 — each runs after its template's C-deliver `archetype` unit; landing has no siblings.

## Rollout A-inventory — 10 pages inventoried, 4 archetypes to deliver, 6 siblings content-pending (2026-10-20)

- `inventory.mjs`: 10 pages · 4 pending (archetypes) · 6 content-pending; site coordinates aemcoder/bfdb0b0f@main, live host main--bfdb0b0f--aemcoder.aem.live.

## Rollout B-block — 12 distinct blocks, each converted once on its archetype (2026-10-20)

- `blocks.mjs` + `plan.mjs`: 12 module blocks, 13 instances (breadcrumbs reused by the static archetype); representative-first order with the four archetypes as reps.

## Rollout B2-dynamic — fresh detection matches the curated 46-row inventory (2026-10-20)

- `dynamics-detect.mjs --from-state`: 46 findings on home + 3 archetype types (product page: 3 client-rendered regions, 20 first-party API calls); same set as `stardust/dynamic-features.md`.
- `dynamics-plan.mjs --target-origin main--bfdb0b0f--aemcoder.aem.page --martech`: self 8 · owner batch 32 · host-bound 6/6 — the 38 owner-decision rows unchanged from preserve-direction. Martech contract and `scripts/martech.js` already scaffolded with every part off.

## C-deliver foundation — header, footer, styles, fonts frozen; shell page live and gated (2026-10-20)

- Foundation subagent: styles/, fonts/ (Source Sans 3 + site icon fonts), favicon, header/footer/breadcrumbs/table blocks, `decoratePageTitle()` in scripts.js, /nav + /footer (Robots noindex) and /privacy-policy-cookie-restriction-mode published.
- Gate on the published shell: pub1 found 9 structural 🔴 (header Menu/Account as text, Sign In + auth-popup links missing, footer social glyphs, h1 span granularity) → fixed → pub2 0 🔴 both widths, pixel 2.87% / 5.79%, Δh 0, clipped 0, units PASS.
- Crop bands: header 0.97% / 0.25%, footer 1.27% at 1440; 360 footer 3.33% — narrow-column rewraps under R-01 (live footer columns overlap and the build mirrors them); logged as residual, not iterated.
- Per-template values hang off a `Template` metadata row (body class static/program/listing/landing) — recorded in stardust/runtime-contract.json; every later page must carry it.
- `foundation-freeze.mjs freeze`: 19 files.

## C-deliver archetype-static — legal-page archetype passes its published gate row (2026-10-20)

- `gate-all.mjs --only privacy-policy-cookie-restriction-mode`: 1440 2.87% / 360 5.79%, Δh 0, clipped 0, MISSING/HIDDEN 0, units 0 off → PASS both widths (rows under gates/all-<w>/runs/).
- gate-all selects `status: deployed` + `liveUrl` rows from `--state`; nothing writes those into state.json, so the roster is derived from coverage by `stardust/.work/replica/probes/gate-roster.mjs` → `stardust/.work/replica/gate-state.json` (re-run it after each deploy, pass `--state` to gate-all; the delivered URL is already the preview host, no --eds-host).
- Unit cache: `stardust/current/measure/*-units.json` now holds 360 geometry; the 1440 caches are in `stardust/.work/replica/units-cache-1440/`. Swap before any width change.

## C-deliver archetype-listing — catalogue archetype live and gated (2026-10-20)

- extensions-html → /extensions: gate-all 1440 1.49% / 360 1.33%, Δh 0, clipped 0, content PASS, units 36/36; 3 blocks (facets-sidebar, listing-toolbar, product-card-grid), 39 images rehosted under media/listing/.
- content-diff 37 🔴 per width: 36 ICON DIFF — EDS renames hosted images `media_<sha>` and content-diff pairs icons by file name (same file, size, position) — instrument limitation; 1 footer finding queued in foundation-requests.md.

## C-deliver archetype-program — product-page archetype live and gated (2026-10-20)

- amasty-module-price-history-html → /amasty-module-price-history: gate-all 1440 1.71% / 360 3.26%, Δh 0, clipped 0, content 0, content-diff 0 🔴; 5 blocks (breadcrumbs reused).
- Deviations to carry into the cluster and the owner notes: section anchors are now title-derived ids (#overview, #technical-specifications, #q-a …) — source deep links `#description` / `#product.info.details.*` land at the page top; the pipeline drops blank spacer paragraphs, so product-detail-sections spacing is restored in CSS (exact for this page, approximate on other product pages — check on the sibling's gate row).

## C-deliver archetype-landing — home archetype live and gated; session ends at the runner's stop (2026-10-20)

- index → /: gate-all 1440 1.22% / 360 1.95%, Δh 0, clipped 0, content 0; units off 1 per width = R-01 resource-card rewraps (overrides in gates/all-{1440,360}/overrides.json); hero 3 🔴 = the known PageBuilder artefact.
- Hero carousel autoplay delivered (4000 ms, ping-pong, dots), first advance at load + 3 s (live ≈ 7.5 s). Banners rehosted under media/landing/.
- Content deviation: the source home page has no h1 (delivery-lint P0); the page title text (minus "| Marketplace") is authored as a visually hidden h1.
- All four archetype units done. Remaining C-deliver units: cluster-listing (4 siblings), cluster-program (1), cluster-static (1) — each `migrate.mjs render <siblings> --archetype <slug>=<archetype>` first (stardust/migrate/progress.json render units), then gate-all, final.

## C-deliver clusters, gate-all and final — all 10 pages live and gated on the published origin (2026-10-21)

- cluster-static: terms-and-conditions live; `breadcrumbs (cms-title)` variant carries the static short-page min-height + CMS-h2 title (foundation request kept scoped, not duplicated into styles.css).
- cluster-program: plumrocket-private-sales-flash-sales live; variants `product-purchase-panel.installation`, `product-detail-sections.blank-headings`; delivery-lint one-cta-per-p override on the verbatim "Live Demo" paragraph; archetype re-gated 1.71%.
- cluster-listing: themes, featured-extensions, sales, themes/industry/apparel live; product-card-grid gained an empty-state row (two source categories return 0 results), price weight 400, hidden empty pager; archetype re-gated 1.46%/1.27%.
- C-final: footer request applied (current page's nav item rendered as `li.current > strong`, as the source does), foundation re-frozen; code bus refreshed before the roster gate.
- gate-all: 10/10 delivered at both widths — 1440 0.93–2.87%, 360 1.27–6.88%, Δh 0 except plumrocket (3 / 83 px, inside 5%), clipped 0, content MISSING/HIDDEN 0. Overrides are units-only: R-01 rewrap (home), absent unit families (0-result categories, no cookie table), thumbs invisible on both sides at 360 (program pages).
- Instrument finding: unit-geometry caches the origin inventory per page, not per width (`stardust/current/measure/<slug>-units.json`) — a 1440 run reused 360 geometry and failed privacy 8 rows off; caches cleared before each width's run (per-width copies in `stardust/.work/rollout/units-cache-{360,1440}/`).

## Rollout D-site — sitemap, redirects and root verified on the live origin (2026-10-21)

- Served sitemap 10 = assembled 10 = coverage rows; /nav and /footer carry `Robots | noindex` and are live.
- 7 `.html` source paths redirect 301 to their extensionless pages (`stardust/redirects.tsv` → `/redirects.json`, published); `/` answers 200 from the `index` document.

## Rollout D2-dynamic — 11/11 self features replay on the live origin; search delivered (2026-10-21)

- `stardust/dynamics/parity.json`: 50 rows (self 11, owner 33, host-bound 6); dynamics-check on aem.live 20/20, exit 0; martech: scripts/martech.js live, CMP and every contract part disabled (owner turns them on).
- Search: `helix-query.yaml` + `widgets/search/search-results` + `/search` page (coverage row, origin dynamics); header search form posts to `/search`; query-index total 10. `/search` stays in the sitemap (verify-origin 11 = 11).
- Content fix: `/themes/industry/apparel` carried `Description | null` from the generator (source has no description meta) — row removed, republished.

## Rollout E-full-site — 11/11 pages verified on the live origin; render check per template passes (2026-10-21)

- Pixel tables re-applied (`update-coverage.mjs --gate` all-1440 / all-360: 10/10 rows, 0 flips); `verify.mjs --base <aem.live>`: 10 verified, `/search` recorded verified by hand (see below).
- Privacy: `verify.mjs` requests `/<path>/` for an `index.html`-migrated page; the source answers that URL with 301 → no slash, so `/privacy-policy-cookie-restriction-mode/` and `/terms-and-conditions/` were added to `stardust/redirects.tsv` and `/redirects.json` (9 rows, published, both 301 on aem.live).
- Search: the h1 was client-rendered only — the `/search` document now carries an authored `<h1>` that the widget adopts (`widgets/search/search-results.js`), so it's in the server HTML. The verifier's only remaining flag is the widget's own `/widgets/search/search-results.html` link (200 on aem.live, a code path, not a page); headless: one h1 "Search results for: 'price'", 1 result. Row set `verified` via `update-coverage.mjs`.
- Headless render check, first page per template (/, /extensions, /amasty-module-price-history, /privacy-…): 1 h1, header + footer present, 0 broken images, 0 page errors; hero carousel `restoreAtDelivery` advances unpoked (0% → -100% → -200%, first step about 7 s after load, as on the source).

## Rollout E2-link-audit — every internal link resolves; out-of-scope targets repointed to the source (2026-10-21)

- 170 distinct hrefs across the 11 live documents + nav + footer: 8 root-relative (all 200 on aem.live, extensionless), 103 to commercemarketplace.adobe.com (all outside the 10-page scope → kept absolute, decision + list in `stardust/direction.md`), external hosts unchanged, 14 anchors/mailto.
- `localize-links.mjs --check`: PASS, 0 localizable links. No captured page is repointed; no 404 left.
- Removed the stray `crop-diff.png` debug capture from the repo root (served publicly, unreferenced).

## Rollout F-optimize — source JSON-LD carried over to 8 pages; health 48 → 100, 0 open P1 (2026-10-21)

- First sweep: health 48, P1 0, P2 10 — 8 of them `ai-search/jsonld`: the source pages carry JSON-LD (WebSite / WebPage / Product) that the migration had dropped.
- Fix (content, no code): a `json-ld` metadata row per document carrying the source's JSON-LD verbatim; the EDS pipeline renders it as `<script type="application/ld+json">` in the server head. Runs of spaces inside description strings are written as ` ` escapes (the cell collapses whitespace), so every page's parsed JSON-LD equals the source byte for byte — checked on aem.live for all 8. Repo `content/` and DA in sync, all previewed + published.
- Remaining 3 accepted as source parity (findings.mjs resolve, notes in the ledger): `/search` JSON-LD and meta description (the source search page has neither, browser-checked), home `<title>` length (identical to the source title; the detector counts the `&#x26;` entity). Re-run: health 88 → 100 after resolves, open P1 0 P2 0, 4 more parity findings informational.

## Rollout G-aem — nothing left to autofix (2026-10-21)

- `autofix-aem.mjs --project . --dry-run`: 0 candidates (no open platform-migration findings after F-optimize); no re-deploy needed, verify + optimize results from E/F stand.

## Rollout H-report — 11/11 verified, health 100, nothing left to deliver (2026-10-21)

- Summary block in `stardust/rollout/report.md`: 11 pages verified, 12/12 blocks, health 100 with 0 open findings, pixel table 10/10 pixel-pass at both widths (strict + documented overrides), to deliver: none.
- `stardust/learnings.md` written: 4 pending entries (verify trailing slash, verify vs widgets, JSON-LD not carried by migrate, title-length entity count).

## Rollout I-dashboard — dashboard generated (2026-10-21)

- `stardust/rollout/dashboard/{index.html,data.json}`: 11 pages identified → prototyped → deployed 11; optimised 7 (the other 4 carry informational source-parity findings only: legal pages without JSON-LD, apparel and sales mirror the source's description/title).

## Replica handoff — complete: 10/10 in-scope pages (+ /search) live, gated and verified on aem.live (2026-10-21)

- Rollout E → I closed this session: 11/11 verified, links audited (out-of-scope targets kept on the source), source JSON-LD restored on 8 pages, health 100 with 0 open findings, report + dashboard written.
- `state.json`: all 10 pages advanced to `migrated` (migratedPath from coverage). Runner done-check: complete, no gaps.
