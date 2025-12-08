import { Suspense } from "react"

import Logo from "@lib/components/navbar-components/logo"
import { Button } from "@lib/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@lib/components/ui/navigation-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@lib/components/ui/popover"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import ConditionalSearch from "@modules/layout/components/conditional-search"

import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import brandData from "brand/brand-data"

// navigation links (can grow later)
const navigationLinks = [
  { href: "/store", label: "Products" },
  { href: "/categories", label: "Categories" },
  { href: "/deals", label: "Deals" },
]

export default async function Nav() {
  // fetch regions dynamically from Medusa
  const regions = await listRegions().then((r: StoreRegion[]) => r)

  return (
    <div className="inset-x-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <header className="border-b px-4 md:px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* ---------- LEFT SIDE ---------- */}
          <div className="flex flex-1 items-center gap-2">
            {/* Mobile Side Menu (Medusa) */}
            <div className="md:hidden">
              <SideMenu regions={regions} />
            </div>

            {/* Desktop Navigation */}
            <div className="flex flex-1 items-center gap-6 max-md:justify-between ">
              {/* Logo */}
              <LocalizedClientLink href="/" className="text-primary hover:text-primary/90 flex items-center gap-1">
                <Logo />
                <span className=" font-bold ">{brandData.name}</span>
              </LocalizedClientLink>

              {/* Desktop navigation links */}
              <NavigationMenu className="max-md:hidden">
                <NavigationMenuList className="gap-2">
                  {navigationLinks.map((link, index) => (
                    <NavigationMenuItem key={index}>
                      <NavigationMenuLink
                        href={link.href}
                        className="py-1.5 font-medium text-muted-foreground hover:text-primary"
                      >
                        {link.label}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>

              {/* Search bar with auto-suggestions (hidden on store page) */}
              <ConditionalSearch />
            </div>
          </div>

          {/* ---------- RIGHT SIDE ---------- */}
          <div className="flex items-center gap-2 max-md:hidden">
            {/* Account */}
            <Button asChild variant="ghost" size="sm" className="text-sm">
              <LocalizedClientLink
                href="/account"
                className="hover:text-ui-fg-base text-sm"
                data-testid="nav-account-link"
              >
                Account
              </LocalizedClientLink>
            </Button>

            {/* Cart Button (Medusa dynamic) */}
            <Suspense
              fallback={
                <Button asChild variant="outline" size="sm" className="text-sm bg-primary">
                  <LocalizedClientLink
                    className="hover:text-ui-fg-base flex gap-2 text-sm"
                    href="/cart"
                    data-testid="nav-cart-link"
                  >
                    Cart (0)
                  </LocalizedClientLink>
                </Button>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </div>
      </header>
    </div>
  )
}
