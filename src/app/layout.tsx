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
      <header className="sticky top-0 z-50 flex h-16 items-center border-b bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center gap-2">
          <div className="size-8 rounded bg-primary flex items-center justify-center text-primary-foreground font-bold">A</div>
          <span className="text-xl font-bold tracking-tight">Antigraphity Social AI</span>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <div className="size-8 rounded-full bg-muted border border-border"></div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden w-64 flex-col border-r bg-muted/20 p-4 md:flex">
          <nav className="grid gap-2 text-sm font-medium">
            <Link href="/" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
              <LayoutDashboard className="size-4" />
              Dashboard
            </Link>
            <Link href="/" className="flex items-center gap-3 rounded-lg bg-primary/10 px-3 py-2 text-primary transition-all hover:text-primary">
              <PenTool className="size-4" />
              Content Factory
            </Link>
            <Link href="/" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
              <Database className="size-4" />
              Asset Library
            </Link>
            <Link href="/" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
              <Calendar className="size-4" />
              Calendar
            </Link>
            <Link href="/" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
              <BarChart3 className="size-4" />
              Analytics
            </Link>
            <Link href="/" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
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
