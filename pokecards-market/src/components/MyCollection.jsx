import { TYPE_META } from '../utils/api'

const MyCollection = ({ purchased, onClearAll }) => {
  if (purchased.length === 0) return (
    <div className="text-center py-24">
      <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-sm"
        style={{ border: '1px solid rgba(0,212,255,0.2)', background: 'rgba(0,212,255,0.05)' }}>
        <span className="font-display font-black text-2xl text-[#2547b6]">?</span>
      </div>
      <p className="font-mono text-[10px] text-[#2547b6] tracking-[0.25em] mb-2">// COLECCIÓN VACÍA //</p>
      <p className="font-display font-bold text-lg text-[#5a76cb] uppercase tracking-wide">Sin cartas adquiridas</p>
      <p className="font-mono text-[10px] text-[#2547b6] mt-2">Visita el mercado para comenzar a coleccionar tus pokemones favoritos</p>
    </div>
  )

  return (
    <section>
      <div className="flex items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1 h-1 rounded-full bg-[#00ff88] animate-pulse" />
            <span className="font-mono text-[9px] text-[#00ff88] tracking-[0.25em] uppercase">// MI COLECCIÓN</span>
          </div>
          <h2 className="font-display font-black text-2xl text-white uppercase tracking-wide">
            {purchased.length} carta{purchased.length !== 1 ? 's' : ''} adquirida{purchased.length !== 1 ? 's' : ''}
          </h2>
        </div>
        {purchased.length > 0 && (
          <button onClick={onClearAll}
            className="font-mono text-[9px] tracking-widest uppercase px-4 py-2 transition-all hover:bg-[rgba(255,0,110,0.08)]"
            style={{ border: '1px solid rgba(255,0,110,0.3)', color: '#ff006e',
              clipPath: 'polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)' }}>
            LIMPIAR TODO
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {purchased.map((card, i) => <CollectionCard key={card.id} card={card} index={i} />)}
      </div>
    </section>
  )
}

const CollectionCard = ({ card, index }) => (
  <article className="rounded-sm overflow-hidden animate-slide-up"
    style={{ animationDelay: `${index * 50}ms`, background: 'linear-gradient(160deg, #040912 0%, #02060c 100%)',
      border: '1px solid rgba(0,255,136,0.2)', boxShadow: '0 0 20px rgba(0,255,136,0.05)' }}>
    <div className="h-[2px]" style={{ background: 'linear-gradient(90deg, #00cc6a, #00ff88)' }} />
    <div className="relative aspect-[4/3] flex items-center justify-center overflow-hidden"
      style={{ background: 'radial-gradient(circle at 50% 40%, rgba(0,255,136,0.08) 0%, transparent 70%)' }}>
      <img src={card.image} alt={card.name} className="w-3/4 h-3/4 object-contain animate-float"
        style={{ filter: 'drop-shadow(0 4px 16px rgba(0,255,136,0.2))' }} />
      <div className="absolute top-2 right-2 font-mono text-[9px] tracking-widest px-2 py-0.5"
        style={{ background: 'rgba(0,255,136,0.15)', border: '1px solid rgba(0,255,136,0.3)', color: '#00ff88' }}>
        ◈ TUYA
      </div>
    </div>
    <div className="p-4">
      <h3 className="font-display font-bold text-white capitalize text-base tracking-wide mb-2">{card.name}</h3>
      <div className="flex flex-wrap gap-1 mb-3">
        {card.types?.map(type => {
          const meta = TYPE_META[type] || TYPE_META.normal
          return <span key={type} className="font-mono text-[8px] uppercase tracking-[0.15em] px-2 py-0.5"
            style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(90,118,203,0.3)', color: '#8fa5e0' }}>{meta.es}</span>
        })}
      </div>
      <div className="flex justify-between items-center pt-3" style={{ borderTop: '1px solid rgba(90,118,203,0.15)' }}>
        <span className="font-mono text-[9px] text-[#2547b6] tracking-wider">{card.rarity?.label?.toUpperCase()}</span>
        <span className="font-display font-bold text-[#00ff88] text-sm">${card.price?.toFixed(2)}</span>
      </div>
    </div>
  </article>
)

export default MyCollection