import React from 'react';

export class ErrorBoundary extends React.Component<{ children: React.ReactNode}> {
  state = { hasError: false };
  static getDerivedStateFromError(error) {
      return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
      console.log({ error, errorInfo });
  }
  render() {
      if (this.state.hasError) {
          return null;
      }
      return this.props.children;
  }  
}
