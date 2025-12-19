import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getBrandById } from "@lib/data/brands"
import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import BrandDetailTemplate from "@modules/brands/templates/brand-detail"

type Props = {
  params: Promise<{ id: string; countryCode: string }>
  searchParams: Promise<{
    page?: string
    sortBy?: string
  }>
}

export async function generateStaticParams() {
  // Note: You might want to fetch all brand IDs here for static generation
  // For now, we'll use dynamic rendering
  return []
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  try {
    const params = await props.params
    const brand = await getBrandById(params.id)

    if (!brand) {
      return {
        title: "Brand Not Found",
      }
    }

    return {
      title: `${brand.name} | Medusa Store`,
      description: `Browse products from ${brand.name}`,
    }
  } catch (error) {
    return {
      title: "Brand | Medusa Store",
    }
  }
}

export default async function BrandPage(props: Props) {
  try {
    const params = await props.params
    const searchParams = await props.searchParams
    const { sortBy, page } = searchParams

    const brand = await getBrandById(params.id)

    if (!brand) {
      notFound()
    }

    const pageNumber = page ? parseInt(page) : 1

    return (
      <BrandDetailTemplate
        brand={brand}
        countryCode={params.countryCode}
        sortBy={sortBy}
        page={pageNumber}
      />
    )
  } catch (error) {
    console.error("Error in BrandPage:", error)
    notFound()
  }
}
