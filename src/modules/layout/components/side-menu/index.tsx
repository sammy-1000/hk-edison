"use client"

import { Popover, PopoverPanel, Transition } from "@headlessui/react"
import { ArrowRightMini, XMark } from "@medusajs/icons"
import { Text, clx, useToggleState } from "@medusajs/ui"
import { Fragment } from "react"
import { Menu, ArrowLeft, Home, ShoppingBag, User, ShoppingCart } from "lucide-react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CountrySelect from "../country-select"
import { HttpTypes } from "@medusajs/types"

const SideMenuItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Store", href: "/store", icon: ShoppingBag },
  { name: "Account", href: "/account", icon: User },
  { name: "Cart", href: "/cart", icon: ShoppingCart },
]

const SideMenu = ({ regions }: { regions: HttpTypes.StoreRegion[] | null }) => {
  const toggleState = useToggleState()

  return (
    <div className="h-full">
      <div className="flex items-center h-full">
        <Popover className="h-full flex">
          {({ open, close }) => (
            <>
              <div className="relative flex h-full">
                <Popover.Button
                  data-testid="nav-menu-button"
                  className="relative h-full flex items-center transition-all ease-out duration-200 focus:outline-hidden hover:text-ui-fg-base"
                  aria-label="Open menu"
                >
                  <Menu className="h-6 w-6" />
                </Popover.Button>
              </div>

              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-300"
                enterFrom="opacity-0 translate-x-[-100%]"
                enterTo="opacity-100 translate-x-0"
                leave="transition ease-in duration-300"
                leaveFrom="opacity-100 translate-x-0"
                leaveTo="opacity-0 translate-x-[-100%]"
              >
                <PopoverPanel className="fixed inset-0 z-50 w-full h-screen bg-background text-foreground">
                  <div
                    data-testid="nav-menu-popup"
                    className="flex flex-col min-h-screen justify-between px-6 pt-6 pb-8"
                  >
                    <div className="flex justify-between items-center" id="header-buttons">
                      <button 
                        data-testid="back-menu-button" 
                        onClick={close}
                        className="flex items-center gap-2 hover:opacity-70 transition-opacity"
                        aria-label="Close menu"
                      >
                        <ArrowLeft className="h-6 w-6" />
                      </button>
                      <button 
                        data-testid="close-menu-button" 
                        onClick={close}
                        className="flex items-center gap-2 hover:opacity-70 transition-opacity"
                        aria-label="Close menu"
                      >
                        <XMark className="h-6 w-6" />
                      </button>
                    </div>
                    <ul className="flex flex-col gap-4 items-stretch justify-start flex-1 w-full">
                      {SideMenuItems.map(({ name, href, icon: Icon }) => {
                        return (
                          <li key={name} className="w-full">
                            <LocalizedClientLink
                              href={href}
                              className="flex items-center gap-3 w-full px-6 py-4 text-base font-medium text-foreground bg-background border border-border rounded-lg shadow-sm hover:bg-accent hover:text-accent-foreground hover:border-primary/50 hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 ease-in-out"
                              onClick={close}
                              data-testid={`${name.toLowerCase()}-link`}
                            >
                              <Icon className="h-5 w-5 shrink-0" />
                              <span>{name}</span>
                            </LocalizedClientLink>
                          </li>
                        )
                      })}
                    </ul>
                    <div className="flex flex-col gap-y-6 pb-4">
                      <div
                        className="flex justify-between"
                        onMouseEnter={toggleState.open}
                        onMouseLeave={toggleState.close}
                      >
                        {regions && (
                          <CountrySelect
                            toggleState={toggleState}
                            regions={regions}
                          />
                        )}
                        <ArrowRightMini
                          className={clx(
                            "transition-transform duration-150",
                            toggleState.state ? "-rotate-90" : ""
                          )}
                        />
                      </div>
                      <Text className="flex justify-between txt-compact-small text-foreground">
                        © {new Date().getFullYear()} Medusa Store. All rights
                        reserved.
                      </Text>
                    </div>
                  </div>
                </PopoverPanel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </div>
  )
}

export default SideMenu
