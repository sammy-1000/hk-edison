import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import ProgressProviderWrapper from "@modules/layout/components/progress-provider"
import "styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <body>
        <ProgressProviderWrapper>
          <main className="relative">{props.children}</main>
        </ProgressProviderWrapper>
      </body>
    </html>
  )
}
