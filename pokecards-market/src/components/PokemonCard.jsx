import { useRef } from 'react'
import { TYPE_META } from '../utils/api'

const RARITY_STYLES = {
  common: {
    borderColor: 'rgba(90,118,203,0.3)', accentColor: '#5a76cb', glowColor: 'rgba(90,118,203,0.1)',
    topBar: 'linear-gradient(90deg, #2547b6, #5a76cb)',
    imgBg: 'radial-gradient(circle at 50% 40%, rgba(37,71,182,0.1) 0%, transparent 70%)',
    btnColor: '#5a76cb', btnBorder: 'rgba(90,118,203,0.6)',
    label: 'rgba(37,71,182,0.8)', labelText: '#8fa5e0',
  },
  uncommon: {
    borderColor: 'rgba(0,255,136,0.25)', accentColor: '#00ff88', glowColor: 'rgba(0,255,136,0.08)',
    topBar: 'linear-gradient(90deg, #00cc6a, #00ff88)',
    imgBg: 'radial-gradient(circle at 50% 40%, rgba(0,255,136,0.08) 0%, transparent 70%)',
    btnColor: '#00ff88', btnBorder: 'rgba(0,255,136,0.6)',
    label: 'rgba(0,204,106,0.2)', labelText: '#00ff88',
  },
  rare: {
    borderColor: 'rgba(0,212,255,0.3)', accentColor: '#00d4ff', glowColor: 'rgba(0,212,255,0.1)',
    topBar: 'linear-gradient(90deg, #0099cc, #00d4ff)',
    imgBg: 'radial-gradient(circle at 50% 40%, rgba(0,212,255,0.1) 0%, transparent 70%)',
    btnColor: '#00d4ff', btnBorder: 'rgba(0,212,255,0.6)',
    label: 'rgba(0,150,200,0.2)', labelText: '#00d4ff',
  },
  epic: {
    borderColor: 'rgba(191,0,255,0.35)', accentColor: '#bf00ff', glowColor: 'rgba(191,0,255,0.12)',
    topBar: 'linear-gradient(90deg, #8800cc, #bf00ff)',
    imgBg: 'radial-gradient(circle at 50% 40%, rgba(191,0,255,0.1) 0%, transparent 70%)',
    btnColor: '#bf00ff', btnBorder: 'rgba(191,0,255,0.6)',
    label: 'rgba(140,0,200,0.2)', labelText: '#bf00ff',
  },
  legendary: {
    borderColor: 'rgba(255,0,110,0.4)', accentColor: '#ff006e', glowColor: 'rgba(255,0,110,0.12)',
    topBar: 'linear-gradient(90deg, #ff006e, #ff6db8, #ff006e)',
    imgBg: 'radial-gradient(circle at 50% 40%, rgba(255,0,110,0.12) 0%, transparent 70%)',
    btnColor: '#ff006e', btnBorder: 'rgba(255,0,110,0.6)',
    label: 'rgba(200,0,80,0.2)', labelText: '#ff006e',
  },
}

const PokemonCard = ({ card, purchased, onSelect, index = 0 }) => {
  const style = RARITY_STYLES[card.rarity.key] || RARITY_STYLES.common
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!cardRef.current || purchased) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12
    cardRef.current.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${y}deg) translateY(-4px)`
  }

  const handleMouseLeave = () => {
    if (!cardRef.current) return
    cardRef.current.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) translateY(0)'
  }

  return (
    <article
      ref={cardRef}
      onClick={() => !purchased && onSelect(card)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        animationDelay: `${(index % 12) * 40}ms`,
        transition: 'transform 0.15s ease, box-shadow 0.3s ease',
        background: 'linear-gradient(160deg, #040912 0%, #02060c 100%)',
        border: `1px solid ${style.borderColor}`,
        boxShadow: purchased ? 'none' : `0 0 0 1px ${style.borderColor}, 0 8px 24px rgba(0,0,0,0.6)`,
      }}
      className={`group relative rounded-sm overflow-hidden animate-slide-up ${purchased ? 'opacity-40 cursor-default' : 'cursor-pointer'}`}
    >
      {/* Top bar */}
      <div className="h-[2px] w-full" style={{ background: style.topBar }} />

      {/* Corner accents */}
      <div className="absolute top-3 left-3 w-3 h-3 pointer-events-none"
        style={{ borderTop: `1px solid ${style.accentColor}`, borderLeft: `1px solid ${style.accentColor}`, opacity: 0.6 }} />
      <div className="absolute top-3 right-3 w-3 h-3 pointer-events-none"
        style={{ borderTop: `1px solid ${style.accentColor}`, borderRight: `1px solid ${style.accentColor}`, opacity: 0.6 }} />

      {/* Acquired badge */}
      {purchased && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 px-3 py-1"
          style={{ background: 'rgba(0,255,136,0.15)', border: '1px solid rgba(0,255,136,0.4)' }}>
          <span className="font-mono text-[9px] text-[#00ff88] tracking-widest">◈ ADQUIRIDA</span>
        </div>
      )}

      {/* Rarity badge */}
      <div className="absolute top-5 left-5 z-10">
        <span className="font-mono text-[8px] tracking-[0.2em] uppercase px-2 py-0.5"
          style={{ background: style.label, color: style.labelText, border: `1px solid ${style.accentColor}30` }}>
          {card.rarity.label}
        </span>
      </div>

      {/* Image */}
      <div className="relative aspect-[4/3] flex items-center justify-center overflow-hidden"
        style={{ background: style.imgBg }}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,136,0.5) 2px, rgba(0,255,136,0.5) 3px)', backgroundSize: '100% 3px' }} />
        {card.rarity.key === 'legendary' && (
          <>
            <div className="absolute top-3 right-5 w-1 h-1 rounded-full animate-pulse" style={{ background: '#ff006e', boxShadow: '0 0 6px #ff006e' }} />
            <div className="absolute bottom-4 left-6 w-0.5 h-0.5 rounded-full animate-pulse" style={{ background: '#ff006e', animationDelay: '0.7s' }} />
          </>
        )}
        <img src={card.image} alt={card.name} loading="lazy"
          className="relative z-10 w-3/4 h-3/4 object-contain transition-transform duration-300 group-hover:scale-110"
          style={{ filter: purchased ? 'grayscale(1)' : 'drop-shadow(0 4px 16px rgba(0,0,0,0.8))' }} />
        <span className="absolute bottom-2 right-3 font-mono text-[18px] font-bold"
          style={{ color: `${style.accentColor}20` }}>
          #{String(card.id).padStart(3, '0')}
        </span>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-display font-bold text-white capitalize text-base leading-tight mb-3 tracking-wide">
          {card.name}
        </h3>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {card.types.map(type => {
            const meta = TYPE_META[type] || TYPE_META.normal
            return (
              <span key={type} className="font-mono text-[8px] uppercase tracking-[0.15em] px-2 py-0.5"
                style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(90,118,203,0.3)', color: '#8fa5e0' }}>
                {meta.es}
              </span>
            )
          })}
        </div>
        <div className="flex items-center justify-between pt-3"
          style={{ borderTop: 'rgba(90,118,203,0.15) 1px solid' }}>
          <div>
            <span className="font-mono text-[8px] text-[#2547b6] uppercase tracking-wider block mb-0.5">// PRECIO</span>
            <span className="font-display font-black text-lg text-white"
              style={{ textShadow: `0 0 10px ${style.accentColor}50` }}>
              ${card.price.toFixed(2)}
            </span>
          </div>
          {purchased ? (
            <span className="font-mono text-[9px] tracking-widest" style={{ color: '#00ff88' }}>◈ EN COLECCIÓN</span>
          ) : (
            <button
              className="font-display font-bold text-[10px] tracking-widest uppercase px-4 py-2 transition-all duration-200 active:scale-95"
              style={{ color: style.btnColor, border: `1px solid ${style.btnBorder}`, background: 'transparent',
                clipPath: 'polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)' }}
              onMouseEnter={e => { e.currentTarget.style.background = `${style.accentColor}18`; e.currentTarget.style.boxShadow = `0 0 12px ${style.glowColor}` }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.boxShadow = 'none' }}
            >
              COMPRAR
            </button>
          )}
        </div>
      </div>
    </article>
  )
}

export default PokemonCard