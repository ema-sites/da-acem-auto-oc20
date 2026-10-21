# Martech hand-off

Everything below is scaffolded **off**. To ship it, set `enabled: true` on `consent.cmp` and on each route in `stardust/martech-contract.json`, then re-run `deploy/scripts/martech-scaffold.mjs` and `dynamics/scripts/dynamics-check.mjs` to confirm the enabled tags load. Enabled tags load on `commercemarketplace.adobe.com` only; preview with `?martech=on` (add `&consent=accept` to grant every category).

## Consent

- **CMP:** OneTrust · `data-domain-script` = `3f974ff3-d476-4b4f-bf22-af36e8c54e80`
- **Model `owner-decision`:** no evidence of consent gating inside the tag manager. Keep the source behaviour (route `category` null), or set a route `category` to a consent group id to load that tag manager only once the group is granted.
- **Categories** (default rule set of 3 geo rule sets — the CMP applies them, nothing to port): `C0001` <span class="default-title" style="font-weight: bold;">Operate the site and core services</span><span class="mau-title" style="display: none; font-weight: bold;">Operate site and measure engagement</span> (always active) · `C0002` Measure performance (inactive) · `C0003` Extend functionality (inactive) · `C0004` Personalize advertising (inactive) · `C0005` Social Media cookies (inactive)

## Routes

No tag-manager loader seen on the probed pages.

Also seen, not routed (loaded by the tag manager or inline on the source — confirm each still fires): social proof: reviews widget · experimentation: A/B / personalisation.

## Rewrite before go-live

Nothing found (or no tag-manager library read).

## Data layer

The source pages expose `adobeDataLayer`, `dataLayer`; keep the same global names.
Ask the owner for the tagging plan (solution design reference): each event, its payload and the interaction that pushes it. With it, add each push in the block that owns the interaction.
