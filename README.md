# LSH Valuation Landing Page

A responsive, iframe-ready Phase 1 prototype for Lambert Smith Hampton's national Valuation team.

## Live page

https://charliecoughlin1.github.io/Valuations_Landing_Page/

## Infogram embed

Use the embed presentation at:

https://charliecoughlin1.github.io/Valuations_Landing_Page/?embed=1

The embed view removes the standalone header and footer and reports its rendered height to the parent window using the `lsh-valuation-height` message.

## Phase 1 routes

The hub and six destination pages use one shared design system:

- `?page=our-approach`
- `?page=loan-security`
- `?page=residential-btr`
- `?page=operational-real-estate`
- `?page=financial-reporting`
- `?page=asset-valuation-services`

The hub also includes audience, supporting service, sector, team and case-study click-through routes. See [CLICKTHROUGH-COVERAGE.md](CLICKTHROUGH-COVERAGE.md) for the complete map and the items still awaiting content or approval.

Every linked hub card has a working route in this prototype. Where the brief references a destination without supplying a full page brief, the route is a concise gateway built only from approved source material. Expert Witness remains static because the brief explicitly defers that page. Downloads remain labelled as in preparation until approved files are available.

## Publishing

GitHub Pages deploys automatically from the root of the `main` branch. The hub is in `index.html`; shared subpage content and styles are in `phase1-pages.js` and `phase1-pages.css`.
