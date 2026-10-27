import { describe, expect, it } from 'vitest';
import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { site } from '../src/data/site.js';

const root = process.cwd();
const viteBin = join(root, 'node_modules', 'vite', 'bin', 'vite.js');
const copy404Bin = join(root, 'scripts', 'copy-404.mjs');

function buildToTemp(env) {
  const outDir = mkdtempSync(join(tmpdir(), 'segovia-build-'));
  const childEnv = { ...process.env };
  delete childEnv.VITE_NOINDEX;
  delete childEnv.VITE_BASE_PATH;
  Object.assign(childEnv, env);

  execFileSync(process.execPath, [viteBin, 'build', '--outDir', outDir], {
    cwd: root,
    env: childEnv,
    stdio: 'pipe',
  });

  return outDir;
}

describe('build', () => {
  it('produccion no bloquea indexacion y conserva el sitemap', () => {
    const outDir = buildToTemp({});

    try {
      const robots = readFileSync(join(outDir, 'robots.txt'), 'utf8');
      expect(robots).toContain('Allow: /');
      expect(robots).toContain(`Sitemap: ${site.url}/sitemap.xml`);
      expect(robots).not.toContain('Disallow: /');

      const html = readFileSync(join(outDir, 'index.html'), 'utf8');
      expect(html).not.toMatch(/noindex/i);
      expect(html).not.toContain('name="robots"');
      expect(existsSync(join(outDir, 'sitemap.xml'))).toBe(true);
      expect(existsSync(join(outDir, '404.html'))).toBe(false);
    } finally {
      rmSync(outDir, { recursive: true, force: true });
    }
  });

  it('staging bloquea indexacion y aplica el base path', () => {
    const outDir = buildToTemp({
      VITE_NOINDEX: 'true',
      VITE_BASE_PATH: '/Segovia_landing/',
    });

    try {
      const robots = readFileSync(join(outDir, 'robots.txt'), 'utf8');
      expect(robots).toContain('Disallow: /');
      expect(robots).not.toContain('Allow: /');
      expect(robots).not.toContain('Sitemap:');

      const html = readFileSync(join(outDir, 'index.html'), 'utf8');
      expect(html).toContain('name="robots"');
      expect(html).toContain('content="noindex, nofollow"');
      expect(html).toContain('/Segovia_landing/');

      execFileSync(process.execPath, [copy404Bin, outDir], {
        cwd: root,
        stdio: 'pipe',
      });

      const notFound = readFileSync(join(outDir, '404.html'), 'utf8');
      expect(notFound).toBe(html);
      expect(notFound).toContain('content="noindex, nofollow"');
      expect(notFound).toContain('/Segovia_landing/');
    } finally {
      rmSync(outDir, { recursive: true, force: true });
    }
  });
});
