"use client"

import { Component, type ReactNode } from "react"

interface Props {
  children: ReactNode
  componentName: string
}

interface State {
  hasError: boolean
  error: Error | null
}

export class DebugBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error) {
    console.error(`Error in ${this.props.componentName}:`, error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 border border-red-500 rounded-md">
          <h2 className="text-red-500 font-bold mb-2">خطأ في المكون: {this.props.componentName}</h2>
          <pre className="text-sm bg-red-50 p-2 rounded overflow-auto">{this.state.error?.message}</pre>
        </div>
      )
    }

    return this.props.children
  }
}

