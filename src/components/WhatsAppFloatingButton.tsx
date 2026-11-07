import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export const WhatsAppFloatingButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const handleClick = () => {
    const text = encodeURIComponent(
      'Olá, Apex Moto Tires! Preciso de ajuda para confirmar a medida e o modelo ideal de pneu para a minha moto.'
    );
    window.open(`https://wa.me/5511999998888?text=${text}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Tooltip */}
      {showTooltip && (
        <div className="mb-2 max-w-xs bg-[#131622] border border-orange-500/40 rounded-2xl p-3 shadow-2xl shadow-black text-xs text-white relative animate-in fade-in slide-in-from-bottom duration-300">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute top-1.5 right-1.5 text-slate-400 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="pr-4">
            <p className="font-bold text-orange-400 text-[11px] uppercase tracking-wide">
              Consultor de Pneus Online 🏍️
            </p>
            <p className="text-slate-300 text-[11px] mt-0.5">
              Dúvidas sobre medidas ou compatibilidade? Fale com nossos pilotos agora no WhatsApp!
            </p>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={handleClick}
        aria-label="Falar no WhatsApp"
        className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white flex items-center justify-center shadow-2xl shadow-emerald-500/40 transform hover:scale-110 active:scale-95 transition-all relative group"
      >
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#ff5500] border-2 border-[#0e1017] animate-pulse" />
        <MessageCircle className="w-7 h-7" />
      </button>
    </div>
  );
};
