import React, { useState } from 'react';
import { 
  X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck, Check, 
  MessageCircle, ShieldCheck, QrCode, CreditCard, Copy, ChevronLeft, 
  MapPin, User, Phone, CheckCircle2 
} from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [step, setStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [cep, setCep] = useState('');
  const [shippingCalculated, setShippingCalculated] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'credit_card' | 'whatsapp'>('pix');
  const [installments, setInstallments] = useState<number>(1);
  const [copiedPix, setCopiedPix] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  // Customer form fields
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerNumber, setCustomerNumber] = useState('');
  const [customerCity, setCustomerCity] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const pixDiscount = paymentMethod === 'pix' ? subtotal * 0.10 : 0;
  const shippingCost = subtotal >= 399 ? 0 : 49.90;
  const finalTotal = subtotal - pixDiscount + (shippingCalculated ? shippingCost : 0);
  const cardTotal = subtotal + (shippingCalculated ? shippingCost : 0);
  const installmentValue = cardTotal / installments;

  const handleCalculateShipping = (e: React.FormEvent) => {
    e.preventDefault();
    if (cep.length >= 8) {
      setShippingCalculated(true);
    }
  };

  const handleWhatsAppCheckout = () => {
    const itemsSummary = items
      .map(
        i =>
          `• ${i.quantity}x ${i.product.brand} ${i.product.name} (${i.product.measure}) - R$ ${(
            i.product.price * i.quantity
          ).toFixed(2)}`
      )
      .join('\n');

    const message = encodeURIComponent(
      `Olá, Apex Moto Tires! Gostaria de finalizar o meu pedido:\n\n${itemsSummary}\n\n*Nome:* ${customerName || 'Cliente'}\n*Telefone:* ${customerPhone || 'Informado no WhatsApp'}\n*Endereço:* ${customerAddress ? `${customerAddress}, ${customerNumber} - ${customerCity}` : 'A informar'}\n*CEP:* ${cep || 'A informar'}\n*Forma de Pagamento:* ${paymentMethod === 'pix' ? 'Pix (com 10% OFF)' : 'Cartão de Crédito'}\n*Total Final:* R$ ${finalTotal.toFixed(2)}\n\nPoderiam me enviar os dados para confirmação e envio?`
    );

    window.open(`https://wa.me/5511999998888?text=${message}`, '_blank');
  };

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedOrder = `APX-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(generatedOrder);
    setStep('success');
  };

  const copyPixCode = () => {
    const fakePixKey = `00020126580014br.gov.bcb.pix0136apex-moto-tires-${orderNumber || '99281'}520400005303986540${finalTotal.toFixed(2)}5802BR5925APEX MOTO TIRES LTDA6009SAO PAULO62070503***6304`;
    navigator.clipboard.writeText(fakePixKey);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      {/* Slide-over panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-lg bg-[#0e1017] border-l border-white/10 shadow-2xl flex flex-col justify-between text-slate-200">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-[#131620]">
            <div className="flex items-center gap-2">
              {step !== 'cart' && (
                <button
                  onClick={() => setStep('cart')}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors mr-1"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}
              <ShoppingBag className="w-5 h-5 text-[#ff5500]" />
              <h2 className="font-display font-black text-lg sm:text-xl uppercase italic tracking-wider text-white">
                {step === 'cart' && `SEU CARRINHO (${items.reduce((acc, i) => acc + i.quantity, 0)})`}
                {step === 'checkout' && 'FINALIZAR COMPRA & ENTREGA'}
                {step === 'success' && 'PEDIDO CONFIRMADO!'}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* STEP 1: CART ITEMS & SHIPPING */}
          {step === 'cart' && (
            <>
              {items.length === 0 ? (
                /* Empty Cart */
                <div className="p-8 text-center flex-1 flex flex-col items-center justify-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-white/5 text-slate-500 flex items-center justify-center">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h3 className="font-display font-bold text-xl uppercase italic text-white">
                    Seu carrinho está vazio
                  </h3>
                  <p className="text-xs text-slate-400 max-w-xs">
                    Escolha o modelo da sua motocicleta ou navegue pelas categorias de pneus para adicionar itens.
                  </p>
                  <button
                    onClick={onClose}
                    className="px-6 py-3 rounded-xl bg-[#ff5500] hover:bg-[#ff6600] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-[#ff5500]/30 cursor-pointer"
                  >
                    Ver Pneus Disponíveis
                  </button>
                </div>
              ) : (
                /* Itemized Cart List */
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="bg-[#12151e] border border-white/5 rounded-xl p-3 flex gap-3 relative group"
                    >
                      {/* Thumbnail */}
                      <div className="w-16 h-16 rounded-lg bg-black/40 border border-white/10 p-1 flex items-center justify-center shrink-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-contain"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0 pr-6">
                        <div className="flex items-center gap-1.5 text-[10px] text-orange-400 font-bold uppercase">
                          <span>{item.product.brand}</span>
                          <span>·</span>
                          <span className="font-mono text-slate-400">{item.product.measure}</span>
                        </div>

                        <h4 className="text-xs font-semibold text-white truncate mt-0.5">
                          {item.product.name}
                        </h4>

                        <div className="mt-2 flex items-center justify-between">
                          {/* Quantity Stepper */}
                          <div className="flex items-center gap-2 bg-[#0a0c10] border border-white/10 rounded-lg px-2 py-1">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                              className="text-slate-400 hover:text-white"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-mono font-bold text-white px-1">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                              className="text-slate-400 hover:text-white"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <p className="font-mono text-xs font-bold text-white">
                              R$ {(item.product.price * item.quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </p>
                            <p className="text-[10px] text-emerald-400 font-mono">
                              Pix: R$ {(item.product.price * item.quantity * 0.9).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="absolute top-2.5 right-2.5 text-slate-500 hover:text-red-400 p-1"
                        title="Remover item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}

                  {/* CEP Shipping Calculator */}
                  <div className="mt-4 p-3 rounded-xl bg-[#141722] border border-white/5 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300">
                      <Truck className="w-4 h-4 text-[#ff5500]" />
                      <span>Calcular Frete e Prazo de Entrega</span>
                    </div>
                    <form onSubmit={handleCalculateShipping} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Digite seu CEP (ex: 01310-100)"
                        value={cep}
                        onChange={(e) => setCep(e.target.value.replace(/\D/g, '').slice(0, 8))}
                        className="flex-1 bg-[#0b0c10] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 font-mono focus:outline-none focus:border-[#ff5500]"
                      />
                      <button
                        type="submit"
                        className="px-3.5 py-1.5 rounded-lg bg-[#ff5500] hover:bg-[#ff6600] text-white text-xs font-bold"
                      >
                        Calcular
                      </button>
                    </form>

                    {shippingCalculated && (
                      <div className="pt-2 text-xs space-y-1.5 font-mono">
                        <div className="flex items-center justify-between p-2 rounded bg-black/40 border border-emerald-500/30">
                          <div>
                            <p className="font-bold text-white flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                              Transportadora Express Homologada
                            </p>
                            <p className="text-[10px] text-slate-400">Entrega garantida em 2 a 4 dias úteis</p>
                          </div>
                          <span className="font-bold text-emerald-400">
                            {subtotal >= 399 ? 'FRETE GRÁTIS' : 'R$ 49,90'}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Cart Footer */}
              {items.length > 0 && (
                <div className="p-4 bg-[#12151f] border-t border-white/10 space-y-3">
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between text-slate-400">
                      <span>Subtotal dos Produtos</span>
                      <span className="font-mono text-white">
                        R$ {subtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="flex justify-between text-emerald-400">
                      <span>Desconto Especial no Pix (10% OFF)</span>
                      <span className="font-mono">
                        - R$ {(subtotal * 0.10).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Frete</span>
                      <span className="font-mono text-white">
                        {subtotal >= 399 ? (
                          <strong className="text-emerald-400">GRÁTIS (acima de R$ 399)</strong>
                        ) : shippingCalculated ? (
                          'R$ 49,90'
                        ) : (
                          'Informe o CEP acima'
                        )}
                      </span>
                    </div>
                    <div className="pt-2 border-t border-white/10 flex justify-between items-baseline">
                      <div>
                        <span className="text-sm font-bold text-white uppercase">Total à Vista (Pix)</span>
                      </div>
                      <span className="font-mono font-black text-2xl text-emerald-400">
                        R$ {(subtotal * 0.9 + (shippingCalculated ? shippingCost : 0)).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 font-mono text-right">
                      ou até 12x de R$ {((subtotal + (shippingCalculated ? shippingCost : 0)) / 12).toLocaleString('pt-BR', { minimumFractionDigits: 2 })} sem juros no cartão
                    </p>
                  </div>

                  {/* Primary CTA Buttons */}
                  <div className="space-y-2 pt-1">
                    <button
                      onClick={() => setStep('checkout')}
                      className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#ff5500] to-[#e04b00] hover:from-[#ff6600] hover:to-[#eb5300] text-white font-display uppercase italic font-black text-base tracking-wider flex items-center justify-center gap-2 transition-all shadow-xl shadow-[#ff5500]/30 transform active:scale-95 cursor-pointer"
                    >
                      <span>PROSSEGUIR PARA O CHECKOUT</span>
                      <ArrowRight className="w-5 h-5" />
                    </button>

                    <button
                      onClick={handleWhatsAppCheckout}
                      className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-md cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Finalizar Direto pelo WhatsApp</span>
                    </button>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Compra 100% protegida com Nota Fiscal Eletrônica e Inmetro</span>
                  </div>
                </div>
              )}
            </>
          )}

          {/* STEP 2: CHECKOUT & PAYMENT FORM */}
          {step === 'checkout' && (
            <form onSubmit={handleConfirmOrder} className="flex-1 flex flex-col justify-between overflow-hidden">
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                
                {/* Delivery Information */}
                <div className="bg-[#131622] border border-white/10 rounded-2xl p-4 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-orange-400 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#ff5500]" />
                    <span>Dados de Entrega</span>
                  </h3>

                  <div className="space-y-2 text-xs">
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Nome Completo *</label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: João da Silva"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full bg-[#0a0c10] border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#ff5500]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">WhatsApp / Telefone para Rastreio *</label>
                      <input
                        type="tel"
                        required
                        placeholder="(11) 99999-9999"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full bg-[#0a0c10] border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#ff5500]"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div className="col-span-2">
                        <label className="block text-[11px] text-slate-400 mb-1">Endereço / Rua *</label>
                        <input
                          type="text"
                          required
                          placeholder="Rua das Motos"
                          value={customerAddress}
                          onChange={(e) => setCustomerAddress(e.target.value)}
                          className="w-full bg-[#0a0c10] border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#ff5500]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Número *</label>
                        <input
                          type="text"
                          required
                          placeholder="123"
                          value={customerNumber}
                          onChange={(e) => setCustomerNumber(e.target.value)}
                          className="w-full bg-[#0a0c10] border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#ff5500]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Cidade / Estado *</label>
                        <input
                          type="text"
                          required
                          placeholder="São Paulo - SP"
                          value={customerCity}
                          onChange={(e) => setCustomerCity(e.target.value)}
                          className="w-full bg-[#0a0c10] border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#ff5500]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">CEP de Entrega *</label>
                        <input
                          type="text"
                          required
                          placeholder="01310-100"
                          value={cep}
                          onChange={(e) => setCep(e.target.value)}
                          className="w-full bg-[#0a0c10] border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 font-mono focus:outline-none focus:border-[#ff5500]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Selection */}
                <div className="bg-[#131622] border border-white/10 rounded-2xl p-4 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-orange-400 flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4 text-[#ff5500]" />
                    <span>Forma de Pagamento</span>
                  </h3>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('pix')}
                      className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                        paymentMethod === 'pix'
                          ? 'bg-emerald-500/15 border-emerald-500 text-white ring-1 ring-emerald-500'
                          : 'bg-[#0a0c10] border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      <span className="text-xs font-bold uppercase flex items-center gap-1">
                        <QrCode className="w-4 h-4 text-emerald-400" />
                        Pix Instantâneo
                      </span>
                      <span className="text-[11px] font-bold text-emerald-400 mt-1">
                        10% DE DESCONTO
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('credit_card')}
                      className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                        paymentMethod === 'credit_card'
                          ? 'bg-orange-500/15 border-[#ff5500] text-white ring-1 ring-[#ff5500]'
                          : 'bg-[#0a0c10] border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      <span className="text-xs font-bold uppercase flex items-center gap-1">
                        <CreditCard className="w-4 h-4 text-orange-400" />
                        Cartão de Crédito
                      </span>
                      <span className="text-[11px] text-slate-300 mt-1 font-mono">
                        Até 12x Sem Juros
                      </span>
                    </button>
                  </div>

                  {paymentMethod === 'credit_card' && (
                    <div className="mt-3 p-3 rounded-xl bg-[#0a0c10] border border-white/10 space-y-2 text-xs">
                      <label className="block text-[11px] text-slate-400">Escolha as Parcelas:</label>
                      <select
                        value={installments}
                        onChange={(e) => setInstallments(parseInt(e.target.value, 10))}
                        className="w-full bg-[#141722] border border-white/15 rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#ff5500]"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(n => (
                          <option key={n} value={n}>
                            {n}x de R$ {(cardTotal / n).toLocaleString('pt-BR', { minimumFractionDigits: 2 })} sem juros (Total: R$ {cardTotal.toFixed(2)})
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {paymentMethod === 'pix' && (
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2">
                      <Check className="w-4 h-4 shrink-0 text-emerald-400" />
                      <span>Você economizou R$ {(subtotal * 0.10).toFixed(2)} pagando no Pix! O QR Code e a chave serão gerados na próxima tela.</span>
                    </div>
                  )}
                </div>

                {/* Items Summary in Checkout */}
                <div className="p-3 rounded-xl bg-[#131622] border border-white/10 text-xs space-y-1">
                  <p className="font-bold text-slate-300 uppercase text-[10px]">Resumo do Pedido ({items.length} itens):</p>
                  {items.map(i => (
                    <div key={i.product.id} className="flex justify-between text-slate-400 text-[11px]">
                      <span>{i.quantity}x {i.product.name}</span>
                      <span className="font-mono text-white">R$ {(i.product.price * i.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

              </div>

              {/* Confirm Order Footer */}
              <div className="p-4 bg-[#12151f] border-t border-white/10 space-y-3">
                <div className="flex justify-between items-baseline text-xs">
                  <span className="text-sm font-bold text-white uppercase">Total a Pagar</span>
                  <span className="font-mono font-black text-2xl text-emerald-400">
                    R$ {finalTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 px-4 rounded-xl bg-gradient-to-r from-[#ff5500] to-[#e04b00] hover:from-[#ff6600] hover:to-[#eb5300] text-white font-display uppercase italic font-black text-lg tracking-wider flex items-center justify-center gap-2 transition-all shadow-xl shadow-[#ff5500]/30 transform active:scale-95 cursor-pointer"
                >
                  <ShieldCheck className="w-5 h-5" />
                  <span>CONFIRMAR E GERAR PEDIDO</span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: ORDER SUCCESS & PIX / RECEIPT */}
          {step === 'success' && (
            <div className="flex-1 overflow-y-auto p-6 flex flex-col justify-between text-center space-y-6">
              <div className="space-y-4 my-auto">
                <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto ring-4 ring-emerald-500/30">
                  <Check className="w-10 h-10" />
                </div>

                <div>
                  <span className="text-xs font-bold text-orange-400 uppercase tracking-widest">
                    Pedido Gerado com Sucesso!
                  </span>
                  <h3 className="font-display font-extrabold text-3xl uppercase italic text-white mt-1">
                    #{orderNumber}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Obrigado, <strong className="text-white">{customerName || 'Piloto'}</strong>! Seus pneus estão pré-reservados.
                  </p>
                </div>

                {/* Pix QR Code Section if Pix was selected */}
                {paymentMethod === 'pix' ? (
                  <div className="p-5 rounded-2xl bg-[#141824] border-2 border-emerald-500/40 text-left space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                        <QrCode className="w-4 h-4" /> Pagamento Pix Instantâneo
                      </span>
                      <span className="font-mono font-bold text-white text-sm">
                        R$ {finalTotal.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex items-center justify-center p-3 bg-white rounded-xl mx-auto w-40 h-40">
                      <div className="w-full h-full border-4 border-black p-2 flex flex-col items-center justify-center text-black font-mono text-[10px] text-center font-bold">
                        <span>[QR CODE PIX]</span>
                        <span className="text-[8px] text-slate-600 mt-1">APEX MOTO TIRES</span>
                        <span className="text-[9px] text-emerald-700 font-extrabold mt-1">R$ {finalTotal.toFixed(2)}</span>
                      </div>
                    </div>

                    <div>
                      <p className="text-[11px] text-slate-400 mb-1">Chave Pix Copia e Cola:</p>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          readOnly
                          value={`00020126580014br.gov.bcb.pix0136apex-moto-${orderNumber}520400005303986540${finalTotal.toFixed(2)}5802BR`}
                          className="flex-1 bg-[#0a0c10] border border-white/10 rounded-lg px-2.5 py-1.5 text-[10px] font-mono text-slate-300"
                        />
                        <button
                          type="button"
                          onClick={copyPixCode}
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1 transition-colors"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span>{copiedPix ? 'Copiado!' : 'Copiar'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-[#141824] border border-white/10 text-left text-xs space-y-2">
                    <p className="font-bold text-white uppercase">Resumo da Cobrança:</p>
                    <p className="text-slate-300">
                      Cartão de Crédito em <strong className="text-white">{installments}x de R$ {installmentValue.toFixed(2)} sem juros</strong>
                    </p>
                    <p className="text-[11px] text-slate-400">
                      O comprovante da transação e nota fiscal foram vinculados ao número <strong>#{orderNumber}</strong>.
                    </p>
                  </div>
                )}

                {/* WhatsApp Confirmation Direct Link */}
                <button
                  type="button"
                  onClick={handleWhatsAppCheckout}
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-lg cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Enviar Comprovante / Acompanhar no WhatsApp</span>
                </button>
              </div>

              <div className="pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    onClearCart();
                    setStep('cart');
                    onClose();
                  }}
                  className="text-xs text-slate-400 hover:text-white underline"
                >
                  Finalizar e Fechar Carrinho
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
