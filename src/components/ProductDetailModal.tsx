import React from 'react';
import { X, Check, ShoppingCart, MessageCircle, ShieldCheck, Gauge, Zap, Star } from 'lucide-react';
import { TireProduct, MotorcycleSpec } from '../types';
import { MOTORCYCLES } from '../data/catalog';

interface ProductDetailModalProps {
  product: TireProduct | null;
  onClose: () => void;
  onAddToCart: (product: TireProduct, openDrawer?: boolean) => void;
  onSelectBikeFilter: (bike: MotorcycleSpec) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onSelectBikeFilter,
}) => {
  if (!product) return null;

  const pixPrice = product.price * (1 - product.pixDiscountPercent / 100);
  const installment12x = product.price / 12;

  // Find compatible bikes from catalog
  const compatibleBikes = MOTORCYCLES.filter(bike =>
    product.compatibleMotorcycleIds.includes(bike.id)
  );

  const handleWhatsAppInquiry = () => {
    const text = encodeURIComponent(
      `Olá! Tenho interesse no pneu ${product.brand} ${product.name} (Medida: ${product.measure}). Gostaria de tirar dúvidas sobre pronta entrega e compatibilidade.`
    );
    window.open(`https://wa.me/5511999998888?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
      />

      <div className="min-h-screen px-4 text-center flex items-center justify-center p-4">
        {/* Modal Window */}
        <div className="relative inline-block w-full max-w-4xl p-6 sm:p-8 my-8 text-left align-middle bg-[#0f121a] border border-orange-500/40 rounded-3xl shadow-2xl shadow-black glow-orange text-slate-100 overflow-hidden">
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Product Showcase */}
            <div className="md:col-span-5 space-y-4">
              <div className="relative rounded-2xl bg-[#08090d] border border-white/10 p-6 flex items-center justify-center overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-72 object-contain drop-shadow-2xl"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#ff5500] text-black font-display font-black text-xs uppercase italic tracking-wider">
                  {product.highlightTag || product.brand}
                </span>
              </div>

              {/* Recommended Pressures */}
              <div className="p-4 rounded-xl bg-[#141722] border border-white/10 space-y-2 text-xs">
                <p className="font-bold text-white uppercase flex items-center gap-1.5">
                  <Gauge className="w-4 h-4 text-[#ff5500]" />
                  <span>Calibragem Homologada Sugerida</span>
                </p>
                <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
                  <div className="p-2 rounded bg-black/40 border border-white/5">
                    <span className="text-slate-400 block text-[10px]">Piloto Solo</span>
                    <strong className="text-white">{product.recommendedPressureSolo}</strong>
                  </div>
                  <div className="p-2 rounded bg-black/40 border border-white/5">
                    <span className="text-slate-400 block text-[10px]">Com Garupa</span>
                    <strong className="text-white">{product.recommendedPressurePassenger}</strong>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Technical Specifications & Actions */}
            <div className="md:col-span-7 space-y-5">
              
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-orange-400 uppercase tracking-widest mb-1">
                  <span>{product.brand} MOTORRAD</span>
                  <span>·</span>
                  <span className="font-mono text-slate-400">{product.construction}</span>
                </div>

                <h2 className="font-display font-extrabold text-2xl sm:text-3xl uppercase italic text-white leading-tight">
                  {product.name}
                </h2>

                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-mono font-bold text-white">5.0 / 5.0</span>
                  <span className="text-xs text-slate-400">({product.reviewsCount} pilotos avaliaram)</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-body">
                {product.description}
              </p>

              {/* Technical Spec Table */}
              <div className="p-4 rounded-xl bg-[#131622] border border-white/10 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-orange-400">
                  Ficha Técnica Completa
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs font-mono">
                  <div className="p-2 rounded bg-black/30">
                    <span className="text-[10px] text-slate-400 uppercase block">Medida</span>
                    <strong className="text-white">{product.measure}</strong>
                  </div>
                  <div className="p-2 rounded bg-black/30">
                    <span className="text-[10px] text-slate-400 uppercase block">Aro</span>
                    <strong className="text-white">{product.rim} Polegadas</strong>
                  </div>
                  <div className="p-2 rounded bg-black/30">
                    <span className="text-[10px] text-slate-400 uppercase block">Índice Carga/Vel.</span>
                    <strong className="text-white">{product.speedRating}</strong>
                  </div>
                  <div className="p-2 rounded bg-black/30">
                    <span className="text-[10px] text-slate-400 uppercase block">Construção</span>
                    <strong className="text-white">{product.construction}</strong>
                  </div>
                  <div className="p-2 rounded bg-black/30">
                    <span className="text-[10px] text-slate-400 uppercase block">Tipo de Montagem</span>
                    <strong className="text-white">{product.tubeType}</strong>
                  </div>
                  <div className="p-2 rounded bg-black/30">
                    <span className="text-[10px] text-slate-400 uppercase block">Garantia</span>
                    <strong className="text-emerald-400">5 Anos de Fábrica</strong>
                  </div>
                </div>
              </div>

              {/* Technology Highlights */}
              <div className="space-y-1.5">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Destaques da Engenharia
                </p>
                <div className="space-y-1 text-xs text-slate-300">
                  {product.technologyFeatures.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#ff5500] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Compatible Motorcycles list */}
              {compatibleBikes.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Motos Homologadas para esta Medida ({compatibleBikes.length})
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {compatibleBikes.map(bike => (
                      <button
                        key={bike.id}
                        onClick={() => {
                          onSelectBikeFilter(bike);
                          onClose();
                        }}
                        className="px-2.5 py-1 rounded-lg bg-[#181c28] hover:bg-orange-500/20 hover:text-orange-400 border border-white/10 text-[11px] text-slate-300 transition-colors"
                        title="Filtrar catálogo para esta moto"
                      >
                        {bike.brand} {bike.model}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Pricing & Buy Box */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono font-black text-2xl sm:text-3xl text-white">
                      R$ {pixPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                    <span className="text-xs font-bold text-emerald-400 uppercase">
                      à vista no Pix (10% OFF)
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-mono">
                    ou 12x de R$ {installment12x.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} sem juros
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleWhatsAppInquiry}
                    className="p-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-colors flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider"
                    title="Dúvidas no WhatsApp"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span className="hidden sm:inline">Comprar no WhatsApp</span>
                  </button>

                  <button
                    onClick={() => {
                      onAddToCart(product, true);
                      onClose();
                    }}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#ff5500] to-[#e04b00] hover:from-[#ff6600] hover:to-[#eb5300] text-white font-display uppercase italic font-black text-base sm:text-lg tracking-wider shadow-lg shadow-[#ff5500]/30 transition-all transform active:scale-95 cursor-pointer"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>ADICIONAR AO CARRINHO</span>
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
