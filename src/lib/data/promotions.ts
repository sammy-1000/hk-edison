import { sdk } from "@lib/config"
import { HttpTypes } from "@medusajs/types"
import { getCacheOptions } from "./cookies"

export const listPromotions = async (query?: Record<string, any>) => {
  const next = {
    ...(await getCacheOptions("promotions")),
  }

  const limit = query?.limit || 100
  const offset = query?.offset || 0

  return sdk.client
    .fetch<{ promotions: HttpTypes.StorePromotion[] }>(
      "/store/promotions",
      {
        query: {
          fields: "*application_method,*campaign,*campaign.budget,*rules",
          limit,
          offset,
          ...query,
        },
        next,
        cache: "no-store",
      }
    )
    .then(({ promotions }) => promotions || [])
    .catch(() => []) // Return empty array if promotions endpoint doesn't exist
}

export const getPromotionById = async (id: string) => {
  const next = {
    ...(await getCacheOptions("promotions")),
  }

  return sdk.client
    .fetch<{ promotion: HttpTypes.StorePromotion }>(
      `/store/promotions/${id}`,
      {
        query: {
          fields: "*application_method,*campaign,*campaign.budget,*rules",
        },
        next,
        cache: "no-store",
      }
    )
    .then(({ promotion }) => promotion)
    .catch(() => null)
}

export const listCampaigns = async (query?: Record<string, any>) => {
  const next = {
    ...(await getCacheOptions("campaigns")),
  }

  const limit = query?.limit || 100
  const offset = query?.offset || 0

  return sdk.client
    .fetch<{ campaigns: any[] }>(
      "/store/promotions/campaigns",
      {
        query: {
          fields: "*promotions,*budget",
          limit,
          offset,
          ...query,
        },
        next,
        cache: "no-store",
      }
    )
    .then(({ campaigns }) => campaigns || [])
    .catch(() => []) // Return empty array if campaigns endpoint doesn't exist
}

