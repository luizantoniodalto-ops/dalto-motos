import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { SmartTireLocator } from './components/SmartTireLocator';
import { CategoriesSection } from './components/CategoriesSection';
import { ProductGrid } from './components/ProductGrid';
import { DifferentialsSection } from './components/DifferentialsSection';
import { BrandsSection } from './components/BrandsSection';
import { StoreBenefits } from './components/StoreBenefits';
import { FinalCtaBanner } from './components/FinalCtaBanner';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { TIRES, MOTORCYCLES } from './data/catalog';
import { TireProduct, TireCategory, TirePosition, MotorcycleSpec, CartItem } from './types';
import { Check, ShoppingBag } from 'lucide-react';

export default function App() {
  // Navigation & Filtering States
  const [activeCategory, setActiveCategory] = useState<TireCategory | 'all'>('all');
  const [activeBrand, setActiveBrand] = useState<string>('all');
  const [activePosition, setActivePosition] = useState<TirePosition | 'all'>('all');
  const [activeRim, setActiveRim] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'relevance' | 'price-asc' | 'price-desc' | 'rating'>('relevance');

  // Selected Motorcycle filter state
  const [selectedBike, setSelectedBike] = useState<MotorcycleSpec | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: TIRES[0], // Pre-loaded with featured Metzeler Sportec M9 RR Kit Par
      quantity: 1,
    },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Modal State
  const [detailModalProduct, setDetailModalProduct] = useState<TireProduct | null>(null);

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Cart calculations
  const cartCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  const cartTotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }, [cartItems]);

  const handleAddToCart = (product: TireProduct, openDrawer: boolean = true) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    showToast(`"${product.name}" adicionado ao carrinho!`);
    if (openDrawer) {
      setIsCartOpen(true);
    }
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCartItem(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Smart Locator actions
  const handleSearchCompatible = (bike: MotorcycleSpec | null, year?: number) => {
    setSelectedBike(bike);
    setSelectedYear(year || null);
    if (bike) {
      // Clear conflicting single category or brand filter so all bike options appear
      setActiveCategory('all');
      setActiveBrand('all');
      showToast(`Pneus filtrados para ${bike.brand} ${bike.model}`);
    }
  };

  const handleClearBikeFilter = () => {
    setSelectedBike(null);
    setSelectedYear(null);
  };

  // Section smooth scrolling navigation
  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Computed Filtered Tires
  const filteredProducts = useMemo(() => {
    let result = [...TIRES];

    // 1. Motorcycle compatibility filter
    if (selectedBike) {
      result = result.filter(tire =>
        tire.compatibleMotorcycleIds.includes(selectedBike.id) ||
        tire.measure.includes(selectedBike.frontTireMeasure) ||
        tire.measure.includes(selectedBike.rearTireMeasure)
      );
    }

    // 2. Category filter
    if (activeCategory !== 'all') {
      result = result.filter(tire => tire.category === activeCategory);
    }

    // 3. Brand filter
    if (activeBrand !== 'all') {
      result = result.filter(tire => tire.brand.toLowerCase() === activeBrand.toLowerCase());
    }

    // 4. Position filter
    if (activePosition !== 'all') {
      result = result.filter(tire => tire.position === activePosition);
    }

    // 5. Rim filter
    if (activeRim !== 'all') {
      result = result.filter(tire => tire.rim === activeRim);
    }

    // 6. Search Query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        tire =>
          tire.name.toLowerCase().includes(q) ||
          tire.brand.toLowerCase().includes(q) ||
          tire.measure.toLowerCase().includes(q) ||
          tire.model.toLowerCase().includes(q)
      );
    }

    // 7. Sort
    result.sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return b.reviewsCount - a.reviewsCount;
    });

    return result;
  }, [selectedBike, activeCategory, activeBrand, activePosition, activeRim, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-[#0b0c10] text-slate-100 flex flex-col font-body selection:bg-[#ff5500] selection:text-white">
      
      {/* 1. CABEÇALHO */}
      <Header
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSelectProduct={(product) => setDetailModalProduct(product)}
        allTires={TIRES}
        onNavigateSection={handleNavigateSection}
      />

      <main className="flex-1">
        {/* 2. BANNER PRINCIPAL */}
        <div id="hero">
          <HeroBanner
            onCtaClick={() => handleNavigateSection('catalogo')}
            onOpenLocator={() => handleNavigateSection('localizador')}
            onSelectFeaturedTire={() => setDetailModalProduct(TIRES[0])}
            onAddToCartFeatured={() => handleAddToCart(TIRES[0], true)}
          />
        </div>

        {/* 3. LOCALIZADOR INTELIGENTE DE PNEUS – PRINCIPAL FUNCIONALIDADE */}
        <SmartTireLocator
          onSearchCompatible={handleSearchCompatible}
          selectedBike={selectedBike}
          selectedYear={selectedYear}
          onClearBikeFilter={handleClearBikeFilter}
          onAddToCart={handleAddToCart}
        />

        {/* 4. CATEGORIAS */}
        <CategoriesSection
          activeCategory={activeCategory}
          onSelectCategory={(cat) => {
            setActiveCategory(cat);
            handleNavigateSection('catalogo');
          }}
        />

        {/* 5. PRODUTOS EM DESTAQUE */}
        <ProductGrid
          products={filteredProducts}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          activeBrand={activeBrand}
          onBrandChange={setActiveBrand}
          activePosition={activePosition}
          onPositionChange={setActivePosition}
          activeRim={activeRim}
          onRimChange={setActiveRim}
          sortBy={sortBy}
          onSortChange={setSortBy}
          selectedBike={selectedBike}
          onClearBikeFilter={handleClearBikeFilter}
          onAddToCart={handleAddToCart}
          onViewDetails={(product) => setDetailModalProduct(product)}
          onOpenLocator={() => handleNavigateSection('localizador')}
        />

        {/* 6. DIFERENCIAIS */}
        <DifferentialsSection />

        {/* 7. MARCAS */}
        <BrandsSection
          onSelectBrand={(brandName) => {
            setActiveBrand(brandName);
            handleNavigateSection('catalogo');
            showToast(`Filtrado por fabricante: ${brandName}`);
          }}
        />

        {/* 8. BENEFÍCIOS DA LOJA */}
        <StoreBenefits />

        {/* 9. CHAMADA FINAL */}
        <FinalCtaBanner
          onBuyFeatured={() => {
            handleAddToCart(TIRES[0], true);
          }}
          onOpenLocator={() => handleNavigateSection('localizador')}
        />
      </main>

      {/* 10. RODAPÉ */}
      <Footer onNavigateSection={handleNavigateSection} />

      {/* Cart Drawer with Full Checkout Flow */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />

      {/* Technical Detail Modal */}
      <ProductDetailModal
        product={detailModalProduct}
        onClose={() => setDetailModalProduct(null)}
        onAddToCart={handleAddToCart}
        onSelectBikeFilter={(bike) => {
          handleSearchCompatible(bike);
          handleNavigateSection('catalogo');
        }}
      />

      {/* WhatsApp Floating Contact */}
      <WhatsAppFloatingButton />

      {/* Floating Toast Notification with View Cart Action */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 flex items-center gap-3 bg-[#131622] border border-orange-500/50 text-white px-4 py-3 rounded-xl shadow-2xl shadow-black glow-orange animate-in slide-in-from-bottom duration-200">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <Check className="w-4 h-4" />
          </div>
          <span className="text-xs font-semibold">{toastMessage}</span>
          <button
            onClick={() => setIsCartOpen(true)}
            className="text-xs font-bold text-[#ff5500] hover:underline uppercase tracking-wider ml-1 cursor-pointer"
          >
            Ver Carrinho
          </button>
        </div>
      )}

    </div>
  );
}
