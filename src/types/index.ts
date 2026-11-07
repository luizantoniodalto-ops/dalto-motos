export type TireCategory = 'esportivo' | 'street' | 'touring' | 'trail' | 'off-road';

export type TirePosition = 'dianteiro' | 'traseiro' | 'par';

export interface TireProduct {
  id: string;
  name: string;
  brand: 'Metzeler' | 'Pirelli' | 'Michelin' | 'Bridgestone' | 'Dunlop' | 'Continental';
  model: string;
  category: TireCategory;
  position: TirePosition;
  measure: string; // e.g. "120/70 ZR17 M/C (58W) TL"
  rim: number; // e.g. 17
  width: number; // e.g. 120
  aspectRatio: number; // e.g. 70
  speedRating: string; // e.g. "(W) >270 km/h"
  loadIndex: string; // e.g. "58 (236 kg)"
  construction: 'Radial' | 'Diagonal / Bias';
  tubeType: 'TL (Sem câmara)' | 'TT (Com câmara)';
  price: number; // regular price in BRL
  pixDiscountPercent: number; // e.g. 10
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  stockQty: number;
  highlightTag?: string; // e.g. "Mais Vendido", "Campeão de Pista", "Lançamento"
  image: string;
  technologyFeatures: string[];
  description: string;
  recommendedPressureSolo: string;
  recommendedPressurePassenger: string;
  compatibleMotorcycleIds: string[]; // IDs of bikes in the catalog
}

export interface MotorcycleSpec {
  id: string;
  brand: string; // e.g. "BMW"
  model: string; // e.g. "S1000RR"
  years: number[]; // e.g. [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026]
  category: TireCategory;
  frontTireMeasure: string; // e.g. "120/70 ZR17"
  rearTireMeasure: string; // e.g. "190/55 ZR17" or "200/55 ZR17"
  powerHp: number;
  engineDisplacement: string;
  recommendedRimFront: number;
  recommendedRimRear: number;
}

export interface CartItem {
  product: TireProduct;
  quantity: number;
  selectedOption?: string;
}

export interface FilterOptions {
  category: TireCategory | 'all';
  brand: string | 'all';
  rim: number | 'all';
  position: TirePosition | 'all';
  searchQuery: string;
  sortBy: 'relevance' | 'price-asc' | 'price-desc' | 'rating';
  compatibleBikeId?: string | null;
}
