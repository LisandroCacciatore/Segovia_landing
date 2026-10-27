#!/usr/bin/env node
import { copyFileSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const distDir = process.argv[2] ? resolve(process.argv[2]) : join(root, 'dist');
const source = join(distDir, 'index.html');
const target = join(distDir, '404.html');

if (!existsSync(source)) {
  console.error(`No existe ${source}. Corre el build antes de copiar el 404.`);
  process.exit(1);
}

copyFileSync(source, target);
console.log(`404 de staging generado: ${target}`);
