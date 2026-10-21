- archetype-listing | footer: the live footer renders the current page's nav item as text (no link) — /extensions shows 'Extensions' as body, build as a link | content-diff pub2 1440+360: 1 🔴 ROLE SWAP [footer] "Extensions" body→cta | listing (and any page whose path is a footer nav target)
- cluster-static | static template: luma `.column.main { min-height: 300px }` (border-box, 40px bottom pad) not in styles.css — binds on short CMS pages; a CMS page without .page-title needs its h1 styled as the CMS h2 | /terms-and-conditions source main 330px (column 300px), EDS 307px before override; measured exact after `breadcrumbs (cms-title)` override (1066/1188 docH) | static

## Applied at C-final (2026-10-20)
- archetype-listing footer request: applied in blocks/footer/footer.js (current-page nav item rendered as `li.current > strong`, the source markup; footer.css already styles it).
- cluster-static min-height request: kept as the scoped `breadcrumbs (cms-title)` override (measured exact, docH 1066/1188); not duplicated into styles.css, where it would stack on the block override.
