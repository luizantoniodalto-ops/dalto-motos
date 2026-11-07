import React from 'react';
import { BRANDS } from '../data/catalog';
import { ArrowRight, ShieldCheck } from 'lucide-react';

interface BrandsSectionProps {
  onSelectBrand: (brandName: string) => void;
}

export const BrandsSection: React.FC<BrandsSectionProps> = ({ onSelectBrand }) => {
  return (
    <section id="marcas" className="py-16 bg-[#0c0e14] border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest font-bold text-[#ff5500] mb-1">
              Parceiros Homologados
            </p>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl uppercase italic tracking-tight text-white">
              FABRICANTES <span className="text-[#ff5500]">LÍDERES MUNDIAIS</span>
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md font-body">
            Trabalhamos exclusivamente com as marcas oficiais que equipam as maiores motocicletas do mundo, com garantia integral de fábrica e lote novo.
          </p>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {BRANDS.map((brand, idx) => (
            <div
              key={idx}
              onClick={() => onSelectBrand(brand.name)}
              className="group cursor-pointer bg-[#12151d] hover:bg-[#181d2a] border border-white/10 hover:border-orange-500/60 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 text-center"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-orange-400/80 bg-white/5 px-2 py-0.5 rounded">
                  {brand.badge}
                </span>

                <h3 className="font-display font-extrabold text-2xl uppercase italic text-white group-hover:text-[#ff5500] transition-colors mt-3">
                  {brand.name}
                </h3>

                <p className="text-[11px] text-slate-400 mt-1">
                  {brand.origin}
                </p>

                <p className="text-[11px] text-slate-500 mt-2 line-clamp-2">
                  {brand.highlight}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-center gap-1 text-xs font-bold text-slate-400 group-hover:text-[#ff5500] transition-colors">
                <span>Ver Pneus</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Brand Authenticity Assurance */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 text-center">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Pneus 100% Originais com Selo Inmetro</span>
          </div>
          <span className="text-white/20 hidden sm:inline">·</span>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Lotes Recentes com DOT Atualizado</span>
          </div>
          <span className="text-white/20 hidden sm:inline">·</span>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Nota Fiscal Eletrônica e Garantia Oficial</span>
          </div>
        </div>

      </div>
    </section>
  );
};
