import { useEffect } from 'react'

const Toast = ({ message, type, onClose }) => {
  useEffect(() => { const t = setTimeout(onClose, 4500); return () => clearTimeout(t) }, [onClose])
  const isSuccess = type === 'success'

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
      <div className="flex items-center gap-3 px-5 py-4 min-w-[280px] rounded-sm"
        style={{
          background: 'rgba(2,6,12,0.95)',
          border: `1px solid ${isSuccess ? 'rgba(0,255,136,0.4)' : 'rgba(255,0,110,0.4)'}`,
          boxShadow: isSuccess ? '0 0 20px rgba(0,255,136,0.15)' : '0 0 20px rgba(255,0,110,0.15)',
        }}>
        <div className="w-1 min-h-[24px] rounded-sm flex-shrink-0"
          style={{ background: isSuccess ? '#00ff88' : '#ff006e', boxShadow: isSuccess ? '0 0 8px #00ff88' : '0 0 8px #ff006e' }} />
        <div>
          <p className="font-mono text-[9px] tracking-[0.2em] uppercase mb-0.5"
            style={{ color: isSuccess ? '#00ff88' : '#ff006e' }}>
            {isSuccess ? '◈ TRANSACCIÓN COMPLETADA' : '⚠ ERROR DE SISTEMA'}
          </p>
          <p className="font-body text-sm text-[#8fa5e0]">{message}</p>
        </div>
        <button onClick={onClose} className="ml-auto font-mono text-[#2547b6] hover:text-white transition-colors text-xs">✕</button>
      </div>
    </div>
  )
}

export default Toast