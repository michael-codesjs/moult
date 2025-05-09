 'use client'

import Link from 'next/link';
import { Header } from '@/layout/header';
import { BottomNavigation } from '@/layout/navigation';

export default function GetTheAppPage() {
  // App features list
  const appFeatures = [
    {
      title: "Virtual Try-On",
      description: "See how clothes fit on your body in real-time with AR technology",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      )
    },
    {
      title: "3D Product View",
      description: "Examine every detail of products from any angle before purchasing",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
        </svg>
      )
    },
    {
      title: "Exclusive Collections",
      description: "Access brand drops and limited releases directly from your phone",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      )
    },
    {
      title: "AI Style Assistant",
      description: "Get personalized style recommendations based on your preferences",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    }
  ];

  return (
      <div className="min-h-screen text-white">
        {/* Hero Section */}
        <section className="pt-16 lg:pt-20 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center">
              {/* Text Column */}
              <div className="w-full lg:w-1/2 lg:pr-16 mb-12 lg:mb-0">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-fuchsia-300 to-indigo-300 mb-6">
                  Fashion at your fingertips
                </h1>
                <p className="text-lg text-gray-300 mb-10">
                  Experience the future of shopping with the Moult app. Try on clothes virtually, explore 3D products, and discover your style on the go.
                </p>
                
                {/* App Store Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="#" className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-900 font-medium rounded-lg hover:bg-gray-100 transition-colors">
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.34-3.14-2.57C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.5 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                    <div className="flex flex-col items-start">
                      <span className="text-xs">Download on the</span>
                      <span className="text-base font-semibold">App Store</span>
                    </div>
                  </Link>
                  
                  <Link href="#" className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-900 font-medium rounded-lg hover:bg-gray-100 transition-colors">
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                    </svg>
                    <div className="flex flex-col items-start">
                      <span className="text-xs">GET IT ON</span>
                      <span className="text-base font-semibold">Google Play</span>
                    </div>
                  </Link>
                </div>

                {/* App Rating */}
                <div className="mt-10 flex items-center">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <div className="ml-3">
                    <p className="text-white font-medium">4.9 • 2.2k+ Reviews</p>
                  </div>
                </div>
              </div>

              {/* App Screenshots */}
              <div className="w-full lg:w-1/2 max-w-screen overflow-hidden relative">
               
                
                <div className="relative z-10 flex justify-center">
                  {/* Main Phone */}
                  <div className="relative scale-75 md:scale-100 z-20 transform translate-y-0">
                    <div className="w-[280px] h-[570px] bg-gray-900 rounded-[36px] p-4 border-4 border-gray-800 shadow-xl">
                      <div className="w-full h-full rounded-[28px] overflow-hidden bg-gradient-to-br from-purple-900/50 to-indigo-900/50 flex items-center justify-center">
                        <p className="text-white/50 text-center px-4">Moult App Main Screen</p>
                      </div>
                      <div className="absolute top-[24px] left-1/2 transform -translate-x-1/2 w-20 h-4 bg-gray-800 rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* Secondary Phone (Behind) */}
                  <div className="absolute scale-75 md:scale-100 z-10 transform -translate-x-32 translate-y-12 rotate-[-12deg]">
                    <div className="w-[240px] h-[500px] bg-gray-900 rounded-[32px] p-3 border-4 border-gray-800 shadow-xl">
                      <div className="w-full h-full rounded-[24px] overflow-hidden bg-gradient-to-br from-fuchsia-900/50 to-purple-900/50 flex items-center justify-center">
                        <p className="text-white/50 text-center px-4">AR Try-On View</p>
                      </div>
                      <div className="absolute top-[18px] left-1/2 transform -translate-x-1/2 w-16 h-3 bg-gray-800 rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* Tertiary Phone */}
                  <div className="absolute scale-75 md:scale-100 z-10 transform translate-x-32 translate-y-20 rotate-[12deg]">
                    <div className="w-[240px] h-[500px] bg-gray-900 rounded-[32px] p-3 border-4 border-gray-800 shadow-xl">
                      <div className="w-full h-full rounded-[24px] overflow-hidden bg-gradient-to-br from-indigo-900/50 to-blue-900/50 flex items-center justify-center">
                        <p className="text-white/50 text-center px-4">3D Product View</p>
                      </div>
                      <div className="absolute top-[18px] left-1/2 transform -translate-x-1/2 w-16 h-3 bg-gray-800 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* App Features */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-purple-950/20">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-16">Experience the power of Moult in your pocket</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {appFeatures.map((feature, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-500/30 transition duration-300">
                  <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-6">
                    <div className="text-purple-300">{feature.icon}</div>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Download CTA */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to transform your shopping experience?</h2>
            <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
              Download the Moult app today and discover a new way to shop for fashion. Experience products in 3D, try them on virtually, and find your perfect style.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="#" className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-900 font-medium rounded-lg hover:bg-gray-100 transition-colors">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.34-3.14-2.57C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.5 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <div className="flex flex-col items-start">
                  <span className="text-xs">Download on the</span>
                  <span className="text-base font-semibold">App Store</span>
                </div>
              </Link>
              
              <Link href="#" className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-900 font-medium rounded-lg hover:bg-gray-100 transition-colors">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                </svg>
                <div className="flex flex-col items-start">
                  <span className="text-xs">GET IT ON</span>
                  <span className="text-base font-semibold">Google Play</span>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6 border-t border-white/10 mt-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <p className="text-gray-400 text-sm">
                © 2023 moult. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
  );
}