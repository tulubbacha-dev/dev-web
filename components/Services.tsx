'use client'

import { SERVICES } from '@/lib/constants'

export default function Services() {
  return (
    <section className="relative py-20 px-4 bg-ttb-navy/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-ttb">Our Services</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Comprehensive AI and machine learning solutions tailored to your enterprise needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="group relative bg-ttb-navy/80 border border-ttb-blue/20 rounded-lg p-6 hover:border-ttb-blue/50 transition-all hover:shadow-lg hover:shadow-ttb-blue/20"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-ttb-blue/0 to-ttb-violet/0 group-hover:from-ttb-blue/5 group-hover:to-ttb-violet/5 rounded-lg transition-all" />

              <div className="relative z-10">
                <h3 className="text-lg font-bold text-white mb-3">{service.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.slice(0, 2).map((feature, i) => (
                    <li key={i} className="text-xs text-ttb-blue flex items-center">
                      <span className="mr-2">→</span>{feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}