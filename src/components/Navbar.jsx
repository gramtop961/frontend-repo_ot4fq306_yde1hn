import { useState } from 'react';
import { Car, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { href: '#home', label: 'Home' },
    { href: '#catalog', label: 'Catalog' },
    { href: '#sell', label: 'Sell your car' },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/70 dark:bg-neutral-950/70 border-b border-neutral-200/60 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2 font-semibold tracking-tight text-neutral-900 dark:text-white">
            <Car className="w-6 h-6 text-red-500" />
            Driftline
          </a>
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white transition-colors">
                {item.label}
              </a>
            ))}
            <a href="#sell" className="inline-flex items-center justify-center rounded-md bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 px-4 py-2 text-sm font-medium shadow-sm hover:opacity-90 transition">
              List a car
            </a>
          </nav>
          <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-neutral-200 dark:border-neutral-800 bg-white/90 dark:bg-neutral-950/90">
          <div className="px-4 py-3 space-y-2">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="block text-sm font-medium text-neutral-700 dark:text-neutral-200">
                {item.label}
              </a>
            ))}
            <a href="#sell" onClick={() => setOpen(false)} className="inline-flex items-center justify-center rounded-md bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 px-4 py-2 text-sm font-medium">
              List a car
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
