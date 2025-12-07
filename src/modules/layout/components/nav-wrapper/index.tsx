"use client"

import { useState, useEffect } from "react"
import Nav from "@modules/layout/templates/nav"

export default function NavWrapper() {
  const [topBarVisible, setTopBarVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Match the same logic as TopBar: hide when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setTopBarVisible(false)
      } else if (currentScrollY < lastScrollY) {
        setTopBarVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  return (
    <div
      className={`sticky inset-x-0 z-40 transition-[top] duration-300 ${
        topBarVisible ? "top-10" : "top-0"
      }`}
    >
      <Nav />
    </div>
  )
}
