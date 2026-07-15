import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('Unhandled render error:', error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-4 text-center text-slate-200">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-slate-500">Instrument fault</p>
          <h1 className="mt-3 text-2xl font-light text-white">Something broke while rendering this view.</h1>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-400">
            The rest of your work is safe. Reload to restore the workspace.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-6 rounded-md bg-cyan-300 px-5 py-2.5 text-sm font-medium text-slate-950 transition hover:bg-cyan-200"
          >
            Reload app
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
