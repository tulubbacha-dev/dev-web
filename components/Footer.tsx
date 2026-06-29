export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-ttb-dark border-t border-ttb-blue/20 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Company */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">TTB Technology</h3>
            <p className="text-gray-400 text-sm">Enterprise AI solutions for the future</p>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="font-semibold text-white mb-4">Solutions</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-ttb-blue transition-colors">AI Strategy</a></li>
              <li><a href="#" className="hover:text-ttb-blue transition-colors">ML Development</a></li>
              <li><a href="#" className="hover:text-ttb-blue transition-colors">Generative AI</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-ttb-blue transition-colors">About</a></li>
              <li><a href="#" className="hover:text-ttb-blue transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-ttb-blue transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-ttb-blue transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-ttb-blue transition-colors">Terms</a></li>
              <li><a href="#" className="hover:text-ttb-blue transition-colors">Security</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-ttb-blue/20 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {currentYear} TTB Technology LLC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}