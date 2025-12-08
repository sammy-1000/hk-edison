'use client'

// src/modules/layout/components/footer/components/social-links/index.tsx
import Link from 'next/link'
import { getSocialMediaLinks } from "@lib/util/contact-info"

export default function SocialLinks() {
    const socialLinks = getSocialMediaLinks("size-6")

    if (socialLinks.length === 0) {
        return null
    }

    return (
        <div className="order-first flex flex-wrap justify-center gap-6 text-sm md:order-last">
            {socialLinks.map((social) => (
                <Link
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="text-muted-foreground hover:text-primary block transition-colors"
                >
                    {social.icon}
                </Link>
            ))}
        </div>
    )
}