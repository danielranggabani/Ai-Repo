import Link from 'next/link';
import { Home, Layout, Settings, CreditCard } from 'lucide-react';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Global Sidebar */}
      <aside className="w-16 border-r flex flex-col items-center py-4 gap-4 bg-muted/20">
        <Link href="/" className="p-2 rounded-md hover:bg-accent">
          <Home className="w-5 h-5" />
        </Link>
        <Link href="/projects" className="p-2 rounded-md hover:bg-accent">
           <Layout className="w-5 h-5" />
        </Link>
        <div className="flex-1" />
        <Link href="/billing" className="p-2 rounded-md hover:bg-accent">
          <CreditCard className="w-5 h-5" />
        </Link>
        <Link href="/settings" className="p-2 rounded-md hover:bg-accent">
          <Settings className="w-5 h-5" />
        </Link>
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-auto bg-background">
        {children}
      </main>
    </div>
  );
}
