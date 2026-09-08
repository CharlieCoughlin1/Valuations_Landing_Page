(() => {
  const params = new URLSearchParams(location.search);
  const slug = params.get('page');
  if (!slug) return;

  const routes = {
    'our-approach': 'Our approach',
    'loan-security': 'Loan security',
    'residential-btr': 'Residential and BTR',
    'operational-real-estate': 'Operational real estate',
    'financial-reporting': 'Financial reporting',
    'asset-valuation-services': 'Asset valuation services',
    'for-lenders': 'For lenders and banks',
    'for-investors': 'For investors and funds',
    'for-corporates': 'For corporates',
    'for-public-sector': 'For public sector and NHS',
    'for-operators': 'For operators and developers',
    'lpa-receivership': 'LPA receivership',
    'development-appraisal': 'Development appraisal',
    'portfolio-optimisation': 'Portfolio optimisation',
    'charities-act': 'Charities Act valuations',
    'auctions': 'Auction valuations',
    'expert-witness': 'Expert Witness and Section 18',
    'commercial': 'Commercial valuations',
    'industrial-logistics': 'Industrial and logistics valuations',
    'retail': 'Retail valuations',
    'healthcare': 'Healthcare valuations',
    'education': 'Education valuations',
    'land-development': 'Land and development valuations',
    'transport-infrastructure': 'Transport and infrastructure valuations',
    'senior-living': 'Senior living valuations',
    'student-accommodation': 'Student accommodation valuations',
    'mixed-use': 'Mixed-use valuations',
    'case-studies': 'Valuation case studies',
    'our-people': 'Our valuation team'
  };
  if (!routes[slug]) return;

  const arrow = '<span class="arrow" aria-hidden="true"><span></span></span>';
  const diagonalArrow = '<span class="arrow arrow--diagonal" aria-hidden="true"><span></span></span>';
  const route = (page) => '?page=' + page;
  const pageLink = (page, label) => `<a href="${route(page)}">${label}</a>`;

  const heading = (label, title, kicker = '') => `
    <header class="page-section__heading">
      <div><p class="section-label">${label}</p>${kicker ? `<span class="section-kicker">${kicker}</span>` : ''}</div>
      <div><h2>${title}</h2></div>
    </header>`;

  const section = (id, label, title, content, options = {}) => `
    <section class="page-section${options.dark ? ' page-section--dark' : ''}${options.compact ? ' page-section--compact' : ''}" id="${id}" aria-labelledby="${id}-title" data-reveal="true">
      <header class="page-section__heading">
        <div><p class="section-label">${label}</p>${options.kicker ? `<span class="section-kicker">${options.kicker}</span>` : ''}</div>
        <div><h2 id="${id}-title">${title}</h2></div>
      </header>
      ${content}
    </section>`;

  const proofGrid = (items) => `<div class="proof-grid">${items.map(([value, label]) => `
    <article class="proof-card" data-reveal-item="true"><strong>${value}</strong><span>${label}</span></article>`).join('')}</div>`;

  const featureGrid = (items, columns = 3) => `<div class="feature-grid${columns === 2 ? ' feature-grid--two' : ''}${columns === 4 ? ' feature-grid--four' : ''}">${items.map((item, index) => {
    const tag = item.href ? 'a' : 'article';
    const href = item.href ? ` href="${item.href}"` : '';
    return `<${tag} class="feature-card"${href} data-reveal-item="true"><span class="feature-card__index">${String(index + 1).padStart(2, '0')}</span><h3>${item.title}</h3>${item.text ? `<p>${item.text}</p>` : ''}${item.href ? `<span class="text-link">Read more ${arrow}</span>` : ''}</${tag}>`;
  }).join('')}</div>`;

  const process = (steps) => `<div class="process-detail">${steps.map((item, index) => `
    <article class="process-step" data-reveal-item="true"><span>${String(index + 1).padStart(2, '0')}</span><h3>${item.title}</h3><p>${item.text}</p></article>`).join('')}</div>`;

  const assetList = (items) => `<ul class="asset-list">${items.map((item) => `<li data-reveal-item="true">${item}</li>`).join('')}</ul>`;

  const cases = (items) => `<div class="case-grid case-grid--subpage${items.length === 1 ? ' case-grid--one' : items.length === 2 ? ' case-grid--two' : ''}">${items.map((item, index) => `
    <article class="case-card" data-reveal-item="true">
      <div class="case-card__top"><span>${item.meta}</span><span>${String(index + 1).padStart(2, '0')}</span></div>
      <strong class="case-card__value">${item.value}</strong><h3>${item.title}</h3><p>${item.text}</p>
    </article>`).join('')}</div>`;

  const profiles = (items) => `<div class="profile-grid">${items.map((item) => `
    <article class="profile-card" data-reveal-item="true"><span class="profile-card__initials" aria-hidden="true">${item.initials}</span><h3>${item.name}</h3><p>${item.role}</p></article>`).join('')}</div>`;

  const faq = (items) => `
    <section class="faq" id="faq" aria-labelledby="faq-title" data-reveal="true">
      <div class="faq__intro"><p class="section-label">Frequently asked questions</p><h2 id="faq-title">Questions before you instruct.</h2><p>Clear answers on scope, standards and delivery.</p></div>
      <div class="faq-list">${items.map((item, index) => `<details data-reveal-item="true"><summary><span>${String(index + 1).padStart(2, '0')}</span><strong>${item[0]}</strong><i aria-hidden="true"></i></summary><p>${item[1]}</p></details>`).join('')}</div>
    </section>`;

  const related = (pages) => section('related', 'Continue exploring', 'Related valuation services.', `<div class="related-grid">${pages.map(([page, label]) => `<a href="${route(page)}"><span>Valuation</span>${label}${arrow}</a>`).join('')}</div>`, { compact: true });

  const contact = (title, text, specialist = '') => `
    <section class="contact" id="contact" aria-labelledby="contact-title" data-reveal="true">
      <div class="contact__lead"><p class="section-label">Start an instruction</p><h2 id="contact-title">${title}</h2><p>${text}</p>
        <button type="button" class="button button--light" aria-haspopup="dialog" aria-expanded="false" aria-controls="valuation-team-dialog" data-team-open="true">View valuation team ${diagonalArrow}</button>
        ${specialist ? `<p class="subpage-contact-note">Named page specialist: ${specialist}.</p>` : ''}
      </div>
      <form class="enquiry-form"><div class="form-row"><label>Name*<input autocomplete="name" required name="name"></label><label>Company<input autocomplete="organization" name="company"></label></div><div class="form-row"><label>Email*<input type="email" autocomplete="email" required name="email"></label><label>Telephone<input type="tel" autocomplete="tel" name="telephone"></label></div><label>Tell us about the instruction*<textarea name="message" rows="5" required></textarea></label><button class="button button--red" type="submit">Prepare enquiry ${arrow}</button><p class="form-note">This test page opens your email application. The final Sitecore page will use the standard contact form.</p></form>
    </section>`;

  const hero = (page) => `
    <header class="subpage-hero">
      <a class="subpage-back" href="./">Valuation overview</a>
      <div class="subpage-hero__layout">
        <div><p class="eyebrow">${page.label}</p><h1>${page.title}</h1><p class="subpage-hero__lede">${page.lede}</p><div class="subpage-hero__actions"><a class="button button--red" href="#contact">${page.cta} ${arrow}</a>${page.secondary || ''}</div></div>
        <aside class="subpage-hero__aside"><span>${page.asideLabel}</span><strong>${page.asideTitle}</strong><p>${page.asideText}</p></aside>
      </div>
    </header>`;

  const subnav = (items) => `<nav class="subpage-nav" aria-label="On this page">${items.map(([id, label]) => `<a href="#${id}">${label}</a>`).join('')}</nav>`;

  const commonSteps = [
    { title: 'Instruction and conflict check', text: 'We confirm the scope, purpose and parties, issue Terms of Engagement and complete a mandatory conflict check before valuation work begins. Each instruction receives a unique Tracker Number.' },
    { title: 'Site inspection', text: 'A named RICS Registered Valuer physically inspects the property on the basis required by the instruction. Every signatory valuer must have personally inspected the property.' },
    { title: 'Market research and data', text: 'The valuer reviews relevant comparable evidence, market trends and sector data, drawing on LSH transaction intelligence and specialist teams.' },
    { title: 'Valuation analysis', text: 'The appropriate RICS-recognised method and basis of value are applied to produce a formal, evidenced opinion of value.' },
    { title: 'Peer review', text: 'A qualified checker reviews every valuation. Instructions at £10m or above require an independent out-of-office second review; those at £20m or above require a third-level check.' },
    { title: 'Report and delivery', text: 'Following the required checks, the lead valuer issues the signed RICS Red Book compliant report with an auditable instruction history.' }
  ];

  const pageFactories = {
    'our-approach': () => {
      const page = {
        label: 'Quality and methodology',
        title: 'How we produce, review and deliver every valuation.',
        lede: 'Six structured steps. Mandatory peer review. RICS Red Book compliant. A process designed to produce a report that stands up to scrutiny.',
        cta: 'Speak to a valuation specialist',
        secondary: '',
        asideLabel: 'Quality control',
        asideTitle: 'Every report reviewed before issue.',
        asideText: 'Higher-value instructions receive additional independent checks under our three-tier review structure.'
      };
      const faqs = [
        ['What is the RICS Red Book?', 'The RICS Red Book, formally the RICS Valuation – Global Standards, governs how RICS Registered Valuers prepare and deliver valuation reports. Every LSH valuation report is prepared in accordance with it.'],
        ['What is peer review in property valuation?', 'Peer review is an independent check by a qualified colleague before issue. It is mandatory for every LSH valuation, with further checks at the £10m and £20m thresholds.'],
        ['How do you manage conflicts of interest?', 'Conflict checks are mandatory and are the personal responsibility of the assigned RICS Registered Valuer. The check is recorded in LSH’s compliance system; identified conflicts are referred to the Head of Valuation before work proceeds.'],
        ['Can a third party rely on an LSH valuation report?', 'Reports are addressed to the instructing client. A reliance letter may be issued on request, subject to the original Terms of Engagement and approval by the lead valuer and Head of Valuation.'],
        ['Do your valuers physically inspect every property?', 'Yes. A named RICS Registered Valuer physically inspects every property, and every signatory valuer must have personally inspected the property being valued.'],
        ['How is my instruction tracked and recorded?', 'Every instruction receives a unique Tracker Number. The record covers the client, property, purpose, lead valuer, checker, instruction date and delivery date.']
      ];
      return hero(page) + subnav([['process','Process'],['compliance','Compliance'],['checking','Peer review'],['governance','Governance'],['faq','FAQs'],['contact','Contact']]) +
        section('process', 'Our valuation process', 'Six documented steps from instruction to delivery.', `<div class="page-copy"><p>Every LSH valuation follows the same structured process. It protects the valuer’s independence, meets RICS Red Book requirements and creates a clear audit trail from receipt to final report.</p></div>${process(commonSteps)}`) +
        section('compliance', 'RICS Red Book', 'A clear basis, purpose and opinion of value.', `<div class="page-copy"><p>Every report is prepared in accordance with the RICS Valuation – Global Standards. It records the valuation date, purpose, basis of value, assumptions and special assumptions, and is signed by a named RICS Registered Valuer.</p><p>RICS Red Book compliance is the baseline applied across instruction types, asset classes and values.</p></div>`) +
        section('checking', 'Peer review', 'Our three-tier checking structure.', `${proofGrid([['Every report','First-level check by a qualified checker'],['£10m+','Independent out-of-office second review'],['£20m+','Permitted third-level checker']])}<div class="page-copy"><p>Checker rotation is mandatory, and the Valuation Compliance Officer audits checking records quarterly.</p></div>`, { dark: true }) +
        section('conflicts', 'Independence', 'Conflict checks before work begins.', `<div class="page-copy"><p>We check the client, borrower or customer, known connected parties, vendor or purchaser and relevant tenants. The assigned valuer is personally responsible for the check and cannot delegate it.</p></div>`) +
        section('reliance', 'Third-party reliance', 'Reliance letters on agreed terms.', `<div class="page-copy"><p>Where a lender, investor or auditor needs to rely on a report addressed to another party, a reliance letter can be considered. It remains subject to the original Terms of Engagement and approval by the lead valuer and Head of Valuation.</p><a class="text-link" href="#contact">Discuss reliance on a report ${arrow}</a></div>`) +
        section('governance', 'Data governance', 'A complete instruction record.', `<div class="page-copy"><p>Each instruction is recorded in the Valuation Data and Delivery Tracker with a unique Tracker Number and Ebis Number. The record covers the instruction, client, property, purpose, lead valuer, checker and report delivery date.</p><p>Instruction data is held under LSH data governance policies and applicable data protection legislation.</p></div>`) +
        faq(faqs) + related([['loan-security','Loan security'],['financial-reporting','Financial reporting'],['asset-valuation-services','Asset valuation services']]) +
        contact('Speak to a valuation specialist.', 'Tell us about the instruction and the level of reliance or review you need.', 'Rachel Leggett — Valuation Compliance Officer');
    },

    'loan-security': () => {
      const page = {
        label: 'Loan security valuations',
        title: 'Loan security valuations for lenders.',
        lede: 'Panel-approved. RICS Red Book compliant. More than 3,200 loan security instructions across 2024 to 2026, with every report peer reviewed before delivery.',
        cta: 'Speak to a loan security specialist',
        secondary: `<a class="text-link text-link--light" href="${route('our-approach')}">Read about our process ${arrow}</a>`,
        asideLabel: 'Lender assurance',
        asideTitle: 'Built around lending decisions.',
        asideText: 'Direct asset experience, mandatory peer review and an auditable route from instruction to report.'
      };
      const sectorRoutes = {
        'Residential and BTR': 'residential-btr',
        'Offices': 'commercial',
        'Retail': 'retail',
        'Industrial and logistics': 'industrial-logistics',
        'Operational real estate': 'operational-real-estate',
        'Healthcare': 'healthcare',
        'Land and development': 'land-development',
        'Mixed use': 'mixed-use'
      };
      const sectors = Object.entries(sectorRoutes).map(([title, page]) => ({ title, text: title === 'Operational real estate' ? 'Hotels, pubs, leisure and other trading assets.' : 'Loan security valuation by a valuer with relevant sector and market experience.', href: route(page) }));
      const faqs = [
        ['Are you on lender panels?', 'Yes. LSH is panel-approved for major UK lenders and instructed through VAS Group, CVN, Method and Appraisers UK. Existing users of those platforms can instruct through their normal workflow.'],
        ['What types of property do you value for loan security?', 'We cover every major commercial and specialist property type, including offices, retail, industrial and logistics, residential and BTR, trading assets, healthcare, development land and mixed-use property.'],
        ['Is the valuation RICS Red Book compliant?', 'Yes. Every LSH loan security valuation follows the RICS Valuation – Global Standards, is signed by a named RICS Registered Valuer and is peer reviewed before delivery.'],
        ['How do you handle large or complex instructions?', 'Instructions at £10m or above receive an independent out-of-office second review and those at £20m or above receive a third-level check. Our 17-office network coordinates multi-asset, multi-region portfolios.'],
        ['Can you provide LPA receivership valuations?', 'Yes. The Property Restructuring team, led by Nick Blackwell, advises lenders and insolvency practitioners on LPA receivership valuations and related property strategy.']
      ];
      return hero(page) + subnav([['credentials','Credentials'],['panels','Panel managers'],['sectors','Sectors'],['process','Process'],['experience','Experience'],['faq','FAQs'],['contact','Contact']]) +
        section('credentials', 'Our credentials', 'Loan security is at the core of our practice.', `<div class="page-copy"><p>More than 60% of our instructions are for banks, building societies and specialist lenders. Named RICS Registered Valuers with direct asset and market experience prepare each report, with mandatory peer review before delivery.</p><p>Instructions range from single residential units to major commercial and specialist portfolios.</p></div>${proofGrid([['3,200+','Loan security instructions across 2024 to 2026'],['60%+','Of valuation instructions for lenders'],['330+','Instructions at £10m or above']])}`) +
        section('panels', 'Panel management', 'Instructed through leading platforms.', `<div class="page-copy"><p>LSH is panel-approved for major UK lenders and instructed through VAS Group, CVN, Method and Appraisers UK. Lenders using these platforms can instruct through their existing workflow.</p><p>Contact us if you are considering LSH as a new panel valuer.</p></div><div class="panel-strip" aria-label="Valuation panel management platforms"><span>VAS Group</span><span>CVN</span><span>Method</span><span>Appraisers UK</span></div>`, { dark: true }) +
        section('sectors', 'Sectors we cover', 'Commercial, residential and specialist assets.', `<div class="page-copy"><p>We match each instruction with a valuer who understands the asset class and its local market.</p></div>${featureGrid(sectors, 4)}`) +
        section('process', 'Loan security process', 'Five points lenders need to know.', process([commonSteps[0], commonSteps[1], commonSteps[3], commonSteps[4], commonSteps[5]]) + `<div class="page-copy"><a class="text-link" href="${route('our-approach')}">Read the full valuation process ${arrow}</a></div>`) +
        section('experience', 'Recent instructions', 'Loan security work across specialist assets.', cases([
          { meta: 'Operational real estate · Leisure', value: '£93m', title: 'Major London leisure complex', text: 'Loan security valuation of a combined casino and cinema venue for a major UK bank.' },
          { meta: 'Industrial and logistics', value: '£41m–£152m', title: 'Major UK logistics portfolio', text: 'Four large distribution centres valued as part of a national loan security instruction.' }
        ])) +
        faq(faqs) + related([['our-approach','Our valuation process'],['operational-real-estate','Operational real estate'],['residential-btr','Residential and BTR']]) +
        contact('Submit a loan security instruction.', 'Tell us about the property, loan purpose and timing. We will route the enquiry to the right valuer.', 'Nick Blackwell — Property Restructuring / LPA Receivership');
    },

    'residential-btr': () => {
      const page = {
        label: 'Residential and BTR',
        title: 'Residential and BTR valuations.',
        lede: 'More than 1,500 residential instructions across major UK cities, supported by the proprietary transaction data available through the Connells Group network.',
        cta: 'Speak to a residential specialist',
        secondary: `<a class="text-link text-link--light" href="${route('our-approach')}">Read about our process ${arrow}</a>`,
        asideLabel: 'Residential evidence',
        asideTitle: 'Current market data, applied locally.',
        asideText: 'Valuers in 17 offices combine national reach with direct local market knowledge.'
      };
      const faqs = [
        ['What residential asset types do you value?', 'Single units, blocks of flats, HMOs, BTR schemes, PBSA, development land, investment portfolios, affordable housing and senior living.'],
        ['What data do you use?', 'LSH valuers draw on proprietary residential transaction evidence available through the Connells Group agency network, alongside published data and local market research.'],
        ['Do you carry out BTR valuations?', 'Yes. We value BTR schemes and portfolios for loan security, financial reporting and internal management across London, Birmingham, Bristol, Manchester and other major UK cities.'],
        ['Can you value residential portfolios?', 'Yes. We coordinate portfolios of all sizes and across several locations. The wider practice has handled single instructions covering more than 800 properties.']
      ];
      const assets = ['Single residential units and houses','Blocks of flats and apartment buildings','HMOs','BTR schemes and portfolios','Purpose-built student accommodation','Residential development land and sites','Large residential investment portfolios','Affordable housing and shared ownership','Senior living and retirement housing'];
      return hero(page) + subnav([['credentials','Credentials'],['data','Connells data'],['assets','Asset types'],['specialists','Specialists'],['experience','Experience'],['faq','FAQs'],['contact','Contact']]) +
        section('credentials', 'Residential credentials', 'A national practice with local market knowledge.', `<div class="page-copy"><p>LSH has completed more than 1,500 residential valuation instructions across 2024 to 2026, covering single assets, apartment blocks, HMOs, BTR schemes, development land and large portfolios.</p><p>Teams in London, Birmingham, Bristol, Manchester, Cambridge and 12 further locations can coordinate national instructions while keeping local evidence at the centre of the valuation.</p></div>${proofGrid([['1,500+','Residential valuation instructions'],['5','Major UK cities highlighted in the brief'],['£10bn+','Combined reported asset value']])}`) +
        section('data', 'Market evidence', 'The Connells Group data advantage.', `<div class="page-copy"><p>As part of the Connells Group, LSH valuers can access proprietary transaction data from one of the UK’s largest estate agency networks. This adds current comparable evidence from active residential transactions to our local market research.</p><p>For lenders, investors and developers, that evidence helps the valuation reflect current conditions rather than relying only on published data that may lag the market.</p></div>`, { dark: true }) +
        section('assets', 'Asset types', 'Residential property across the lifecycle.', assetList(assets)) +
        section('specialists', 'Residential specialists', 'Named expertise for London and national instructions.', profiles([
          { initials: 'JB', name: 'James Beale', role: 'London Residential' },
          { initials: 'MR', name: 'Matt Rothery', role: 'London Residential Development' },
          { initials: 'EB', name: 'Ed Boulton', role: 'London Residential Investment' }
        ])) +
        section('experience', 'Recent instruction', 'Financial reporting for residential property.', cases([{ meta: 'Regulated purpose valuation', value: '£52.35m', title: 'Large residential apartment complex', text: 'Valuation prepared for company accounts purposes.' }])) +
        faq(faqs) + related([['loan-security','Loan security'],['financial-reporting','Financial reporting'],['our-approach','Our valuation process']]) +
        contact('Submit a residential instruction.', 'Tell us about the asset or portfolio, location, purpose and timing.', 'James Beale, Matt Rothery and Ed Boulton');
    },

    'operational-real-estate': () => {
      const page = {
        label: 'Operational real estate',
        title: 'Valuations for trading assets.',
        lede: 'More than 600 instructions across hotels, pubs, leisure facilities, care homes and other operating businesses, with valuation and advisory expertise in one team.',
        cta: 'Speak to Ken Hogg',
        secondary: `<a class="text-link text-link--light" href="${route('our-approach')}">Read about our process ${arrow}</a>`,
        asideLabel: 'Integrated capability',
        asideTitle: 'Valuation and transaction advice in one team.',
        asideText: 'For operators, investors and lenders working with specialist trading property.'
      };
      const faqs = [
        ['What is the profits method of valuation?', 'It is used where property value depends on the trading potential of the business. The valuer analyses operator accounts, sector benchmarks and maintainable trading performance under relevant scenarios.'],
        ['Do you value hotels and leisure assets for loan security?', 'Yes. More than 76% of operational real estate instructions are for loan security, including hotel, leisure and healthcare assets.'],
        ['Can you advise on acquisitions and disposals?', 'Yes. The team combines valuation with M&A advice, portfolio optimisation and transaction advisory for acquisitions, disposals and restructuring.'],
        ['Do you carry out self storage valuations?', 'Yes. Phil Macauley leads the self storage practice, covering loan security, regulated purpose valuations and acquisition advice across the UK.']
      ];
      const sectors = ['Hotels and serviced apartments','Pubs, bars and licensed premises','Restaurants and food and beverage outlets','Leisure centres, gyms and health clubs','Visitor attractions and entertainment venues','Caravan and holiday parks','Golf clubs and golf courses','Care and nursing homes','Dental surgeries and pharmacies','Healthcare facilities and medical centres'];
      return hero(page) + subnav([['credentials','Credentials'],['services','Integrated service'],['sectors','Asset types'],['storage','Self storage'],['approach','Valuation approach'],['experience','Experience'],['faq','FAQs'],['contact','Contact']]) +
        section('credentials', 'Our credentials', 'Direct experience across the trading sectors.', `<div class="page-copy"><p>Our work spans hotels, licensed premises, restaurants, leisure, visitor attractions, holiday parks, care homes and healthcare — from single operating units to national portfolios.</p><p>More than 76% of these instructions are for loan security.</p></div>${proofGrid([['600+','Operational real estate instructions'],['£1.97bn','Combined reported asset value'],['76%','Loan security instructions']])}`) +
        section('services', 'An integrated service', 'Advice beyond the valuation report.', `<div class="page-copy"><p>Operators, investors and lenders can draw on one team for the valuation itself and the decisions that follow.</p></div>${featureGrid([
          { title: 'Valuation', text: 'Evidenced opinions of value for lending, reporting and transactions.' },
          { title: 'M&A advice', text: 'Commercial advice for business and asset acquisitions or disposals.' },
          { title: 'Portfolio optimisation', text: 'Valuation-led review of performance, risk and opportunity.' },
          { title: 'Transaction advisory', text: 'Support through the assessment and execution of a transaction.' }
        ], 4)}`, { dark: true }) +
        section('sectors', 'Sectors and assets', 'Trading property across the UK.', assetList(sectors)) +
        section('storage', 'Self storage', 'Specialist valuation with wider property insight.', `<div class="page-copy"><p>Self storage calls for an understanding of operating performance, local demand, development and investment markets. Our capability connects valuation with industrial and logistics agency, development and capital markets advice.</p><p>Phil Macauley leads the practice and advises operators, investors and lenders on loan security, financial reporting and acquisitions.</p><a class="text-link" href="#specialists">View the specialist team ${arrow}</a></div>`) +
        section('approach', 'Trading asset valuation', 'A method built around operating performance.', `<div class="page-copy"><p>Where standard investment or comparable approaches do not capture the risks of a trading asset, the team applies the profits method. This considers operator accounts, sector benchmarks and maintainable trading potential.</p><p>Every valuation is subject to peer review, with a second independent check required at £10m or above.</p><a class="text-link" href="${route('our-approach')}">Read the full valuation process ${arrow}</a></div>`) +
        section('experience', 'Recent instructions', 'Operational property in practice.', cases([
          { meta: 'Loan security · Leisure', value: '£93m', title: 'Major London leisure complex', text: 'A combined casino and cinema venue valued for a major UK bank.' },
          { meta: 'Regulated purpose valuation · Hotel', value: 'Annual', title: 'Branded hotel valuation', text: 'An annual financial reporting valuation for a major international financial institution.' }
        ])) +
        section('specialists', 'Specialists', 'Operational real estate and self storage.', profiles([
          { initials: 'KH', name: 'Ken Hogg', role: 'Operational Real Estate' },
          { initials: 'PM', name: 'Phil Macauley', role: 'Self Storage' }
        ])) +
        faq(faqs) + related([['loan-security','Loan security'],['financial-reporting','Financial reporting'],['our-approach','Our valuation process']]) +
        contact('Submit an operational real estate instruction.', 'Tell us about the trading asset, the purpose of the valuation and your timing.', 'Ken Hogg — Operational Real Estate; Phil Macauley — Self Storage');
    },

    'financial-reporting': () => {
      const page = {
        label: 'Financial reporting',
        title: 'Financial reporting valuations.',
        lede: 'Audit-ready, RICS Red Book compliant valuations for company accounts under IFRS and UK GAAP, with named valuers and mandatory peer review.',
        cta: 'Speak to a valuation specialist',
        secondary: `<a class="text-link text-link--light" href="${route('our-approach')}">Read about our process ${arrow}</a>`,
        asideLabel: 'Audit assurance',
        asideTitle: 'Clear evidence. Independent review.',
        asideText: 'Designed for the scrutiny of external auditors, finance teams and audit committees.'
      };
      const faqs = [
        ['What is a Regulated Purpose Valuation?', 'An RPV is prepared for a regulated purpose such as company accounts, a prospectus or a filing. Every LSH RPV is RICS Red Book compliant and peer reviewed before delivery.'],
        ['Which accounting standards do you work to?', 'The practice prepares valuations under IAS16, IFRS16 and UK GAAP requirements, subject to the agreed instruction scope and applicable reporting basis.'],
        ['Can you value assets for a REIT or fund prospectus?', 'Yes. The team has experience preparing valuations for REIT and fund prospectuses, annual reports and financial statements.'],
        ['How do you make the valuation defensible for audit?', 'Every report is peer reviewed and carries a complete audit trail. Instructions at £10m or above require a second independent review, with a third-level check at £20m or above.']
      ];
      const sectorCards = [
        { title: 'Commercial', text: 'Offices, retail, industrial and logistics.', href: route('commercial') },
        { title: 'Residential and BTR', text: 'Single assets, schemes and portfolios.', href: route('residential-btr') },
        { title: 'Operational real estate', text: 'Hotels and other trading property.', href: route('operational-real-estate') },
        { title: 'Public sector and NHS', text: 'Asset registers and specialist public assets.', href: route('asset-valuation-services') },
        { title: 'Industrial and logistics', text: 'Warehousing, distribution and production property.', href: route('industrial-logistics') }
      ];
      return hero(page) + subnav([['service','Service'],['why','Why LSH'],['sectors','Sectors'],['experience','Experience'],['insights','Insights'],['faq','FAQs'],['contact','Contact']]) +
        section('service', 'Service overview', 'Valuations prepared for reporting and audit.', `<div class="page-copy"><p>We carry out Regulated Purpose Valuations for company accounts under IFRS and UK GAAP, including IAS16 and IFRS16 instructions for listed companies, REITs, investment funds and public sector bodies.</p><p>Each report is prepared by a named RICS Registered Valuer, checked before issue and structured to give auditors and audit committees a clear, evidenced opinion of value.</p><p>LSH completed 198 Regulated Purpose Valuation and company accounts instructions across 2024 to 2026.</p></div>`) +
        section('why', 'Why LSH', 'Three foundations for an audit-ready report.', featureGrid([
          { title: 'RICS Red Book compliant', text: 'Every report follows the RICS Valuation – Global Standards.' },
          { title: 'Mandatory peer review', text: 'A qualified checker reviews every valuation before issue.' },
          { title: 'National coverage', text: 'Teams in 17 offices cover England, Wales, Scotland and Northern Ireland.' }
        ]), { dark: true }) +
        section('sectors', 'Related sectors', 'Valuation across property types.', featureGrid(sectorCards)) +
        section('specialist', 'Named specialist', 'Commercial reporting expertise.', profiles([{ initials: 'JD', name: 'Jennifer Dunn', role: 'London Commercial' }])) +
        section('experience', 'Recent instructions', 'Financial reporting work across sectors.', cases([
          { meta: 'Residential', value: '£52.35m', title: 'Large apartment complex', text: 'Regulated Purpose Valuation for company accounts.' },
          { meta: 'Cambridge · Mixed use', value: '£23.7m', title: 'Office and retail development', text: 'Regulated Purpose Valuation for company accounts.' },
          { meta: 'Infrastructure', value: '£505m', title: 'Major port authority', text: 'Regulated Purpose Valuation for company accounts.' }
        ])) +
        section('insights', 'Related insights', 'Research and guidance from LSH.', `<div class="insight-list">
          <a href="https://www.lsh.co.uk/explore/research-and-views/view-points/2023/october/rics-red-book-update-10-things-you-need-to-know" target="_blank" rel="noopener noreferrer"><span class="insight-list__index">01</span><span class="insight-list__meta">Valuation guidance<small>October 2023</small></span><strong>RICS Red Book update: 10 things you need to know</strong><span class="insight-list__arrow">${diagonalArrow}</span></a>
          <a href="https://www.lsh.co.uk/explore/research-and-views/view-points/2023/october/the-impact-on-capital-accounting-valuations-of-local-authority-property-assets" target="_blank" rel="noopener noreferrer"><span class="insight-list__index">02</span><span class="insight-list__meta">Public sector valuation<small>October 2023</small></span><strong>IFRS 16 and local authority property asset valuations</strong><span class="insight-list__arrow">${diagonalArrow}</span></a>
        </div>`) +
        faq(faqs) + related([['our-approach','Our valuation process'],['residential-btr','Residential and BTR'],['asset-valuation-services','Asset valuation services']]) +
        contact('Speak to a reporting valuation specialist.', 'Tell us about the reporting basis, asset or portfolio and your audit timetable.', 'Jennifer Dunn — London Commercial');
    },

    'asset-valuation-services': () => {
      const page = {
        label: 'Asset valuation services',
        title: 'Asset register valuations for public bodies.',
        lede: 'More than 900 public sector instructions, including portfolios of 870, 555 and 512 assets. Structured for audit timetables and RICS Red Book requirements.',
        cta: 'Speak to Jaspreet Rahi',
        secondary: `<a class="text-link text-link--light" href="${route('our-approach')}">Read about our process ${arrow}</a>`,
        asideLabel: 'Public sector delivery',
        asideTitle: 'Large, varied estates valued consistently.',
        asideText: 'A structured asset model, named valuers and a complete audit trail across every portfolio.'
      };
      const faqs = [
        ['Can you handle large asset register valuations?', 'Yes. Recent portfolio instructions include 870, 555 and 512 individual properties. The 17-office network can coordinate several asset types and regions within public sector audit timetables.'],
        ['Are your valuations IAS16 and IFRS16 compliant?', 'Yes. Public sector asset register valuations are prepared for IAS16 and IFRS16 requirements, using the appropriate RICS-recognised basis for each asset.'],
        ['Do you carry out NHS asset valuations?', 'Yes. Asset Valuation Services advises NHS bodies on asset registers, IAS16 reporting and regulated purpose valuations. Jaspreet Rahi is the named specialist in the brief.'],
        ['How do you ensure quality?', 'Each instruction follows the six-step process, and every valuation is checked by a qualified peer before issue. The report retains a complete audit trail from instruction to delivery.']
      ];
      const assets = ['Civic offices and administrative buildings','Operational depots and maintenance facilities','Community centres and leisure facilities','Parks, open spaces and amenity land','Housing stock and residential properties','Schools, colleges and universities','Hospitals, clinics and GP surgeries','Roads, bridges and car parks','Development land and surplus assets','Specialist assets valued on a DRC basis'];
      return hero(page) + subnav([['credentials','Credentials'],['model','Asset model'],['process','Process'],['assets','Asset types'],['experience','Experience'],['specialist','Specialist'],['faq','FAQs'],['contact','Contact']]) +
        section('credentials', 'Public sector credentials', 'Scale, structure and national reach.', `<div class="page-copy"><p>LSH has completed more than 900 instructions for public sector bodies, local authorities and government agencies across 2024 to 2026, including asset registers and financial reporting valuations.</p><p>Teams across 17 UK offices coordinate large portfolios and apply consistent quality controls.</p></div>${proofGrid([['900+','Public sector valuation instructions'],['870','Assets in the largest cited portfolio'],['IAS16 / IFRS16','Reporting requirements addressed by the service']])}`) +
        section('model', 'The LSH asset model', 'The right basis of value for each asset.', `<div class="page-copy"><p>The model is designed for consistent, auditable delivery across large portfolios. It applies Existing Use Value to operational assets, Market Value to surplus and investment assets, and Depreciated Replacement Cost to specialist assets without an active market.</p><p>Every valuation is prepared by a named RICS Registered Valuer and checked before issue. The model is designed around IAS16, IFRS16 and the CIPFA Code of Practice on Local Authority Accounting.</p></div>`, { dark: true }) +
        section('process', 'Our six-step approach', 'A complete route from instruction to delivery.', process(commonSteps) + `<div class="page-copy"><a class="text-link" href="${route('our-approach')}">Read the full valuation process ${arrow}</a></div>`) +
        section('assets', 'Asset types', 'Public estates in all their variety.', assetList(assets)) +
        section('experience', 'Recent instructions', 'Large portfolio delivery.', cases([
          { meta: 'Public sector · London', value: '870', title: 'Property asset register', text: 'A coordinated valuation across a diverse London borough estate.' },
          { meta: 'Public sector · London', value: '555', title: 'Property asset register', text: 'A second major local authority portfolio delivered for financial reporting.' }
        ])) +
        section('specialist', 'Named specialist', 'Asset Valuation Services leadership.', profiles([{ initials: 'JR', name: 'Jaspreet Rahi', role: 'Asset Valuation Services / NHS and Public Sector' }])) +
        faq(faqs) + related([['our-approach','Our valuation process'],['financial-reporting','Financial reporting'],['loan-security','Loan security']]) +
        contact('Submit a public sector instruction.', 'Tell us about the estate, reporting requirement and delivery timetable.', 'Jaspreet Rahi — Asset Valuation Services');
    }
  };

  const gatewayPages = {
    'for-lenders': {
      kind: 'Who we help', label: 'For lenders and banks', title: 'Valuation support for lending decisions.',
      lede: 'A direct route to loan security, specialist trading-asset valuation and property restructuring advice.',
      overview: 'LSH values single assets and national portfolios for banks, building societies and specialist lenders. More than 60% of valuation instructions are lender-led, and every report is prepared by a named RICS Registered Valuer and checked before issue.',
      scope: ['Loan security valuations across major property sectors', 'Large and multi-region portfolio instructions', 'Operational real estate and other specialist trading assets', 'LPA receivership valuation and property strategy'],
      related: ['loan-security', 'operational-real-estate', 'lpa-receivership'],
      contact: 'Discuss a lending instruction.'
    },
    'for-investors': {
      kind: 'Who we help', label: 'For investors and funds', title: 'Evidence for investment and reporting decisions.',
      lede: 'Independent valuation for acquisitions, financial reporting, portfolio review and specialist assets.',
      overview: 'Our national team supports investors and funds with evidence-led valuations for decision-making, governance and reporting. Instructions are matched to valuers with relevant sector and local market experience.',
      scope: ['Acquisition and portfolio review', 'Regulated purpose valuations for accounts', 'Residential and BTR portfolios', 'Operational real estate and trading assets'],
      related: ['financial-reporting', 'residential-btr', 'operational-real-estate', 'portfolio-optimisation'],
      contact: 'Discuss an investment valuation.'
    },
    'for-corporates': {
      kind: 'Who we help', label: 'For corporates', title: 'Valuation for accounts and governance.',
      lede: 'Audit-ready opinions of value for financial reporting, property decisions and portfolio oversight.',
      overview: 'LSH prepares RICS Red Book compliant valuations for company accounts under IFRS and UK GAAP. Every report is prepared by a named valuer, independently reviewed and supported by a complete instruction record.',
      scope: ['Regulated purpose valuations', 'IAS16 and IFRS16 reporting requirements', 'Commercial, residential and specialist assets', 'Portfolio valuation and optimisation'],
      related: ['financial-reporting', 'commercial', 'portfolio-optimisation'],
      contact: 'Discuss a corporate valuation.'
    },
    'for-public-sector': {
      kind: 'Who we help', label: 'For public sector and NHS', title: 'Auditable valuation across public estates.',
      lede: 'Structured asset register and financial reporting programmes for NHS bodies, local authorities and government agencies.',
      overview: 'LSH has completed more than 900 public sector instructions, including portfolios of 870, 555 and 512 assets. The practice coordinates large, varied estates across 17 UK offices within public sector audit timetables.',
      scope: ['Asset register valuations', 'IAS16 and IFRS16 reporting requirements', 'Existing Use Value, Market Value and DRC', 'Large multi-asset portfolio delivery'],
      related: ['asset-valuation-services', 'financial-reporting', 'our-approach'],
      contact: 'Discuss a public sector instruction.'
    },
    'for-operators': {
      kind: 'Who we help', label: 'For operators and developers', title: 'Valuation for operating assets and development.',
      lede: 'Specialist advice for trading property, development sites and property-led business decisions.',
      overview: 'Our teams value operational businesses, development sites and mixed portfolios for lending, reporting and transactions. Each instruction is led by a valuer with relevant asset and market experience.',
      scope: ['Operational real estate and trading assets', 'Development appraisal and residual valuation', 'Loan security and financial reporting', 'Portfolio and transaction advice'],
      related: ['operational-real-estate', 'development-appraisal', 'loan-security', 'financial-reporting'],
      contact: 'Discuss an operational or development instruction.'
    },
    'lpa-receivership': {
      kind: 'Valuation service', label: 'LPA receivership', title: 'Valuation and strategy for distressed property.',
      lede: 'Evidence-led advice for lenders and insolvency practitioners, connected to LSH Property Restructuring.',
      overview: 'The Property Restructuring team provides valuation and property strategy for lenders and insolvency practitioners. Nick Blackwell leads this area of the service.',
      scope: ['LPA receivership valuations', 'Single assets and mixed portfolios', 'Property strategy for lenders', 'Coordination with restructuring and agency teams'],
      related: ['loan-security', 'our-approach'],
      contact: 'Discuss an LPA receivership instruction.',
      specialist: 'Nick Blackwell — Property Restructuring / LPA Receivership',
      external: ['https://www.lsh.co.uk/explore/services/asset-and-debt-advisory', 'Explore LSH Property Restructuring']
    },
    'development-appraisal': {
      kind: 'Valuation service', label: 'Development appraisal', title: 'Market-tested development appraisal.',
      lede: 'Evidence for land, site viability and development value decisions.',
      overview: 'For development land and sites, the valuer applies the appropriate RICS-recognised approach, including the residual method where relevant, using current market evidence and agreed assumptions.',
      scope: ['Development land and sites', 'Residual valuation', 'Loan security instructions', 'Evidence for viability and property decisions'],
      related: ['land-development', 'loan-security', 'residential-btr', 'our-approach'],
      contact: 'Discuss a development appraisal.'
    },
    'portfolio-optimisation': {
      kind: 'Valuation service', label: 'Portfolio optimisation', title: 'Valuation-led portfolio review.',
      lede: 'Clear evidence to identify property risk, opportunity and practical next actions.',
      overview: 'LSH combines asset-level valuation evidence with sector and local market knowledge to support portfolio review. Where an instruction spans several regions, one national team coordinates delivery across the office network.',
      scope: ['Asset-level valuation evidence', 'Multi-property portfolio coordination', 'Risk and opportunity review', 'Connections to transaction and sector specialists'],
      related: ['for-investors', 'operational-real-estate', 'financial-reporting'],
      contact: 'Discuss a portfolio review.'
    },
    'charities-act': {
      kind: 'Valuation service', label: 'Charities Act', title: 'Qualified valuation advice for charities.',
      lede: 'Independent property valuation for charity acquisitions and disposals.',
      overview: 'LSH provides independent valuation advice for charity property acquisitions and disposals, routing each instruction to a suitably qualified specialist once the asset, transaction and reporting requirements are agreed.',
      scope: ['Property acquisitions', 'Property disposals', 'Independent valuation advice', 'Named RICS Registered Valuer'],
      related: ['commercial', 'land-development', 'our-approach'],
      contact: 'Discuss a Charities Act valuation.'
    },
    'auctions': {
      kind: 'Valuation service', label: 'Auctions', title: 'Valuation insight for auction decisions.',
      lede: 'Market-facing advice supported by LSH’s national property auctions team.',
      overview: 'Auction instructions draw on valuation evidence, current buyer demand and LSH’s wider disposal experience. The detailed auctions service remains on the main LSH website.',
      scope: ['Commercial and residential property', 'Pre-sale valuation insight', 'Connection to the national auctions team', 'Clear route from valuation to disposal advice'],
      related: ['commercial', 'residential-btr', 'our-approach'],
      contact: 'Discuss an auction valuation.',
      external: ['https://www.lsh.co.uk/explore/services/commercial-property-auctions', 'Explore LSH Property Auctions']
    },
    'expert-witness': {
      kind: 'Valuation service', label: 'Expert Witness and Section 18', title: 'Independent valuation evidence for legal proceedings.',
      lede: 'Clear, evidence-led valuation opinion for litigation, arbitration and statutory compensation matters.',
      overview: 'LSH provides independent valuation evidence for disputes and legal proceedings, supported by a documented valuation process and relevant market evidence. Recent work includes an expert witness valuation of a major London office building valued at £105.5m.',
      scope: ['Expert witness valuation', 'Litigation and arbitration', 'Section 18 matters', 'Independent, evidenced opinions of value'],
      related: ['commercial', 'our-approach', 'case-studies'],
      contact: 'Discuss an expert witness instruction.',
      specialist: 'Jonathan Manley — Expert Witness and Section 18'
    },
    'commercial': {
      kind: 'Sector valuation', label: 'Commercial', title: 'Commercial property valuations.',
      lede: 'Evidence-led valuation for offices, retail and industrial property across the UK.',
      overview: 'Commercial instructions are assigned to valuers with direct experience of the asset class and its local market. The practice covers lending, financial reporting, portfolio and transaction purposes.',
      scope: ['Offices', 'Retail property', 'Industrial and logistics assets', 'Mixed commercial portfolios'],
      related: ['loan-security', 'financial-reporting', 'industrial-logistics', 'retail'],
      contact: 'Discuss a commercial property valuation.',
      external: ['https://www.lsh.co.uk/explore/sectors/office', 'Explore wider LSH office advice']
    },
    'industrial-logistics': {
      kind: 'Sector valuation', label: 'Industrial and logistics', title: 'Industrial and logistics valuations.',
      lede: 'Valuation for warehousing, distribution and production property.',
      overview: 'LSH matches industrial and logistics instructions to valuers with relevant transactional and local market experience. Work ranges from individual assets to national distribution portfolios.',
      scope: ['Warehouses and distribution centres', 'Production and industrial property', 'Single assets and national portfolios', 'Loan security and financial reporting'],
      related: ['loan-security', 'financial-reporting', 'commercial'],
      contact: 'Discuss an industrial or logistics valuation.'
    },
    'retail': {
      kind: 'Sector valuation', label: 'Retail', title: 'Retail property valuations.',
      lede: 'Valuation for high streets, retail parks and shopping centres.',
      overview: 'Retail valuations combine asset-specific evidence with local and national market knowledge. Instructions can be prepared for lending, reporting, portfolio and other agreed purposes.',
      scope: ['High-street property', 'Retail parks', 'Shopping centres', 'Mixed retail portfolios'],
      related: ['loan-security', 'financial-reporting', 'commercial'],
      contact: 'Discuss a retail property valuation.',
      external: ['https://www.lsh.co.uk/explore/sectors/retail', 'Explore wider LSH retail advice']
    },
    'healthcare': {
      kind: 'Sector valuation', label: 'Healthcare', title: 'Healthcare property valuations.',
      lede: 'Specialist valuation for care, clinical and medical facilities.',
      overview: 'Healthcare assets can require an understanding of both the property and its operating context. LSH connects valuation with operational real estate and public sector expertise where the instruction requires it.',
      scope: ['Care homes and nursing homes', 'Hospitals and clinics', 'GP surgeries and medical centres', 'Loan security and public sector reporting'],
      related: ['operational-real-estate', 'asset-valuation-services', 'loan-security'],
      contact: 'Discuss a healthcare valuation.'
    },
    'education': {
      kind: 'Sector valuation', label: 'Education', title: 'Education property valuations.',
      lede: 'Valuation for schools, colleges, universities and specialist education assets.',
      overview: 'Education property can form part of public sector asset registers, financial reporting programmes or individual valuation instructions. The appropriate basis and method are agreed at instruction stage.',
      scope: ['Schools', 'Colleges', 'Universities', 'Specialist education assets'],
      related: ['asset-valuation-services', 'financial-reporting', 'our-approach'],
      contact: 'Discuss an education property valuation.'
    },
    'land-development': {
      kind: 'Sector valuation', label: 'Land and development', title: 'Land and development valuations.',
      lede: 'Evidence for sites, viability, development value and lending decisions.',
      overview: 'Land and development instructions draw on current market evidence and the valuation method appropriate to the site and purpose, including the residual method where required.',
      scope: ['Development land and sites', 'Residual valuation', 'Residential development', 'Loan security and portfolio decisions'],
      related: ['development-appraisal', 'residential-btr', 'loan-security'],
      contact: 'Discuss a land or development valuation.'
    },
    'transport-infrastructure': {
      kind: 'Sector valuation', label: 'Transport and infrastructure', title: 'Transport and infrastructure valuations.',
      lede: 'Valuation for ports, transport property and specialist infrastructure assets.',
      overview: 'Specialist infrastructure requires a clear instruction scope, appropriate basis of value and valuers who understand the asset context. The brief includes a £505m port authority financial reporting instruction among recent work.',
      scope: ['Ports and port authorities', 'Transport property', 'Roads, bridges and car parks', 'Specialist infrastructure assets'],
      related: ['financial-reporting', 'asset-valuation-services', 'our-approach'],
      contact: 'Discuss a transport or infrastructure valuation.',
      external: ['https://www.lsh.co.uk/explore/sectors/transport/land-and-infrastructure', 'Explore wider LSH transport advice']
    },
    'senior-living': {
      kind: 'Sector valuation', label: 'Senior living', title: 'Senior living valuations.',
      lede: 'Valuation for retirement and later-living property.',
      overview: 'Senior living instructions can involve residential evidence, operating considerations and portfolio requirements. The team is selected around the asset and purpose of valuation.',
      scope: ['Retirement housing', 'Later-living property', 'Residential portfolios', 'Loan security and financial reporting'],
      related: ['residential-btr', 'healthcare', 'loan-security'],
      contact: 'Discuss a senior living valuation.'
    },
    'student-accommodation': {
      kind: 'Sector valuation', label: 'Student accommodation', title: 'Student accommodation valuations.',
      lede: 'Valuation for purpose-built student accommodation schemes and portfolios.',
      overview: 'PBSA sits within the residential valuation capability described in the brief. LSH can support single schemes and portfolios for lending, financial reporting and agreed management purposes.',
      scope: ['Purpose-built student accommodation', 'Single schemes and portfolios', 'Loan security', 'Financial reporting'],
      related: ['residential-btr', 'loan-security', 'financial-reporting'],
      contact: 'Discuss a student accommodation valuation.'
    },
    'mixed-use': {
      kind: 'Sector valuation', label: 'Mixed use', title: 'Mixed-use property valuations.',
      lede: 'Coordinated valuation for assets and portfolios spanning several property uses.',
      overview: 'Mixed-use instructions are coordinated across the relevant sector specialists while retaining one lead valuer and one clear reporting process. The brief includes office, retail, residential and specialist uses.',
      scope: ['Office and retail uses', 'Residential elements', 'Trading and specialist property', 'Multi-asset portfolios'],
      related: ['commercial', 'residential-btr', 'operational-real-estate', 'financial-reporting'],
      contact: 'Discuss a mixed-use valuation.'
    }
  };

  const renderGateway = (page) => {
    const relatedItems = page.related.map((key) => ({ title: routes[key], text: gatewayPages[key]?.lede || 'Read the full valuation service and instruction information.', href: route(key) }));
    const external = page.external ? `<div class="page-copy"><a class="text-link" href="${page.external[0]}" target="_blank" rel="noopener noreferrer">${page.external[1]} ${diagonalArrow}</a></div>` : '';
    return hero({
      label: page.label,
      title: page.title,
      lede: page.lede,
      cta: page.contact,
      secondary: `<a class="text-link text-link--light" href="${route('our-approach')}">Read about our process ${arrow}</a>`,
      asideLabel: page.kind,
      asideTitle: 'A named valuer. A checked report.',
      asideText: 'Every instruction follows the same six-step process and is matched to relevant sector and local market experience.'
    }) + subnav([['overview','Overview'],['scope','Scope'],['related','Related services'],['quality','Quality'],['contact','Contact']]) +
      section('overview', page.kind, page.title, `<div class="page-copy"><p>${page.overview}</p></div>`) +
      section('scope', 'Instruction scope', 'What this route covers.', assetList(page.scope)) +
      section('related', 'Related valuation routes', 'Choose the right next step.', featureGrid(relatedItems, relatedItems.length === 4 ? 4 : 3)) +
      section('quality', 'Quality and delivery', 'The same controls on every instruction.', proofGrid([['RICS','Registered Valuer leads the instruction'],['Every report','Reviewed by a qualified checker'],['17 offices','National reach with local market knowledge']]) + `<div class="page-copy"><a class="text-link text-link--light" href="${route('our-approach')}">Read the six-step process ${arrow}</a></div>`, { dark: true }) +
      external + contact(page.contact, 'Tell us about the asset, location, valuation purpose and timing.', page.specialist || 'The appropriate sector specialist will be confirmed when scope is agreed.');
  };

  Object.entries(gatewayPages).forEach(([key, page]) => { pageFactories[key] = () => renderGateway(page); });

  pageFactories['case-studies'] = () => hero({
    label: 'Recent instructions', title: 'Valuation work across sectors and the UK.',
    lede: 'Nine recent examples from lending, financial reporting, public sector and legal instructions.',
    cta: 'Discuss a similar instruction',
    secondary: `<a class="text-link text-link--light" href="${route('our-approach')}">Read about our process ${arrow}</a>`,
    asideLabel: 'Recent work', asideTitle: 'Nine instructions across the UK.', asideText: 'Loan security, public sector, financial reporting and legal appointments.'
  }) + subnav([['experience','Case studies'],['related','Related services'],['contact','Contact']]) +
    section('experience', 'Recent instructions', 'Evidence of delivery across asset types.', cases([
      { meta: 'Loan security · Leisure', value: '£93m', title: 'Major London leisure complex', text: 'Casino and cinema venue valued for a major UK bank.' },
      { meta: 'Asset register · Public sector', value: '870', title: 'London borough properties', text: 'A coordinated valuation across a diverse local authority estate.' },
      { meta: 'Expert witness · Office', value: '£105.5m', title: 'Major London office building', text: 'Independent valuation evidence for legal proceedings.' },
      { meta: 'Loan security · Logistics', value: '£41m–£152m', title: 'UK distribution portfolio', text: 'Four large distribution centres within a national instruction.' },
      { meta: 'Financial reporting · Residential', value: '£52.35m', title: 'Large apartment complex', text: 'Regulated Purpose Valuation for company accounts.' },
      { meta: 'Financial reporting · Hotel', value: 'Annual', title: 'Branded hotel', text: 'Annual Regulated Purpose Valuation for an international financial institution.' },
      { meta: 'Financial reporting · Mixed use', value: '£23.7m', title: 'Cambridge office and retail development', text: 'Regulated Purpose Valuation for company accounts.' },
      { meta: 'Financial reporting · Infrastructure', value: '£505m', title: 'Major port authority', text: 'Regulated Purpose Valuation for company accounts.' },
      { meta: 'Asset register · Public sector', value: '555', title: 'London borough properties', text: 'A second major local authority portfolio valuation.' }
    ])) + related([['loan-security','Loan security'],['financial-reporting','Financial reporting'],['asset-valuation-services','Asset valuation services']]) +
    contact('Discuss a similar instruction.', 'Tell us about the property, portfolio and valuation purpose.');

  pageFactories['our-people'] = () => hero({
    label: 'Valuation team', title: 'Find the right valuation specialist.',
    lede: 'Start with our national valuation leads or use the directory to find the right sector specialist.',
    cta: 'Contact the valuation team',
    secondary: '',
    asideLabel: 'National coverage', asideTitle: 'One practice across 17 offices.', asideText: 'We route each enquiry by instruction type, sector and location.'
  }) + subnav([['national','National leads'],['specialists','Specialists'],['contact','Contact']]) +
    section('national', 'National leads', 'Two direct starting points.', `<div class="profile-grid profile-grid--two">
      <article class="profile-card profile-card--contact" data-reveal-item="true"><span class="profile-card__initials" aria-hidden="true">CF</span><h3>Christiaan Flatley</h3><p>Executive Director — Head of UK Regions, Valuation</p><div class="profile-card__links"><a href="tel:07841684807">07841 684807</a><a href="mailto:CFlatley@lsh.co.uk">CFlatley@lsh.co.uk</a></div></article>
      <article class="profile-card profile-card--contact" data-reveal-item="true"><span class="profile-card__initials" aria-hidden="true">OL</span><h3>Oliver Leeming</h3><p>Executive Director — Head of Operations, Valuation</p><div class="profile-card__links"><a href="tel:07725207641">07725 207 641</a><a href="mailto:OLeeming@lsh.co.uk">OLeeming@lsh.co.uk</a></div></article>
    </div>`) +
    section('specialists', 'Specialist directory', 'Expertise across valuation services and sectors.', profiles([
      { initials: 'KH', name: 'Ken Hogg', role: 'Operational Real Estate' },
      { initials: 'PM', name: 'Phil Macauley', role: 'Self Storage' },
      { initials: 'JR', name: 'Jaspreet Rahi', role: 'Asset Valuation Services / NHS and Public Sector' },
      { initials: 'NB', name: 'Nick Blackwell', role: 'Property Restructuring / LPA Receivership' },
      { initials: 'MR', name: 'Matt Rothery', role: 'London Residential Development' },
      { initials: 'JB', name: 'James Beale', role: 'London Residential' },
      { initials: 'EB', name: 'Ed Boulton', role: 'London Residential Investment' },
      { initials: 'JD', name: 'Jennifer Dunn', role: 'London Commercial' },
      { initials: 'RL', name: 'Rachel Leggett', role: 'Valuation Compliance Officer' },
      { initials: 'JM', name: 'Jonathan Manley', role: 'Expert Witness and Section 18' }
    ])) + contact('Contact the valuation team.', 'Tell us the instruction type, property location and timing. We will connect you with the right specialist.');

  const content = pageFactories[slug]();
  const main = document.querySelector('main');
  if (!main) return;
  main.className = 'subpage';
  main.innerHTML = content;
  document.title = routes[slug] + ' | LSH Valuation';
  const description = document.querySelector('meta[name="description"]');
  if (description) description.content = document.querySelector('.subpage-hero__lede')?.textContent || description.content;
  if (typeof history !== 'undefined' && 'scrollRestoration' in history) history.scrollRestoration = 'manual';
  const resetRoutePosition = () => {
    document.querySelector('.site')?.scrollTo?.({ top: 0, left: 0, behavior: 'auto' });
    globalThis.scrollTo?.({ top: 0, left: 0, behavior: 'auto' });
  };
  if (location.hash) requestAnimationFrame(() => document.querySelector(location.hash)?.scrollIntoView());
  else {
    resetRoutePosition();
    requestAnimationFrame(resetRoutePosition);
  }
})();
