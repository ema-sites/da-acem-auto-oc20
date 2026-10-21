# Inconsistency register — commercemarketplace.adobe.com

The ONLY permitted design deltas. No audit was requested and no user items were supplied, so the register
holds only the licensing-forced font substitution; everything else is a pure replica.

## R-01 — Adobe Clean substituted by Source Sans 3 (licensing)

- **Evidence:** source self-hosts Adobe Clean woff2 (`static/…/fonts/AdobeClean/_woff2/*.woff2`, no CORS header);
  census families adobe-clean / AdobeCleanBold / AdobeCleanMedium (`stardust/current/_computed-styles.json` aggregate.type.families).
- **Finding:** proprietary Adobe typeface; replica policy forbids rehosting a licensed commercial face on the new domain.
- **Minimal change:** font stacks keep the brand families first (`adobe-clean`, `AdobeCleanBold`, `AdobeCleanMedium`) and fall back to
  self-hosted Source Sans 3 (OFL) at the same sizes/weights; no other typographic value changes. A licensed drop-in later wins without code change.
- **Status:** applied
- **Where:** every page type, all text (expected glyph-width residual in pixel and width probes).
