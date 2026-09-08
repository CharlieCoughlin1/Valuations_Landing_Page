# Valuation click-through coverage

This file maps the supplied Valuation Division brief to the test-page routes. The test build uses `?page=` routes because it is hosted as one Infogram/GitHub Pages asset; Sitecore should replace these with the clean `/valuation/...` URLs in the brief.

## Fully briefed Phase 1 pages

| Brief page | Test route | Intended Sitecore URL | Status |
|---|---|---|---|
| A — Valuation Division | `/` | `/valuation` | Built |
| B — Quality and Methodology | `?page=our-approach` | `/valuation/our-approach` | Built |
| C — Loan Security | `?page=loan-security` | `/valuation/loan-security` | Built |
| D — Residential and BTR | `?page=residential-btr` | `/valuation/sectors/residential-btr` | Built |
| E — Operational Real Estate | `?page=operational-real-estate` | `/valuation/specialisms/operational-real-estate` | Built |
| F — Financial Reporting | `?page=financial-reporting` | `/valuation/financial-reporting` | Built |
| G — Asset Valuation Services | `?page=asset-valuation-services` | `/valuation/specialisms/asset-valuation-services` | Built |

## Audience routes referenced but not briefed as Phase 1 pages

The brief says these client-journey pages are not in Phase 1 and originally asks for hub-page placeholders. The test build now provides concise gateway pages using only claims and routes supported by the brief.

| Audience | Test route | Intended Sitecore URL |
|---|---|---|
| Lenders and banks | `?page=for-lenders` | `/valuation/for/lenders` |
| Investors and funds | `?page=for-investors` | `/valuation/for/investors` |
| Corporates | `?page=for-corporates` | `/valuation/for/corporates` |
| Public sector and NHS | `?page=for-public-sector` | `/valuation/for/public-sector` |
| Operators and developers | `?page=for-operators` | `/valuation/for/operators` |

## Service routes without full page briefs

| Service | Test route | Status |
|---|---|---|
| LPA receivership | `?page=lpa-receivership` | Gateway built; links to LSH Property Restructuring |
| Development appraisal | `?page=development-appraisal` | Gateway built |
| Portfolio optimisation | `?page=portfolio-optimisation` | Gateway built |
| Charities Act | `?page=charities-act` | Gateway built |
| Auctions | `?page=auctions` | Gateway built; links to LSH Property Auctions |
| Expert Witness and Section 18 | `?page=expert-witness` | Gateway built with Jonathan Manley as the named specialist |

## Sector routes without full page briefs

Residential and BTR and Operational Real Estate have full Phase 1 pages. The other ten sector cards now open evidence-led gateway pages:

`commercial`, `industrial-logistics`, `retail`, `healthcare`, `education`, `land-development`, `transport-infrastructure`, `senior-living`, `student-accommodation`, and `mixed-use`.

## Supporting routes

| Route | Purpose |
|---|---|
| `?page=case-studies` | All nine instructions and values supplied in the brief |
| `?page=our-people` | National contacts and all named specialists from the brief |

## Information not contained in the brief

- The document says there are eight priority pages but defines only Pages A–G (seven pages).
- Full page copy is not supplied for the audience pages, six gateway service pages or ten gateway sector pages above; concise gateway content has therefore been used.
- The named loan-security page specialist is not identified. Nick Blackwell is named only for Property Restructuring/LPA receivership.
- Biographies, qualifications, photos and direct contact details are not supplied for the named specialists, except for the two national contacts already used on the hub.
- Client names are not included for the case studies. Every description, sector, value and client type that is supplied is shown.
- IG-01 and IG-04 embed codes have not been supplied. The test page uses polished native HTML equivalents.
- Final Sitecore form wiring, clean URLs and content-component setup require access to the Sitecore build.
