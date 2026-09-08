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

if (routes.length !== 28) failures.push(`Expected 28 query routes; found ${routes.length}.`);

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
  [/<a class="service-card" href="\?page=/g, 8, 'service links'],
  [/<a class="specialism-card" href="\?page=/g, 3, 'specialism links'],
  [/<a class="sector-card" href="\?page=/g, 12, 'sector links'],
  [/<a class="case-card" href="\?page=case-studies"/g, 3, 'case-study links']
];

for (const [pattern, expected, label] of requiredHubPatterns) {
  const count = index.match(pattern)?.length || 0;
  if (count !== expected) failures.push(`Expected ${expected} ${label}; found ${count}.`);
}

if (!index.includes('Page deferred pending specialist confirmation')) {
  failures.push('Expert Witness deferral is not visible on the hub.');
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Validated ${routes.length} routes and all hub click-through groups.`);
}
