import React, { useState, useMemo } from 'react';
import { Search, RotateCcw, CheckCircle, ChevronDown, Sparkles, HelpCircle, ShoppingBag, ArrowRight, Zap, ShieldCheck } from 'lucide-react';
import { MOTORCYCLES, TIRES } from '../data/catalog';
import { MotorcycleSpec, TireProduct } from '../types';

interface SmartTireLocatorProps {
  onSearchCompatible: (bike: MotorcycleSpec | null, year?: number) => void;
  selectedBike: MotorcycleSpec | null;
  selectedYear: number | null;
  onClearBikeFilter: () => void;
  onAddToCart?: (product: TireProduct, openDrawer?: boolean) => void;
}

export const SmartTireLocator: React.FC<SmartTireLocatorProps> = ({
  onSearchCompatible,
  selectedBike,
  selectedYear,
  onClearBikeFilter,
  onAddToCart,
}) => {
  const [selectedBrand, setSelectedBrand] = useState<string>(selectedBike?.brand || '');
  const [selectedModelId, setSelectedModelId] = useState<string>(selectedBike?.id || '');
  const [year, setYear] = useState<string>(selectedYear ? selectedYear.toString() : '');
  const [isSearching, setIsSearching] = useState(false);

  // Extract unique brands
  const brands = useMemo(() => {
    const list = Array.from(new Set(MOTORCYCLES.map(m => m.brand)));
    return list.sort();
  }, []);

  // Filter models for chosen brand
  const availableModels = useMemo(() => {
    if (!selectedBrand) return [];
    return MOTORCYCLES.filter(m => m.brand === selectedBrand);
  }, [selectedBrand]);

  // Current active model object
  const currentModel = useMemo(() => {
    return MOTORCYCLES.find(m => m.id === selectedModelId) || null;
  }, [selectedModelId]);

  // Available years for chosen model
  const availableYears = useMemo(() => {
    if (!currentModel) return [];
    return [...currentModel.years].sort((a, b) => b - a);
  }, [currentModel]);

  // Best compatible tire for selected bike
  const topCompatibleTire = useMemo(() => {
    if (!selectedBike) return null;
    return (
      TIRES.find(
        t =>
          t.compatibleMotorcycleIds.includes(selectedBike.id) ||
          t.measure.includes(selectedBike.rearTireMeasure)
      ) || TIRES[0]
    );
  }, [selectedBike]);

  const handleBrandChange = (brand: string) => {
    setSelectedBrand(brand);
    setSelectedModelId('');
    setYear('');
  };

  const handleModelChange = (modelId: string) => {
    setSelectedModelId(modelId);
    const model = MOTORCYCLES.find(m => m.id === modelId);
    if (model && model.years.length > 0) {
      setYear(model.years[model.years.length - 1].toString());
    } else {
      setYear('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentModel) return;

    setIsSearching(true);
    setTimeout(() => {
      onSearchCompatible(currentModel, year ? parseInt(year, 10) : undefined);
      setIsSearching(false);
    }, 200);
  };

  const handleReset = () => {
    setSelectedBrand('');
    setSelectedModelId('');
    setYear('');
    onClearBikeFilter();
  };

  const scrollToCatalog = () => {
    const el = document.getElementById('catalogo');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="localizador" className="relative py-12 lg:py-16 bg-[#0e1017] border-y border-orange-500/20">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-carbon-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-32 bg-orange-600/10 blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title & Section Tagline */}
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-xs font-bold text-orange-400 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-[#ff5500]" />
            <span>Compatibilidade 100% Homologada</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl uppercase italic tracking-tight text-white">
            ENCONTRE O PNEU <span className="text-[#ff5500]">IDEAL PARA SUA MOTO</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-400 font-body">
            Selecione a marca, modelo e ano da sua motocicleta. Nosso algoritmo inteligente consulta a base técnica de medidas dianteira e traseira para exibir apenas os pneus perfeitamente compatíveis.
          </p>
        </div>

        {/* The 3-Selector Filter Card */}
        <div className="max-w-5xl mx-auto bg-gradient-to-b from-[#181c26] to-[#12151e] border-2 border-orange-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-black glow-orange">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              
              {/* Selector 1: Marca da Motocicleta */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                  1. Marca da Motocicleta <span className="text-[#ff5500]">*</span>
                </label>
                <div className="relative">
                  <select
                    value={selectedBrand}
                    onChange={(e) => handleBrandChange(e.target.value)}
                    className="w-full appearance-none bg-[#0e1017] border border-white/15 hover:border-orange-500/50 rounded-xl px-4 py-3.5 text-sm text-white font-medium focus:outline-none focus:border-[#ff5500] focus:ring-1 focus:ring-[#ff5500] transition-colors cursor-pointer"
                  >
                    <option value="">Selecione a marca...</option>
                    {brands.map(brand => (
                      <option key={brand} value={brand} className="bg-[#12151d] text-white">
                        {brand}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Selector 2: Modelo da Motocicleta */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                  2. Modelo da Motocicleta <span className="text-[#ff5500]">*</span>
                </label>
                <div className="relative">
                  <select
                    value={selectedModelId}
                    onChange={(e) => handleModelChange(e.target.value)}
                    disabled={!selectedBrand}
                    className="w-full appearance-none bg-[#0e1017] border border-white/15 hover:border-orange-500/50 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl px-4 py-3.5 text-sm text-white font-medium focus:outline-none focus:border-[#ff5500] focus:ring-1 focus:ring-[#ff5500] transition-colors cursor-pointer"
                  >
                    <option value="">
                      {selectedBrand ? 'Selecione o modelo...' : 'Primeiro escolha a marca'}
                    </option>
                    {availableModels.map(bike => (
                      <option key={bike.id} value={bike.id} className="bg-[#12151d] text-white">
                        {bike.model} ({bike.engineDisplacement})
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Selector 3: Ano de Fabricação */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                  3. Ano de Fabricação <span className="text-[#ff5500]">*</span>
                </label>
                <div className="relative">
                  <select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    disabled={!currentModel}
                    className="w-full appearance-none bg-[#0e1017] border border-white/15 hover:border-orange-500/50 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl px-4 py-3.5 text-sm text-white font-medium focus:outline-none focus:border-[#ff5500] focus:ring-1 focus:ring-[#ff5500] transition-colors cursor-pointer font-mono"
                  >
                    <option value="">
                      {currentModel ? 'Selecione o ano...' : 'Aguardando modelo'}
                    </option>
                    {availableYears.map(y => (
                      <option key={y} value={y} className="bg-[#12151d] text-white">
                        {y}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

            </div>

            {/* Action buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-white/10">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <HelpCircle className="w-4 h-4 text-orange-400 shrink-0" />
                <span>Base técnica oficial de compatibilidade com garantia 100%.</span>
              </div>

              <div className="flex items-center gap-3">
                {(selectedBrand || selectedModelId || selectedBike) && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Limpar Filtro</span>
                  </button>
                )}

                <button
                  type="submit"
                  disabled={!currentModel || isSearching}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#ff5500] to-[#e04b00] hover:from-[#ff6600] hover:to-[#eb5300] disabled:opacity-40 disabled:cursor-not-allowed text-white font-display uppercase italic font-black text-lg tracking-wider shadow-lg shadow-[#ff5500]/30 transition-all transform active:scale-95 cursor-pointer"
                >
                  <Search className="w-5 h-5" />
                  <span>{isSearching ? 'LOCALIZANDO...' : 'ENCONTRAR MEUS PNEUS'}</span>
                </button>
              </div>
            </div>
          </form>

          {/* Active Motorcycle Compatibility Box with Direct ADD TO CART Option */}
          {selectedBike && (
            <div className="mt-6 p-5 rounded-2xl bg-[#090b0f] border-2 border-orange-500/50 shadow-2xl animate-in fade-in duration-300 space-y-4">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400">
                      <CheckCircle className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-xs uppercase tracking-wider font-bold text-orange-400">
                      Moto Selecionada & Medidas OEM Confirmadas
                    </span>
                    {selectedYear && (
                      <span className="text-xs font-mono text-slate-400">
                        (Ano {selectedYear})
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-display uppercase italic tracking-wide">
                    {selectedBike.brand} {selectedBike.model}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Motor: <strong className="text-white">{selectedBike.engineDisplacement}</strong> · Potência: <strong className="text-white">{selectedBike.powerHp} cv</strong>
                  </p>
                </div>

                {/* OEM Specifications Badges */}
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <div className="bg-[#141722] border border-white/10 rounded-lg px-3 py-2">
                    <p className="text-[10px] text-slate-400 uppercase font-semibold">Dianteiro OEM</p>
                    <p className="font-mono font-bold text-orange-400 text-xs">{selectedBike.frontTireMeasure}</p>
                  </div>
                  <div className="bg-[#141722] border border-white/10 rounded-lg px-3 py-2">
                    <p className="text-[10px] text-slate-400 uppercase font-semibold">Traseiro OEM</p>
                    <p className="font-mono font-bold text-orange-400 text-xs">{selectedBike.rearTireMeasure}</p>
                  </div>
                  <button
                    onClick={onClearBikeFilter}
                    className="text-xs text-slate-400 hover:text-orange-400 underline ml-2"
                  >
                    Limpar
                  </button>
                </div>
              </div>

              {/* Direct Instant Recommended Compatible Tire with ADD TO CART */}
              {topCompatibleTire && (
                <div className="bg-[#131722] border border-orange-500/30 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 rounded-lg bg-black/60 border border-white/10 p-1 flex items-center justify-center shrink-0">
                      <img
                        src={topCompatibleTire.image}
                        alt={topCompatibleTire.name}
                        className="w-full h-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded">
                          Recomendado para sua moto
                        </span>
                        <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5" /> 100% Compatível
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white mt-1">
                        {topCompatibleTire.name}
                      </h4>
                      <p className="text-xs font-mono text-slate-300">
                        {topCompatibleTire.measure} · <strong className="text-emerald-400">R$ {(topCompatibleTire.price * 0.9).toLocaleString('pt-BR', { minimumFractionDigits: 2 })} no Pix</strong>
                      </p>
                    </div>
                  </div>

                  {/* Immediate Action Buttons */}
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    {onAddToCart && (
                      <button
                        onClick={() => onAddToCart(topCompatibleTire, true)}
                        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#ff5500] to-[#e04b00] hover:from-[#ff6600] hover:to-[#eb5300] text-white font-display uppercase italic font-black text-sm tracking-wider shadow-lg shadow-[#ff5500]/30 transition-all transform active:scale-95 cursor-pointer"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        <span>ADICIONAR AO CARRINHO</span>
                      </button>
                    )}

                    <button
                      onClick={scrollToCatalog}
                      className="inline-flex items-center justify-center gap-1 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider transition-colors"
                    >
                      <span>Ver Mais Opções</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
