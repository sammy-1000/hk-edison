'use client'
import brandData from "brand/brand-data"
export default function Logo() {
  return (
    <img
      src={brandData.logos.light}
      alt={brandData.name}
      className="size-16 w-auto"
    />
  )
}
