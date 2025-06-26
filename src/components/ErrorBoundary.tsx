
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 flex items-center justify-center p-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-thin text-white">Something went wrong</h1>
            <p className="text-purple-200">The consciousness experienced an unexpected error.</p>
            <button
              onClick={() => this.setState({ hasError: false, error: undefined })}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
            >
              Reset Consciousness
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
