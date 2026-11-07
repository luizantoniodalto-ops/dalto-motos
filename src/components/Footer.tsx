import React from 'react';
import { MessageCircle, Phone, Mail, MapPin, ShieldCheck, Clock, Instagram, Youtube, Facebook, ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateSection }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#07080b] border-t border-white/10 text-slate-400 text-xs font-body">
      {/* Upper Info Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Column 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-[#ff5500] flex items-center justify-center font-display font-extrabold text-white text-xl">
                A
              </div>
              <span className="font-display font-black text-2xl uppercase italic text-white tracking-wider">
                APEX <span className="text-[#ff5500]">TIRES</span>
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              E-commerce brasileiro especializado em pneus de alta performance para motocicletas. Parceiro oficial das marcas líderes com entrega rápida e garantia homologada de fábrica.
            </p>

            <div className="space-y-2 text-xs text-slate-300">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#ff5500] shrink-0" />
                <span>Av. das Nações Unidas, 14.261 - Morumbi, São Paulo - SP</span>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#ff5500] shrink-0" />
                <span>Atendimento: Seg à Sex das 08h às 19h | Sáb das 09h às 14h</span>
              </p>
            </div>

            {/* Social Links */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#ff5500] hover:text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#ff5500] hover:text-white flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#ff5500] hover:text-white flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Navegação & Categorias */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-sm uppercase italic tracking-wider text-white">
              Navegação
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigateSection('localizador')}
                  className="hover:text-orange-400 transition-colors"
                >
                  Localizador por Moto
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('catalogo')}
                  className="hover:text-orange-400 transition-colors"
                >
                  Catálogo Completo
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('categorias')}
                  className="hover:text-orange-400 transition-colors"
                >
                  Pneus Esportivos
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('categorias')}
                  className="hover:text-orange-400 transition-colors"
                >
                  Pneus Street & Naked
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('categorias')}
                  className="hover:text-orange-400 transition-colors"
                >
                  Trail & Big Trail
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('diferenciais')}
                  className="hover:text-orange-400 transition-colors"
                >
                  Diferenciais Tecnológicos
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Ajuda & Políticas */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-sm uppercase italic tracking-wider text-white">
              Políticas & Garantia
            </h4>
            <ul className="space-y-2">
              <li>
                <span className="text-slate-400 hover:text-white cursor-pointer">
                  Termo de Garantia de 5 Anos
                </span>
              </li>
              <li>
                <span className="text-slate-400 hover:text-white cursor-pointer">
                  Política de Trocas e Devoluções
                </span>
              </li>
              <li>
                <span className="text-slate-400 hover:text-white cursor-pointer">
                  Frete e Prazo de Entrega
                </span>
              </li>
              <li>
                <span className="text-slate-400 hover:text-white cursor-pointer">
                  Tabela de Calibragem por Moto
                </span>
              </li>
              <li>
                <span className="text-slate-400 hover:text-white cursor-pointer">
                  Como Ler a Medida do seu Pneu
                </span>
              </li>
              <li>
                <span className="text-slate-400 hover:text-white cursor-pointer">
                  Segurança e Privacidade (LGPD)
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Canais de Atendimento */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-sm uppercase italic tracking-wider text-white">
              Atendimento Especializado
            </h4>
            
            <a
              href="https://wa.me/5511999998888?text=Olá!%20Gostaria%20de%20ajuda%20para%20escolher%20os%20pneus%20da%20minha%20moto"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-white hover:bg-emerald-500/20 transition-colors group"
            >
              <MessageCircle className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <p className="text-[10px] text-emerald-400 uppercase font-bold">WhatsApp Oficial</p>
                <p className="font-mono text-xs font-bold text-white">(11) 99999-8888</p>
              </div>
            </a>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <p className="text-[10px] text-slate-400 uppercase font-bold flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#ff5500]" />
                Televendas e Dúvidas Técnicas
              </p>
              <p className="font-mono text-xs font-bold text-white">0800 770 9900</p>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
              <Mail className="w-3.5 h-3.5 text-orange-400" />
              <span>contato@apextires.com.br</span>
            </div>
          </div>

        </div>

        {/* Payment Methods & Certifications Row */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Payment Badges */}
          <div className="space-y-1 text-center md:text-left">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
              Formas de Pagamento Homologadas
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1 font-mono text-[11px]">
              <span className="px-2 py-1 rounded bg-[#12151e] border border-white/10 text-emerald-400 font-bold">
                ⚡ Pix (10% OFF)
              </span>
              <span className="px-2 py-1 rounded bg-[#12151e] border border-white/10 text-white">
                Visa
              </span>
              <span className="px-2 py-1 rounded bg-[#12151e] border border-white/10 text-white">
                Mastercard
              </span>
              <span className="px-2 py-1 rounded bg-[#12151e] border border-white/10 text-white">
                Elo
              </span>
              <span className="px-2 py-1 rounded bg-[#12151e] border border-white/10 text-white">
                Hipercard
              </span>
              <span className="px-2 py-1 rounded bg-[#12151e] border border-white/10 text-slate-300">
                Boleto Bancário
              </span>
            </div>
          </div>

          {/* Security Badges */}
          <div className="flex items-center gap-4 text-slate-400">
            <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/10">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-[11px] font-bold text-white">SELO INMETRO OFICIAL</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/10">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-[11px] font-bold text-white">SSL 256-BIT</span>
            </div>
          </div>
        </div>

      </div>

      {/* Copyright Bar */}
      <div className="border-t border-white/5 bg-[#050608] py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-slate-500 text-[11px]">
          <p>
            © 2026 APEX MOTO TIRES LTDA. Todos os direitos reservados. CNPJ: 42.189.502/0001-84.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <span>Voltar ao topo</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#ff5500]" />
          </button>
        </div>
      </div>
    </footer>
  );
};
