'use client';

import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/navbar';
import { Shield, BarChart2, Zap, Repeat, Layers, PieChart, UploadCloud, Download, CreditCard, ArrowDownRight, ArrowUpRight } from 'lucide-react';

export function Landing() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar for unauthenticated users */}
      <Navbar showTabs={false} />
      
      {/* Glow background accents */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full blur-3xl" style={{ background: 'radial-gradient(closest-side, rgba(147,51,234,0.08), transparent)' }} />
        <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full blur-3xl" style={{ background: 'radial-gradient(closest-side, rgba(147,51,234,0.06), transparent)' }} />
      </div>

      <div className="container max-w-7xl mx-auto px-4 py-6 md:py-10">

        {/* Hero */}
        <section className="mt-14 md:mt-20 grid gap-10 md:grid-cols-2 md:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs" style={{ borderColor: 'rgba(147,51,234,0.25)', color: '#9333ea' }}>
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: '#9333ea' }} />
              Multi-user. Private. Fast.
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold leading-[1.1]">
              Your money, mastered.
            </h2>
            <p className="text-zinc-400 text-lg max-w-prose">
              Penny brings your income, expenses, categories, and insights together with a delightful, blazing-fast experience.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={() => signIn('google')}
                className="bg-[#9333ea] text-white hover:bg-[#7c3aed]"
              >
                Start free with Google
              </Button>
              <Button
                onClick={() => signIn('google')}
                className="bg-black border border-[#9333ea] text-[#9333ea] hover:bg-[#0f0f0f]"
                variant="outline"
              >
                Live Demo
              </Button>
            </div>
            {/* Stat pills */}
            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="rounded-lg border p-4 text-center" style={{ borderColor: 'rgba(147,51,234,0.15)' }}>
                <div className="text-xl font-bold" style={{ color: '#9333ea' }}>1k+</div>
                <div className="text-xs text-zinc-400">Active users</div>
              </div>
              <div className="rounded-lg border p-4 text-center" style={{ borderColor: 'rgba(147,51,234,0.15)' }}>
                <div className="text-xl font-bold" style={{ color: '#9333ea' }}>99.9%</div>
                <div className="text-xs text-zinc-400">Uptime</div>
              </div>
              <div className="rounded-lg border p-4 text-center" style={{ borderColor: 'rgba(147,51,234,0.15)' }}>
                <div className="text-xl font-bold" style={{ color: '#9333ea' }}>&lt;100ms</div>
                <div className="text-xs text-zinc-400">Avg. load</div>
              </div>
            </div>
          </div>
          {/* Device preview inspired by mobile UI, in gold theme */}
          <div className="relative">
            <div className="absolute -inset-0.5 rounded-2xl" style={{ background: 'linear-gradient(135deg, rgba(147,51,234,0.25), rgba(147,51,234,0))' }} />
            <div className="relative grid gap-4 md:gap-5">
              {/* Stacked card */}
              <div className="relative mx-auto w-[280px] rounded-3xl border bg-black/70 p-5 shadow-2xl" style={{ borderColor: 'rgba(147,51,234,0.25)' }}>
                <div className="absolute -top-6 right-6 h-16 w-16 rounded-full blur-2xl opacity-60" style={{ background: 'radial-gradient(closest-side, rgba(147,51,234,0.45), transparent)' }} />
                <div className="flex items-center gap-3">
                  <div className="h-9 w-14 rounded-md" style={{ background: 'linear-gradient(135deg, #9333ea, #7c3aed)' }} />
                  <div>
                    <div className="text-xs text-zinc-400">Your Balance</div>
                    <div className="text-lg font-bold tracking-tight" style={{ color: '#9333ea' }}>$48,678.00</div>
                  </div>
                </div>
                <div className="mt-4 rounded-xl p-4" style={{ background: 'linear-gradient(135deg, rgba(147,51,234,0.15), rgba(147,51,234,0.05))' }}>
                  <div className="flex items-center justify-between text-xs text-zinc-400">
                    <span>Transactions</span>
                    <span>Today</span>
                  </div>
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2"><ArrowDownRight size={14} className="text-rose-400" /><span>Coffee</span></div>
                      <span className="text-rose-400">-$6.20</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2"><ArrowUpRight size={14} className="text-emerald-400" /><span>Salary</span></div>
                      <span className="text-emerald-400">+$3,200.00</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2"><ArrowDownRight size={14} className="text-rose-400" /><span>Groceries</span></div>
                      <span className="text-rose-400">-$54.18</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <button className="rounded-lg py-2 text-sm font-medium" style={{ backgroundColor: '#0d0d0d', border: '1px solid rgba(147,51,234,0.2)', color: '#9333ea' }}>Receive</button>
                  <button className="rounded-lg py-2 text-sm font-medium bg-[#9333ea] text-white hover:bg-[#7c3aed]">Transfer</button>
                </div>
              </div>

              {/* Chart + categories card */}
              <div className="mx-auto w-[280px] rounded-3xl border bg-black/70 p-4 shadow-2xl" style={{ borderColor: 'rgba(147,51,234,0.25)' }}>
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm text-zinc-300">Statistics</span>
                  <span className="text-xs text-zinc-500">Month</span>
                </div>
                {/* Faux line chart */}
                <div className="h-24 w-full overflow-hidden rounded-md bg-[#0a0a0a]">
                  <div className="relative h-full w-full">
                    <div className="absolute inset-x-0 bottom-0 h-1.5" style={{ background: 'linear-gradient(90deg, rgba(147,51,234,0), rgba(147,51,234,0.8), rgba(147,51,234,0))' }} />
                    <svg viewBox="0 0 100 40" className="h-full w-full">
                      <path d="M0 28 L10 26 L20 30 L30 18 L40 22 L50 12 L60 20 L70 16 L80 26 L90 20 L100 24" fill="none" stroke="#9333ea" strokeWidth="2" />
                    </svg>
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div className="rounded-lg border p-3" style={{ borderColor: 'rgba(147,51,234,0.15)' }}>
                    <div className="text-xs text-zinc-400">Food</div>
                    <div className="text-sm font-semibold">$1,780.34</div>
                  </div>
                  <div className="rounded-lg border p-3" style={{ borderColor: 'rgba(147,51,234,0.15)' }}>
                    <div className="text-xs text-zinc-400">Health</div>
                    <div className="text-sm font-semibold">$890.12</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature grid */}
        <section className="mt-16 md:mt-24">
          <h3 className="text-xl font-semibold mb-6" style={{ color: '#9333ea' }}>Why Penny?</h3>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { icon: BarChart2, title: 'Live Dashboard', desc: 'Current month income vs. expenses, trends, and breakdowns.' },
              { icon: PieChart, title: 'Category Mastery', desc: 'Default + custom categories with color and icon personalization.' },
              { icon: Zap, title: 'Quick Add', desc: 'Ultra-fast transaction entry with smart defaults and validation.' },
              { icon: Repeat, title: 'Recurring', desc: 'Daily, weekly, monthly, or yearly with auto-generation on schedule.' },
              { icon: UploadCloud, title: 'Receipts', desc: 'Attach receipts to transactions for clean record-keeping.' },
              { icon: Download, title: 'Exports', desc: 'CSV/PDF exports (coming soon) for reports and sharing.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-xl border p-5 hover:translate-y-[-2px] transition-transform" style={{ borderColor: 'rgba(147,51,234,0.15)' }}>
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg" style={{ backgroundColor: 'rgba(147,51,234,0.08)' }}>
                  <Icon size={18} style={{ color: '#9333ea' }} />
                </div>
                <h4 className="font-semibold">{title}</h4>
                <p className="mt-1 text-sm text-zinc-400">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="mt-16 md:mt-24">
          <h3 className="text-xl font-semibold mb-6" style={{ color: '#9333ea' }}>How Penny works</h3>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { step: '01', title: 'Sign in securely', desc: 'Use Google Sign-In. Your data is scoped to your account.' },
              { step: '02', title: 'Add your data', desc: 'Log income/expenses, create categories, attach receipts.' },
              { step: '03', title: 'See insights', desc: 'Real-time dashboard highlights trends and spending patterns.' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="rounded-xl border p-5" style={{ borderColor: 'rgba(147,51,234,0.15)' }}>
                <div className="text-xs font-bold" style={{ color: '#9333ea' }}>{step}</div>
                <h4 className="mt-1 font-semibold">{title}</h4>
                <p className="mt-1 text-sm text-zinc-400">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Trust strip */}
        <section className="mt-16 md:mt-24 rounded-xl border px-6 py-5" style={{ borderColor: 'rgba(147,51,234,0.15)' }}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Shield size={18} style={{ color: '#9333ea' }} />
              <span className="text-sm text-zinc-300">Secure by design: session-based access, per-user data isolation.</span>
            </div>
            <div className="flex items-center gap-2">
              <Layers size={18} style={{ color: '#9333ea' }} />
              <span className="text-sm text-zinc-300">MongoDB backend with robust API routes.</span>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-12 md:mt-16 text-center">
          <h4 className="text-2xl font-bold">Ready to budget like royalty?</h4>
          <p className="mt-2 text-zinc-400">Sign in and start tracking in under 10 seconds.</p>
          <div className="mt-5 flex justify-center gap-3">
            <Button
              onClick={() => signIn('google')}
              className="bg-[#9333ea] text-white hover:bg-[#7c3aed]"
            >
              Get Started
            </Button>
            <Button
              onClick={() => signIn('google')}
              className="bg-black border border-[#9333ea] text-[#9333ea] hover:bg-[#0f0f0f]"
              variant="outline"
            >
              Sign in with Google
            </Button>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 md:mt-20 border-t pt-6 text-sm text-zinc-500" style={{ borderColor: 'rgba(147,51,234,0.15)' }}>
          <div className="flex items-center justify-between">
            <span>© {new Date().getFullYear()} Penny</span>
            <div className="flex items-center gap-4">
              <span>Privacy</span>
              <span>Terms</span>
              <span>Contact</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}


