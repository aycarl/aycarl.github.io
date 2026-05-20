import React, { Component, ErrorInfo, ReactNode } from "react";
import { SiteLayout } from "./SiteLayout";
import { ArrowUpRight } from "lucide-react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught runtime error caught by ErrorBoundary:", error, errorInfo);
  }

  private handleReset = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <SiteLayout>
          <section className="relative overflow-hidden bg-secondary/70">
            {/* Ambient gradients */}
            <div className="absolute left-[8%] top-16 h-28 w-28 rounded-full bg-orange/40 blur-3xl" aria-hidden />
            <div className="absolute right-[10%] top-24 h-32 w-32 rounded-full bg-pink/40 blur-3xl" aria-hidden />
            <div className="absolute bottom-0 left-1/3 h-24 w-24 rounded-full bg-yellow/50 blur-3xl" aria-hidden />
            
            <div className="container relative py-20 md:py-28">
              <p className="mb-5 text-sm uppercase tracking-[0.24em] text-foreground/55">500 · application crash</p>
              <h1 className="wordmark text-6xl md:text-8xl leading-[0.88] text-foreground">
                Oops. Crashed<span className="text-orange">.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg md:text-2xl font-light text-foreground/78">
                An unexpected exception occurred inside the application. This is typically due to a temporary network issue or an API payload mismatch.
              </p>
              
              <div className="mt-6 max-w-2xl rounded-2xl border border-border bg-card/85 p-5 text-sm font-mono text-muted-foreground overflow-x-auto">
                <p className="font-semibold text-foreground mb-1">Error: {this.state.error?.message || "Unknown Runtime Error"}</p>
                <p className="text-xs leading-relaxed max-h-36 overflow-y-auto">
                  {this.state.error?.stack || "No stack trace available."}
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={this.handleReset}
                  className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
                >
                  Reload Page <ArrowUpRight className="h-4 w-4" />
                </button>
                <a
                  href="/"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-secondary"
                >
                  Go home
                </a>
              </div>
            </div>
          </section>

          <section className="container py-16 md:py-20">
            <div className="mb-8 flex items-end justify-between gap-4">
              <h2 className="wordmark text-4xl md:text-5xl">
                Troubleshooting<span className="text-green">.</span>
              </h2>
              <p className="max-w-xl text-sm text-foreground/60 md:text-base">
                If the error persists, here are standard methods to recover the app state.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <div className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6">
                <span className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-sky opacity-65 blur-2xl" aria-hidden />
                <div className="relative">
                  <p className="text-xs uppercase tracking-[0.18em] text-foreground/45">Action</p>
                  <h3 className="mt-3 text-2xl font-light tracking-tight">Clear Storage</h3>
                  <p className="mt-2 text-sm text-foreground/68">Clear local browser storage and session keys to reset the React state completely.</p>
                  <button
                    onClick={() => {
                      localStorage.clear();
                      sessionStorage.clear();
                      window.location.reload();
                    }}
                    className="mt-6 inline-flex items-center gap-2 text-sm underline underline-offset-4"
                  >
                    Wipe cache & reload <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6">
                <span className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-yellow opacity-65 blur-2xl" aria-hidden />
                <div className="relative">
                  <p className="text-xs uppercase tracking-[0.18em] text-foreground/45">Status</p>
                  <h3 className="mt-3 text-2xl font-light tracking-tight">Check Craft API</h3>
                  <p className="mt-2 text-sm text-foreground/68">Verify that the remote Craft CMS publishing services are active and reachable.</p>
                  <a
                    href="https://connect.craft.do/links/4GBve1yOGzU/api/v1/collections/769CD161-FC8A-4B52-83AA-36A192AF9FCA/items?maxDepth=0"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex items-center gap-2 text-sm underline underline-offset-4"
                  >
                    Test connection <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6">
                <span className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-pink opacity-65 blur-2xl" aria-hidden />
                <div className="relative">
                  <p className="text-xs uppercase tracking-[0.18em] text-foreground/45">Contact</p>
                  <h3 className="mt-3 text-2xl font-light tracking-tight">Report Bug</h3>
                  <p className="mt-2 text-sm text-foreground/68">Send an email with the stack trace details above so the issue can be resolved.</p>
                  <a
                    href="mailto:hello@aycarl.com?subject=aycarl.com%20Error%20Report"
                    className="mt-6 inline-flex items-center gap-2 text-sm underline underline-offset-4"
                  >
                    Send report <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </section>
        </SiteLayout>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
