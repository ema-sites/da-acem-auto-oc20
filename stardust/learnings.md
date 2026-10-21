# Learnings — commercemarketplace.adobe.com replica run

### verify.mjs requests a trailing-slash URL for index.html-migrated pages
- failure class: path-safety (false verify failure)
- evidence: 2026-10-21, `/privacy-policy-cookie-restriction-mode` (migrated as `…/index.html`, delivered and 200 at the extensionless path) failed `verify.mjs` with HTTP 404 because `lib.mjs publicUrl()` appends `/`; resolved by mirroring the source's own 301 (`/<path>/` → `/<path>`) in the redirects sheet
- proposed change: `skills/rollout/scripts/lib.mjs` `publicUrl()` — prefer the coverage row's `delivery.deployedUrl` path, or fall back to the no-slash path on a 404; `skills/rollout/SKILL.md` § D-site — seed trailing-slash rows when the source 301s them
- status: pending

### verify.mjs fails widget pages: static h1 check and /widgets/ links
- failure class: silent-render (verifier vs client-rendered widget)
- evidence: `/search` (widget `widgets/search/search-results`) failed with "exactly one <h1>, found 0" (h1 rendered by the widget) and then "broken internal links: /widgets/search/search-results.html" (a code path, 200 on aem.live); fixed the h1 by authoring it in the document (widget adopts it), recorded the row verified after a headless check
- proposed change: `skills/rollout/scripts/verify.mjs` `checkLinks()` — skip `/widgets/` hrefs (the code-path convention `lib.mjs widgetCodePath()` already knows); `skills/dynamics` search widget skeleton — author the h1 in the document, the widget adopts it
- status: pending

### Source JSON-LD dropped by the migration
- failure class: capture-gap (head metadata not carried)
- evidence: optimize run-1 flagged `ai-search/jsonld` on 8 of 10 pages whose captured source carries WebSite / WebPage / Product JSON-LD; restored verbatim as a `json-ld` metadata row (the EDS pipeline emits `<script type="application/ld+json">` server-side); runs of spaces inside strings collapse in the cell — write them as ` ` escapes to keep the parsed value identical
- proposed change: `skills/migrate/reference/content-preservation.md` + deploy's metadata emitter — carry the source JSON-LD into a `json-ld` metadata row at render time, with the whitespace escape
- status: pending

### optimize title-length counts HTML entities
- failure class: false finding
- evidence: home `<title>` identical to the source (70 chars) flagged as 75 because the pipeline emits `&#x26;` for `&`; source parity missed it for the same reason
- proposed change: `skills/rollout/scripts/optimize.mjs` — decode entities before measuring the title and before the source-parity comparison
- status: pending
