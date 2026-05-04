const Footer = () => (
  <footer className="mt-24 py-10" style={{ borderTop: '1px solid rgba(0,255,136,0.1)' }}>
    <div className="max-w-7xl mx-auto px-4 lg:px-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 font-mono text-[10px] text-[#2547b6] tracking-widest uppercase">
          <span className="text-[#00ff88]"></span>
          <span>Construido con</span>
          <a href="https://pokeapi.co/" target="_blank" rel="noopener noreferrer"
            className="text-[#00d4ff] hover:text-[#00ff88] transition-colors">PokéAPI</a>
          <span className="text-[#2547b6]">//</span>
          <a href="https://developer.paypal.com/" target="_blank" rel="noopener noreferrer"
            className="text-[#00d4ff] hover:text-[#00ff88] transition-colors">PayPal Sandbox</a>
        </div>
        <p className="font-mono text-[9px] text-[#2547b6] tracking-[0.2em]">
          POKÉCARDS MARKET · PROYECTO EDUCATIVO · {new Date().getFullYear()}
        </p>
      </div>
    </div>
  </footer>
)

export default Footer