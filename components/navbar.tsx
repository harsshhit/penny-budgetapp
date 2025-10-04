'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Receipt, 
  ChartBar as BarChart3, 
  Settings, 
  Repeat,
  LogOut,
  User
} from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface NavbarProps {
  currentTab?: string;
  onTabChange?: (tab: string) => void;
  showTabs?: boolean;
}

export function Navbar({ 
  currentTab = 'dashboard', 
  onTabChange, 
  showTabs = true 
}: NavbarProps) {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'transactions', label: 'Transactions', icon: Receipt },
    { id: 'recurring', label: 'Recurring', icon: Repeat },
    { id: 'categories', label: 'Categories', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60" 
         style={{ borderColor: 'rgba(147,51,234,0.15)' }}>
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="Penny" width={120} height={40} />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {status === 'authenticated' && showTabs && (
              <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 rounded-lg p-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => onTabChange?.(tab.id)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        currentTab === tab.id
                          ? 'bg-zinc-800 text-white'
                          : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="hidden lg:inline">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              {status === 'authenticated' ? (
                <>
                  {/* User Menu */}
                  <div className="relative">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-[#9333ea] text-[#9333ea] hover:bg-[#0f0f0f]"
                      onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                      <User className="w-4 h-4 mr-2" />
                      {session?.user?.name || 'User'}
                    </Button>
                    
                    {isMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-zinc-900 border border-zinc-800 rounded-lg shadow-lg">
                        <div className="py-1">
                          <button
                            onClick={handleSignOut}
                            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-zinc-400 hover:text-white hover:bg-zinc-800"
                          >
                            <LogOut className="w-4 h-4" />
                            Sign Out
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-3">
                  <Button
                    onClick={() => signIn('google')}
                    className="bg-black border border-[#9333ea] text-[#9333ea] hover:bg-[#0f0f0f]"
                    variant="outline"
                    size="sm"
                  >
                    Sign in with Google
                  </Button>
                  <Button
                    onClick={() => signIn('google')}
                    className="bg-[#9333ea] text-white hover:bg-[#7c3aed]"
                    size="sm"
                  >
                    Get Started
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="outline"
              size="sm"
              className="border-[#9333ea] text-[#9333ea]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              Menu
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t py-4" style={{ borderColor: 'rgba(147,51,234,0.15)' }}>
            {status === 'authenticated' && showTabs && (
              <div className="space-y-2 mb-4">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        onTabChange?.(tab.id);
                        setIsMenuOpen(false);
                      }}
                      className={`flex items-center gap-2 w-full px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        currentTab === tab.id
                          ? 'bg-zinc-800 text-white'
                          : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            )}

            {status === 'authenticated' ? (
              <div className="space-y-2">
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  className="w-full border-[#9333ea] text-[#9333ea] hover:bg-[#0f0f0f]"
                  size="sm"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <Button
                  onClick={() => signIn('google')}
                  className="w-full bg-[#9333ea] text-white hover:bg-[#7c3aed]"
                  size="sm"
                >
                  Get Started
                </Button>
                <Button
                  onClick={() => signIn('google')}
                  variant="outline"
                  className="w-full border-[#9333ea] text-[#9333ea] hover:bg-[#0f0f0f]"
                  size="sm"
                >
                  Sign in with Google
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
