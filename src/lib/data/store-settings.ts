"use server"

import { sdk } from "@lib/config"
import { getCacheOptions } from "./cookies"

export type StoreSettings = {
  social: {
    facebook?: string | null
    instagram?: string | null
    twitter?: string | null
    linkedin?: string | null
  }
  contact: {
    phone?: string | null
    whatsapp?: string | null
    email?: string | null
  }
}

export const getStoreSettings = async (): Promise<StoreSettings | null> => {
  const next = {
    ...(await getCacheOptions("store-settings")),
  }

  try {
    return await sdk.client
      .fetch<StoreSettings>("/store/store-settings", {
        next,
        cache: "no-store", // Always fetch fresh settings
      })
      .then((data) => data)
      .catch(() => null)
  } catch (error) {
    console.error("Failed to fetch store settings:", error)
    return null
  }
}

