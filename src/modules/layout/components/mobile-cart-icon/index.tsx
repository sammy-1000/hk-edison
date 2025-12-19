import { retrieveCart } from "@lib/data/cart"
import MobileCartIconClient from "./client"

export default async function MobileCartIcon() {
  const cart = await retrieveCart().catch(() => null)

  return <MobileCartIconClient cart={cart} />
}
