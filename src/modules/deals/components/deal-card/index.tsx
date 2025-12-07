"use client"

import { Card } from "@lib/components/ui/card"
import { Badge } from "@lib/components/ui/badge"
import { Button } from "@lib/components/ui/button"
import { ArrowRight, Tag, Sparkles, Calendar, Copy, Check } from "lucide-react"
import { HttpTypes } from "@medusajs/types"
import { useState } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type DealCardProps = {
  deal: {
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
  }
}

export default function DealCard({ deal }: DealCardProps) {
  const [copied, setCopied] = useState(false)

  const isActive = () => {
    const now = new Date()
    if (deal.startDate && new Date(deal.startDate) > now) return false
    if (deal.endDate && new Date(deal.endDate) < now) return false
    return true
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return null
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const handleCopyCode = async () => {
    if (deal.code) {
      await navigator.clipboard.writeText(deal.code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const active = isActive()

  return (
    <Card className="group relative overflow-hidden transition-all duration-500 hover:shadow-lg border-2 hover:border-primary/50">
      <div className="p-6 space-y-4">
        {/* Header with Badge */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {deal.type === "campaign" ? (
                <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Campaign
                </Badge>
              ) : (
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                  <Tag className="w-3 h-3 mr-1" />
                  Promotion
                </Badge>
              )}
              {deal.isAutomatic && (
                <Badge variant="outline" className="text-xs">
                  Auto
                </Badge>
              )}
              {!active && (
                <Badge variant="destructive" className="text-xs">
                  Expired
                </Badge>
              )}
            </div>
            <h3 className="text-xl font-bold line-clamp-2">{deal.title}</h3>
          </div>
        </div>

        {/* Discount Badge */}
        {deal.discount && (
          <div className="flex items-center gap-2">
            <Badge className="bg-primary text-primary-foreground text-lg px-4 py-1">
              {deal.discount}
            </Badge>
          </div>
        )}

        {/* Description */}
        {deal.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {deal.description}
          </p>
        )}

        {/* Promo Code */}
        {deal.code && !deal.isAutomatic && (
          <div className="bg-muted/50 rounded-md p-3">
            <p className="text-xs text-muted-foreground mb-1">Promo Code</p>
            <div className="flex items-center justify-between gap-2">
              <p className="font-mono font-semibold text-lg flex-1">{deal.code}</p>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopyCode}
                className="h-8 w-8 p-0"
                title="Copy code"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Dates */}
        {(deal.startDate || deal.endDate) && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <div className="flex-1">
              {deal.startDate && deal.endDate ? (
                <p>
                  {formatDate(deal.startDate)} - {formatDate(deal.endDate)}
                </p>
              ) : deal.endDate ? (
                <p>Ends {formatDate(deal.endDate)}</p>
              ) : deal.startDate ? (
                <p>Starts {formatDate(deal.startDate)}</p>
              ) : null}
            </div>
          </div>
        )}

        {/* CTA Button */}
        {active ? (
          deal.code && !deal.isAutomatic ? (
            <Button
              className="w-full"
              variant="default"
              onClick={handleCopyCode}
            >
              {copied ? (
                <>
                  <Check className="mr-2 w-4 h-4" />
                  Copied!
                </>
              ) : (
                <>
                  Copy Code
                  <Copy className="ml-2 w-4 h-4" />
                </>
              )}
            </Button>
          ) : (
            <LocalizedClientLink href="/store" className="block">
              <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                Shop Now
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </LocalizedClientLink>
          )
        ) : (
          <Button
            className="w-full"
            variant="outline"
            disabled
          >
            Expired
          </Button>
        )}
      </div>

      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
    </Card>
  )
}

