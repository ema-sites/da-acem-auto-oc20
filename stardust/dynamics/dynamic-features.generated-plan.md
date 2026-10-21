<!-- stardust provenance: skill=stardust:dynamics · phase=plan draft · 2026-10-20T20:57:25.215Z · input stardust/current/_dynamics.json (4 pages, 46 findings) · target probe https://main--bfdb0b0f--aemcoder.aem.page -->
# Dynamic features — draft inventory (curate into `stardust/dynamic-features.md`)

One row per detected finding. Merge duplicates, drop noise, keep every axis honest. Columns: disposition = what we do · target = the delivery form (widget where no authored rows remain) · reproducibility = what it needs · status = where it stands (reference/triage.md).

| # | id | class | feature | pages | disposition | target | reproducibility | status | pattern | decision needed | notes |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | a-experimentation-a-b-personalisation | A | experimentation: A/B / personalisation | 4/4 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which experiments move to the new host |  |
| 2 | a-first-party-api-get-banner-ajax-load | A | first-party API GET /banner/ajax/load/ | 4/4 (reach 6/10) | data-fed | block | needs-business-decision | pending | off-origin-data | which tier for the target host; consumer on the migrated pages? | **dead on target (404)** |
| 3 | a-cms-app-settings-object-datalayer | A | CMS / app settings object dataLayer | 4/4 | static-snapshot | content | self | pending | read-settings | — (keys name endpoints, ids, vendors) |  |
| 4 | a-cms-app-settings-object-adobedatalayer | A | CMS / app settings object adobeDataLayer | 4/4 | static-snapshot | content | self | pending | read-settings | — (keys name endpoints, ids, vendors) |  |
| 5 | a-unknown-third-party-host-commerce-adobe-io | A | unknown third-party host commerce.adobe.io | 3/4 | static-snapshot | — | needs-human-capture | pending | inspect | inspect the XHR, add a vendor row |  |
| 6 | a-unknown-third-party-host-catalog-service-adobe-io | A | unknown third-party host catalog-service.adobe.io | 1/4 | static-snapshot | — | needs-human-capture | pending | inspect | inspect the XHR, add a vendor row |  |
| 7 | a-first-party-api-post-appbazaarvoice-usertoken-getusertoken | A | first-party API POST /appbazaarvoice/usertoken/getusertoken | 1/4 (reach 2/10) | data-fed | block | needs-business-decision | pending | off-origin-data | which tier for the target host; consumer on the migrated pages? | **dead on target (404)** |
| 8 | a-first-party-api-get-subscriptions-graceperiod-check | A | first-party API GET /subscriptions/graceperiod/check | 1/4 (reach 2/10) | data-fed | block | needs-business-decision | pending | off-origin-data | which tier for the target host; consumer on the migrated pages? | **dead on target (404)** |
| 9 | a-first-party-api-post-appbazaarvoice-customer-isloggedin | A | first-party API POST /appbazaarvoice/customer/isloggedin | 1/4 (reach 2/10) | data-fed | block | needs-business-decision | pending | off-origin-data | which tier for the target host; consumer on the migrated pages? | **dead on target (404)** |
| 10 | a-first-party-api-get-customer-section-load | A | first-party API GET /customer/section/load/ | 1/4 (reach 2/10) | data-fed | block | needs-business-decision | pending | off-origin-data | which tier for the target host; consumer on the migrated pages? | **dead on target (404)** |
| 11 | cr-main-empty-at-load-filled-after-client-rendered-page | CR | main empty at load, filled after (client-rendered page) | 1/4 | static-snapshot | content | needs-human-capture | pending | client-rendered-page | human-browser capture; never migrate blank |  |
| 12 | cr-client-rendered-slot-gallery-placeholder | CR | client-rendered slot gallery-placeholder | 1/4 | static-snapshot | content | self | pending | settled-dom-snapshot | inspect the consumer |  |
| 13 | cr-client-rendered-slot-bv-content-placeholder | CR | client-rendered slot bv-content-placeholder | 1/4 | static-snapshot | content | self | pending | settled-dom-snapshot | inspect the consumer |  |
| 14 | d-first-party-data-file-get-static-version1789987689-fronten | D | first-party data file GET /static/version1789987689/frontend/Aheadworks/marketplace/en_US/js-translation.json | 4/4 (reach 10/10) | data-fed | content | self | pending | sheet-sync | none (sync from the source origin) | **dead on target (404)** |
| 15 | f-form-login-form-no-action-js-wired-2-fields-tokens-captcha | F | form "login-form" → no action (JS-wired) (2 fields, tokens: captcha_form_id) | 4/4 | rebuild-native | block | needs-backend | pending | forms | production endpoint; interim capture ships now |  |
| 16 | f-form-less-control-group-in-div-columns-19-controls | F | form-less control group in div.columns (19 controls) | 1/4 | rebuild-native | widget | needs-backend | pending | forms | production endpoint; interim capture ships now |  |
| 17 | f-form-product-addtocart-form-origin-checkout-cart-add-uenc- | F | form "product_addtocart_form" → origin /checkout/cart/add/uenc/aHR0cHM6Ly9jb21tZXJjZW1hcmtldHBsYWNlLmFkb2JlLmNvbS9hbWFzdHktbW9kdWxlLXByaWNlLWhpc3RvcnkuaHRtbA~~/product/623600/ (1 fields) | 1/4 | rebuild-native | block | needs-backend | pending | forms | production endpoint; interim capture ships now |  |
| 18 | f-form-less-control-group-in-div-columns-2-controls | F | form-less control group in div.columns (2 controls) | 1/4 | rebuild-native | widget | needs-backend | pending | forms | production endpoint; interim capture ships now |  |
| 19 | l-listing-candidate-fotorama-col-6-6-cards | L | listing candidate fotorama col-6 (6 cards) | 1/4 | index-backed | block | needs-business-decision | pending | listing-index-backed | index-driven or editorially curated? |  |
| 20 | l-listing-candidate-category-children-9-cards | L | listing candidate category-children (9 cards) | 1/4 | index-backed | block | needs-business-decision | pending | listing-index-backed | index-driven or editorially curated? |  |
| 21 | l-listing-candidate-facet-items-price-ranges-7-cards | L | listing candidate facet-items price-ranges (7 cards) | 1/4 | index-backed | block | needs-business-decision | pending | listing-index-backed | index-driven or editorially curated? |  |
| 22 | l-listing-candidate-products-grid-products-36-cards | L | listing candidate products-grid products (36 cards) | 1/4 | index-backed | block | needs-business-decision | pending | listing-index-backed | index-driven or editorially curated? |  |
| 23 | l-listing-candidate-product-data-items-8-cards | L | listing candidate product-data-items (8 cards) | 1/4 | index-backed | block | needs-business-decision | pending | listing-index-backed | index-driven or editorially curated? |  |
| 24 | m-modal-trigger-aria-haspopup-chrome-only-button-content | M | modal trigger aria-haspopup (chrome only) → button:content | 3/4 (reach 11/10) | rebuild-native | runtime | self | pending | chrome-interaction | none (the header contract is the spec) |  |
| 25 | m-modal-trigger-aria-haspopup-button-content | M | modal trigger aria-haspopup → button:content | 1/4 (reach 11/10) | rebuild-native | runtime | self | pending | modal-loader | none |  |
| 26 | s-site-search-form-catalogsearch-result | S | site search form → /catalogsearch/result/ | 4/4 (reach 10/10) | index-backed | widget | self | pending | search-index-backed | none (corpus = the migrated pages; second corpora stay out) |  |
| 27 | t-unknown-third-party-host-rum-hlx-page | T | unknown third-party host rum.hlx.page | 4/4 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 28 | t-social-proof-reviews-widget | T | social proof: reviews widget | 4/4 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 29 | t-consent-onetrust | T | consent: OneTrust | 4/4 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | CMP domain script reuse on the new host |  |
| 30 | t-unknown-third-party-host-acds-events-adobe-io | T | unknown third-party host acds-events.adobe.io | 4/4 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 31 | t-tag-manager-google-tag-manager | T | tag manager: Google Tag Manager | 4/4 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 32 | t-analytics-adobe-analytics-experience-cloud-id | T | analytics: Adobe Analytics / Experience Cloud ID | 4/4 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 33 | t-analytics-google-analytics-ads | T | analytics: Google Analytics / Ads | 4/4 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 34 | t-marketing-ad-retargeting-pixel | T | marketing: ad / retargeting pixel | 4/4 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 35 | t-rum-new-relic | T | RUM: New Relic | 4/4 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 36 | t-unknown-third-party-host-recommendations-sdk-adobe-io | T | unknown third-party host recommendations-sdk.adobe.io | 3/4 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 37 | t-tag-manager-adobe-launch | T | tag manager: Adobe Launch | 3/4 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 38 | t-third-party-mount-div-data-bind-tag-manager-injected-widge | T | third-party mount <div data-bind> (tag-manager-injected widget) | 1/4 | embed-passthrough | embed | needs-credential | pending | embed-passthrough | vendor account ids stay the owner's |  |
| 39 | t-third-party-mount-div-data-bv-show-tag-manager-injected-wi | T | third-party mount <div data-bv-show> (tag-manager-injected widget) | 1/4 | embed-passthrough | embed | needs-credential | pending | embed-passthrough | vendor account ids stay the owner's |  |
| 40 | v-iframe-without-src-runtime-injected-embed | V | iframe without src (runtime-injected embed) | 4/4 | embed-passthrough | embed | needs-human-capture | pending | embed-passthrough | resolve the runtime src from a rendered capture |  |
| 41 | x-commerce-platform | X | commerce: platform | 4/4 | decided-out | — | needs-backend | pending | decided-out | auth / commerce on the new host? |  |
| 42 | x-commerce-payments | X | commerce: payments | 4/4 | decided-out | — | needs-backend | pending | decided-out | auth / commerce on the new host? |  |
| 43 | x-sign-in-account-links | X | sign-in / account links | 4/4 | decided-out | — | needs-backend | pending | decided-out | auth / commerce on the new host? |  |
| 44 | x-commerce-signals-cart-true-prices-0 | X | commerce signals (cart: true, prices: 0) | 2/4 | decided-out | — | needs-backend | pending | decided-out | auth / commerce on the new host? |  |
| 45 | x-commerce-signals-cart-true-prices-41 | X | commerce signals (cart: true, prices: 41) | 1/4 | decided-out | — | needs-backend | pending | decided-out | auth / commerce on the new host? |  |
| 46 | x-commerce-signals-cart-true-prices-3 | X | commerce signals (cart: true, prices: 3) | 1/4 | decided-out | — | needs-backend | pending | decided-out | auth / commerce on the new host? |  |

## Triage

- **Ships autonomously (reproducibility `self`):** 8 row(s) — read-settings, settled-dom-snapshot, sheet-sync, chrome-interaction, modal-loader, search-index-backed.
- **One owner decision batch:** 32 row(s) — which experiments move to the new host · which tier for the target host; consumer on the migrated pages? · inspect the XHR, add a vendor row · human-browser capture; never migrate blank · production endpoint; interim capture ships now · index-driven or editorially curated?.
- **Already delivered by the capture pipeline:** 0 row(s) — no work.
- **Host-bound on the target:** 6 of 6 probed API paths — the off-origin data work.
- **Martech:** OneTrust · 0/0 route(s) enabled by the owner — `stardust/martech-handoff.md`.

## Phases

- **tags** — 12
- **register** — 6
- **off-origin data** — 5
- **listings** — 5
- **detect** — 4
- **forms** — 4
- **capture** — 3
- **embeds** — 3
- **interactive** — 2
- **data** — 1
- **search** — 1
