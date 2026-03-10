import { LayoutDashboard, PenTool, Database, Calendar, BarChart3, Settings } from 'lucide-react';
import Link from 'next/link';
import ConvexClientProvider from '@/components/ConvexClientProvider';
import { Toaster } from '@/components/ui/sonner';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="flex min-h-screen flex-col bg-background text-foreground">
        <ConvexClientProvider>
      {/* Header */}
      <header className="sticky top-0 z-50 flex h-16 items-center border-b border-white/10 bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60 w-full">
        <div className="flex items-center gap-2">
          <div className="size-8 rounded bg-primary flex items-center justify-center text-primary-foreground font-bold shadow-lg shadow-primary/20">A</div>
          <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Antigraphity Social</span>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <div className="size-8 rounded-full bg-muted border border-border flex items-center justify-center text-xs font-bold ring-2 ring-primary/20 cursor-pointer">MA</div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden w-64 flex-col border-r border-white/10 sidebar-premium p-4 md:flex">
          <nav className="grid gap-2 text-sm font-medium relative z-10">
            <Link href="/" className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-400 transition-all hover:text-white hover:bg-white/5">
              <LayoutDashboard className="size-4" />
              Dashboard
            </Link>
            <Link href="/" className="flex items-center gap-3 rounded-lg bg-primary/10 px-3 py-2 text-primary transition-all border-l-2 border-primary shadow-sm">
              <PenTool className="size-4" />
              Content Factory
            </Link>
            <Link href="/" className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-400 transition-all hover:text-white hover:bg-white/5">
              <Database className="size-4" />
              Asset Library
            </Link>
            <Link href="/" className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-400 transition-all hover:text-white hover:bg-white/5">
              <Calendar className="size-4" />
              Calendar
            </Link>
            <Link href="/" className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-400 transition-all hover:text-white hover:bg-white/5">
              <BarChart3 className="size-4" />
              Analytics
            </Link>
            <div className="mt-8 mb-2 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">System</div>
            <Link href="/" className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-400 transition-all hover:text-white hover:bg-white/5">
              <Settings className="size-4" />
              Settings
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-8">
          {children}
        </main>
      </div>
      <Toaster />
      </ConvexClientProvider>
      </body>
    </html>
  );
}
