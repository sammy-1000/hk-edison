import { listPromotions, listCampaigns } from "@lib/data/promotions"
import DealCard from "../deal-card"
import { HttpTypes } from "@medusajs/types"
import { Pagination } from "@modules/store/components/pagination"

const DEALS_PER_PAGE = 12

export default async function DealsList({ page = 1 }: { page?: number }) {
  // Fetch both promotions and campaigns
  const [promotions, campaigns] = await Promise.all([
    listPromotions({ limit: 100 }),
    listCampaigns({ limit: 100 }),
  ])

  // Combine promotions and campaigns into a single deals array
  const allDeals: Array<{
    id: string
    type: "promotion" | "campaign"
    title: string
    description?: string
    code?: string
    discount?: string
    discountType?: "percentage" | "fixed"
    startDate?: string
    endDate?: string
    isAutomatic?: boolean
    campaign?: any
    promotion?: HttpTypes.StorePromotion
  }> = []

  // Add promotions as deals
  promotions.forEach((promotion: HttpTypes.StorePromotion) => {
    if (!promotion) return

    const applicationMethod = promotion.application_method
    const discountValue = applicationMethod?.value
    const discountType = applicationMethod?.type === "percentage" ? "percentage" : "fixed"
    const currencyCode = applicationMethod?.currency_code

    let discountText = ""
    if (discountValue !== undefined) {
      if (discountType === "percentage") {
        discountText = `${discountValue}% OFF`
      } else if (currencyCode) {
        discountText = `${currencyCode} ${discountValue} OFF`
      } else {
        discountText = `${discountValue} OFF`
      }
    }

    allDeals.push({
      id: promotion.id,
      type: "promotion",
      title: promotion.code || "Special Promotion",
      description: promotion.campaign?.name || "Limited time offer",
      code: promotion.code,
      discount: discountText,
      discountType,
      startDate: promotion.starts_at,
      endDate: promotion.ends_at,
      isAutomatic: promotion.is_automatic,
      promotion,
    })
  })

  // Add campaigns as deals (if they have promotions)
  campaigns.forEach((campaign: any) => {
    if (!campaign || !campaign.promotions?.length) return

    // Use the first promotion from the campaign for display
    const firstPromotion = campaign.promotions[0]
    const applicationMethod = firstPromotion?.application_method
    const discountValue = applicationMethod?.value
    const discountType = applicationMethod?.type === "percentage" ? "percentage" : "fixed"
    const currencyCode = applicationMethod?.currency_code

    let discountText = ""
    if (discountValue !== undefined) {
      if (discountType === "percentage") {
        discountText = `${discountValue}% OFF`
      } else if (currencyCode) {
        discountText = `${currencyCode} ${discountValue} OFF`
      } else {
        discountText = `${discountValue} OFF`
      }
    }

    allDeals.push({
      id: campaign.id,
      type: "campaign",
      title: campaign.name || "Campaign Deal",
      description: campaign.description || `Campaign with ${campaign.promotions?.length || 0} promotions`,
      code: firstPromotion?.code,
      discount: discountText,
      discountType,
      startDate: campaign.starts_at,
      endDate: campaign.ends_at,
      campaign,
    })
  })

  if (allDeals.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-muted-foreground text-lg mb-4">
          No deals available at the moment.
        </p>
        <p className="text-muted-foreground text-sm">
          Check back soon for amazing promotions!
        </p>
      </div>
    )
  }

  // Pagination
  const totalPages = Math.ceil(allDeals.length / DEALS_PER_PAGE)
  const startIndex = (page - 1) * DEALS_PER_PAGE
  const endIndex = startIndex + DEALS_PER_PAGE
  const paginatedDeals = allDeals.slice(startIndex, endIndex)

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {paginatedDeals.map((deal) => (
          <DealCard key={deal.id} deal={deal} />
        ))}
      </div>
      {totalPages > 1 && (
        <div className="mt-12 flex justify-center">
          <Pagination page={page} totalPages={totalPages} />
        </div>
      )}
    </>
  )
}

