import { useState, useEffect, useRef } from 'react'
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import { TYPE_META } from '../utils/api'
import { captureOrder, getOrderDetails } from '../utils/paypal'

const PurchaseModal = ({ card, onClose, onSuccess, onError }) => {
  const [status, setStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState(null)
  const [{ isPending, isResolved, isRejected }] = usePayPalScriptReducer()
  const isCapturing = useRef(false)

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape' && !isCapturing.current && status !== 'processing') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose, status])

  useEffect(() => { document.body.style.overflow = 'hidden'; return () => { document.body.style.overflow = '' } }, [])

  const handleBackdropClick = () => {
    if (!isCapturing.current && status !== 'processing' && status !== 'success') onClose()
  }

  const processPayment = async (orderID) => {
    isCapturing.current = true; setStatus('processing'); setErrorMsg(null)
    try {
      const details = await captureOrder(orderID)
      if (details.status === 'COMPLETED') { isCapturing.current = false; setStatus('success'); setTimeout(() => onSuccess(card, details), 1000); return }
      throw new Error(`Estado inesperado: ${details.status}`)
    } catch (captureErr) {
      try {
        const order = await getOrderDetails(orderID)
        if (order.status === 'COMPLETED') { isCapturing.current = false; setStatus('success'); setTimeout(() => onSuccess(card, order), 1000); return }
        isCapturing.current = false; setStatus('error'); setErrorMsg(`Pago no completado (${order.status}). Intenta de nuevo.`)
      } catch (verifyErr) {
        isCapturing.current = false; setStatus('error'); setErrorMsg('No se pudo verificar el pago.'); onError?.(verifyErr)
      }
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in" onClick={handleBackdropClick}>
      <div className="absolute inset-0" style={{ background: 'rgba(1,4,8,0.9)', backdropFilter: 'blur(8px)' }} />
      <div className="relative max-w-3xl w-full max-h-[92vh] overflow-hidden animate-slide-up rounded-sm"
        style={{ background: 'linear-gradient(160deg, #040912 0%, #02060c 100%)', border: '1px solid rgba(0,255,136,0.25)',
          boxShadow: '0 0 60px rgba(0,255,136,0.08), 0 24px 80px rgba(0,0,0,0.8)' }}
        onClick={(e) => e.stopPropagation()}>
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#00ff88] opacity-60" />
        <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#00ff88] opacity-60" />
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#00ff88] opacity-60" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#00ff88] opacity-60" />

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid rgba(0,255,136,0.1)' }}>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <div className="w-1 h-1 rounded-full bg-[#00ff88] animate-pulse" />
              <span className="font-mono text-[9px] text-[#00ff88] tracking-[0.2em] uppercase">// CONFIRMAR TRANSACCIÓN</span>
            </div>
            <h2 className="font-display font-black text-lg text-white uppercase tracking-wide">Procesando compra</h2>
          </div>
          {status !== 'processing' && status !== 'success' && (
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center font-mono text-[#2547b6] hover:text-[#ff006e] transition-colors text-sm"
              style={{ border: '1px solid rgba(90,118,203,0.2)' }}>✕</button>
          )}
        </div>

        <div className="overflow-y-auto max-h-[calc(92vh-65px)]">
          <div className="grid md:grid-cols-2">
            {/* Card preview */}
            <div className="p-6 md:p-8 flex items-center justify-center"
              style={{ borderRight: '1px solid rgba(0,255,136,0.08)', background: 'rgba(0,255,136,0.02)' }}>
              <div className="w-full max-w-[220px] rounded-sm overflow-hidden"
                style={{ border: '1px solid rgba(0,255,136,0.2)', background: '#02060c' }}>
                <div className="h-[2px]" style={{ background: 'linear-gradient(90deg, #00ff88, #00d4ff)' }} />
                <div className="p-4 flex flex-col items-center">
                  <div className="flex justify-between w-full mb-3">
                    <span className="font-mono text-[8px] tracking-widest uppercase px-2 py-0.5"
                      style={{ background: 'rgba(0,255,136,0.1)', color: '#00ff88', border: '1px solid rgba(0,255,136,0.2)' }}>
                      {card.rarity.label}
                    </span>
                    <span className="font-mono text-[14px] text-[#2547b6]">#{String(card.id).padStart(3, '0')}</span>
                  </div>
                  <img src={card.image} alt={card.name} className="w-40 h-40 object-contain animate-float"
                    style={{ filter: 'drop-shadow(0 4px 24px rgba(0,255,136,0.25))' }} />
                  <div className="text-center mt-3 w-full pt-3" style={{ borderTop: '1px solid rgba(0,255,136,0.1)' }}>
                    <h3 className="font-display font-bold text-white capitalize text-base tracking-wide">{card.name}</h3>
                    <div className="flex justify-center gap-1 mt-1.5 flex-wrap">
                      {card.types.map(type => {
                        const meta = TYPE_META[type] || TYPE_META.normal
                        return <span key={type} className="font-mono text-[8px] uppercase tracking-widest px-2 py-0.5"
                          style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(90,118,203,0.3)', color: '#8fa5e0' }}>{meta.es}</span>
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment panel */}
            <div className="p-6 md:p-8 flex flex-col">
              <div className="mb-6">
                <span className="font-mono text-[9px] text-[#5a76cb] tracking-[0.2em] uppercase">// RESUMEN DE ORDEN</span>
                <div className="mt-3 p-4 space-y-3 text-sm rounded-sm"
                  style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(90,118,203,0.2)' }}>
                  {[['Carta digital', card.name], ['Rareza', card.rarity.label], ['Stats totales', card.statsTotal]].map(([label, val], i) => (
                    <div key={i} className="flex justify-between items-center">
                      <span className="font-mono text-[10px] text-[#5a76cb] tracking-wider uppercase">{label}</span>
                      <span className="font-mono text-[11px] text-white capitalize">{val}</span>
                    </div>
                  ))}
                  <div className="pt-3 flex justify-between items-center" style={{ borderTop: '1px solid rgba(0,255,136,0.15)' }}>
                    <span className="font-mono text-[10px] text-[#00ff88] tracking-widest uppercase">TOTAL</span>
                    <span className="font-display font-black text-2xl text-white" style={{ textShadow: '0 0 10px rgba(0,255,136,0.3)' }}>
                      ${card.price.toFixed(2)} <span className="font-mono text-xs text-[#5a76cb] font-normal">USD</span>
                    </span>
                  </div>
                </div>
              </div>

              {isPending && <StatusBox color="#00d4ff" icon="⟳" title="CARGANDO SISTEMA DE PAGO..." sub="Inicializando PayPal..." />}
              {isRejected && <StatusBox color="#ff006e" icon="✕" title="ERROR DE CONEXIÓN" sub="No se pudo cargar PayPal." />}
              {status === 'processing' && <StatusBox color="#00ff88" icon="⟳" title="PROCESANDO TRANSACCIÓN..." sub="No cierres esta ventana." spin />}
              {status === 'success' && <StatusBox color="#00ff88" icon="◈" title="TRANSACCIÓN COMPLETADA" sub="Desbloqueando tu carta..." />}
              {status === 'error' && (
                <div className="mb-4 p-4 rounded-sm" style={{ background: 'rgba(255,0,110,0.08)', border: '1px solid rgba(255,0,110,0.3)' }}>
                  <p className="font-mono text-[9px] text-[#ff006e] tracking-widest uppercase mb-1">⚠ ERROR DE PAGO</p>
                  <p className="font-body text-sm text-[#8fa5e0]">{errorMsg}</p>
                  <button onClick={() => { setStatus('idle'); setErrorMsg(null) }}
                    className="mt-3 font-mono text-[9px] text-[#ff006e] tracking-widest underline uppercase">REINTENTAR</button>
                </div>
              )}

              <div className={`mt-auto space-y-3 ${isResolved && status !== 'success' ? 'block' : 'hidden'}`}>
                <PayPalButtons
                  style={{ layout: 'vertical', shape: 'rect', color: 'black', label: 'pay', height: 44 }}
                  forceReRender={[card.id, card.price]}
                  createOrder={(data, actions) => actions.order.create({
                    purchase_units: [{ description: `PokéCard: ${card.name}`, amount: { value: card.price.toFixed(2), currency_code: 'USD' } }],
                    application_context: { shipping_preference: 'NO_SHIPPING', user_action: 'PAY_NOW', brand_name: 'PokéCards Market' }
                  })}
                  onApprove={(data) => processPayment(data.orderID)}
                  onError={(err) => { setStatus('error'); setErrorMsg('Error de PayPal. Intenta de nuevo.'); onError?.(err) }}
                  onCancel={() => { setStatus('error'); setErrorMsg('Cerraste la ventana sin pagar.') }}
                />
                <p className="font-mono text-[9px] text-[#2547b6] text-center tracking-widest">
                  🔒 ENTORNO SANDBOX · SIN COBROS REALES
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const StatusBox = ({ color, icon, title, sub, spin }) => (
  <div className="mb-4 p-4 rounded-sm flex items-center gap-3"
    style={{ background: `${color}0d`, border: `1px solid ${color}40` }}>
    <span className={`text-lg ${spin ? 'animate-spin' : ''}`} style={{ color }}>{icon}</span>
    <div>
      <p className="font-mono text-[9px] tracking-widest uppercase" style={{ color }}>{title}</p>
      <p className="font-body text-sm text-[#8fa5e0] mt-0.5">{sub}</p>
    </div>
  </div>
)

export default PurchaseModal