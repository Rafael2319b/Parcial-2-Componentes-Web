const Header = ({ view, onViewChange, collectionCount }) => {
  return (
    <header className="sticky top-0 z-30 glass-cyber border-b border-[rgba(0,255,136,0.12)]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 flex items-center justify-center">
            <div className="absolute inset-0 border border-[#00ff88] opacity-60"
              style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
            <span className="font-display font-black text-sm text-[#00ff88]"
              style={{ textShadow: '0 0 12px #00ff88' }}>PK</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="font-display font-black text-base tracking-widest uppercase text-white leading-none">
              PokéCards
            </h1>
            <p className="font-mono text-[9px] text-[#00ff88] tracking-[0.2em] uppercase animate-pulse-neon">
              ◈ DIGITAL BLACK MARKET ◈
            </p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex items-center gap-2">
          <NavButton active={view === 'market'} onClick={() => onViewChange('market')} label="◈ MERCADO" />
          <NavButton active={view === 'collection'} onClick={() => onViewChange('collection')} label="◈ MI COLECCIÓN" badge={collectionCount} />
        </nav>
      </div>
    </header>
  )
}

const NavButton = ({ active, onClick, label, badge }) => (
  <button
    onClick={onClick}
    className={`relative px-4 py-2 font-display font-bold text-[10px] tracking-widest uppercase transition-all duration-200
      ${active
        ? 'text-[#00ff88] border border-[#00ff88] bg-[rgba(0,255,136,0.08)]'
        : 'text-[#5a76cb] border border-[rgba(90,118,203,0.3)] hover:text-[#00ff88] hover:border-[rgba(0,255,136,0.4)]'
      }`}
    style={{
      clipPath: 'polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)',
      boxShadow: active ? '0 0 12px rgba(0,255,136,0.15)' : 'none'
    }}
  >
    {label}
    {typeof badge === 'number' && badge > 0 && (
      <span className="ml-2 px-1.5 py-0.5 rounded-sm text-[9px] font-mono bg-[#ff006e] text-white">
        {badge}
      </span>
    )}
  </button>
)

export default Header