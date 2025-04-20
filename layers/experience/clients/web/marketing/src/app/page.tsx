'use server'

import Button from '../components/button/Button';

export default async function Home() {
  return (
    <div className="relative text-white">
      {/* Immersive Gallery Hero */}
      <section className="min-h-screen pt-8 mb:pt-20 pb-24 px-6 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Logo + Nav */}
          <header className="flex justify-between items-center mb-16">
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-fuchsia-300 to-indigo-300">
              moult
            </h1>
            <nav className="hidden md:flex space-x-8 text-sm">
              <a href="#explore" className="hover:text-purple-300 transition">Explore</a>
              <a href="#brands" className="hover:text-purple-300 transition">Brands</a>
              <a href="#download" className="text-purple-300 hover:text-purple-200 transition border-b border-purple-400">Download App</a>
            </nav>
            <Button variant="ghost" href='/auth/up'>
              Sign up for early access
            </Button>
          </header>

          {/* Headline */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-fuchsia-300 to-indigo-300 mb-6">
              Fashion reimagined in digital dimensions
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Experience clothing in immersive 3D, AR, and VR — see every detail, try on virtually, and discover your style
            </p>
          </div>

          {/* Gallery Grid - Large Showcase */}
          <div id="gallery" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Feature Item 1 - Large */}
            <div className="relative aspect-[3/4] col-span-1 md:col-span-2 lg:col-span-2 row-span-2 overflow-hidden rounded-2xl group">
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/70 to-transparent z-10"></div>
              <div className="absolute bottom-0 left-0 p-6 z-20">
                <div className="bg-white/10 backdrop-blur-lg text-xs inline-block px-3 py-1 rounded-full mb-3">
                  AR Experience
                </div>
                <h3 className="text-2xl font-bold mb-2">Virtual Try-On Technology</h3>
                <p className="text-gray-300 mb-4 max-w-md">See how clothes fit your body before purchasing with our advanced AR technology</p>
                <a href="#" className="inline-flex items-center text-purple-300 hover:text-purple-200">
                  Try it now
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
              <div className="absolute inset-0 bg-purple-900/20 group-hover:bg-purple-900/0 transition duration-300"></div>
              <div className="h-full w-full bg-gradient-to-br from-purple-900/30 to-indigo-900/30 flex items-center justify-center">
                <p className="text-white/50">AR Model Preview</p>
              </div>
            </div>

            {/* Feature Item 2 */}
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl group">
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/70 to-transparent z-10"></div>
              <div className="absolute bottom-0 left-0 p-6 z-20">
                <div className="bg-white/10 backdrop-blur-lg text-xs inline-block px-3 py-1 rounded-full mb-3">
                  3D Model
                </div>
                <h3 className="text-xl font-bold mb-2">Detailed Visualization</h3>
                <p className="text-gray-300 text-sm mb-3">Examine fabrics and details from every angle</p>
              </div>
              <div className="absolute inset-0 bg-purple-900/20 group-hover:bg-purple-900/0 transition duration-300"></div>
              <div className="h-full w-full bg-gradient-to-br from-fuchsia-900/30 to-purple-900/30 flex items-center justify-center">
                <p className="text-white/50">3D Model Preview</p>
              </div>
            </div>

            {/* Feature Item 3 */}
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl group">
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/70 to-transparent z-10"></div>
              <div className="absolute bottom-0 left-0 p-6 z-20">
                <div className="bg-white/10 backdrop-blur-lg text-xs inline-block px-3 py-1 rounded-full mb-3">
                  AI Styling
                </div>
                <h3 className="text-xl font-bold mb-2">Personalized Collections</h3>
                <p className="text-gray-300 text-sm mb-3">AI-curated styles that match your preferences</p>
              </div>
              <div className="absolute inset-0 bg-purple-900/20 group-hover:bg-purple-900/0 transition duration-300"></div>
              <div className="h-full w-full bg-gradient-to-br from-indigo-900/30 to-fuchsia-900/30 flex items-center justify-center">
                <p className="text-white/50">AI Style Preview</p>
              </div>
            </div>
          </div>

          {/* Secondary Gallery Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="group relative aspect-square overflow-hidden rounded-xl">
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/70 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 z-10"></div>
                <div className="absolute inset-0 p-4 z-20 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition duration-300">
                  <h4 className="text-sm font-bold">Fashion Item {item}</h4>
                  <p className="text-xs text-gray-300">Explore in 3D</p>
                </div>
                <div className="h-full w-full bg-gradient-to-br from-purple-900/30 to-indigo-900/30 flex items-center justify-center">
                  <p className="text-white/30 text-sm">Item {item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-purple-950/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Experience Fashion in New Dimensions</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Moult bridges the gap between physical and digital fashion with cutting-edge technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-purple-500/30 transition duration-300">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">3D Visualization</h3>
              <p className="text-gray-300">
                Explore every stitch, texture, and detail from any angle with photorealistic 3D models.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-purple-500/30 transition duration-300">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Virtual Fitting Room</h3>
              <p className="text-gray-300">
                Try clothes on your digital avatar or in real-time with AR to ensure the perfect fit.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-purple-500/30 transition duration-300">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">AI Style Assistant</h3>
              <p className="text-gray-300">
                Get personalized style recommendations based on your preferences, body type, and current trends.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Partnership Banner */}
      <section id="brands" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-purple-900/50 to-indigo-900/50 rounded-3xl p-10 md:p-16 border border-white/10 overflow-hidden relative">
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">For Fashion Brands</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-lg">
                Transform how customers experience your collections with immersive 3D and AR technology
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-6 py-3 rounded-full bg-white text-purple-900 font-medium hover:bg-gray-100 transition duration-300">
                  Partner with us
                </button>
                <button className="px-6 py-3 rounded-full bg-transparent border border-white/50 text-white font-medium hover:bg-white/10 transition duration-300">
                  Learn more
                </button>
              </div>
            </div>
            <div className="absolute right-0 top-0 w-1/3 h-full opacity-20 sm:opacity-40">
              <div className="h-full w-full bg-gradient-to-l from-purple-300 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/10 mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">moult</h3>
              <p className="text-sm text-gray-400 max-w-xs">
                Redefining fashion discovery through immersive technology and AI
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase text-gray-400 mb-4">Experience</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-300 hover:text-white">3D Gallery</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">AR Try-On</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">AI Styling</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase text-gray-400 mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-300 hover:text-white">About</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase text-gray-400 mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-300 hover:text-white">Privacy</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2023 moult. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <span className="sr-only">Twitter</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <span className="sr-only">Instagram</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/50 backdrop-blur-md border-t border-white/20 py-4 md:hidden z-50">
        <div className="flex justify-around items-center max-w-md mx-auto">
          <a href="#gallery" className="flex flex-col items-center">
            <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 7H18C19.1 7 20 7.9 20 9V14C20 15.1 19.1 16 18 16H14.5L13.5 17H10.5L9.5 16H6C4.9 16 4 15.1 4 14V9C4 7.9 4.9 7 6 7Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1.5 12H4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M20 12H22.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span className="text-xs text-white mt-2">Explore</span>
          </a>
          
          <a href="#brands" className="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className="text-xs text-white mt-2">Brands</span>
          </a>
          
          <a href="#download" className="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span className="text-xs text-white mt-2">Get the app</span>
          </a>
          
          <a href="#" className="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            <span className="text-xs text-white mt-2">Sign in</span>
          </a>
        </div>
      </div>
    </div>
  );
}
