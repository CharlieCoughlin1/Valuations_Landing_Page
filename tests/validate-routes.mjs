import fs from 'node:fs';
import vm from 'node:vm';

const index = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const source = fs.readFileSync(new URL('../phase1-pages.js', import.meta.url), 'utf8');
const failures = [];

const routeBlock = source.match(/const routes = \{([\s\S]*?)\n  \};/)?.[1] || '';
const routes = [...routeBlock.matchAll(/^\s+'([^']+)':/gm)].map((match) => match[1]);
const routeSet = new Set(routes);

function renderRoute(slug) {
  let html = '';
  const main = {
    className: '',
    set innerHTML(value) { html = value; },
    get innerHTML() { return html; }
  };
  const description = { content: '' };
  const document = {
    title: '',
    querySelector(selector) {
      if (selector === 'main') return main;
      if (selector === 'meta[name="description"]') return description;
      if (selector === '.subpage-hero__lede') return { textContent: 'Page description' };
      return null;
    }
  };

  vm.runInNewContext(source, {
    URLSearchParams,
    location: { search: `?page=${slug}`, hash: '' },
    document,
    requestAnimationFrame: (callback) => callback()
  });
  return html;
}

if (routes.length !== 29) failures.push(`Expected 29 query routes; found ${routes.length}.`);

for (const slug of routes) {
  let html;
  try {
    html = renderRoute(slug);
  } catch (error) {
    failures.push(`${slug}: render failed — ${error.message}`);
    continue;
  }

  if (!html.includes('<header class="subpage-hero">')) failures.push(`${slug}: hero missing.`);
  if (!html.includes('id="contact"')) failures.push(`${slug}: contact section missing.`);
  if (html.includes('undefined')) failures.push(`${slug}: rendered undefined content.`);

  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
  const hashLinks = [...html.matchAll(/href="#([^"]+)"/g)].map((match) => match[1]);
  for (const target of hashLinks) {
    if (!ids.includes(target)) failures.push(`${slug}: #${target} has no matching section.`);
  }
  for (const id of new Set(ids)) {
    if (ids.filter((candidate) => candidate === id).length > 1) failures.push(`${slug}: duplicate id #${id}.`);
  }
}

const allSource = `${index}\n${source}`;
const literalRoutes = [...allSource.matchAll(/\?page=([a-z0-9-]+)/g)].map((match) => match[1]);
const helperRoutes = [...allSource.matchAll(/route\('([a-z0-9-]+)'\)/g)].map((match) => match[1]);
const linkedRoutes = new Set([...literalRoutes, ...helperRoutes]);

for (const slug of linkedRoutes) {
  if (!routeSet.has(slug)) failures.push(`Unknown internal route linked: ${slug}.`);
}
for (const slug of routeSet) {
  if (!linkedRoutes.has(slug)) failures.push(`Route is not reachable from another page: ${slug}.`);
}

const requiredHubPatterns = [
  [/<a class="audience-card" href="\?page=/g, 5, 'audience links'],
  [/<a class="service-card" href="\?page=/g, 9, 'service links'],
  [/<a class="specialism-card" href="\?page=/g, 4, 'specialism links'],
  [/<a class="sector-card" href="\?page=/g, 12, 'sector links'],
  [/<a class="case-card" href="\?page=case-studies"/g, 3, 'case-study links']
];

for (const [pattern, expected, label] of requiredHubPatterns) {
  const count = index.match(pattern)?.length || 0;
  if (count !== expected) failures.push(`Expected ${expected} ${label}; found ${count}.`);
}

if (!index.includes('href="?page=expert-witness"') || !routeSet.has('expert-witness')) failures.push('Expert Witness click-through is not complete.');

const hubIds = [...index.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
const hubHashLinks = [...index.matchAll(/href="#([^"]+)"/g)].map((match) => match[1]);
for (const target of hubHashLinks) {
  if (!hubIds.includes(target)) failures.push(`Hub: #${target} has no matching target.`);
}
for (const id of new Set(hubIds)) {
  if (hubIds.filter((candidate) => candidate === id).length > 1) failures.push(`Hub: duplicate id #${id}.`);
}

const externalLinks = [...allSource.matchAll(/<a\b[^>]*href="https:\/\/[^>]+>/g)].map((match) => match[0]);
for (const link of externalLinks) {
  if (!/target="_blank"/.test(link) || !/rel="noopener noreferrer"/.test(link)) failures.push(`External link is missing safe new-tab behaviour: ${link.match(/href="([^"]+)/)?.[1]}.`);
}

const buttons = [...allSource.matchAll(/<button\b[^>]*>/g)].map((match) => match[0]);
for (const button of buttons) {
  if (!/type="(?:button|submit)"/.test(button)) failures.push(`Button is missing an explicit type: ${button}.`);
}

if (/href=""|href="#"/.test(allSource)) failures.push('An empty link target remains.');
if (/pending approval|approval is pending|candidate page specialist|page deferred|in preparation · sign-off required/i.test(allSource)) failures.push('A publication placeholder remains.');
const unavailableLabels = ['P' + 'DF', 'Lender Capability ' + 'Pack', 'Public Sector Valuation ' + 'Guide', 'Valuation Process ' + 'Overview'];
if (unavailableLabels.some((label) => allSource.includes(label))) failures.push('An unavailable document reference remains.');
if (!source.includes('history.scrollRestoration = \'manual\'') || !index.includes('resetRouteViewport')) failures.push('Route-top reset is missing.');
if (!index.includes("site.querySelectorAll('a[href^=\"?page=\"]')") || !index.includes("link.target = '_blank'")) failures.push('Embedded breakout links are not configured to open at the top in a new tab.');
if (!index.includes('.site.embedded') || !index.includes('overflow-y: auto')) failures.push('Embedded mobile scrolling styles are missing.');

if (failures.length) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Validated ${routes.length} routes and all hub click-through groups.`);
}
