<!-- stardust:provenance
  writtenBy:        stardust:extract
  writtenAt:        2026-10-20T19:58:00Z
  mode:             descriptive (current state, prep)
  readArtifacts:
    - stardust/current/_computed-styles.json
    - stardust/current/_brand-extraction.json
    - stardust/current/DESIGN.json
    - stardust/current/assets/css/styles-m.css
    - stardust/current/assets/css/styles-l.css
    - stardust/current/pages/*.json
  synthesizedInputs: []
  stardustVersion:  0.34.0
-->
---
name: Adobe Commerce Marketplace (current state)
description: Browse 1,000s of free and premium Magento extensions and themes from our Marketplace to easily extend the functionality of your online store.
colors:
  background: "#ffffff"
  surface-alt: "#f2f3f3"
  surface-card-well: "#f8f8f8"
  surface-dark: "#202021"
  search-strip: "#2b2b2c"
  footer-ground: "#31302b"
  text: "#333333"
  text-body: "#505050"
  text-muted: "#636363"
  text-subtle: "#999999"
  heading: "#000000"
  border: "#e0e0e0"
  border-input: "#cccccc"
  primary: "#0469e3"
  primary-button: "#0265dc"
  primary-hover: "#045dca"
  primary-button-hover: "#0054b6"
  link-luma: "#1979c3"
  accent-orange: "#eb5202"
  accent-orange-hover: "#cc6127"
  partner-orange: "#f16321"
  footer-text: "#aeafb1"
  logo-red: "#eb1000"
typography:
  display:
    fontFamily: "adobe-clean, 'Source Sans 3', 'Helvetica Neue', Helvetica, Arial, sans-serif"
    fontSize: "36px"
    fontWeight: 400
    lineHeight: "39.6px"
    letterSpacing: "normal"
  h1:
    fontFamily: "adobe-clean, 'Source Sans 3', 'Helvetica Neue', Helvetica, Arial, sans-serif"
    fontSize: "28px"
    fontWeight: 400
    lineHeight: "33.6px"
    letterSpacing: "normal"
  h2:
    fontFamily: "adobe-clean, 'Source Sans 3', 'Helvetica Neue', Helvetica, Arial, sans-serif"
    fontSize: "30px"
    fontWeight: 600
    lineHeight: "33px"
    letterSpacing: "normal"
  h3:
    fontFamily: "adobe-clean, 'Source Sans 3', 'Helvetica Neue', Helvetica, Arial, sans-serif"
    fontSize: "20px"
    fontWeight: 600
    lineHeight: "22px"
    letterSpacing: "normal"
  card-title:
    fontFamily: "AdobeCleanBold, adobe-clean, 'Source Sans 3', sans-serif"
    fontSize: "15px"
    fontWeight: 700
    lineHeight: "21px"
    letterSpacing: "normal"
  h4:
    fontFamily: "adobe-clean, 'Source Sans 3', 'Helvetica Neue', Helvetica, Arial, sans-serif"
    fontSize: "13px"
    fontWeight: 700
    lineHeight: "17px"
    letterSpacing: "normal"
  footer-heading:
    fontFamily: "AdobeCleanBold, adobe-clean, 'Source Sans 3', sans-serif"
    fontSize: "18px"
    fontWeight: 600
    lineHeight: "19.8px"
    letterSpacing: "normal"
  body:
    fontFamily: "adobe-clean, 'Source Sans 3', 'Helvetica Neue', Helvetica, Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: "20px"
    letterSpacing: "normal"
  small:
    fontFamily: "adobe-clean, 'Source Sans 3', 'Helvetica Neue', Helvetica, Arial, sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: "17.14px"
    letterSpacing: "normal"
rounded:
  xs: "3px"
  sm: "4px"
  md: "6px"
  lg: "16px"
  pill: "20px"
  circle: "100%"
spacing:
  xs: "7px"
  sm: "10px"
  md: "12px"
  lg: "15px"
  xl: "25px"
  xxl: "30px"
  container: "1200px"
components:
  button-primary:
    backgroundColor: "{colors.primary-button}"
    textColor: "{colors.background}"
    rounded: "{rounded.pill}"
    padding: "0px 18px 0px 16px"
  button-primary-hover:
    backgroundColor: "{colors.primary-button-hover}"
  button-secondary:
    backgroundColor: "{colors.background}"
    textColor: "{colors.text}"
    rounded: "{rounded.pill}"
    padding: "0px 18px 0px 16px"
  button-marketing:
    backgroundColor: "{colors.accent-orange}"
    textColor: "{colors.background}"
    padding: "12px 25px"
  button-marketing-hover:
    backgroundColor: "{colors.accent-orange-hover}"
  button-learn-more:
    textColor: "{colors.heading}"
    rounded: "{rounded.lg}"
    padding: "10px"
  button-partner-outline:
    backgroundColor: "{colors.background}"
    textColor: "{colors.partner-orange}"
    rounded: "{rounded.xs}"
    padding: "11px 30px"
  product-card:
    backgroundColor: "{colors.background}"
    rounded: "{rounded.sm}"
  input:
    backgroundColor: "{colors.background}"
    rounded: "{rounded.sm}"
  search-strip:
    backgroundColor: "{colors.search-strip}"
    textColor: "{colors.background}"
  site-footer:
    backgroundColor: "{colors.footer-ground}"
    textColor: "{colors.footer-text}"
    typography: "{typography.footer-heading}"
  link:
    textColor: "{colors.primary}"
---

# Design System: Adobe Commerce Marketplace (current state)

## Overview

**Creative North Star: "The Catalog Counter"**

The Marketplace is a utilitarian storefront on a Magento Luma base. White pages are framed by a sticky white header, a near-black search strip under it, and a dark footer at the bottom. Content sits in a 1200px column. Density is high on catalog pages: a 250px facet sidebar beside an 870px results column of 4-up bordered cards. Product pages are long single-column detail views with a purchase panel at the top. Decoration is almost absent. There are no shadows or gradients of the site's own, and the only recurring motif is a 4px radius on cards, inputs and nav items.

Brand color is spent sparingly. The Adobe red `#eb1000` exists only inside the logo file. Interactive blue `#0469e3` carries links, breadcrumbs and "Add to cart". A single orange `#eb5202` appears on the home banner CTA. Typography is Adobe Clean throughout, with Bold and Medium cuts loaded as separate families.

**Key Characteristics:**
- Flat, bordered, grey-on-white. One radius (4px) dominates (389 elements).
- Dark chrome bands frame the page: the search strip `#2b2b2c` and the footer `#31302b`.
- Blue for action, orange for marketing. The two primary CTA colours coexist.
- The type scale is ad-hoc (30 → 28 → 20 → 13), and listing h1 is smaller than in-content h2.

## Colors

The palette is near-neutral greys with one blue action color and an orange marketing accent.

### Primary
- **Action Blue** (#0469e3): links, current breadcrumb, the Q&A button and the "Add to cart" family. The button member is #0265dc. Hover is #045dca for links and #0054b6 for buttons.

### Secondary
- **Marketing Orange** (#eb5202): background and border of the home hero "Get started" button. Hover is #cc6127. Related: #ef672f on the header hover/border accent, and #f16321 on the footer-band "Become a Partner" outline button.

### Tertiary
- **Adobe Red** (#eb1000): only inside `logo.svg`. It never appears in computed CSS.
- **Luma Blue** (#1979c3): inherited Luma outline links and buttons on listing empty states.

### Neutral
- **White** (#ffffff): page, header and card ground.
- **Ink** (#333333): card titles, filter text, listing headings.
- **Body Grey** (#505050): paragraphs, list items, product-card links.
- **Graphite** (#202021): product-page headings and tabs. Its cluster includes the search strip #2b2b2c.
- **Footer Ground** (#31302b): the footer band. Footer text and borders are #aeafb1.
- **Muted** (#636363) / **Subtle** (#999999): facet counts, meta, secondary links.
- **Mist** (#f2f3f3): the home "Adobe Commerce Resources" band and the product-page footer band (#f1f1ef). The card thumbnail well is #f8f8f8.
- **Rule** (#e0e0e0): card and filter borders. Inputs use #cccccc.

### Named Rules
**The Two Primaries Rule.** On product pages, blue (#0265dc) is the transactional primary ("Add to cart"). On the home page, orange (#eb5202) is the marketing primary ("Get started"). The site does not reconcile the two.

## Typography

**Display Font:** adobe-clean (with Source Sans 3, Helvetica Neue, Arial, sans-serif)
**Body Font:** adobe-clean (same stack)
**Label Font:** AdobeCleanBold / AdobeCleanMedium, loaded as separate families at nominal weight

**Character:** Adobe Clean is a humanist corporate sans. It is set small and plain: 14px body, 13–15px card text. Weight comes from switching to the Bold or Medium family file rather than from `font-weight`.

### Hierarchy
- **Display** (400, 36px, 39.6px): home section titles "Featured Categories" and "Adobe Commerce Resources".
- **Headline h2** (600, 30px, 33px): product-page "Key Features:" and policy section headings.
- **Page title h1** (400, 28px, 30.8–33.6px): listing, product and policy titles.
- **Title h3** (600, 20px, 22px): feature sub-heads. Card titles use 15px AdobeCleanBold, and footer column heads use 18px AdobeCleanBold in white.
- **Body** (400, 14px, 20px): paragraphs and facet items. Resource-card copy is 12.5px.
- **Label h4** (700, 13px, 17px): vendor line on product cards. Breadcrumbs are 12px.

Stray families: OpenSans (third-party review widget), RobotoRegular (price-filter "Go" button), and quoted "Adobe Clean" (Spectrum buttons on product pages).

## Layout

- The shell is capped at 1200px (`#maincontent` max-width, measured by cap-probe). The home page shell is fluid, with its 1200px cap applied per module.
- Listings use a 2-column layout: `#appstore-plp-facets` (250px) and `#livesearch-category-view` (870px). The card grid is 4-up at 1440 (`col-md-3 col-lg-3`), with 36 cards per page by default.
- Product pages use a 2-column top area: gallery (752px) and purchase panel. Below it, a CONTENTS side-nav sits beside a ~904–935px detail column.
- The home page stacks a 1160x348 carousel, a 6-tile icon row and a 4-card resources band on #f2f3f3.
- Spacing follows no single base unit. Observed paddings are 7, 10, 11, 12, 15, 16, 18, 25 and 30px, consistent with Luma's 10/15/20/30px habits.

## Elevation & Depth

The site is flat. Depth comes from tonal bands (dark search strip, grey resources band, dark footer) and 1px #e0e0e0 borders, not shadows. The only shadow and gradient in the census belong to the third-party Bazaarvoice Q&A button (`rgba(255, 255, 255, 0.2) 0px 1px 0px 0px inset` and a white 10% sheen).

## Shapes

Small, quiet corners:
- 4px is the default on cards, inputs, nav items and filter chips (389 elements).
- 3px on legacy Luma buttons and the "Go" button.
- 6px on small rating and quality chips.
- Pills appear only on Spectrum-style buttons: 20px on "Add to cart" and "Contact Vendor", 16px on "Learn more".
- 100% circles on footer social icons.
- Card tops use `4px 4px 0 0` where the thumbnail well meets the body.

## Components

### Buttons
- **Shape:** pill (20px) on product-page actions; square-ish 0–3px on legacy Luma and marketing buttons.
- **Primary (transactional):** #0265dc fill, white Adobe Clean text, padding 0 18px 0 16px. Hover is #0054b6.
- **Marketing:** #eb5202 fill and 1px border, white text, padding 12px 25px. Hover is #cc6127.
- **Secondary:** transparent with a 2px #d5d5d5 border and #222 text ("Contact Vendor"). On hover it fills #d5d5d5.
- **Learn more:** transparent pill (16px radius, 2px border), 10px padding.
- **Partner outline:** white with a 1px #f16321 border and orange AdobeCleanMedium text, 3px radius. On hover it turns orange with white text.

### Cards / Containers
- **Product card:** white, 1px #e0e0e0 border, 4px radius, #f8f8f8 thumbnail well. Contents: an optional Assurance Program badge, a 15px bold title, 13px vendor, a rule, star rating, partner-tier badge and price.
- **Resource card:** white bordered card on #f2f3f3, with a line icon, a 15px AdobeCleanBold title, 12.5px copy and a "Learn more" pill.

### Inputs / Fields
- **Search:** wide input in the dark strip, with placeholder "Search extensions, themes, and more...". The submit is a luma-icons search glyph.
- **Facets:** checkbox lists with grey counts (#999), price from/to inputs (1px #ccc) and a "Go" button.

### Navigation
- **Header:** sticky and white, 90px tall. Logo left; Extensions, Themes, Partners and Support in #505050; My Cart icon and Sign In on the right.
- **Breadcrumbs:** 12px, current item in #0469e3, home icon via luma-icons (`\E608`).
- **Footer:** 7 columns (Company, Merchants, Partners, Categories, Resources, Developer Resources, Get In Touch) on #31302b. The bottom row has the white logo, "Powered by Adobe Commerce 2.4.9", social circles and legal links.

### Product Purchase Panel (signature)
The panel stacks an Edition select, a store-version select, an installation-service checkbox and a grace-period note. Below them it shows "First year: $919.00 / year", "Then: $559.00 / year" and "TOTAL DUE TODAY", followed by "Add to cart" and "Contact Vendor".

## Do's and Don'ts

### Do:
- **Do** keep 4px as the default corner on cards, inputs and chips.
- **Do** keep chrome bands dark (#2b2b2c search strip, #31302b footer) against white content.
- **Do** use #0469e3 for links and transactional actions, and keep body copy at 14px/20px in #505050.
- **Do** keep Adobe Clean first in every stack, with Source Sans 3 as the open substitute.

### Don't:
- **Don't** add drop shadows or gradients. The only ones on the site belong to a third-party widget.
- **Don't** put the Adobe red (#eb1000) in UI chrome. It appears only in the logo.
