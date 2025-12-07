import { Metadata } from "next"

import CategoriesListTemplate from "@modules/categories/templates/categories-list-template"

export const metadata: Metadata = {
  title: "Categories",
  description: "Browse all product categories.",
}

type Params = {
  params: Promise<{
    countryCode: string
  }>
}

export default async function CategoriesPage(props: Params) {
  const params = await props.params

  return (
    <CategoriesListTemplate countryCode={params.countryCode} />
  )
}

