import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8fbff] relative overflow-x-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 -left-40 w-[400px] h-[400px] bg-blue-500 blur-[160px] opacity-20 rounded-full -z-10"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-500 blur-[160px] opacity-20 rounded-full -z-10"></div>

      <nav className="navbar bg-white/75 backdrop-blur-md border-b border-white/40 sticky top-0 z-50 px-6 lg:px-12">
        <div className="flex-1">
          <Link href="/">
            <Image src="/assets/logo full.png" alt="TRANZO" width={176} height={44} className="w-44" priority />
          </Link>
        </div>
        <div className="flex-none gap-2">
          <Link href="/login" className="btn btn-primary rounded-full">Sign In</Link>
          <Link href="/register" className="btn btn-outline btn-primary rounded-full hidden sm:flex">Register</Link>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl mx-auto px-6 lg:px-12 py-20 flex items-center">
        <div className="hero">
          <div className="hero-content flex-col lg:flex-row-reverse gap-16 w-full justify-between">
            
            <div className="flex-1 flex justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 blur-3xl opacity-30 rounded-full"></div>
              {/* Fallback image if dashboard-preview is missing */}
              <div className="relative w-full max-w-sm rounded-[2.5rem] border-[8px] border-slate-900 bg-white shadow-2xl overflow-hidden aspect-[9/19]">
                <div className="w-32 h-6 bg-slate-900 absolute top-0 left-1/2 -translate-x-1/2 rounded-b-3xl"></div>
                <div className="p-6 pt-12 flex flex-col items-center justify-center h-full text-center space-y-4">
                  <Image src="/assets/logo.png" width={80} height={80} alt="Logo" className="animate-bounce" />
                  <h3 className="text-2xl font-bold text-indigo-900">Tranzo App</h3>
                  <p className="text-gray-500 text-sm">Smart mobile financial transactions at your fingertips.</p>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <div className="inline-block px-4 py-2 bg-blue-50 border border-blue-200 text-blue-700 rounded-full text-sm font-semibold mb-6">
                🚀 Welcome to the Future of Finance
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold text-slate-800 leading-tight mb-6">
                Smart <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Transactions</span>
                <br />Made Simple.
              </h1>
              <p className="text-lg text-slate-600 mb-8 max-w-md">
                Experience secure, lightning-fast money transfers, bill payments, and smart budgeting all in one powerful app.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link href="/register" className="btn btn-primary btn-lg rounded-full px-8 bg-gradient-to-r from-blue-600 to-indigo-700 border-0 hover:scale-105 transition-transform">
                  Get Started <span className="ml-2">→</span>
                </Link>
                <Link href="/login" className="btn btn-outline btn-lg rounded-full px-8">
                  Sign In
                </Link>
              </div>

              <div className="mt-12 flex items-center gap-6 text-slate-500">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-slate-800">100k+</span>
                  <span className="text-sm">Active Users</span>
                </div>
                <div className="w-px h-12 bg-slate-200"></div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-slate-800">4.9/5</span>
                  <span className="text-sm">User Rating</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
