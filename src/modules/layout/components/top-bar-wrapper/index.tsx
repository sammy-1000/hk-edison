import { Suspense } from "react"
import { getStoreSettings } from "@lib/data/store-settings"
import TopBar from "../top-bar"

export default async function TopBarWrapper() {
  const settings = await getStoreSettings()

  return (
    <Suspense fallback={null}>
      <TopBar settings={settings} />
    </Suspense>
  )
}

