import React from 'react';
import { Truck, ShieldCheck, CreditCard, Headphones, Clock, RefreshCw } from 'lucide-react';

export const StoreBenefits: React.FC = () => {
  const benefits = [
    {
      icon: Truck,
      title: 'ENTREGA EXPRESSA BRASIL',
      desc: 'Despacho em até 24h úteis. Embalagem reforçada para evitar deformações nos aros e carcaça durante o transporte.',
    },
    {
      icon: CreditCard,
      title: 'PAGAMENTO SEGURO & FACILITADO',
      desc: '10% de desconto imediato no Pix ou parcele em até 12x sem juros em todos os principais cartões de crédito.',
    },
    {
      icon: ShieldCheck,
      title: '5 ANOS DE GARANTIA OFICIAL',
      desc: 'Cobertura integral contra defeitos de fabricação direto dos fabricantes (Metzeler, Pirelli, Michelin, Bridgestone, Dunlop).',
    },
    {
      icon: Headphones,
      title: 'SUPORTE TÉCNICO ESPECIALIZADO',
      desc: 'Dúvidas sobre compostos, calibragem ou medidas? Fale no WhatsApp com quem realmente entende e pilota motos.',
    },
  ];

  return (
    <section className="py-14 bg-[#0a0c10] border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <div
                key={i}
                className="bg-[#12151e] border border-white/10 rounded-2xl p-6 relative overflow-hidden group hover:border-orange-500/40 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/25 flex items-center justify-center text-[#ff5500] mb-4 group-hover:bg-[#ff5500] group-hover:text-white transition-all">
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="font-display font-extrabold text-lg uppercase italic text-white group-hover:text-[#ff5500] transition-colors">
                  {b.title}
                </h3>

                <p className="text-xs text-slate-400 mt-2 font-body leading-relaxed">
                  {b.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
