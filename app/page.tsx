import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b p-4 flex justify-between items-center">
        <h1 className="font-bold text-xl">AdsGen AI</h1>
        <div className="flex gap-4">
           <Link href="/login"><Button variant="ghost">Login</Button></Link>
           <Link href="/signup"><Button>Get Started</Button></Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
          Create Marketing Ads <br/> with <span className="text-primary">Node-based AI</span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mb-8">
          Break down your creative process. Use Product Fusion to place your products in any scene without hallucinations.
        </p>
        <div className="flex gap-4">
           <Link href="/editor/demo">
             <Button size="lg" className="h-12 px-8">Try Demo Editor</Button>
           </Link>
           <Button variant="outline" size="lg" className="h-12 px-8">View Pricing</Button>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-5xl">
           <div className="p-6 border rounded-xl">
              <h3 className="font-bold mb-2">Product Fusion</h3>
              <p className="text-sm text-muted-foreground">Upload your product and place it anywhere with pixel-perfect realism.</p>
           </div>
           <div className="p-6 border rounded-xl">
              <h3 className="font-bold mb-2">Brand Guardrails</h3>
              <p className="text-sm text-muted-foreground">Enforce your brand's colors and fonts across all generated assets.</p>
           </div>
           <div className="p-6 border rounded-xl">
              <h3 className="font-bold mb-2">Node Workflow</h3>
              <p className="text-sm text-muted-foreground">Visual control over every step of the generation process.</p>
           </div>
        </div>
      </main>

      <footer className="border-t p-8 text-center text-sm text-muted-foreground">
        © 2024 AdsGen AI. All rights reserved.
      </footer>
    </div>
  );
}
