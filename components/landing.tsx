'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Wallet,
  TrendingUp,
  PieChart,
  Zap,
  Shield,
  Smartphone,
  ArrowRight,
  Star,
  Sparkles,
  Target,
  BarChart3,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface LandingProps {
  onGetStarted: () => void;
}

export function Landing({ onGetStarted }: LandingProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A] via-[#1E1B4B] to-[#0F172A]" />

      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-violet-600/30 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-fuchsia-600/30 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-cyan-600/30 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>

      <div className="absolute inset-0 opacity-20">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <nav className="container max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-violet-500/50">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                Penny
              </span>
            </div>
            <Button
              onClick={onGetStarted}
              className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white shadow-lg shadow-violet-500/50 hover:shadow-xl hover:shadow-violet-500/60 transition-all duration-300"
            >
              Get Started
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </nav>

        <section className="container max-w-7xl mx-auto px-4 pt-20 pb-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in-up">
              <div className="inline-block">
                <span className="px-4 py-2 rounded-full bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 border border-violet-500/30 text-violet-300 text-sm font-medium backdrop-blur-sm">
                  ✨ Track Every Penny, Save Every Dollar
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                  Budget Like
                </span>
                <br />
                <span className="text-white">A Boss</span>
              </h1>

              <p className="text-xl text-zinc-300 leading-relaxed max-w-xl">
                Take control of your finances with AI-powered insights, beautiful visualizations,
                and effortless expense tracking. Welcome to the future of budgeting.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button
                  onClick={onGetStarted}
                  size="lg"
                  className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white text-lg px-8 py-6 rounded-xl shadow-2xl shadow-violet-500/50 hover:shadow-violet-500/70 hover:scale-105 transition-all duration-300 group"
                >
                  Start Tracking Free
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-6 rounded-xl border-2 border-zinc-700 hover:border-violet-500/50 bg-zinc-900/50 backdrop-blur-sm hover:bg-zinc-800/50 transition-all duration-300"
                >
                  Watch Demo
                </Button>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-full border-2 border-zinc-900 bg-gradient-to-br from-violet-500 to-fuchsia-500"
                      />
                    ))}
                  </div>
                  <div className="text-sm">
                    <div className="flex gap-1 text-yellow-400">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-zinc-400">10k+ happy users</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative" style={{ animationDelay: '0.3s' }}>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-violet-600/30 to-fuchsia-600/30 rounded-3xl blur-2xl" />
                <Card className="relative bg-gradient-to-br from-zinc-900/90 to-zinc-800/90 border-2 border-violet-500/30 backdrop-blur-xl shadow-2xl overflow-hidden">
                  <CardContent className="p-8">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-zinc-400">Your Balance</p>
                          <h3 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                            $48,678.00
                          </h3>
                        </div>
                        <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30">
                          <TrendingUp className="w-8 h-8 text-emerald-400" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20">
                          <p className="text-xs text-zinc-400 mb-1">Income</p>
                          <p className="text-xl font-bold text-emerald-400">+$12,340</p>
                        </div>
                        <div className="p-4 rounded-xl bg-gradient-to-br from-rose-500/10 to-pink-500/10 border border-rose-500/20">
                          <p className="text-xs text-zinc-400 mb-1">Expenses</p>
                          <p className="text-xl font-bold text-rose-400">-$8,450</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {[
                          { name: 'Food & Dining', amount: '$1,234', color: 'from-red-500 to-orange-500' },
                          { name: 'Transportation', amount: '$567', color: 'from-blue-500 to-cyan-500' },
                          { name: 'Entertainment', amount: '$890', color: 'from-purple-500 to-pink-500' },
                        ].map((item, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50 hover:border-violet-500/30 transition-all duration-300 hover:scale-[1.02]"
                          >
                            <div className="flex items-center gap-3">
                              <div className={cn('w-2 h-8 rounded-full bg-gradient-to-b', item.color)} />
                              <span className="text-sm font-medium text-zinc-300">{item.name}</span>
                            </div>
                            <span className="text-sm font-semibold text-white">{item.amount}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-2xl rotate-12 opacity-20 blur-xl animate-float" />
                <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full opacity-20 blur-xl animate-float" style={{ animationDelay: '0.5s' }} />
              </div>
            </div>
          </div>
        </section>

        <section className="container max-w-7xl mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                Everything You Need
              </span>
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Powerful features designed to make budgeting effortless and actually fun
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: 'Lightning Fast',
                description: 'Add transactions in seconds with smart auto-complete and quick actions',
                gradient: 'from-yellow-500 to-orange-500',
                glowColor: 'shadow-yellow-500/50',
              },
              {
                icon: PieChart,
                title: 'Visual Insights',
                description: 'Beautiful charts and graphs that make your spending crystal clear',
                gradient: 'from-violet-500 to-fuchsia-500',
                glowColor: 'shadow-violet-500/50',
              },
              {
                icon: Target,
                title: 'Smart Goals',
                description: 'Set savings targets and watch your progress with real-time tracking',
                gradient: 'from-emerald-500 to-cyan-500',
                glowColor: 'shadow-emerald-500/50',
              },
              {
                icon: Shield,
                title: 'Bank-Level Security',
                description: 'Your data is encrypted and stored locally. Total privacy guaranteed',
                gradient: 'from-blue-500 to-cyan-500',
                glowColor: 'shadow-blue-500/50',
              },
              {
                icon: Smartphone,
                title: 'Mobile First',
                description: 'Optimized for on-the-go tracking with native app performance',
                gradient: 'from-pink-500 to-rose-500',
                glowColor: 'shadow-pink-500/50',
              },
              {
                icon: BarChart3,
                title: 'Recurring Bills',
                description: 'Never miss a payment with automated recurring transaction tracking',
                gradient: 'from-indigo-500 to-purple-500',
                glowColor: 'shadow-indigo-500/50',
              },
            ].map((feature, i) => (
              <Card
                key={i}
                className="group relative bg-gradient-to-br from-zinc-900/90 to-zinc-800/90 border-2 border-zinc-700/50 hover:border-violet-500/50 backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/0 to-fuchsia-500/0 group-hover:from-violet-500/5 group-hover:to-fuchsia-500/5 transition-all duration-300" />
                <CardContent className="relative p-6 space-y-4">
                  <div className={cn('inline-flex p-3 rounded-xl bg-gradient-to-br', feature.gradient, 'shadow-lg', feature.glowColor, 'group-hover:shadow-xl transition-all duration-300')}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-violet-400 group-hover:to-fuchsia-400 group-hover:bg-clip-text transition-all duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-zinc-400 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="container max-w-7xl mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                Loved by Thousands
              </span>
            </h2>
            <p className="text-xl text-zinc-400">
              Join the community making smarter financial decisions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Sarah Chen',
                role: 'Product Designer',
                content: 'Finally, a budget app that doesn\'t feel like homework. The UI is gorgeous and it actually makes me want to track my spending!',
                rating: 5,
              },
              {
                name: 'Marcus Johnson',
                role: 'Software Engineer',
                content: 'The visualizations are incredible. I can see exactly where my money goes and it\'s helped me save $500 a month!',
                rating: 5,
              },
              {
                name: 'Emma Rodriguez',
                role: 'Content Creator',
                content: 'Love the dark mode and the smooth animations. It\'s like the Apple of budget apps. Highly recommend!',
                rating: 5,
              },
            ].map((testimonial, i) => (
              <Card
                key={i}
                className="bg-gradient-to-br from-zinc-900/90 to-zinc-800/90 border-2 border-zinc-700/50 backdrop-blur-xl hover:border-violet-500/50 transition-all duration-300 hover:scale-105"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <CardContent className="p-6 space-y-4">
                  <div className="flex gap-1 text-yellow-400">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-zinc-300 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center gap-3 pt-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500" />
                    <div>
                      <p className="font-semibold text-white">{testimonial.name}</p>
                      <p className="text-sm text-zinc-400">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="container max-w-7xl mx-auto px-4 py-20">
          <Card className="relative bg-gradient-to-br from-violet-600 to-fuchsia-600 border-0 overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500 rounded-full blur-3xl" />
            </div>
            <CardContent className="relative p-12 md:p-16 text-center space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm">
                <Clock className="w-4 h-4 text-white" />
                <span className="text-sm font-medium text-white">Limited Time Offer</span>
              </div>

              <h2 className="text-4xl md:text-6xl font-bold text-white">
                Start Your Financial
                <br />
                Journey Today
              </h2>

              <p className="text-xl text-violet-100 max-w-2xl mx-auto">
                Join 10,000+ users who are already taking control of their finances.
                No credit card required.
              </p>

              <div className="flex flex-wrap gap-4 justify-center">
                <Button
                  onClick={onGetStarted}
                  size="lg"
                  className="bg-white text-violet-600 hover:bg-zinc-100 text-lg px-8 py-6 rounded-xl shadow-2xl hover:shadow-white/20 hover:scale-105 transition-all duration-300 group"
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-8 pt-8">
                {[
                  { icon: CheckCircle2, text: 'No credit card' },
                  { icon: CheckCircle2, text: 'Free forever' },
                  { icon: CheckCircle2, text: 'Cancel anytime' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-white">
                    <item.icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <footer className="container max-w-7xl mx-auto px-4 py-12 border-t border-zinc-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                Penny
              </span>
            </div>
            <p className="text-sm text-zinc-500">
              © 2024 Penny. Made with love for smarter budgeting.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
