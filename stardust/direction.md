---
_provenance:
  writtenBy: stardust:replica
  writtenAt: 2026-10-20T19:32:04Z
  againstInput: https://commercemarketplace.adobe.com/
  readArtifacts:
    - stardust/current/PRODUCT.md
    - stardust/current/DESIGN.md
    - stardust/current/DESIGN.json
---

# Direction — preserve mode (same-design migration)

Mode: PRESERVE. The target spec is the captured current state of https://commercemarketplace.adobe.com/,
promoted verbatim (no direct invocation, no creative decisions).

Promoted: current/PRODUCT.md → PRODUCT.md · current/DESIGN.md → DESIGN.md ·
current/DESIGN.json → DESIGN.json (at 2026-10-20T19:32:04Z).

Permitted deltas: ONLY the entries of stardust/replica/inconsistency-register.md
(1 entry — font substitution, required by licensing; otherwise pure replica).

Fidelity: ia verbatim · design verbatim · content verbatim.

## Link-audit decision — out-of-scope internal targets (E2, 2026-10-21)

**Decision: SCOPE EXTENSION → repoint to the source site.** The run's page scope is fixed at the 10 selected pages of
`stardust/.labs/site-plan.json`; every other commercemarketplace.adobe.com target sits outside the declared caps, so it
stays an absolute link to the live source (no capture gap: no captured `state.json` page is repointed, all 10 are
delivered and linked root-relative). `localize-links.mjs --check`: 0 localizable links left. Relative hrefs on the 11
live documents + nav + footer: 8 distinct, all 200 on aem.live; none carries `.html` except the search widget's code path.
External hosts (developer.adobe.com, amasty.com, plumrocket.com, social, docs) stay as on the source.

Repointed source paths (98): /ae-18th-digitech-pvt-ltd-connector-for-ms-dynamics-365-bc, /ae-adobe-msft-d365-fo-for-adobe-commerce, /ae-amasty-abandoned-cart-recovery, /ae-amasty-custom-form-builder, /ae-amasty-image-enhancer, /ae-amasty-mass-order-actions, /ae-amasty-smart-discounts, /ae-blue-acorn-ici-store-locator-by-blue-acorn, /ae-brainvire-infotech-inc-odoo-connector-for-adobe-commerce, /ae-comwrap-reply-gmbh-adobe-commerce-hubspot-connector, /ae-comwrap-reply-gmbh-feed-generator, /ae-comwrap-reply-gmbh-kount-fraud-detection, /ae-magedelight-solution-pvt-ltd-order-sms-notifications-app, /ae-netz98-a-valantic-company-product-reviews, /ae-techdivision-gmbh-agentic-commerce-protocol-feedgen, /ae-techdivision-gmbh-connector-for-netsuite-by-td, /ae-techdivision-gmbh-sap-s4-hana-connector, /ae-vaimo-sweden-ab-akeneo-connector-for-adobe-commerce, /akeneo-module-magento2-connector-community, /algolia-algoliasearch-magento-2, /amasty-affiliate-program, /amasty-ajax-cart, /amasty-free-gift-lite, /amasty-module-product-import, /amasty-module-shopby-pro, /amasty-special-promo-pro, /amasty-special-promotion, /blackbird-contentmanager, /blackbird-discontinued-product, /blackbird-menumanager, /blackbird-monetico, /blackbird-translator, /blackbird-visualmerchandiser, /catalogsearch/result, /channelengine-magento2, /checkout/cart, /contact-us, /customer/account/login/referer/ahr0chm6ly9jb21tzxjjzw1hcmtldhbsywnllmfkb2jllmnvbs9wcml2ywn5lxbvbgljes1jb29rawutcmvzdhjpy3rpb24tbw9kzq~~/_c_timestamp/17925234801457349705, /extensions/accounting-finance, /extensions/customer-support, /extensions/marketing-automation-email-marketing, /extensions/payments-security, /extensions/shipping-fulfillment, /extensions/site-optimization, /improntus-module-astropay, /improntus-module-klap, /improntus-module-mach-pay, /improntus-module-pedidosya-magento-2, /improntus-module-powerpay, /improntus-module-privacy-compliance, /improntus-module-prontopaga, /improntus-module-uber, /improntus-whatsappcontact, /legal/terms/customer-agreement, /legal/terms/development-terms, /legal/terms/master-terms, /mage-delight-abandonedcart-module, /mage-delight-ai-content-generator-module, /mage-delight-ai-content-translator-module, /mage-delight-authorizecim-module, /mage-delight-bulk-customizable-options-assignment-module, /mage-delight-bundlediscount-module, /mage-delight-giftcard-module, /mage-delight-membershipsubscription-module, /mage-delight-specialpromo-module, /mage-delight-stocknotifications-module, /mage-delight-storecreditrefund, /magento-experience-platform-connector, /magento-live-search, /magento-payment-services, /magento-product-recommendations, /media/catalog/product/amasty-module-price-history-1-4-0-ece/installation_guides.pdf, /media/catalog/product/amasty-module-price-history-1-4-0-ece/user_guides.pdf, /media/catalog/product/plumrocket-private-sales-flash-sales-6-0-0-ece/installation_guides.pdf, /media/catalog/product/plumrocket-private-sales-flash-sales-6-0-0-ece/user_guides.pdf, /meta-meta-for-magento2.html%20, /partner/amasty, /partner/plumrocket, /partners, /signifyd-module-connect, /static/version1789987689/frontend/aheadworks/marketplace/en_us/pdf/footer/marketplace-infosheet.pdf, /swissup-absolute-metapackage, /swissup-argento-m2, /swissup-breeze-blank, /swissup-breeze-evolution, /themes/industry, /vdcstore-magento2-deleteorder, /vdcstore-magento2-order-history, /vdcstore-magento2-sameordernumber, /vdcstore-magento2-whatsapp-contact, /vdcstore-module-backendreindex, /vdcstore-module-categoryfilter, /vdcstore-module-customprice, /vdcstore-module-hideprice, /vdcstore-module-productquantity, /vdcstore-module-productshipping, /vdcstore-module-salesman, /vdcstore-product-mass-actions
