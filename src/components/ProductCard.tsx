import React from 'react';
import { ShoppingCart, Eye, Star, Zap, CheckCircle2, ShoppingBag } from 'lucide-react';
import { TireProduct } from '../types';

interface ProductCardProps {
  product: TireProduct;
  onAddToCart: (product: TireProduct, openDrawer?: boolean) => void;
  onViewDetails: (product: TireProduct) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onViewDetails,
}) => {
  const pixPrice = product.price * (1 - product.pixDiscountPercent / 100);
  const installment12x = product.price / 12;

  const getPositionLabel = (pos: string) => {
    switch (pos) {
      case 'dianteiro':
        return 'Pneu Dianteiro';
      case 'traseiro':
        return 'Pneu Traseiro';
      case 'par':
        return 'Kit Par Diant + Tras';
      default:
        return 'Pneu Moto';
    }
  };

  return (
    <div className="group relative bg-gradient-to-b from-[#151822] via-[#10121a] to-[#0c0d12] border border-white/10 hover:border-orange-500/60 rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-1">
      
      {/* Top Tag & Position Indicator */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="text-[11px] font-bold uppercase tracking-wider text-orange-400 bg-orange-500/10 border border-orange-500/30 px-2.5 py-0.5 rounded-full">
          {product.highlightTag || product.brand}
        </span>
        <span className="text-[11px] font-semibold text-slate-400">
          {getPositionLabel(product.position)}
        </span>
      </div>

      {/* Product Image Area with Fallback and Quick View Trigger */}
      <div 
        onClick={() => onViewDetails(product)}
        className="relative h-56 sm:h-64 rounded-xl bg-[#090a0f] border border-white/5 overflow-hidden flex items-center justify-center p-3 cursor-pointer group/img"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain transform transition-transform duration-500 group-hover/img:scale-110 drop-shadow-2xl"
          referrerPolicy="no-referrer"
        />

        {/* Subtle radial glow */}
        <div className="absolute inset-0 bg-radial from-orange-500/10 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity pointer-events-none" />

        {/* Quick View Badge on Hover */}
        <div className="absolute inset-x-0 bottom-3 flex justify-center opacity-0 group-hover/img:opacity-100 transition-opacity duration-200 pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0e1017]/90 border border-white/20 text-xs font-semibold text-white shadow-lg backdrop-blur-sm">
            <Eye className="w-3.5 h-3.5 text-[#ff5500]" />
            <span>Ficha Técnica Completa</span>
          </span>
        </div>
      </div>

      {/* Metadata & Specs */}
      <div className="mt-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Rim */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-bold text-white uppercase tracking-wider text-xs">
              {product.brand}
            </span>
            <span className="font-mono text-orange-400 font-semibold">
              Aro {product.rim}" · {product.speedRating}
            </span>
          </div>

          {/* Model Name */}
          <h3 
            onClick={() => onViewDetails(product)}
            className="font-display font-extrabold text-lg sm:text-xl uppercase italic text-white group-hover:text-[#ff5500] transition-colors cursor-pointer line-clamp-1"
          >
            {product.name}
          </h3>

          {/* Measure Tag */}
          <p className="font-mono text-xs text-slate-300 mt-1 font-semibold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff5500]" />
            <span>Medida: {product.measure}</span>
          </p>

          {/* Key tech pill */}
          <div className="mt-2.5 flex items-center gap-2 text-[11px] text-slate-400">
            <Zap className="w-3 h-3 text-[#ff5500]" />
            <span className="truncate">{product.technologyFeatures[0]}</span>
          </div>
        </div>

        {/* Rating and Reviews */}
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/5">
          <div className="flex items-center text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="text-xs font-bold text-white font-mono">5.0</span>
          <span className="text-xs text-slate-500">({product.reviewsCount} avaliações)</span>
        </div>

        {/* Pricing Block */}
        <div className="mt-3 bg-[#0d0f16] border border-white/5 rounded-xl p-3">
          <div className="flex items-baseline gap-2">
            <span className="font-mono font-black text-xl sm:text-2xl text-white">
              R$ {pixPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              no Pix ({product.pixDiscountPercent}% OFF)
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5 font-mono">
            ou <strong className="text-slate-200">12x de R$ {installment12x.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong> sem juros
          </p>
          <div className="flex items-center gap-1.5 mt-2 text-[11px] text-emerald-400 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            <span>Em estoque · Envio para todo o Brasil</span>
          </div>
        </div>

        {/* Clear, unmistakable Buy & Add to Cart Action Buttons */}
        <div className="mt-4 space-y-2">
          {/* Primary Main CTA: ADICIONAR AO CARRINHO & FINALIZAR */}
          <button
            onClick={() => onAddToCart(product, true)}
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#ff5500] to-[#e04b00] hover:from-[#ff6600] hover:to-[#eb5300] text-white text-sm font-display uppercase italic font-black tracking-wider shadow-lg shadow-[#ff5500]/25 transition-all transform active:scale-95"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>ADICIONAR AO CARRINHO</span>
          </button>

          {/* Secondary Options: Ver Detalhes */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onAddToCart(product, false)}
              className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white/5 hover:bg-orange-500/15 border border-white/10 hover:border-orange-500/40 text-slate-200 hover:text-orange-400 text-xs font-bold uppercase tracking-wider transition-colors"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>+ 1 Unidade</span>
            </button>

            <button
              onClick={() => onViewDetails(product)}
              className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 hover:text-white text-xs font-bold uppercase tracking-wider transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Ficha Técnica</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
