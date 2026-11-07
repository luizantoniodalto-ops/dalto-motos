import React from 'react';
import { SlidersHorizontal, Check, ArrowUpDown, X, AlertCircle } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { TireProduct, TireCategory, TirePosition, MotorcycleSpec } from '../types';

interface ProductGridProps {
  products: TireProduct[];
  activeCategory: TireCategory | 'all';
  onCategoryChange: (c: TireCategory | 'all') => void;
  activeBrand: string;
  onBrandChange: (b: string) => void;
  activePosition: TirePosition | 'all';
  onPositionChange: (p: TirePosition | 'all') => void;
  activeRim: number | 'all';
  onRimChange: (r: number | 'all') => void;
  sortBy: 'relevance' | 'price-asc' | 'price-desc' | 'rating';
  onSortChange: (s: 'relevance' | 'price-asc' | 'price-desc' | 'rating') => void;
  selectedBike: MotorcycleSpec | null;
  onClearBikeFilter: () => void;
  onAddToCart: (product: TireProduct, openDrawer?: boolean) => void;
  onViewDetails: (product: TireProduct) => void;
  onOpenLocator: () => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  activeCategory,
  onCategoryChange,
  activeBrand,
  onBrandChange,
  activePosition,
  onPositionChange,
  activeRim,
  onRimChange,
  sortBy,
  onSortChange,
  selectedBike,
  onClearBikeFilter,
  onAddToCart,
  onViewDetails,
  onOpenLocator,
}) => {
  const brands = ['Metzeler', 'Pirelli', 'Michelin', 'Bridgestone', 'Dunlop', 'Continental'];
  const rims = [17, 18, 19, 21];

  return (
    <section id="catalogo" className="py-14 bg-[#0a0c10] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#ff5500] mb-1">
              <span>Catálogo Oficial de Pneus</span>
              {selectedBike && (
                <span className="text-emerald-400 font-mono">
                  · Filtrado para {selectedBike.brand} {selectedBike.model}
                </span>
              )}
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl uppercase italic tracking-tight text-white">
              PRODUTOS EM <span className="text-[#ff5500]">DESTAQUE</span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">
              Exibindo <strong className="text-white font-mono">{products.length}</strong> produtos
            </span>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value as any)}
                className="bg-[#141722] border border-white/10 hover:border-orange-500/50 rounded-xl px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-[#ff5500] cursor-pointer"
              >
                <option value="relevance">Mais Vendidos / Relevância</option>
                <option value="price-asc">Menor Preço</option>
                <option value="price-desc">Maior Preço</option>
                <option value="rating">Melhor Avaliação</option>
              </select>
            </div>
          </div>
        </div>

        {/* Dynamic Filter Controls Bar */}
        <div className="bg-[#11141c] border border-white/10 rounded-2xl p-4 mb-8 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            
            {/* Category tabs */}
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={() => onCategoryChange('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
                  activeCategory === 'all'
                    ? 'bg-[#ff5500] text-white shadow-md shadow-[#ff5500]/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => onCategoryChange('esportivo')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
                  activeCategory === 'esportivo'
                    ? 'bg-[#ff5500] text-white shadow-md shadow-[#ff5500]/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                Esportivos
              </button>
              <button
                onClick={() => onCategoryChange('street')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
                  activeCategory === 'street'
                    ? 'bg-[#ff5500] text-white shadow-md shadow-[#ff5500]/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                Street
              </button>
              <button
                onClick={() => onCategoryChange('touring')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
                  activeCategory === 'touring'
                    ? 'bg-[#ff5500] text-white shadow-md shadow-[#ff5500]/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                Touring
              </button>
              <button
                onClick={() => onCategoryChange('trail')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
                  activeCategory === 'trail'
                    ? 'bg-[#ff5500] text-white shadow-md shadow-[#ff5500]/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                Trail / Big Trail
              </button>
              <button
                onClick={() => onCategoryChange('off-road')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
                  activeCategory === 'off-road'
                    ? 'bg-[#ff5500] text-white shadow-md shadow-[#ff5500]/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                Off-Road
              </button>
            </div>

            {/* Position filter */}
            <div className="flex items-center gap-1.5 bg-[#0a0c10] p-1 rounded-xl border border-white/5">
              <span className="text-[11px] font-semibold text-slate-400 px-2">Posição:</span>
              <button
                onClick={() => onPositionChange('all')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase ${
                  activePosition === 'all' ? 'bg-[#ff5500] text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Todas
              </button>
              <button
                onClick={() => onPositionChange('par')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase ${
                  activePosition === 'par' ? 'bg-[#ff5500] text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Kits Pares
              </button>
              <button
                onClick={() => onPositionChange('dianteiro')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase ${
                  activePosition === 'dianteiro' ? 'bg-[#ff5500] text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Dianteiro
              </button>
              <button
                onClick={() => onPositionChange('traseiro')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase ${
                  activePosition === 'traseiro' ? 'bg-[#ff5500] text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Traseiro
              </button>
            </div>

          </div>

          {/* Secondary filter strip (Brand & Rim) */}
          <div className="pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs">
            {/* Brands chips */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-slate-400 font-semibold mr-1">Fabricante:</span>
              <button
                onClick={() => onBrandChange('all')}
                className={`px-2 py-1 rounded text-xs font-semibold ${
                  activeBrand === 'all' ? 'bg-white/20 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Todos
              </button>
              {brands.map(brand => (
                <button
                  key={brand}
                  onClick={() => onBrandChange(brand)}
                  className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                    activeBrand === brand ? 'bg-orange-500/20 text-[#ff5500] border border-orange-500/50' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>

            {/* Rim size selector */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400 font-semibold">Aro:</span>
              <button
                onClick={() => onRimChange('all')}
                className={`px-2 py-0.5 rounded text-xs ${
                  activeRim === 'all' ? 'bg-white/20 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Todos
              </button>
              {rims.map(rim => (
                <button
                  key={rim}
                  onClick={() => onRimChange(rim)}
                  className={`px-2 py-0.5 rounded text-xs font-mono font-bold ${
                    activeRim === rim ? 'bg-[#ff5500] text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {rim}"
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Motorcycle Filter Active Notice */}
        {selectedBike && (
          <div className="mb-6 p-4 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-lg bg-[#ff5500] text-white">
                🏍️
              </span>
              <div>
                <p className="text-sm font-bold text-white">
                  Mostrando apenas pneus homologados para {selectedBike.brand} {selectedBike.model}
                </p>
                <p className="text-xs text-orange-300 font-mono">
                  Medidas originais: {selectedBike.frontTireMeasure} (Dianteiro) e {selectedBike.rearTireMeasure} (Traseiro)
                </p>
              </div>
            </div>

            <button
              onClick={onClearBikeFilter}
              className="inline-flex items-center gap-1 text-xs font-bold uppercase text-slate-300 hover:text-white px-3 py-1.5 rounded-lg bg-black/40 border border-white/10"
            >
              <X className="w-3.5 h-3.5" />
              <span>Ver Todo o Catálogo</span>
            </button>
          </div>
        )}

        {/* Product Cards Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onViewDetails={onViewDetails}
              />
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="text-center py-16 bg-[#11141c] border border-white/10 rounded-2xl p-8 max-w-xl mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-orange-500/10 text-[#ff5500] flex items-center justify-center mx-auto">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h3 className="font-display font-extrabold text-2xl uppercase italic text-white">
              Nenhum pneu encontrado com esses filtros
            </h3>
            <p className="text-sm text-slate-400">
              Tente redefinir os filtros de marca, aro ou categoria para visualizar outros modelos disponíveis em estoque.
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={() => {
                  onCategoryChange('all');
                  onBrandChange('all');
                  onPositionChange('all');
                  onRimChange('all');
                  if (selectedBike) onClearBikeFilter();
                }}
                className="px-5 py-2.5 rounded-xl bg-[#ff5500] hover:bg-[#ff6600] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-[#ff5500]/25"
              >
                Limpar Todos os Filtros
              </button>
              <button
                onClick={onOpenLocator}
                className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider transition-colors"
              >
                Buscar por Moto
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
