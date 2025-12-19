"use client"

import { ProgressProvider } from "@bprogress/next/app"
import { ReactNode, useEffect, useState } from "react"

type ProgressProviderWrapperProps = {
  children: ReactNode
}

export default function ProgressProviderWrapper({
  children,
}: ProgressProviderWrapperProps) {
  const [primaryColor, setPrimaryColor] = useState<string>("#0A2FFF")

  useEffect(() => {
    // Get the computed primary color from CSS variables
    // This works with oklch, hsl, rgb, or any valid CSS color format
    const root = document.documentElement
    const computedColor = getComputedStyle(root).getPropertyValue("--primary").trim()
    
    // If we got a value, use it; otherwise fall back to default
    if (computedColor) {
      setPrimaryColor(computedColor)
    }
  }, [])

  return (
    <ProgressProvider
      height="3px"
      color={primaryColor}
      options={{
        showSpinner: false,
      }}
    >
      {children}
    </ProgressProvider>
  )
}
