// src/modules/layout/templates/footer/index.tsx
import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { LogoIcon } from '@lib/components/logo'
import Logo from "@lib/components/navbar-components/logo"
import brandData from "brand/brand-data"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import SocialLinks from "../../components/social-links"

export default async function Footer() {
  const { collections } = await listCollections({
    fields: "*products",
  })
  const productCategories = await listCategories()

  const footerLinks = [
    {
      group: 'Categories',
      items: productCategories?.slice(0, 6).map((c) => ({
        title: c.name,
        href: `/categories/${c.handle}`,
        testId: 'category-link',
      })) || [],
    },
    {
      group: 'Collections',
      items: collections?.slice(0, 6).map((c) => ({
        title: c.title,
        href: `/collections/${c.handle}`,
      })) || [],
    },
    {
      group: 'Company',
      items: [
        {
          title: 'About',
          href: '/about',
        },
        {
          title: 'Contact',
          href: '/contact',
        },
        {
          title: 'Blog',
          href: '/blog',
        },
      ],
    },
    {
      group: 'Support',
      items: [
        {
          title: 'Help Center',
          href: '/help',
        },
        {
          title: 'Shipping',
          href: '/shipping',
        },
        {
          title: 'Returns',
          href: '/returns',
        },
        {
          title: 'Privacy',
          href: '/privacy',
        },
      ],
    },
  ]

  return (
    <footer className="border-t bg-white pt-20 dark:bg-transparent">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-5">
          {/* Logo Section */}
          <div className="md:col-span-2">
            <LocalizedClientLink
              href="/"
              aria-label="go home"
              className="block size-fit"
            >
              <Logo />
            </LocalizedClientLink>
            <p className="text-muted-foreground mt-4 text-sm">
              {brandData.tagline || 'Your trusted online store for quality products'}
            </p>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 md:col-span-3">
            {footerLinks.map((link, index) => (
              <div
                key={index}
                className="space-y-4 text-sm"
              >
                <span className="block font-medium">{link.group}</span>
                {link.items.length > 0 ? (
                  link.items.map((item, itemIndex) => (
                    <LocalizedClientLink
                      key={itemIndex}
                      href={item.href}
                      className="text-muted-foreground hover:text-primary block duration-150"
                      data-testid={(item as any).testId}
                    >
                      <span>{item.title}</span>
                    </LocalizedClientLink>
                  ))
                ) : (
                  <span className="text-muted-foreground block text-xs">
                    Coming soon
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 flex flex-wrap items-end justify-between gap-6 border-t py-6">
          <span className="text-muted-foreground order-last block text-center text-sm md:order-first">
            © {new Date().getFullYear()} {brandData.name}. All rights reserved.
          </span>

          {/* Social Links - Placeholder for future implementation */}
          <SocialLinks />
        </div>
      </div>
    </footer>
  )
}