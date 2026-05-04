const Hero = ({ totalCards, ownedCount }) => {
  const completionPct =
    totalCards > 0 ? Math.round((ownedCount / totalCards) * 100) : 0

  const remaining = totalCards - ownedCount

  return (
    <section className="relative mb-14 overflow-hidden animate-fade-in">
      {/* Background Grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,136,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,136,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      <div
        className="relative rounded-sm overflow-hidden"
        style={{
          background:
            'linear-gradient(135deg, #02060d 0%, #050c18 60%, #030812 100%)',
          border: '1px solid rgba(0,255,136,0.12)',
          boxShadow: '0 0 50px rgba(0,255,136,0.05)'
        }}
      >
        {/* Decorative Lights */}
        <div
          className="absolute -top-16 left-20 w-64 h-64 rounded-full blur-3xl"
          style={{ background: 'rgba(0,255,136,0.08)' }}
        />

        <div
          className="absolute bottom-0 right-0 w-72 h-72 rounded-full blur-3xl"
          style={{ background: 'rgba(0,212,255,0.08)' }}
        />

        {/* Main Layout */}
        <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
          {/* LEFT SIDE */}
          <div className="relative p-8 lg:p-12 flex flex-col justify-between min-h-[420px]">
            {/* top bar */}
            <div className="flex flex-wrap items-center gap-6 mb-10">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" />
                <span className="font-mono text-[10px] tracking-[0.25em] text-[#00ff88] uppercase">
                  Servidor Activo
                </span>
              </div>

              <div className="h-3 w-px bg-[#16324a]" />

              <span className="font-mono text-[10px] tracking-[0.2em] text-[#5a76cb] uppercase">
                {totalCards} entidades detectadas
              </span>
            </div>

            {/* hero content */}
            <div className="relative z-10">
              <div className="mb-6">
                <span
                  className="inline-block font-mono text-[11px] tracking-[0.3em] uppercase px-3 py-1 border"
                  style={{
                    borderColor: 'rgba(0,212,255,0.25)',
                    color: '#00d4ff',
                    background: 'rgba(0,212,255,0.05)'
                  }}
                >
                  Pokémon Trading System
                </span>
              </div>

              <h1 className="font-display font-black leading-none mb-6">
                <span className="block text-white text-5xl lg:text-7xl">
                  DOMINA
                </span>

                <span
                  className="block text-5xl lg:text-7xl"
                  style={{
                    color: '#00ff88',
                    textShadow: '0 0 25px rgba(0,255,136,0.45)'
                  }}
                >
                  TU MAZO
                </span>
              </h1>

              <p className="max-w-xl text-sm lg:text-base leading-relaxed text-[#6e86d6] font-body">
                Compra, desbloquea y administra cartas Pokémon digitales
                utilizando integración con PayPal Sandbox. Construye tu colección
                y aumenta tu porcentaje de progreso dentro del sistema.
              </p>

              {/* Main Button */}
              <div className="mt-8">
                <a
                  href="#market"
                  className="px-7 py-4 font-display text-sm tracking-widest uppercase transition-all duration-300 inline-flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(90deg,#00ff88,#00d4ff)',
                    color: '#02060d',
                    clipPath:
                      'polygon(10px 0%,100% 0%,100% calc(100% - 10px),calc(100% - 10px) 100%,0% 100%,0% 10px)',
                    boxShadow: '0 0 25px rgba(0,255,136,0.25)'
                  }}
                >
                  Entrar al mercado
                </a>
              </div>
            </div>

            {/* bottom cards */}
            <div className="mt-12 grid grid-cols-3 gap-4">
              {[
                ['Cartas', totalCards],
                ['Obtenidas', ownedCount],
                ['Restantes', remaining]
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="p-4 rounded-sm"
                  style={{
                    border: '1px solid rgba(255,255,255,0.06)',
                    background: 'rgba(255,255,255,0.015)'
                  }}
                >
                  <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#5a76cb] mb-2">
                    {label}
                  </p>

                  <h3 className="font-display text-2xl text-white">
                    {value}
                  </h3>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div
            className="relative border-l p-8 lg:p-10 flex flex-col justify-between"
            style={{
              borderColor: 'rgba(255,255,255,0.06)',
              background:
                'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))'
            }}
          >
            {/* corners */}
            <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-[#00d4ff]" />
            <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-[#00ff88]" />

            <div>
              <div className="flex justify-between items-center mb-10">
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#5a76cb]">
                  progreso global
                </span>

                <span className="font-display text-[#00d4ff] text-sm">
                  LIVE
                </span>
              </div>

              {/* percentage */}
              <div className="mb-10">
                <h2
                  className="font-display font-black text-7xl leading-none"
                  style={{
                    color: '#ffffff',
                    textShadow: '0 0 20px rgba(255,255,255,0.08)'
                  }}
                >
                  {completionPct}
                  <span className="text-[#00ff88]">%</span>
                </h2>

                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#5a76cb] mt-3">
                  Colección sincronizada
                </p>
              </div>

              {/* progress bars */}
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-mono text-[10px] uppercase text-[#5a76cb]">
                      Nivel de colección
                    </span>

                    <span className="font-display text-sm text-white">
                      {completionPct}%
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-[#09111d]">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${Math.max(completionPct, 3)}%`,
                        background:
                          'linear-gradient(90deg,#00d4ff,#00ff88)',
                        boxShadow: '0 0 15px rgba(0,255,136,0.45)'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-mono text-[10px] uppercase text-[#5a76cb]">
                      Sistema desbloqueado
                    </span>

                    <span className="font-display text-sm text-white">
                      {ownedCount}/{totalCards}
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-[#09111d]">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${Math.max(completionPct - 5, 2)}%`,
                        background:
                          'linear-gradient(90deg,#2547b6,#00d4ff)'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* footer box */}
            <div
              className="mt-12 p-5 rounded-sm"
              style={{
                border: '1px solid rgba(0,255,136,0.12)',
                background: 'rgba(0,255,136,0.03)'
              }}
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#00ff88] mb-2">
                Estado del sistema
              </p>

              <p className="text-sm leading-relaxed text-[#7e93dd]">
                {remaining > 0
                  ? `Aún faltan ${remaining} cartas para completar la colección total.`
                  : 'Colección completada exitosamente.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero