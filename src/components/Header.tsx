import React, { useState, useRef, useEffect } from 'react';
import { ShoppingBag, Search, ShieldCheck, Flame, X, ArrowRight, Menu } from 'lucide-react';
import { TireProduct } from '../types';

interface HeaderProps {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSelectProduct: (product: TireProduct) => void;
  allTires: TireProduct[];
  onNavigateSection: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  cartTotal,
  onOpenCart,
  searchQuery,
  onSearchChange,
  onSelectProduct,
  allTires,
  onNavigateSection,
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Search filtered items
  const searchResults = searchQuery.trim() === ''
    ? []
    : allTires.filter(tire =>
        tire.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tire.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tire.measure.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tire.model.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0d0f14]/95 backdrop-blur-md border-b border-white/10 shadow-2xl">
      {/* Top utility ticker */}
      <div className="bg-gradient-to-r from-[#181b24] via-[#221812] to-[#181b24] border-b border-orange-500/20 text-xs py-1.5 px-4 text-center">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-slate-300 tracking-wide font-medium">
          <div className="hidden md:flex items-center gap-4 text-[13px]">
            <span className="flex items-center gap-1.5 text-[#ff5500]">
              <Flame className="w-3.5 h-3.5" />
              <span>SUPER LIQUIDAÇÃO SPORTEC M9 RR & DIABLO ROSSO</span>
            </span>
            <span className="text-slate-600">|</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Garantia de 5 anos direto de fábrica</span>
            </span>
          </div>

          <div className="w-full md:w-auto flex items-center justify-center md:justify-end gap-3 text-[12px]">
            <span className="text-emerald-400 font-semibold">10% OFF NO PIX</span>
            <span>·</span>
            <span>12X SEM JUROS</span>
            <span>·</span>
            <span className="text-[#ff5500] font-semibold">FRETE GRÁTIS ACIMA DE R$ 399</span>
          </div>
        </div>
      </div>

      {/* Main Bar complying with Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigateSection('hero')}
            className="flex items-center gap-2.5 group text-left focus:outline-none"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#ff5500] to-[#b33600] flex items-center justify-center shadow-lg shadow-[#ff5500]/30 transform group-hover:scale-105 transition-transform duration-200">
              <span className="font-display font-extrabold text-2xl text-white tracking-wider">A</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-white uppercase italic">
                  APEX <span className="text-[#ff5500]">TIRES</span>
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-bold tracking-widest uppercase bg-white/10 text-orange-400 rounded">
                  PRO
                </span>
              </div>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest hidden sm:block -mt-1 font-semibold">
                Especialista em Pneus de Alta Performance
              </p>
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation Links (single line, clean text) */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold tracking-wide text-slate-300">
          <button
            onClick={() => onNavigateSection('localizador')}
            className="hover:text-[#ff5500] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <span className="w-2 h-2 rounded-full bg-[#ff5500]"></span>
            <span>Localizador de Pneus</span>
          </button>
          <button
            onClick={() => onNavigateSection('catalogo')}
            className="hover:text-[#ff5500] transition-colors whitespace-nowrap shrink-0"
          >
            Catálogo & Ofertas
          </button>
          <button
            onClick={() => onNavigateSection('categorias')}
            className="hover:text-[#ff5500] transition-colors whitespace-nowrap shrink-0"
          >
            Categorias
          </button>
          <button
            onClick={() => onNavigateSection('diferenciais')}
            className="hover:text-[#ff5500] transition-colors whitespace-nowrap shrink-0"
          >
            Tecnologia & Segurança
          </button>
          <button
            onClick={() => onNavigateSection('marcas')}
            className="hover:text-[#ff5500] transition-colors whitespace-nowrap shrink-0"
          >
            Fabricantes
          </button>
        </nav>

        {/* Zone 3: Search & Cart Action */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Quick Search */}
          <div ref={searchContainerRef} className="relative">
            <div className="flex items-center">
              <div className="relative">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Buscar pneu, medida (ex: 180/55)..."
                  value={searchQuery}
                  onChange={(e) => {
                    onSearchChange(e.target.value);
                    setIsSearchOpen(true);
                  }}
                  onFocus={() => setIsSearchOpen(true)}
                  className="w-44 sm:w-64 md:w-72 bg-[#141720] border border-white/10 rounded-lg pl-9 pr-8 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#ff5500] focus:ring-1 focus:ring-[#ff5500] transition-all"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5 pointer-events-none" />
                {searchQuery && (
                  <button
                    onClick={() => {
                      onSearchChange('');
                      setIsSearchOpen(false);
                    }}
                    className="absolute right-2.5 top-2.5 text-slate-400 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Live Search Autocomplete Popover */}
            {isSearchOpen && searchResults.length > 0 && (
              <div className="absolute top-full mt-2 right-0 w-80 sm:w-96 bg-[#12151d] border border-orange-500/30 rounded-xl shadow-2xl overflow-hidden z-50">
                <div className="p-2 border-b border-white/5 bg-[#171b26] flex items-center justify-between text-[11px] font-semibold text-slate-400">
                  <span>RESULTADOS DA BUSCA ({searchResults.length})</span>
                  <span className="text-[#ff5500]">Pressione no item</span>
                </div>
                <div className="divide-y divide-white/5 max-h-80 overflow-y-auto">
                  {searchResults.map((tire) => (
                    <button
                      key={tire.id}
                      onClick={() => {
                        onSelectProduct(tire);
                        setIsSearchOpen(false);
                      }}
                      className="w-full text-left p-3 hover:bg-white/5 flex items-center gap-3 transition-colors group"
                    >
                      <div className="w-12 h-12 rounded bg-black/40 border border-white/10 p-1 flex items-center justify-center shrink-0">
                        <img
                          src={tire.image}
                          alt={tire.name}
                          className="w-full h-full object-contain"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-[#ff5500] uppercase tracking-wide">
                            {tire.brand}
                          </span>
                          <span className="text-slate-500 text-[10px]">·</span>
                          <span className="text-[11px] text-slate-400 font-mono">
                            {tire.measure}
                          </span>
                        </div>
                        <h4 className="text-xs font-semibold text-white truncate group-hover:text-orange-400 transition-colors">
                          {tire.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs font-bold text-emerald-400 font-mono">
                            R$ {(tire.price * 0.9).toLocaleString('pt-BR', { minimumFractionDigits: 2 })} no Pix
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-[#ff5500] group-hover:translate-x-1 transition-all shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Cart Primary CTA */}
          <button
            onClick={onOpenCart}
            aria-label="Abrir carrinho de compras"
            className="relative flex items-center gap-2.5 bg-gradient-to-r from-[#ff5500] to-[#e04b00] hover:from-[#ff6600] hover:to-[#eb5300] text-white px-3.5 sm:px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#ff5500]/25 transition-all transform active:scale-95"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-[#ff5500] text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline">Carrinho</span>
            {cartCount > 0 && (
              <span className="hidden md:inline font-mono text-[11px] font-bold bg-black/25 px-1.5 py-0.5 rounded">
                R$ {cartTotal.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}
              </span>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-[#0f121a] px-4 py-4 space-y-3 animate-in slide-in-from-top duration-200">
          <button
            onClick={() => {
              onNavigateSection('localizador');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 px-3 rounded-lg text-sm font-semibold text-orange-400 bg-orange-500/10 flex items-center justify-between"
          >
            <span>🏍️ Localizador por Moto</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              onNavigateSection('catalogo');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 px-3 rounded-lg text-sm font-semibold text-slate-200 hover:bg-white/5"
          >
            Todos os Pneus & Ofertas
          </button>
          <button
            onClick={() => {
              onNavigateSection('categorias');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 px-3 rounded-lg text-sm font-semibold text-slate-200 hover:bg-white/5"
          >
            Categorias (Esportivos, Street, Trail...)
          </button>
          <button
            onClick={() => {
              onNavigateSection('diferenciais');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 px-3 rounded-lg text-sm font-semibold text-slate-200 hover:bg-white/5"
          >
            Diferenciais de Pilotagem
          </button>
          <button
            onClick={() => {
              onNavigateSection('marcas');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 px-3 rounded-lg text-sm font-semibold text-slate-200 hover:bg-white/5"
          >
            Marcas & Fabricantes
          </button>
        </div>
      )}
    </header>
  );
};
