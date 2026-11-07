import React from 'react';
import { ArrowRight, Zap, Shield, Gauge, CheckCircle2, ChevronRight, ShoppingCart, ShoppingBag } from 'lucide-react';

interface HeroBannerProps {
  onCtaClick: () => void;
  onOpenLocator: () => void;
  onSelectFeaturedTire: () => void;
  onAddToCartFeatured: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onCtaClick,
  onOpenLocator,
  onSelectFeaturedTire,
  onAddToCartFeatured,
}) => {
  return (
    <section className="relative overflow-hidden bg-[#0a0c10] border-b border-white/10">
      {/* Dynamic ambient lighting & speed lines */}
      <div className="absolute inset-0 bg-carbon-pattern opacity-60 pointer-events-none" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#ff5500]/15 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Headlines, Value Prop, CTAs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Athletic Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-orange-500/30 text-xs font-semibold text-orange-400">
              <Zap className="w-3.5 h-3.5 text-[#ff5500]" />
              <span className="uppercase tracking-widest text-[11px]">
                Linha Hypersport & Superbike 2026
              </span>
              <span className="text-white/30">|</span>
              <span className="text-white">Mais Controle. Mais Performance.</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase italic tracking-tight text-white leading-[0.95]">
              SEU PRÓXIMO DESTINO <br />
              COMEÇA PELOS <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff5500] via-[#ff7722] to-amber-400">PNEUS CERTOS</span>
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl font-body leading-relaxed">
              Alta performance em todas as condições climáticas. Desenvolvido para pilotos que buscam o máximo de precisão em curvas, estabilidade a mais de 250 km/h e aderência cirúrgica no asfalto seco e molhado.
            </p>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onAddToCartFeatured}
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#ff5500] to-[#e04b00] hover:from-[#ff6600] hover:to-[#eb5300] text-white font-display uppercase italic font-black text-xl tracking-wider shadow-xl shadow-[#ff5500]/30 transform active:scale-95 transition-all cursor-pointer"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>COMPRE AGORA (ADD AO CARRINHO)</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </button>

              <button
                onClick={onOpenLocator}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-[#151821] hover:bg-[#1c212d] border border-white/15 hover:border-orange-500/50 text-white font-display uppercase italic font-bold text-lg tracking-wide transition-all shadow-md cursor-pointer"
              >
                <span>BUSCAR PELA MINHA MOTO</span>
                <ChevronRight className="w-4 h-4 text-orange-400" />
              </button>
            </div>

            {/* Quick Proof Badges */}
            <div className="pt-4 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-[#ff5500] shrink-0" />
                <span className="font-medium">100% Full Sílica</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Shield className="w-4 h-4 text-[#ff5500] shrink-0" />
                <span className="font-medium">5 Anos de Garantia</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Gauge className="w-4 h-4 text-[#ff5500] shrink-0" />
                <span className="font-medium">Cinta Aço a 0°</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Zap className="w-4 h-4 text-[#ff5500] shrink-0" />
                <span className="font-medium">Envio em 24h</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Showcase (Reference Poster Focus) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Backing Sporty Card Frame */}
              <div className="relative rounded-2xl p-2 bg-gradient-to-b from-[#2a303f] via-[#161922] to-[#0c0d12] border border-orange-500/30 shadow-2xl shadow-black/80 glow-orange">
                
                {/* Poster Top Bar */}
                <div className="flex items-center justify-between px-3 py-2 bg-black/60 rounded-t-xl border-b border-white/10 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-display font-extrabold text-[#ff5500] tracking-wider uppercase">
                      METZELER OFFICIAL
                    </span>
                    <span className="text-white/40">·</span>
                    <span className="text-slate-300 text-[11px]">SPORTEC™ M9 RR</span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    DISPONÍVEL
                  </span>
                </div>

                {/* Main Visual Image from Asset */}
                <div 
                  onClick={onSelectFeaturedTire}
                  className="relative group cursor-pointer overflow-hidden rounded-xl bg-black"
                >
                  <img
                    src="/assets/aistudio/image_ccd86ade.png"
                    alt="Pneu Esportivo Metzeler Sportec M9 RR para Motocicletas"
                    className="w-full h-auto max-h-[500px] object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

                  {/* Highlight banner pill */}
                  <div className="absolute top-4 right-4 bg-[#ff5500] text-black font-display font-black text-sm px-3 py-1 rounded shadow-lg uppercase italic tracking-wider transform rotate-1">
                    O PNEU CAMPEÃO
                  </div>

                  {/* Bottom quick CTA preview */}
                  <div className="absolute bottom-4 left-4 right-4 p-3 bg-[#11141c]/95 backdrop-blur-md rounded-xl border border-white/15 space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[11px] text-orange-400 font-semibold uppercase tracking-wider">
                          Kit Par Promocional (120/70 + 180/55)
                        </p>
                        <div className="flex items-baseline gap-2">
                          <span className="text-xs text-slate-400 line-through">R$ 2.790</span>
                          <span className="text-lg font-bold text-white font-mono">
                            R$ 2.241,00
                          </span>
                          <span className="text-[10px] text-emerald-400 font-semibold">no Pix (10% OFF)</span>
                        </div>
                      </div>
                    </div>

                    {/* Direct Action Buttons on Hero Poster */}
                    <div className="grid grid-cols-2 gap-2 pt-1 border-t border-white/10">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToCartFeatured();
                        }}
                        className="w-full py-2.5 px-3 bg-[#ff5500] hover:bg-[#ff6600] text-white rounded-lg text-xs font-display uppercase italic font-bold tracking-wider transition-colors shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Adicionar ao Carrinho</span>
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectFeaturedTire();
                        }}
                        className="w-full py-2.5 px-3 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center"
                      >
                        Ver Detalhes
                      </button>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
