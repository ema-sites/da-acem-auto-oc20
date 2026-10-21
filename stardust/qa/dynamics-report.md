# Dynamics parity check — https://main--bfdb0b0f--aemcoder.aem.live — 2026-10-21T00:27:51.929Z

Replayed 20 checks over 51 features · pass 20 · fail 0. Flows, not presence.

| feature | class | status | check | result | detail | third-party requests |
|---|---|---|---|---|---|---|
| CMS / app settings object dataLayer | A | done | no-page-errors | PASS | none on 4 page(s) |  |
| CMS / app settings object adobeDataLayer | A | done | no-page-errors | PASS | none on 3 page(s) |  |
| client-rendered slot gallery-placeholder | CR | done | dom-count | PASS | 8 × .product-gallery .gallery-thumb (min 8) |  |
| client-rendered slot gallery-placeholder | CR | done | dom-count | PASS | 1 × .product-gallery .gallery-frame img (min 1) |  |
| client-rendered slot bv-content-placeholder | CR | done | dom-count | PASS | 2 × .product-detail-sections .bv-snapshot (min 2) |  |
| client-rendered slot bv-content-placeholder | CR | done | dom-count | PASS | 1 × .product-detail-sections .bv-snapshot-qa (min 1) |  |
| first-party data file GET /static/version1789987689/frontend/Aheadworks/marketplace/en_US/js-translation.json | D | done | no-page-errors | PASS | none on 10 page(s) |  |
| modal trigger aria-haspopup (chrome only) → button:content | M | done | dom-count | PASS | 1 × .facets-sidebar .refine-toggle[aria-controls="facets-collapsible"] (min 1) |  |
| modal trigger aria-haspopup (chrome only) → button:content | M | done | dom-count | PASS | 1 × .facets-sidebar .refine-toggle[aria-controls="facets-collapsible"] (min 1) |  |
| modal trigger aria-haspopup → button:content | M | done | dom-count | PASS | 5 × .facets-sidebar .facet-ratings .rating-link (min 5) |  |
| site search form → /catalogsearch/result/ | S | done | fetch-json | PASS | 200 · 10 rows · keys columns,data,offset,limit,total,:type |  |
| site search form → /catalogsearch/result/ | S | done | search-query | PASS | 1 results (source 1) · first: omnibus price tracker · matches the source |  |
| site search form → /catalogsearch/result/ | S | done | search-query | PASS | 1 results (source 1) · first: private sales flash sales · matches the source |  |
| site search form → /catalogsearch/result/ | S | done | dom-count | PASS | 1 × .header form.minisearch[action$="/search"] (min 1) |  |
| hero carousel autoplay | M | done | dom-count | PASS | 1 × .hero-carousel .is-current (min 1) |  |
| hero carousel autoplay | M | done | dom-count | PASS | 3 × .hero-carousel [aria-hidden] (min 3) |  |
| header minicart dropdown | M | done | click-dialog | PASS | dialog 390px · heading "You have no items in your shopping cart." · 0 fields · Escape closes: true |  |
| mobile nav drawer | M | done | dom-count | PASS | 1 × .header .nav-toggle[aria-controls="nav-sections"] (min 1) |  |
| product contents nav scroll-spy | M | done | dom-count | PASS | 8 × .product-contents-nav .sidenav-item a[href^="#"] (min 8) |  |
| martech: consent + tag routing | T | scaffolded-off | martech | PASS | no tag host requested (1 gated · 0 cross-site host(s) blocked) |  |

## Features without checks

- experimentation: A/B / personalisation (A) — scaffolded-awaiting-owner · owner: which experiments move to the new host · carried in stardust/martech-contract.json, every part disabled; owner enables
- first-party API GET /banner/ajax/load/ (A) — interim · owner: owner: same-origin API (host-bound on the EDS target). Interim: settled state ships static; no call from the new host · environment limit: host-bound: GET /banner/ajax/load/?_,requesting_page_url,sections is 404 on the EDS target (same-origin Magento API); interim settled state ships static, no call from the new host
- unknown third-party host commerce.adobe.io (A) — interim · owner: undecided — revisit at rollout (third-party data call, no visible content of its own in the capture)
- unknown third-party host catalog-service.adobe.io (A) — interim · owner: undecided — revisit at rollout (third-party data call, no visible content of its own in the capture)
- first-party API POST /appbazaarvoice/usertoken/getusertoken (A) — interim · owner: owner: same-origin API (host-bound on the EDS target). Interim: settled state ships static; no call from the new host · environment limit: host-bound: POST /appbazaarvoice/usertoken/getusertoken is 404 on the EDS target (same-origin Magento API); interim settled state ships static, no call from the new host
- first-party API GET /subscriptions/graceperiod/check (A) — interim · owner: owner: same-origin API (host-bound on the EDS target). Interim: settled state ships static; no call from the new host · environment limit: host-bound: GET /subscriptions/graceperiod/check?_,parent_product_id is 404 on the EDS target (same-origin Magento API); interim settled state ships static, no call from the new host
- first-party API POST /appbazaarvoice/customer/isloggedin (A) — interim · owner: owner: same-origin API (host-bound on the EDS target). Interim: settled state ships static; no call from the new host · environment limit: host-bound: POST /appbazaarvoice/customer/isloggedin is 404 on the EDS target (same-origin Magento API); interim settled state ships static, no call from the new host
- first-party API GET /customer/section/load/ (A) — interim · owner: owner: same-origin API (host-bound on the EDS target). Interim: settled state ships static; no call from the new host · environment limit: host-bound: GET /customer/section/load/?_,force_new_section_timestamp,sections is 404 on the EDS target (same-origin Magento API); interim settled state ships static, no call from the new host
- main empty at load, filled after (client-rendered page) (CR) — interim · owner: listing main hydrates client-side (Live Search); the settled DOM was captured by the crawler after hydration and ships as content — not a blank capture
- form "login-form" → no action (JS-wired) (2 fields, tokens: captcha_form_id) (F) — interim · owner: owner: commerce/account backend. Interim: control rendered, action links out to https://commercemarketplace.adobe.com
- form-less control group in div.columns (19 controls) (F) — interim · owner: owner: commerce/account backend. Interim: control rendered, action links out to https://commercemarketplace.adobe.com
- form "product_addtocart_form" → origin /checkout/cart/add/uenc/aHR0cHM6Ly9jb21tZXJjZW1hcmtldHBsYWNlLmFkb2JlLmNvbS9hbWFzdHktbW9kdWxlLXByaWNlLWhpc3RvcnkuaHRtbA~~/product/623600/ (1 fields) (F) — interim · owner: owner: commerce/account backend. Interim: control rendered, action links out to https://commercemarketplace.adobe.com
- form-less control group in div.columns (2 controls) (F) — interim · owner: owner: commerce/account backend. Interim: control rendered, action links out to https://commercemarketplace.adobe.com
- listing candidate fotorama col-6 (6 cards) (L) — interim · owner: owner: live catalog feed (catalog service / query index over product pages). Interim: captured cards ship as authored rows (document-first); unmigrated product links point to the source store. Reason: catalog of ~4,000 products is out of this run's 10-page scope — revisit at rollout
- listing candidate category-children (9 cards) (L) — interim · owner: owner: live catalog feed (catalog service / query index over product pages). Interim: captured cards ship as authored rows (document-first); unmigrated product links point to the source store. Reason: catalog of ~4,000 products is out of this run's 10-page scope — revisit at rollout
- listing candidate facet-items price-ranges (7 cards) (L) — interim · owner: owner: live catalog feed (catalog service / query index over product pages). Interim: captured cards ship as authored rows (document-first); unmigrated product links point to the source store. Reason: catalog of ~4,000 products is out of this run's 10-page scope — revisit at rollout
- listing candidate products-grid products (36 cards) (L) — interim · owner: owner: live catalog feed (catalog service / query index over product pages). Interim: captured cards ship as authored rows (document-first); unmigrated product links point to the source store. Reason: catalog of ~4,000 products is out of this run's 10-page scope — revisit at rollout
- listing candidate product-data-items (8 cards) (L) — interim · owner: owner: live catalog feed (catalog service / query index over product pages). Interim: captured cards ship as authored rows (document-first); unmigrated product links point to the source store. Reason: catalog of ~4,000 products is out of this run's 10-page scope — revisit at rollout
- unknown third-party host rum.hlx.page (T) — scaffolded-awaiting-owner · owner: which tags run on the new host; property ids · carried in stardust/martech-contract.json, every part disabled; owner enables
- social proof: reviews widget (T) — scaffolded-awaiting-owner · owner: which tags run on the new host; property ids · carried in stardust/martech-contract.json, every part disabled; owner enables
- consent: OneTrust (T) — scaffolded-awaiting-owner · owner: CMP domain script reuse on the new host · carried in stardust/martech-contract.json, every part disabled; owner enables
- unknown third-party host acds-events.adobe.io (T) — scaffolded-awaiting-owner · owner: which tags run on the new host; property ids · carried in stardust/martech-contract.json, every part disabled; owner enables
- tag manager: Google Tag Manager (T) — scaffolded-awaiting-owner · owner: which tags run on the new host; property ids · carried in stardust/martech-contract.json, every part disabled; owner enables
- analytics: Adobe Analytics / Experience Cloud ID (T) — scaffolded-awaiting-owner · owner: which tags run on the new host; property ids · carried in stardust/martech-contract.json, every part disabled; owner enables
- analytics: Google Analytics / Ads (T) — scaffolded-awaiting-owner · owner: which tags run on the new host; property ids · carried in stardust/martech-contract.json, every part disabled; owner enables
- marketing: ad / retargeting pixel (T) — scaffolded-awaiting-owner · owner: which tags run on the new host; property ids · carried in stardust/martech-contract.json, every part disabled; owner enables
- RUM: New Relic (T) — scaffolded-awaiting-owner · owner: which tags run on the new host; property ids · carried in stardust/martech-contract.json, every part disabled; owner enables
- unknown third-party host recommendations-sdk.adobe.io (T) — scaffolded-awaiting-owner · owner: which tags run on the new host; property ids · carried in stardust/martech-contract.json, every part disabled; owner enables
- tag manager: Adobe Launch (T) — scaffolded-awaiting-owner · owner: which tags run on the new host; property ids · carried in stardust/martech-contract.json, every part disabled; owner enables
- third-party mount <div data-bind> (tag-manager-injected widget) (T) — scaffolded-awaiting-owner · owner: vendor account ids stay the owner's · carried in stardust/martech-contract.json, every part disabled; owner enables
- third-party mount <div data-bv-show> (tag-manager-injected widget) (T) — scaffolded-awaiting-owner · owner: vendor account ids stay the owner's · carried in stardust/martech-contract.json, every part disabled; owner enables
- iframe without src (runtime-injected embed) (V) — interim · owner: undecided — revisit at rollout (third-party data call, no visible content of its own in the capture)
- commerce: platform (X) — interim · owner: owner: commerce backend for the new host. Interim (run assumption): cart, sign-in, checkout and Add to Cart link out to https://commercemarketplace.adobe.com
- commerce: payments (X) — interim · owner: owner: commerce backend for the new host. Interim (run assumption): cart, sign-in, checkout and Add to Cart link out to https://commercemarketplace.adobe.com
- sign-in / account links (X) — interim · owner: owner: commerce backend for the new host. Interim (run assumption): cart, sign-in, checkout and Add to Cart link out to https://commercemarketplace.adobe.com
- commerce signals (cart: true, prices: 0) (X) — interim · owner: owner: commerce backend for the new host. Interim (run assumption): cart, sign-in, checkout and Add to Cart link out to https://commercemarketplace.adobe.com
- commerce signals (cart: true, prices: 41) (X) — interim · owner: owner: commerce backend for the new host. Interim (run assumption): cart, sign-in, checkout and Add to Cart link out to https://commercemarketplace.adobe.com
- commerce signals (cart: true, prices: 3) (X) — interim · owner: owner: commerce backend for the new host. Interim (run assumption): cart, sign-in, checkout and Add to Cart link out to https://commercemarketplace.adobe.com
