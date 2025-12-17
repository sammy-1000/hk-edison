"use client"

import { useState, useEffect } from "react"
import { Phone, MessageCircle } from "lucide-react"
import {
  getPhoneNumber,
  getWhatsAppNumber,
  getSocialMediaLinks,
  getWhatsAppUrl,
  getPhoneUrl,
} from "@lib/util/contact-info"

export default function TopBar() {
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

  // Get contact info and social links from environment variables
  const phoneNumber = getPhoneNumber()
  const whatsappNumber = getWhatsAppNumber()
  const socialLinks = getSocialMediaLinks()
  const whatsappUrl = getWhatsAppUrl()
  const phoneUrl = getPhoneUrl()

  // Check if we have any contact info
  const hasContactInfo = 
    (phoneNumber && phoneNumber.trim() !== "") || 
    (whatsappNumber && whatsappNumber.trim() !== "") || 
    socialLinks.length > 0

  // In development, always show the bar (even if empty) to help with configuration
  const isDevelopment = process.env.NODE_ENV === "development"

  // Don't render if no contact info (unless in development)
  if (!hasContactInfo && !isDevelopment) {
    return null
  }

  // Log in development if no contact info is configured
  useEffect(() => {
    if (isDevelopment && !hasContactInfo) {
      console.warn(
        "TopBar: No contact info configured. Set NEXT_PUBLIC_STORE_PHONE, NEXT_PUBLIC_WHATSAPP_NUMBER, or NEXT_PUBLIC_SOCIAL_* environment variables."
      )
    }
  }, [isDevelopment, hasContactInfo])

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 bg-secondary text-white transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-10 items-center justify-between text-sm">
          {/* Left: Social Media Icons */}
          <div className="flex items-center gap-4">
            {socialLinks.length > 0 ? (
              socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary transition-colors"
                aria-label={social.name}
              >
                {social.icon}
              </a>
              ))
            ) : isDevelopment ? (
              <span className="text-gray-400 text-xs">
                No social links configured
              </span>
            ) : null}
          </div>

          {/* Right: Phone & WhatsApp */}
          <div className="flex items-center gap-4">
            {phoneNumber ? (
              <a
                href={phoneUrl}
                className="flex items-center text-foreground gap-2 transition-colors"
              >
                <Phone className="size-4 text-foreground" />
                <span className="hidden text-foreground sm:inline">{phoneNumber}</span>
              </a>
            ) : isDevelopment ? (
              <span className=" text-foreground text-xs">No phone configured</span>
            ) : null}
            {whatsappNumber ? (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-md  px-3 py-1.5 transition-colors"
              >
                <MessageCircle className="size-4 text-foreground" />
                <span className="hidden text-foreground sm:inline">WhatsApp</span>
              </a>
            ) : isDevelopment && !phoneNumber ? (
              <span className=" text-foreground text-xs">No WhatsApp configured</span>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

