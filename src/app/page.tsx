import Link from 'next/link';
import { ArrowRight, Database, FileText, CheckCircle, BarChart, Users, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">MarkMyMatter</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <Link href="#about" className="hover:text-blue-600 transition-colors">About</Link>
            <Link href="#features" className="hover:text-blue-600 transition-colors">Features</Link>
            <Link href="#benefits" className="hover:text-blue-600 transition-colors">Benefits</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" className="font-medium text-slate-600">Dashboard</Button>
            </Link>
            <Link href="/request-demo">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full px-6">
                Request a Demo
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-24 pb-32 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100 via-slate-50 to-white -z-10"></div>
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              The smart way to manage legal submissions
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 leading-tight">
              Transform your firm's <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">submission process</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Centralize matter data, automate directory submissions, and empower your BD team to stop chasing stakeholders and start building narratives.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/request-demo">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 h-14 text-lg font-medium w-full sm:w-auto shadow-lg shadow-blue-200">
                  Request a Demo <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-lg font-medium w-full sm:w-auto border-slate-300 text-slate-700 hover:bg-slate-100">
                  View Prototype
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Value Proposition Grid */}
        <section id="features" className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Value Proposition</h2>
              <p className="text-slate-500 text-lg max-w-2xl mx-auto">Everything you need to streamline submissions from start to finish.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: Database, title: "Centralized Repository", desc: "A single source of truth for all matter data, deals, and professional experiences." },
                { icon: FileText, title: "Automated Submissions", desc: "Pre-populate directory forms instantly using historical firm data." },
                { icon: CheckCircle, title: "Streamlined Proposals", desc: "Build pitches and RFPs in minutes, not days." },
                { icon: BarChart, title: "Data Analytics", desc: "Track submission success rates and measure the ROI of your BD efforts." },
                { icon: Users, title: "Seamless Collaboration", desc: "Effortless review workflows between lawyers and the marketing team." },
                { icon: ArrowUpRight, title: "Form Conversion", desc: "Easily export data into specific formats required by Chambers, Legal 500, etc." }
              ].map((feature, i) => (
                <div key={i} className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <feature.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The Problem / Solution */}
        <section id="about" className="py-24 bg-slate-900 text-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              <div className="lg:w-1/2">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">From the Desk of the Founding Team</h2>
                <div className="space-y-6 text-slate-300 text-lg leading-relaxed">
                  <p>
                    As a team who has spent countless hours in-house at a law firm, manually managing the intricate dance between execution and recognition, we understand the frustrations that both lawyers and marketing teams face.
                  </p>
                  <p>
                    We have seen firsthand how lawyers, consumed with executing deals and managing matters, struggle to prioritize marketing requests. On the other hand, we have seen marketing teams tirelessly share fresh forms with lawyers, asking for the same information in different formats for every new submission.
                  </p>
                  <p className="text-white font-medium">
                    This is exactly why we built MarkMyMatter. To bridge this gap. To empower both lawyers and marketing teams with tools that respect their time, reduce friction, and ensure the firm’s achievements are always front and center.
                  </p>
                </div>
              </div>
              <div className="lg:w-1/2 w-full">
                <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700 shadow-2xl relative">
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500 rounded-full blur-3xl opacity-20"></div>
                  <h3 className="text-2xl font-bold mb-8">Time & Resources Spent</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2 text-sm">
                        <span className="text-slate-300">Collecting Matter Data</span>
                        <span className="text-blue-400 font-bold">25%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2 text-sm">
                        <span className="text-slate-300">Selection for Submissions</span>
                        <span className="text-blue-400 font-bold">20.8%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '20.8%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2 text-sm">
                        <span className="text-slate-300">Modifying Submissions</span>
                        <span className="text-blue-400 font-bold">16.6%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '16.6%' }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 grid grid-cols-2 gap-4">
                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-700 text-center">
                      <div className="text-3xl font-bold text-blue-400 mb-1">70%</div>
                      <div className="text-xs text-slate-400 uppercase tracking-wider">Resources Saved</div>
                    </div>
                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-700 text-center">
                      <div className="text-3xl font-bold text-emerald-400 mb-1">60%</div>
                      <div className="text-xs text-slate-400 uppercase tracking-wider">Time Saved</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-blue-600 text-white text-center">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-8">Ready to enable and assist your legal practice?</h2>
            <p className="text-xl text-blue-100 mb-10">Leave us a demo request and our team will get in touch to explore how MarkMyMatter can transform your firm.</p>
            <Link href="/request-demo">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100 rounded-full px-10 h-14 text-lg font-bold shadow-lg">
                Request a Demo Today
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t py-12">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="font-bold text-lg text-slate-900">MarkMyMatter</span>
          </div>
          <div className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} Mark My Matter. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
