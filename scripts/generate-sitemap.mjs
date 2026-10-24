#!/usr/bin/env node
import { writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { site } from '../src/data/site.js';
import { blogPosts } from '../src/data/blog.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');
const outputPath = join(publicDir, 'sitemap.xml');

if (!existsSync(publicDir)) mkdirSync(publicDir, { recursive: true });

const today = new Date().toISOString().split('T')[0];
const NL = String.fromCharCode(10);

const staticUrls = [
  { loc: '/', changefreq: 'weekly', priority: 1.0 },
  { loc: '/blog', changefreq: 'weekly', priority: 0.9 },
  { loc: '/privacidad', changefreq: 'yearly', priority: 0.3 },
];

const blogUrls = blogPosts.map((post) => ({
  loc: `/blog/${post.slug}`,
  changefreq: 'monthly',
  priority: 0.7,
  lastmod: post.date,
}));

const allUrls = [...staticUrls, ...blogUrls];

const entries = allUrls.map((u) =>
  [
    '  <url>',
    `    <loc>${site.url}${u.loc}</loc>`,
    `    <lastmod>${u.lastmod || today}</lastmod>`,
    `    <changefreq>${u.changefreq}</changefreq>`,
    `    <priority>${u.priority.toFixed(1)}</priority>`,
    '  </url>',
  ].join(NL)
);

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...entries,
  '</urlset>',
  '',
].join(NL);

writeFileSync(outputPath, xml, 'utf-8');
console.log(`Sitemap generado con ${allUrls.length} URLs -> public/sitemap.xml`);
