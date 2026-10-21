# Dynamic features — detected (2026-10-20T20:56:13.195Z)

Pages probed: /, /extensions.html, /amasty-module-price-history.html, /privacy-policy-cookie-restriction-mode · settle 5000 ms · width 1440 · reach from 10/10 crawled pages

Evidence only. Every row must receive a disposition in `stardust/dynamic-features.md` (`dynamics-plan.mjs` drafts it).

| id | class | feature | pages | reach | evidence | hint |
|---|---|---|---|---|---|---|
| a-experimentation-a-b-personalisation | A API / personalisation / settings | experimentation: A/B / personalisation | 4/4 |  | cdn.optimizely.com<br>logx.optimizely.com | inspect |
| a-first-party-api-get-banner-ajax-load | A API / personalisation / settings | first-party API GET /banner/ajax/load/ | 4/4 | 6/10 | GET /banner/ajax/load/?_,requesting_page_url,sections → 200<br>GET /banner/ajax/load/?_,data[product_id],requesting_page_url,sections → 200 | api |
| a-cms-app-settings-object-datalayer | A API / personalisation / settings | CMS / app settings object dataLayer | 4/4 |  |  | settings |
| a-cms-app-settings-object-adobedatalayer | A API / personalisation / settings | CMS / app settings object adobeDataLayer | 4/4 |  |  | settings |
| a-unknown-third-party-host-commerce-adobe-io | A API / personalisation / settings | unknown third-party host commerce.adobe.io | 3/4 |  | commerce.adobe.io | inspect |
| a-unknown-third-party-host-catalog-service-adobe-io | A API / personalisation / settings | unknown third-party host catalog-service.adobe.io | 1/4 |  | catalog-service.adobe.io | inspect |
| a-first-party-api-post-appbazaarvoice-usertoken-getusertoken | A API / personalisation / settings | first-party API POST /appbazaarvoice/usertoken/getusertoken | 1/4 | 2/10 | POST /appbazaarvoice/usertoken/getusertoken → 200 | api |
| a-first-party-api-get-subscriptions-graceperiod-check | A API / personalisation / settings | first-party API GET /subscriptions/graceperiod/check | 1/4 | 2/10 | GET /subscriptions/graceperiod/check?_,parent_product_id → 200 | api |
| a-first-party-api-post-appbazaarvoice-customer-isloggedin | A API / personalisation / settings | first-party API POST /appbazaarvoice/customer/isloggedin | 1/4 | 2/10 | POST /appbazaarvoice/customer/isloggedin → 200 | api |
| a-first-party-api-get-customer-section-load | A API / personalisation / settings | first-party API GET /customer/section/load/ | 1/4 | 2/10 | GET /customer/section/load/?_,force_new_section_timestamp,sections → 200 | api |
| cr-main-empty-at-load-filled-after-client-rendered-page | CR client-rendered | main empty at load, filled after (client-rendered page) | 1/4 |  | text at load 47 → settled 2700 | client-rendered-page |
| cr-client-rendered-slot-gallery-placeholder | CR client-rendered | client-rendered slot gallery-placeholder | 1/4 |  | .fotorama1792529813286 .fotorama__nav--thumbs .fotorama__nav | client-rendered |
| cr-client-rendered-slot-bv-content-placeholder | CR client-rendered | client-rendered slot bv-content-placeholder | 1/4 |  | Be the first to ask a question<br>★★★★★ No rating value | client-rendered |
| d-first-party-data-file-get-static-version1789987689-fronten | D sheet / data file | first-party data file GET /static/version1789987689/frontend/Aheadworks/marketplace/en_US/js-translation.json | 4/4 | 10/10 | GET /static/version1789987689/frontend/Aheadworks/marketplace/en_US/js-translation.json → 200 | data |
| f-form-login-form-no-action-js-wired-2-fields-tokens-captcha | F form | form "login-form" → no action (JS-wired) (2 fields, tokens: captcha_form_id) | 4/4 |  | email:username,password:password<br>captcha_form_id,context | forms |
| f-form-less-control-group-in-div-columns-19-controls | F form | form-less control group in div.columns (19 controls) | 1/4 |  |  | forms |
| f-form-product-addtocart-form-origin-checkout-cart-add-uenc- | F form | form "product_addtocart_form" → origin /checkout/cart/add/uenc/aHR0cHM6Ly9jb21tZXJjZW1hcmtldHBsYWNlLmFkb2JlLmNvbS9hbWFzdHktbW9kdWxlLXByaWNlLWhpc3RvcnkuaHRtbA~~/product/623600/ (1 fields) | 1/4 |  | select:frequency_option<br>product,customer_compatibility,support,installation,form_key,frequency_profile,qty | forms |
| f-form-less-control-group-in-div-columns-2-controls | F form | form-less control group in div.columns (2 controls) | 1/4 |  | editions,compatible_with | forms |
| l-listing-candidate-fotorama-col-6-6-cards | L listing | listing candidate fotorama col-6 (6 cards) | 1/4 |  |  | listings |
| l-listing-candidate-category-children-9-cards | L listing | listing candidate category-children (9 cards) | 1/4 |  |  | listings |
| l-listing-candidate-facet-items-price-ranges-7-cards | L listing | listing candidate facet-items price-ranges (7 cards) | 1/4 |  |  | listings |
| l-listing-candidate-products-grid-products-36-cards | L listing | listing candidate products-grid products (36 cards) | 1/4 |  |  | listings |
| l-listing-candidate-product-data-items-8-cards | L listing | listing candidate product-data-items (8 cards) | 1/4 |  |  | listings |
| m-modal-trigger-aria-haspopup-chrome-only-button-content | M modal / interactive | modal trigger aria-haspopup (chrome only) → button:content | 3/4 | 11/10 | Filter Icon | chrome-interaction |
| m-modal-trigger-aria-haspopup-button-content | M modal / interactive | modal trigger aria-haspopup → button:content | 1/4 | 11/10 | ▼ Rating Filter by Rating<br>Filter Icon | modal |
| s-site-search-form-catalogsearch-result | S search | site search form → /catalogsearch/result/ | 4/4 | 10/10 | text:q | search |
| t-unknown-third-party-host-rum-hlx-page | T tag / consent | unknown third-party host rum.hlx.page | 4/4 |  | rum.hlx.page | inspect |
| t-social-proof-reviews-widget | T tag / consent | social proof: reviews widget | 4/4 |  | apps.bazaarvoice.com<br>network-a.bazaarvoice.com<br>display.ugc.bazaarvoice.com | tags |
| t-consent-onetrust | T tag / consent | consent: OneTrust | 4/4 |  | cdn.cookielaw.org<br>geolocation.onetrust.com | tags |
| t-unknown-third-party-host-acds-events-adobe-io | T tag / consent | unknown third-party host acds-events.adobe.io | 4/4 |  | acds-events.adobe.io | inspect |
| t-tag-manager-google-tag-manager | T tag / consent | tag manager: Google Tag Manager | 4/4 |  | www.googletagmanager.com | tags |
| t-analytics-adobe-analytics-experience-cloud-id | T tag / consent | analytics: Adobe Analytics / Experience Cloud ID | 4/4 |  | commerce.adobedc.net | tags |
| t-analytics-google-analytics-ads | T tag / consent | analytics: Google Analytics / Ads | 4/4 |  | analytics.google.com | tags |
| t-marketing-ad-retargeting-pixel | T tag / consent | marketing: ad / retargeting pixel | 4/4 |  | stats.g.doubleclick.net | tags |
| t-rum-new-relic | T tag / consent | RUM: New Relic | 4/4 |  | js-agent.newrelic.com<br>bam.nr-data.net | tags |
| t-unknown-third-party-host-recommendations-sdk-adobe-io | T tag / consent | unknown third-party host recommendations-sdk.adobe.io | 3/4 |  | recommendations-sdk.adobe.io | inspect |
| t-tag-manager-adobe-launch | T tag / consent | tag manager: Adobe Launch | 3/4 |  | commerce.adobedtm.com | tags |
| t-third-party-mount-div-data-bind-tag-manager-injected-widge | T tag / consent | third-party mount <div data-bind> (tag-manager-injected widget) | 1/4 |  | data-bind data-banner-id data-types data-display-mode data-ids data-rotate | tags |
| t-third-party-mount-div-data-bv-show-tag-manager-injected-wi | T tag / consent | third-party mount <div data-bv-show> (tag-manager-injected widget) | 1/4 |  | data-bv-show data-bv-product-id data-bv-ready | tags |
| v-iframe-without-src-runtime-injected-embed | V media | iframe without src (runtime-injected embed) | 4/4 |  | onetrust-text-resize | embed-runtime |
| x-commerce-platform | X auth / commerce | commerce: platform | 4/4 |  | livesearch-metrics.magento-ds.com | decided-out |
| x-commerce-payments | X auth / commerce | commerce: payments | 4/4 |  | js.braintreegateway.com | decided-out |
| x-sign-in-account-links | X auth / commerce | sign-in / account links | 4/4 |  | https://commercemarketplace.adobe.com/customer/account/login/referer/aHR0cHM6Ly9jb21tZXJjZW1hcmtldHBsYWNlLmFkb2JlLmNvbS8~/_c_timestamp/17925297752081734989/<br>https://commercemarketplace.adobe.com/extensions/accounting-finance.html<br>https://commercemarketplace.adobe.com/customer/account/create/ | decided-out |
| x-commerce-signals-cart-true-prices-0 | X auth / commerce | commerce signals (cart: true, prices: 0) | 2/4 |  |  | decided-out |
| x-commerce-signals-cart-true-prices-41 | X auth / commerce | commerce signals (cart: true, prices: 41) | 1/4 |  |  | decided-out |
| x-commerce-signals-cart-true-prices-3 | X auth / commerce | commerce signals (cart: true, prices: 3) | 1/4 |  |  | decided-out |
