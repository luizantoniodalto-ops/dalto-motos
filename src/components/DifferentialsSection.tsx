import React from 'react';
import { Gauge, ShieldCheck, Flame, Compass, CloudRain, Cpu, Layers, Trophy, Bike, Sparkles } from 'lucide-react';

export const DifferentialsSection: React.FC = () => {
  const performancePillars = [
    {
      title: 'MAIS ADERÊNCIA',
      subtitle: 'No seco e no molhado',
      description: 'Sílica de alta dispersão molecular que garante aquecimento ultrarrápido mesmo em asfalto frio ou sob chuva torrencial.',
      icon: Gauge,
    },
    {
      title: 'EXCELENTE ESTABILIDADE',
      subtitle: 'Em altas velocidades',
      description: 'Cinta de aço longitudinal a zero graus que elimina a deformação centrífuga da carcaça acima de 250 km/h.',
      icon: Flame,
    },
    {
      title: 'RESPOSTA RÁPIDA',
      subtitle: 'E precisa nas curvas',
      description: 'Contorno de múltiplos raios que proporciona transições de inclinação ágeis, com feedback tátil imediato no guidão.',
      icon: Compass,
    },
    {
      title: 'DESGASTE UNIFORME',
      subtitle: 'Maior durabilidade',
      description: 'Distribuição inteligente das tensões de contato que previne o escalonamento precoce e prolonga a quilometragem.',
      icon: Layers,
    },
    {
      title: 'SEGURANÇA EM QUALQUER CLIMA',
      subtitle: 'Tecnologia de ponta',
      description: 'Sulcos direcionais projetados para romper a lâmina d’água e anular riscos de aquaplanagem.',
      icon: CloudRain,
    },
  ];

  const techCards = [
    {
      title: 'DESENHO ESPORTIVO',
      desc: 'Máxima tração e escoamento de água com sulcos em forma de raios orientados.',
      tag: 'Tread Dynamics',
    },
    {
      title: 'COMPOSTO MULTI-TECNOLOGIA',
      desc: 'Equilíbrio cirúrgico entre aderência em ângulos de inclinação máxima e longevidade na faixa central.',
      tag: 'Bi-Compound Full Silica',
    },
    {
      title: 'ESTRUTURA DE ALTA PERFORMANCE',
      desc: 'Mais estabilidade direcional e absorção de imperfeições no asfalto com carcaça radial com enrolamento zero graus.',
      tag: '0° Steel Belt',
    },
    {
      title: 'TRADIÇÃO MUNDIAL HOMOLOGADA',
      desc: 'Pneus aprovados pelas principais montadoras mundiais e testados nos circuitos mais desafiadores do planeta.',
      tag: 'World Superbike Heritage',
    },
  ];

  return (
    <section id="diferenciais" className="py-16 lg:py-24 bg-[#0a0b0f] border-b border-white/10 relative overflow-hidden">
      {/* Background carbon texture */}
      <div className="absolute inset-0 bg-carbon-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#ff5500]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-xs font-bold text-orange-400 uppercase tracking-widest">
            <Cpu className="w-3.5 h-3.5 text-[#ff5500]" />
            <span>Engenharia de Pista Aplicada às Ruas</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl uppercase italic tracking-tight text-white">
            TECNOLOGIA QUE <span className="text-[#ff5500]">FAZ A DIFERENÇA</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-400 font-body">
            Cada milímetro do pneu foi desenvolvido para garantir o máximo de controle, resposta milimétrica e confiança absoluta em qualquer asfalto.
          </p>
        </div>

        {/* 5 Performance Pillars (Inspired directly by reference image icons) */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-16">
          {performancePillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-gradient-to-b from-[#161a25] to-[#10131c] border border-white/10 hover:border-orange-500/50 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-[#ff5500] mb-4 group-hover:scale-110 group-hover:bg-[#ff5500] group-hover:text-white transition-all">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="font-display font-extrabold text-lg uppercase italic text-white group-hover:text-[#ff5500] transition-colors leading-tight">
                    {pillar.title}
                  </h3>
                  <p className="text-xs font-bold text-orange-400 mt-0.5 uppercase tracking-wide">
                    {pillar.subtitle}
                  </p>
                  <p className="text-xs text-slate-400 mt-2.5 font-body leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="font-mono">Pilar 0{idx + 1}</span>
                  <span className="text-emerald-400 font-semibold">100% Validado</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* 4 Tech Details Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {techCards.map((tech, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-[#0f121a] border border-white/10 hover:border-orange-500/40 transition-colors"
            >
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#ff5500]">
                {tech.tag}
              </span>
              <h4 className="font-display font-extrabold text-base uppercase italic text-white mt-1">
                {tech.title}
              </h4>
              <p className="text-xs text-slate-400 mt-2 font-body leading-relaxed">
                {tech.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Riding Contexts Row (Na Cidade, Na Estrada, Na Pista) */}
        <div className="mt-12 bg-gradient-to-r from-[#171b26] via-[#1f1715] to-[#171b26] border border-orange-500/30 rounded-2xl p-6 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10 gap-6">
            
            {/* Context 1 */}
            <div className="flex items-center gap-4 py-2 md:py-0 md:px-4">
              <div className="w-12 h-12 rounded-xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-[#ff5500] shrink-0">
                <Bike className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider font-bold text-slate-400">Na Cidade</p>
                <h4 className="font-display font-extrabold text-xl uppercase italic text-white">
                  MAIS CONFIANÇA
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">Frenagens curtas e transições ágeis no trânsito.</p>
              </div>
            </div>

            {/* Context 2 */}
            <div className="flex items-center gap-4 py-2 md:py-0 md:px-4">
              <div className="w-12 h-12 rounded-xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-[#ff5500] shrink-0">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider font-bold text-slate-400">Na Estrada</p>
                <h4 className="font-display font-extrabold text-xl uppercase italic text-white">
                  MAIS LIBERDADE
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">Estabilidade direcional e alta quilometragem.</p>
              </div>
            </div>

            {/* Context 3 */}
            <div className="flex items-center gap-4 py-2 md:py-0 md:px-4">
              <div className="w-12 h-12 rounded-xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-[#ff5500] shrink-0">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider font-bold text-slate-400">Na Pista</p>
                <h4 className="font-display font-extrabold text-xl uppercase italic text-white">
                  MAIS PERFORMANCE
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">Grip no limite do joelho no chão e tração plena.</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
