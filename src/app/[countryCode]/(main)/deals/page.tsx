import { Metadata } from "next"

import DealsTemplate from "@modules/deals/templates"

export const metadata: Metadata = {
  title: "Deals & Promotions",
  description: "Discover amazing deals, promotions, and special offers.",
}

// Force dynamic rendering to disable static generation and caching
export const dynamic = 'force-dynamic'
export const revalidate = 0

type Params = {
  params: Promise<{
    countryCode: string
  }>
  searchParams: Promise<{
    page?: string
  }>
}

export default async function DealsPage(props: Params) {
  const params = await props.params
  const searchParams = await props.searchParams

  return (
    <DealsTemplate 
      countryCode={params.countryCode}
      page={searchParams.page}
    />
  )
}

