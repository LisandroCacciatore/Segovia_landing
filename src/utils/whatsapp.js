import { site } from '../data/site.js';

// Arma el link de WhatsApp. Si viene texto, lo deja precargado en el chat.
export function waLink(text = '') {
  const base = `https://wa.me/${site.whatsapp}`;
  if (!text) return base;
  return `${base}?text=${encodeURIComponent(text)}`;
}
