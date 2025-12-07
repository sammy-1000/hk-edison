"use client"

import { useState, useEffect } from "react"
import { Phone, MessageCircle } from "lucide-react"
import brandData from "brand/brand-data"
import { getStoreSettings, StoreSettings } from "@lib/data/store-settings"

type SocialLink = {
  name: string
  url: string
  icon: React.ReactNode
}

const getSocialIcons = (social: typeof brandData.social): SocialLink[] => {
  const icons: SocialLink[] = []

  if (social?.facebook) {
    icons.push({
      name: "Facebook",
      url: social.facebook,
      icon: (
        <svg className="size-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95" />
        </svg>
      ),
    })
  }

  if (social?.instagram) {
    icons.push({
      name: "Instagram",
      url: social.instagram,
      icon: (
        <svg className="size-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3" />
        </svg>
      ),
    })
  }

  if (social?.twitter) {
    icons.push({
      name: "Twitter",
      url: social.twitter,
      icon: (
        <svg className="size-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M10.488 14.651L15.25 21h7l-7.858-10.478L20.93 3h-2.65l-5.117 5.886L8.75 3h-7l7.51 10.015L2.32 21h2.65zM16.25 19L5.75 5h2l10.5 14z" />
        </svg>
      ),
    })
  }

  if (social?.linkedin) {
    icons.push({
      name: "LinkedIn",
      url: social.linkedin,
      icon: (
        <svg className="size-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z" />
        </svg>
      ),
    })
  }

  return icons
}

type TopBarProps = {
  settings?: StoreSettings | null
}

export default function TopBar({ settings }: TopBarProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Hide when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  // Use API settings if available, fallback to brand.json and env vars
  const phoneNumber = 
    settings?.contact?.phone || 
    (brandData as any).contact?.phone || 
    process.env.NEXT_PUBLIC_STORE_PHONE || 
    ""
  
  const whatsappNumber = 
    settings?.contact?.whatsapp || 
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || 
    phoneNumber

  // Merge API settings with brand.json (API takes precedence)
  const socialData = {
    facebook: settings?.social?.facebook || (brandData as any).social?.facebook,
    instagram: settings?.social?.instagram || (brandData as any).social?.instagram,
    twitter: settings?.social?.twitter || (brandData as any).social?.twitter,
    linkedin: settings?.social?.linkedin || (brandData as any).social?.linkedin,
  }
  
  const socialLinks = getSocialIcons(socialData)

  // Format phone number for WhatsApp (remove + and spaces)
  const whatsappFormatted = whatsappNumber.replace(/[\s\+]/g, "")
  const whatsappUrl = `https://wa.me/${whatsappFormatted}`
  const phoneUrl = `tel:${phoneNumber.replace(/\s/g, "")}`

  // Don't render if no contact info or social links
  if (!phoneNumber && socialLinks.length === 0) {
    return null
  }

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 bg-gray-900 text-white transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-10 items-center justify-between text-sm">
          {/* Left: Social Media Icons */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* Right: Phone & WhatsApp */}
          <div className="flex items-center gap-4">
            {phoneNumber && (
              <a
                href={phoneUrl}
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
              >
                <Phone className="size-4" />
                <span className="hidden sm:inline">{phoneNumber}</span>
              </a>
            )}
            {whatsappNumber && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-md bg-green-600 px-3 py-1.5 text-white hover:bg-green-700 transition-colors"
              >
                <MessageCircle className="size-4" />
                <span className="hidden sm:inline">WhatsApp</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

