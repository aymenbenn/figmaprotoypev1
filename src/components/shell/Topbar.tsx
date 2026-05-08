import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Bell, HelpCircle, Menu, X } from 'lucide-react';
import { MODULES } from '../../lib/modules';
import { cn } from '../../lib/utils';
export function Topbar() {
  const location = useLocation();
  const currentModule =
  MODULES.find((m) => m.path === location.pathname) || MODULES[0];
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  return (
    <>
      <header className="h-16 bg-bone border-b border-soil-100 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-20">
        {/* Left: Breadcrumbs & Mobile Menu */}
        <div className="flex items-center gap-4">
          <button className="md:hidden p-2 -ml-2 text-bark hover:bg-soil-50 rounded-lg">
            <Menu className="h-5 w-5" />
          </button>
          <nav className="hidden sm:flex items-center text-sm font-medium text-soil-400">
            <span>Home</span>
            <span className="mx-2">/</span>
            <span className="text-bark">{currentModule.name}</span>
          </nav>
        </div>

        {/* Center: Global Search */}
        <div className="flex-1 max-w-md mx-4">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="w-full flex items-center gap-2 px-4 py-2 bg-soil-50 border border-soil-100 hover:border-soil-300 rounded-lg text-sm text-soil-400 transition-colors">
            
            <Search className="h-4 w-4" />
            <span className="flex-1 text-left truncate">
              Search orders, batches, SKUs...
            </span>
            <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border border-soil-200 bg-bone px-1.5 font-mono text-[10px] font-medium text-soil-500">
              <span className="text-xs">⌘</span>K
            </kbd>
          </button>
        </div>

        {/* Right: Actions & Status */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-avocado-50 border border-avocado-100 rounded-full text-xs font-medium text-avocado-800">
            <div className="w-2 h-2 rounded-full bg-avocado-500 animate-pulse" />
            Shift A · 06:00–14:00
          </div>

          <div className="flex items-center gap-1">
            <button className="p-2 text-soil-400 hover:text-bark hover:bg-soil-50 rounded-full transition-colors relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-status-danger rounded-full border-2 border-bone" />
            </button>
            <button className="hidden sm:block p-2 text-soil-400 hover:text-bark hover:bg-soil-50 rounded-full transition-colors">
              <HelpCircle className="h-5 w-5" />
            </button>
          </div>

          <div className="w-px h-6 bg-soil-200 hidden sm:block" />

          <button className="h-8 w-8 rounded-full bg-soil-200 border border-soil-300 flex items-center justify-center overflow-hidden sm:hidden">
            <span className="text-xs font-bold text-soil-700">AO</span>
          </button>
        </div>
      </header>

      {/* Simple Command Palette Modal Mock */}
      {isSearchOpen &&
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4">
          <div
          className="fixed inset-0 bg-bark/20 backdrop-blur-sm"
          onClick={() => setIsSearchOpen(false)} />
        
          <div className="relative w-full max-w-2xl bg-bone rounded-xl shadow-2xl border border-soil-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center px-4 py-3 border-b border-soil-100">
              <Search className="h-5 w-5 text-soil-400 mr-3" />
              <input
              autoFocus
              type="text"
              placeholder="Search orders, batches, SKUs, suppliers..."
              className="flex-1 bg-transparent border-none outline-none text-bark placeholder:text-soil-300 text-lg" />
            
              <button
              onClick={() => setIsSearchOpen(false)}
              className="p-1 rounded-md text-soil-400 hover:bg-soil-50">
              
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-2">
              <div className="px-3 py-2 text-xs font-semibold text-soil-400 tracking-wider">
                RECENT
              </div>
              <button className="w-full flex items-center px-3 py-2 text-sm text-bark hover:bg-soil-50 rounded-lg">
                <span className="w-6 h-6 rounded bg-avocado-50 text-avocado-600 flex items-center justify-center mr-3">
                  B
                </span>
                Batch B-0498 (Cold-Press Line A)
              </button>
              <button className="w-full flex items-center px-3 py-2 text-sm text-bark hover:bg-soil-50 rounded-lg">
                <span className="w-6 h-6 rounded bg-amber-50 text-status-warning flex items-center justify-center mr-3">
                  P
                </span>
                PO #2241 — Kakira Avocado Coop
              </button>
            </div>
          </div>
        </div>
      }
    </>);

}