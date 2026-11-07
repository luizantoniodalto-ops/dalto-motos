import React from 'react';
import { Zap, Navigation, Compass, Mountain, ShieldAlert, ArrowRight } from 'lucide-react';
import { CATEGORIES_METADATA } from '../data/catalog';
import { TireCategory } from '../types';

interface CategoriesSectionProps {
  activeCategory: TireCategory | 'all';
  onSelectCategory: (category: TireCategory) => void;
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap':
        return <Zap className="w-6 h-6 text-[#ff5500]" />;
      case 'Compass':
        return <Compass className="w-6 h-6 text-[#ff5500]" />;
      case 'Route':
        return <Navigation className="w-6 h-6 text-[#ff5500]" />;
      case 'Mountain':
        return <Mountain className="w-6 h-6 text-[#ff5500]" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-6 h-6 text-[#ff5500]" />;
      default:
        return <Zap className="w-6 h-6 text-[#ff5500]" />;
    }
  };

  return (
    <section id="categorias" className="py-14 bg-[#0b0c10] border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest font-bold text-[#ff5500] mb-1">
              Segmentos Especializados
            </p>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl uppercase italic tracking-tight text-white">
              CATEGORIAS DE <span className="text-[#ff5500]">PILOTAGEM</span>
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md font-body">
            Cada estilo de moto exige um composto e perfil específico. Escolha o seu objetivo e encontre a engenharia certa para o seu asfalto ou trilha.
          </p>
        </div>

        {/* 5 Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {CATEGORIES_METADATA.map((cat) => {
            const isSelected = activeCategory === cat.id;

            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`group cursor-pointer rounded-2xl p-5 border transition-all duration-300 relative flex flex-col justify-between ${
                  isSelected
                    ? 'bg-gradient-to-b from-[#241a15] to-[#14121a] border-orange-500 shadow-xl shadow-orange-500/20 ring-1 ring-orange-500'
                    : 'bg-[#12141c] border-white/10 hover:border-orange-500/40 hover:bg-[#161a25]'
                }`}
              >
                {/* Active Indicator Pin */}
                {isSelected && (
                  <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-[#ff5500] animate-ping" />
                )}

                <div>
                  {/* Category Icon */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${
                    isSelected ? 'bg-orange-500/20 border border-orange-500/50' : 'bg-white/5 border border-white/10 group-hover:border-orange-500/30'
                  }`}>
                    {getIcon(cat.iconName)}
                  </div>

                  {/* Category Titles */}
                  <span className="text-[10px] font-bold uppercase tracking-wider text-orange-400">
                    {cat.badge}
                  </span>
                  <h3 className="font-display font-extrabold text-xl uppercase italic text-white group-hover:text-[#ff5500] transition-colors mt-0.5">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                    {cat.tagline}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-mono text-[11px] truncate max-w-[120px]">
                    {cat.imageSnippet}
                  </span>
                  <span className={`flex items-center gap-1 font-bold text-xs uppercase ${
                    isSelected ? 'text-[#ff5500]' : 'text-slate-400 group-hover:text-white'
                  }`}>
                    <span>Filtrar</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
