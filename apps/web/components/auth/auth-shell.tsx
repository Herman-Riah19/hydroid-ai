import { Shield, Terminal } from "lucide-react";

interface AuthShellProps {
  children: React.ReactNode;
}

export function AuthShell({ children }: AuthShellProps) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-12">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute top-1/3 -left-32 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="mb-8 flex flex-col items-center gap-3">
          <span className="flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
            <Shield className="size-6" />
          </span>
          <span className="text-2xl font-bold tracking-tight text-foreground">
            Hydroid{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              AI
            </span>
          </span>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border bg-card/80 shadow-2xl shadow-black/40 backdrop-blur">
          <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-2.5">
            <span className="size-2.5 rounded-full bg-destructive/70" />
            <span className="size-2.5 rounded-full bg-yellow-500/70" />
            <span className="size-2.5 rounded-full bg-primary/70" />
            <Terminal className="ml-2 size-3.5 text-muted-foreground" />
            <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              hydroid-auth
            </span>
          </div>

          {children}

          <div className="flex items-center justify-between border-t border-border bg-muted/30 px-4 py-2.5 font-mono text-[11px] text-muted-foreground">
            <span>$ hydroid auth --status</span>
            <span className="text-secondary">✓ secure</span>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Sécurité applicative propulsée par l&apos;IA
        </p>
      </div>
    </div>
  );
}
