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
| Expert Witness and Section 18 | No link | Deliberately deferred by the brief until Jonathan Manley confirms capability and supplies profile content |

## Sector routes without full page briefs

Residential and BTR and Operational Real Estate have full Phase 1 pages. The other ten sector cards now open evidence-led gateway pages:

`commercial`, `industrial-logistics`, `retail`, `healthcare`, `education`, `land-development`, `transport-infrastructure`, `senior-living`, `student-accommodation`, and `mixed-use`.

## Supporting routes

| Route | Purpose |
|---|---|
| `?page=case-studies` | All nine anonymised instructions supplied in the brief |
| `?page=our-people` | National contacts and all named specialists from the brief |

## Information still required from the brief owner

- The document says there are eight priority pages but defines only Pages A–G (seven pages).
- Full briefs and approved copy are not supplied for the audience pages, five gateway service pages or ten gateway sector pages above.
- Expert Witness and Section 18 must not be built until Jonathan Manley confirms capability and supplies approved profile content.
- The named loan-security page specialist is not identified. Nick Blackwell is named only for Property Restructuring/LPA receivership.
- The financial-reporting specialist is not confirmed; Jennifer Dunn is only listed as a candidate.
- Approved biographies, qualifications, photos and direct contact details are missing for the named specialists, except for the two national contacts already used on the hub.
- The Lender Capability Pack, Public Sector Valuation Guide and Valuation Process Overview PDFs have not been supplied or signed off, so they remain clearly labelled as in preparation rather than acting as dead downloads.
- IG-01 and IG-04 embed codes have not been supplied. The test page uses polished native HTML equivalents pending the approved Infogram embeds.
- Final Sitecore form wiring, clean URLs and content-component setup require access to the Sitecore build.
- Compliance-sensitive claims and case-study identification remain subject to the approvals listed in the brief.
