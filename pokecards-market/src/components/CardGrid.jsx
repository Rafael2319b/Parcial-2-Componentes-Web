import { useState, useMemo } from 'react'
import PokemonCard from './PokemonCard'
import { RARITY_TIERS } from '../utils/api'

const CardGrid = ({ cards, loading, error, isPurchased, onCardSelect, onReload }) => {
  const [search, setSearch] = useState('')
  const [rarityFilter, setRarityFilter] = useState('all')
  const [sort, setSort] = useState('default')

  const filtered = useMemo(() => {
    let result = [...cards]
    if (search.trim()) result = result.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
    if (rarityFilter !== 'all') result = result.filter(c => c.rarity.key === rarityFilter)
    if (sort === 'price-asc')  result.sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') result.sort((a, b) => b.price - a.price)
    if (sort === 'name')       result.sort((a, b) => a.name.localeCompare(b.name))
    return result
  }, [cards, search, rarityFilter, sort])

  if (error) return (
    <div className="text-center py-16 border border-[rgba(255,0,110,0.3)] rounded-sm"
      style={{ background: 'rgba(255,0,110,0.05)' }}>
      <p className="font-mono text-[#ff006e] mb-4 text-sm tracking-wide">⚠ ERROR DE CONEXIÓN</p>
      <p className="font-body text-[#5a76cb] mb-6 text-sm">{error}</p>
      <button onClick={onReload} className="btn-cyber btn-cyber-pink">REINTENTAR</button>
    </div>
  )

  return (
    <section id="market" className="scroll-mt-20">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-1 h-1 rounded-full bg-[#00ff88] animate-pulse" />
            <span className="font-mono text-[9px] text-[#00ff88] tracking-[0.25em] uppercase">// MARKETPLACE ACTIVO</span>
          </div>
          <h2 className="font-display font-black text-xl lg:text-3xl text-white tracking-wide uppercase">Mercado de cartas</h2>
          <p className="font-mono text-[10px] text-[#2547b6] mt-1 tracking-wider">
            {loading ? '> CARGANDO DATOS...' : `> ${filtered.length} REGISTROS ENCONTRADOS`}
          </p>
        </div>
      </div>

      {/* Filter bar */}
      <div className="mb-8 p-4 rounded-sm"
        style={{ background: 'rgba(4,9,18,0.9)', border: '1px solid rgba(0,212,255,0.15)' }}>
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-[10px] text-[#2547b6]">_</span>
            <input type="text" placeholder="BUSCAR POR NOMBRE..." value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-4 py-2.5 font-mono text-xs text-[#8fa5e0] placeholder-[#2547b6] bg-transparent outline-none tracking-widest uppercase"
              style={{ border: '1px solid rgba(0,212,255,0.2)', background: 'rgba(2,6,12,0.8)' }} />
          </div>
          <div className="flex flex-wrap gap-1.5">
            <FilterChip active={rarityFilter === 'all'} onClick={() => setRarityFilter('all')}>TODAS</FilterChip>
            {RARITY_TIERS.map(tier => (
              <FilterChip key={tier.key} active={rarityFilter === tier.key} onClick={() => setRarityFilter(tier.key)}>
                {tier.label.toUpperCase()}
              </FilterChip>
            ))}
          </div>
          <select value={sort} onChange={(e) => setSort(e.target.value)}
            className="px-3 py-2.5 font-mono text-[10px] text-[#8fa5e0] bg-transparent outline-none cursor-pointer tracking-wider uppercase"
            style={{ border: '1px solid rgba(0,212,255,0.2)', background: 'rgba(2,6,12,0.8)' }}>
            <option value="default">ORDEN DEFAULT</option>
            <option value="price-asc">PRECIO ASC</option>
            <option value="price-desc">PRECIO DESC</option>
            <option value="name">NOMBRE A-Z</option>
          </select>
        </div>
      </div>

      {loading ? <SkeletonGrid /> : filtered.length === 0 ? <EmptyState /> : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((card, i) => (
            <PokemonCard key={card.id} card={card} purchased={isPurchased(card.id)} onSelect={onCardSelect} index={i} />
          ))}
        </div>
      )}
    </section>
  )
}

const FilterChip = ({ active, onClick, children }) => (
  <button onClick={onClick}
    className="px-3 py-2 font-mono text-[9px] tracking-[0.15em] transition-all duration-200 whitespace-nowrap"
    style={{
      border: active ? '1px solid #00ff88' : '1px solid rgba(90,118,203,0.3)',
      color: active ? '#00ff88' : '#5a76cb',
      background: active ? 'rgba(0,255,136,0.08)' : 'transparent',
      boxShadow: active ? '0 0 8px rgba(0,255,136,0.15)' : 'none',
      clipPath: 'polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%)',
    }}>
    {children}
  </button>
)

const SkeletonGrid = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
    {Array.from({ length: 12 }).map((_, i) => (
      <div key={i} className="rounded-sm overflow-hidden" style={{ border: '1px solid rgba(90,118,203,0.15)', background: '#040912' }}>
        <div className="h-[2px] skeleton" />
        <div className="aspect-[4/3] skeleton opacity-30" />
        <div className="p-4 space-y-3">
          <div className="h-4 w-2/3 skeleton" />
          <div className="h-3 w-1/3 skeleton" />
          <div className="h-8 skeleton" />
        </div>
      </div>
    ))}
  </div>
)

const EmptyState = () => (
  <div className="text-center py-20">
    <p className="font-mono text-[#2547b6] text-sm tracking-widest mb-2">// NULL RESULTS //</p>
    <p className="font-display font-bold text-[#5a76cb] text-lg uppercase tracking-wide">Sin coincidencias</p>
    <p className="font-mono text-[10px] text-[#2547b6] mt-2">Modifica los parámetros de búsqueda</p>
  </div>
)

export default CardGrid