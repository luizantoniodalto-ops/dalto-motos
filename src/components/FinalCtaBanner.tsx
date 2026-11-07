import React from 'react';
import { ArrowRight, ShoppingCart, MessageCircle, Flame, Check } from 'lucide-react';

interface FinalCtaBannerProps {
  onBuyFeatured: () => void;
  onOpenLocator: () => void;
}

export const FinalCtaBanner: React.FC<FinalCtaBannerProps> = ({
  onBuyFeatured,
  onOpenLocator,
}) => {
  return (
    <section className="relative py-16 lg:py-24 overflow-hidden bg-gradient-to-b from-[#11141c] to-[#08090d] border-b border-orange-500/30">
      {/* Background visual cues */}
      <div className="absolute inset-0 bg-carbon-pattern opacity-50 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-72 bg-[#ff5500]/15 blur-[150px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Banner Box */}
        <div className="relative rounded-3xl bg-gradient-to-r from-[#1d222e] via-[#241712] to-[#1a141c] border-2 border-orange-500/50 p-8 sm:p-12 lg:p-16 shadow-2xl shadow-black glow-orange-lg overflow-hidden">
          
          {/* Decorative stamp from reference poster */}
          <div className="absolute -top-6 -right-6 md:top-6 md:right-8 bg-[#ff5500] text-black font-display font-black text-xs sm:text-sm px-5 py-2.5 rounded-full shadow-2xl uppercase italic tracking-wider transform rotate-3 flex items-center gap-1.5 z-10">
            <Flame className="w-4 h-4 fill-black" />
            <span>FEITO PARA QUEM VIVE DUAS RODAS</span>
          </div>

          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-mono font-bold text-orange-400">
              <span>METZELER · PIRELLI · MICHELIN · BRIDGESTONE</span>
            </div>

            <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl uppercase italic tracking-tight text-white leading-[0.95]">
              O PNEU QUE ELEVA A SUA <br />
              <span className="text-[#ff5500]">EXPERIÊNCIA DE PILOTAR</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-300 font-body max-w-2xl leading-relaxed">
              Não se contente com o comum. Equipe sua moto com pneus homologados mundialmente, garanta a frenagem mais curta e o grip definitivo para acelerar com confiança absoluta.
            </p>

            {/* Quick check points */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-300">
              <span className="flex items-center gap-1.5 text-white">
                <Check className="w-4 h-4 text-[#ff5500]" />
                10% de desconto no Pix
              </span>
              <span className="text-white/20">·</span>
              <span className="flex items-center gap-1.5 text-white">
                <Check className="w-4 h-4 text-[#ff5500]" />
                Até 12x Sem Juros no Cartão
              </span>
              <span className="text-white/20">·</span>
              <span className="flex items-center gap-1.5 text-white">
                <Check className="w-4 h-4 text-[#ff5500]" />
                Garantia de 5 Anos
              </span>
            </div>

            {/* Action buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onBuyFeatured}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#ff5500] to-[#e04b00] hover:from-[#ff6600] hover:to-[#eb5300] text-white font-display uppercase italic font-black text-xl tracking-wider shadow-xl shadow-[#ff5500]/40 transition-all transform active:scale-95"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>GARANTA O SEU AGORA</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={onOpenLocator}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#141722] hover:bg-[#1a1f2e] border border-white/20 text-white font-display uppercase italic font-bold text-lg tracking-wide transition-colors"
              >
                <span>CONSULTAR POR MOTO</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
