<!-- stardust:provenance
  writtenBy:        stardust:extract
  writtenAt:        2026-10-20T19:55:00Z
  mode:             descriptive (current state, prep)
  readArtifacts:
    - https://commercemarketplace.adobe.com/ (+ 9 interior pages)
    - stardust/current/pages/*.json
    - stardust/current/_brand-extraction.json
    - stardust/current/_computed-styles.json
    - stardust/current/DESIGN.json
  synthesizedInputs: []
  stardustVersion:  0.34.0
-->
# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

_provenance: inferred. Basis: navigation labels, footer columns and the copy on the captured pages._

- **Merchants and their agencies** running Adobe Commerce (cloud or on-prem) or Magento Open Source. They browse "Extensions for Adobe Commerce" and "Themes for Adobe Commerce" by category, edition, compatibility, price and rating, then license an extension from its product page (Edition, store version, "Add to cart").
- **Extension developers and technology partners.** They are addressed through "Are you a developer? Become a Adobe Commerce Partner to add value to your extension or theme.", the footer "Developer Resources" column (Developer Portal, Dev Docs, API, Community) and the Marketplace Master/Development Terms.
- **Adobe Commerce professionals.** They are addressed by the Training and Certification resource cards.

## Product Purpose

The Adobe Commerce Marketplace catalogs, sells and supports third-party extensions and themes for Adobe Commerce / Magento storefronts. The meta description says: "Browse 1,000s of free and premium Magento extensions and themes from our Marketplace to easily extend the functionality of your online store." At capture time the catalog listed 3948 extensions and 4 themes (`#toolbar-amount`). Each listing shows vendor, rating, partner tier and price (free `$0.00` up to yearly subscriptions such as `$919.00 / year`).

## Positioning

_provenance: inferred. Basis: Assurance Program card, the quality report on product pages, and the "Adobe Commerce" first-party listings._

This is the official, Adobe-run marketplace for the platform. Its claims are quality assurance ("The Assurance Program ensures that extensions and apps designated as such adhere to high-quality standards and development best practices."), a per-extension Quality Report (Installation & Varnish Tests, Coding Standard, Plagiarism Check, Malware Check, Marketing Review, Manual Testing), Adobe partner tiers on vendor cards (Gold/Silver/Platinum Technology or Solution Partner), and first-party Adobe Commerce services listed first (Payment Services, Product Recommendations, Live Search).

## Capabilities and Constraints

- The platform is Magento 2.4.9 ("Powered by Adobe Commerce 2.4.9") with an Aheadworks/marketplace theme and Page Builder content on the home page.
- Catalog listings are a Live Search widget (`#livesearch-category-view`). It has a facet sidebar (Categories, Certification, Edition, Compatibility, Price, Partner Type, Ratings, Subscription, Package Type), sorting (Relevance, Price, Rating), 36/72/144 results per page and numbered pagination.
- Product pages have a gallery, an edition/version/installation-service purchase panel with first-year, renewal and due-today pricing, a CONTENTS side-nav, technical specifications, a quality report, release notes, support, and Bazaarvoice Q&A and reviews.
- Account and commerce features: Sign In, My Cart mini-cart, checkout. Search runs through `#search_mini_form` on every page.
- Consent is handled by the OneTrust SDK on 9 of 10 pages.
- Two captured category URLs (Featured Extensions, Themes > Industry > Apparel) return "0 Results" and "No products found." on the live site.

## Brand Commitments

- **Register:** `brand`, flagged ambiguous. The home page reads as marketing (banner carousel, "Get started", program cards), but half of the captured pages are tool-like catalog views (filters, sort, pagination, cart). `_brand-extraction.json#register` = `ambiguous`.
- **Name and marks:** "Adobe Commerce Marketplace". The Adobe wordmark logo is red `#EB1000` in the header and white in the footer. The favicon is the Adobe corporate lockup.
- **Typeface:** Adobe Clean (adobe-clean, AdobeCleanBold, AdobeCleanMedium) is a proprietary Adobe typeface that the site self-hosts. Source Sans 3 (OFL) is the metric-close substitute, with the brand family first in the stack.
- **Observed personality:** utilitarian, catalog-first, corporate-formal. The palette is restrained grey and white, with a sticky white header, a near-black search strip and a dark footer. Blue `#0469e3` is used for links and "Add to cart"; orange `#eb5202` for the hero "Get started".
- **Observed anti-references:** none stated by the site. Do not infer any.

## Evidence on Hand

- Page records and rendered HTML: `stardust/current/pages/<slug>.json` / `.html` for index, extensions-html, themes-html, extensions-sales-html, extensions-featured-extensions-html, themes-industry-apparel-html, amasty-module-price-history-html, plumrocket-private-sales-flash-sales-html, privacy-policy-cookie-restriction-mode and terms-and-conditions. Each record has a `slots` section.
- Brand surface: `stardust/current/_brand-extraction.json`. Computed-style census: `stardust/current/_computed-styles.json`. Crawl log: `stardust/current/_crawl-log.json`.
- Assets: `stardust/current/assets/logo.svg` (header), `assets/logo-footer.svg` (white), `assets/favicon.png` (136x119), `assets/fonts/AdobeClean-{Regular,Medium,Bold,It}.woff2`, `assets/css/styles-m.css`, `assets/css/styles-l.css`, `assets/screenshots/<slug>.png`.
- Real content on hand includes 36 product cards on each of two extension listings, 4 theme cards, two complete product pages with prices and release notes, and the privacy and terms texts.
- Absences that downstream work must not fabricate:
  - No DOM hero headline (the banner copy is baked into the images).
  - No testimonials, case studies or press.
  - No review or Q&A content (third-party embeds, empty at capture).
  - No product cards on the two zero-result categories.

## Product Principles

_provenance: inferred. Basis: observed IA and copy._

1. Findability first. Every page carries global search, and listings lead with facets, result count and sort.
2. Trust is shown, not claimed. Assurance badges, partner tiers, the quality report and release notes sit next to price.
3. Price clarity at the point of decision. Edition, version, first-year and renewal price, and total due today all sit in one panel.
4. The ecosystem has two sides. Merchants buy; developers and partners are recruited from the footer and product pages.

## Accessibility & Inclusion

No product-specific standard was established by the site. Captured observations:

- The header logo `<img>` has empty alt (`aria-label="store logo"` on the link).
- 4.7% of captured images have empty alt.
- The terms page has no `<h1>`.
- Listing h1 (28px/400) is visually smaller than in-content h2 (30px/600).
