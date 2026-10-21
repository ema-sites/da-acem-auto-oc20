# Dynamic features — plan

| phase | deliverable | authoring contract | verification | owner decision | effort |
|---|---|---|---|---|---|
| D0 static | every feature degrades to its settled static state (listing cards as rows, gallery first image, reviews block as captured) | blocks per archetype | source-fidelity gate 1440/360 | — | in recreation |
| D1 chrome | header menus, minicart dropdown, mobile nav drawer rebuilt native (runtime) | nav/footer documents | chrome-compare + motion-compare | — | C0 foundation |
| D2 commerce link-out | Sign In, My Cart, Add to Cart, checkout link to https://commercemarketplace.adobe.com | links authored in nav/blocks | content-presence | backend for the new host | C0 |
| D3 search | helix-query.yaml + search results widget; header form → /search on the new host | widget, no authored rows | dynamics-check search-query (count over migrated corpus) | — | rollout D2 |
| D4 martech | scripts/martech.js from stardust/martech-contract.json, all parts disabled | martech-handoff.md | dynamics-check martech (no tag/CMP host requested by default) | owner enables OneTrust, GA4/GTM, Optimizely, Adobe tags | before deploy |
| D5 catalog feed | live listing data (Live Search / catalog service) | listing block reads feed for non-text fields | parity count | owner: catalog feed + scope of ~4,000 product pages | deferred |
