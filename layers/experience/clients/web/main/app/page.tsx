import { Banner } from "@/components/ui/banner";
import Link from "next/link";
import Image from "next/image";

const brands = [
  { name: 'NIKE', logo: 'https://www.freepnglogos.com/uploads/nike-logo-png/nike-logo-png-nike-symbol-22.png' },
  { name: 'ADIDAS', logo: 'https://www.freepnglogos.com/uploads/adidas-logo-png/adidas-logo-png-symbol-1.png' },
  { name: 'DIOR', logo: 'https://logowik.com/content/uploads/images/dior-new-20213345.jpg' },
  { name: 'GUCCI', logo: 'https://www.freepnglogos.com/uploads/gucci-logo-png/gucci-logo-png-symbol-brand-6.png' },
  { name: 'PRADA', logo: 'https://www.freepnglogos.com/uploads/prada-logo-png/prada-logo-png-symbol-2.png' },
  { name: 'BALENCIAGA', logo: 'https://logos-world.net/wp-content/uploads/2020/07/Balenciaga-Logo.png' },
  { name: 'VERSACE', logo: 'https://www.freepnglogos.com/uploads/versace-logo-png/versace-logo-png-symbol-2.png' },
  { name: 'HERMÈS', logo: 'https://www.freepnglogos.com/uploads/hermes-logo-png/hermes-logo-png-symbol-1.png' },
  { name: 'CHANEL', logo: 'https://www.freepnglogos.com/uploads/chanel-logo-png/chanel-logo-png-symbol-0.png' },
  { name: 'FENDI', logo: 'https://www.freepnglogos.com/uploads/fendi-logo-png/fendi-logo-png-symbol-1.png' },
  { name: 'LOUIS VUITTON', logo: 'https://www.freepnglogos.com/uploads/louis-vuitton-logo-png/louis-vuitton-logo-png-symbol-1.png' },
  { name: 'ZARA', logo: 'https://www.freepnglogos.com/uploads/zara-logo-png/zara-logo-png-symbol-2.png' },
  { name: 'H&M', logo: 'https://www.freepnglogos.com/uploads/hm-logo-png/hm-logo-png-symbol-1.png' },
  { name: 'UNIQLO', logo: 'https://www.freepnglogos.com/uploads/uniqlo-logo-png/uniqlo-logo-png-symbol-1.png' },
  { name: 'SUPREME', logo: 'https://www.freepnglogos.com/uploads/supreme-logo-png/supreme-logo-png-symbol-1.png' },
];

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Banner />
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <div className="space-y-6 max-w-4xl">
          <div className="flex flex-col items-center space-y-2">
            <h2 className="text-2xl font-bold text-slate-500">moult</h2>
            <p className="text-lg italic text-slate-500">"Out with the old, in with the new"</p>
          </div>
          
          <h1 className="text-5xl sm:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">
            Virtual Fashion Revolution
          </h1>
          
          <p className="text-xl sm:text-2xl text-slate-500 max-w-2xl mx-auto">
            Step into the future of fashion. Create, showcase, and experience your designs in stunning 3D & VR.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <Link 
              href="/login" 
              className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-full text-lg font-semibold transition-all hover:scale-105 hover:shadow-xl"
            >
              Get Started
            </Link>
            <a 
              href="#learn-more"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-slate-500 rounded-full text-lg font-semibold backdrop-blur-sm transition-all"
            >
              Learn More
            </a>
          </div>

          <div className="mt-12 flex gap-8 justify-center items-center text-slate-500">
            <div className="text-center">
              <div className="text-3xl font-bold">10K+</div>
              <div className="text-sm">Designers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">50K+</div>
              <div className="text-sm">3D Models</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">100K+</div>
              <div className="text-sm">Monthly Views</div>
            </div>
          </div>

          {/* Trusted By Section */}
          <div className="mt-16 overflow-hidden">
            <h3 className="text-xl font-semibold text-slate-500 mb-6">Trusted by Leading Brands</h3>
            <div className="relative">
              {/* First Marquee */}
              <div className="flex gap-12 animate-marquee whitespace-nowrap">
                {brands.map((brand, i) => (
                  <div key={`${brand.name}-1-${i}`} className="w-32 h-16 bg-white rounded-lg flex items-center justify-center backdrop-blur-sm group hover:bg-white/90 transition-all cursor-pointer p-4">
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      width={100}
                      height={40}
                      className="object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                ))}
              </div>
              {/* Second Marquee (duplicate for seamless loop) */}
              <div className="flex gap-12 animate-marquee2 whitespace-nowrap absolute top-0">
                {brands.map((brand, i) => (
                  <div key={`${brand.name}-2-${i}`} className="w-32 h-16 bg-white rounded-lg flex items-center justify-center backdrop-blur-sm group hover:bg-white/90 transition-all cursor-pointer p-4">
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      width={100}
                      height={40}
                      className="object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            className="text-slate-500"
            strokeWidth="2"
          >
            <path d="M7 13L12 18L17 13" />
            <path d="M7 6L12 11L17 6" />
          </svg>
        </div>
      </div>

      {/* Virtual Runway Section */}
      <section id="learn-more" className="relative z-10 min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-slate-500">Virtual Runway Shows</h2>
              <p className="text-slate-500 text-lg">
                Experience fashion shows like never before. Our virtual runway platform lets designers showcase their collections
                in immersive 3D environments, reaching global audiences instantly.
              </p>
              <div className="flex gap-4">
                <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg">
                  <span className="text-slate-500">Live Streaming</span>
                </div>
                <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg">
                  <span className="text-slate-500">VR Compatible</span>
                </div>
                <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg">
                  <span className="text-slate-500">Interactive</span>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl aspect-video flex items-center justify-center">
              <span className="text-slate-500">Virtual Runway Demo</span>
            </div>
          </div>
        </div>
      </section>

      {/* Social Features Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4 py-20 bg-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-slate-500">Connect with the Fashion Community</h2>
              <p className="text-slate-500 text-lg">
                Join a thriving community of fashion enthusiasts, designers, and brands. Share your creations,
                get inspired, and collaborate with others in the fashion space.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 space-y-2">
                  <div className="text-2xl text-purple-400">
                    <svg className="w-6 h-6 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-500">Engage & Comment</h3>
                  <p className="text-slate-500 text-sm">Discuss designs and share feedback with the community</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 space-y-2">
                  <div className="text-2xl text-purple-400">
                    <svg className="w-6 h-6 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-500">Follow Creators</h3>
                  <p className="text-slate-500 text-sm">Stay updated with your favorite designers and brands</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 space-y-2">
                  <div className="text-2xl text-purple-400">
                    <svg className="w-6 h-6 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-500">Share Stories</h3>
                  <p className="text-slate-500 text-sm">Share behind-the-scenes and daily fashion updates</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 space-y-2">
                  <div className="text-2xl text-purple-400">
                    <svg className="w-6 h-6 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-500">Collaborate</h3>
                  <p className="text-slate-500 text-sm">Connect and work with other designers and brands</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl aspect-square relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-slate-500">Fashion Post 1</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/50 to-transparent">
                    <div className="flex items-center text-white space-x-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                      </svg>
                      <span className="text-sm">2.4k</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl aspect-video relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-slate-500">Story Preview</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl aspect-video relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-slate-500">Live Stream</span>
                  </div>
                  <div className="absolute top-3 left-3 px-2 py-1 bg-red-500 rounded-full">
                    <span className="text-white text-xs">LIVE</span>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl aspect-square relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-slate-500">Fashion Post 2</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/50 to-transparent">
                    <div className="flex items-center text-white space-x-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                      </svg>
                      <span className="text-sm">128</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4 py-20 bg-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-500 text-center mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 space-y-4">
                <div className="aspect-square bg-white/5 rounded-xl flex items-center justify-center">
                  <span className="text-slate-500">3D Model Preview</span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-slate-500">Limited Edition Sneaker</h3>
                  <p className="text-slate-500">Experience this product in 3D/VR</p>
                  <button className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
                    View in 3D
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
