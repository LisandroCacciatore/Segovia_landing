import { waLink } from '../utils/whatsapp.js';

export default function WhatsAppFloat() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href={waLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="flex items-center gap-space-xs bg-[#25D366] text-white px-space-md py-space-sm rounded-full shadow-[0_12px_36px_-4px_rgba(0,0,0,0.65)] hover:scale-105 transition-transform"
      >
        <span className="material-symbols-outlined text-[24px]">chat</span>
        <span className="font-button-text text-button-text font-bold pr-1 hidden sm:inline">
          Consulta inmediata
        </span>
      </a>
    </div>
  );
}
