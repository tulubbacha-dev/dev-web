export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 bg-gradient-ttb" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <div className="mb-6 inline-block animate-pulse">
          <span className="px-4 py-2 rounded-full bg-ttb-blue/10 border border-ttb-blue/30 text-ttb-blue text-sm font-semibold">
            Enterprise AI Solutions
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="text-gradient-ttb">Transform Your Business</span>
          <br />
          <span className="text-white">with Enterprise-Grade AI</span>
        </h1>

        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
          TTB Technology delivers cutting-edge artificial intelligence, machine learning, and data science solutions
          for government, healthcare, finance, and enterprise organizations.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <button className="px-8 py-4 bg-ttb-blue text-ttb-dark rounded-lg font-bold text-lg hover:bg-ttb-cyan transition-all glow-effect hover:glow-effect-lg">
            Explore Solutions
          </button>
          <button className="px-8 py-4 border-2 border-ttb-blue text-ttb-blue rounded-lg font-bold text-lg hover:bg-ttb-blue hover:text-ttb-dark transition-all">
            Schedule a Demo
          </button>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: '15+', label: 'Years Experience' },
            { value: '200+', label: 'Enterprise Clients' },
            { value: '500+', label: 'ML Models' },
            { value: '150+', label: 'Team Members' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-ttb-blue mb-2">{stat.value}</div>
              <div className="text-sm md:text-base text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}