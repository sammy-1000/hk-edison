import { Text, Container } from "@medusajs/ui"
import { Phone, MessageCircle, Mail } from "lucide-react"
import brandData from "brand/brand-data"

const PaymentContactInfo = () => {
  // Get contact info from environment variables or brand data
  const phoneNumber = process.env.NEXT_PUBLIC_STORE_PHONE || (brandData as any).contact?.phone || "+1234567890"
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || phoneNumber
  const email = process.env.NEXT_PUBLIC_STORE_EMAIL || (brandData as any).contact?.email || "support@store.com"
  
  // Format phone number for WhatsApp (remove + and spaces)
  const whatsappFormatted = whatsappNumber.replace(/[\s\+]/g, "")
  const whatsappUrl = `https://wa.me/${whatsappFormatted}`
  const phoneUrl = `tel:${phoneNumber.replace(/\s/g, "")}`

  return (
    <Container className="mt-4 p-6 bg-ui-bg-subtle border border-ui-border-base rounded-md">
      <Text className="text-base-regular mb-4 text-ui-fg-base">
        Contact us to complete your order and arrange delivery:
      </Text>
      
      <div className="flex flex-col gap-3">
        {/* WhatsApp */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-3 bg-green-50 hover:bg-green-100 rounded-md transition-colors border border-green-200"
        >
          <div className="flex items-center justify-center w-10 h-10 bg-green-500 rounded-full">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <Text className="text-small-regular font-semibold text-ui-fg-base">
              WhatsApp
            </Text>
            <Text className="text-small-regular text-ui-fg-subtle">
              {whatsappNumber}
            </Text>
          </div>
          <Text className="text-small-regular text-green-600 font-medium">
            Chat Now →
          </Text>
        </a>

        {/* Phone */}
        <a
          href={phoneUrl}
          className="flex items-center gap-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors border border-blue-200"
        >
          <div className="flex items-center justify-center w-10 h-10 bg-blue-500 rounded-full">
            <Phone className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <Text className="text-small-regular font-semibold text-ui-fg-base">
              Phone
            </Text>
            <Text className="text-small-regular text-ui-fg-subtle">
              {phoneNumber}
            </Text>
          </div>
          <Text className="text-small-regular text-blue-600 font-medium">
            Call Now →
          </Text>
        </a>

        {/* Email */}
        <a
          href={`mailto:${email}`}
          className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors border border-gray-200"
        >
          <div className="flex items-center justify-center w-10 h-10 bg-gray-500 rounded-full">
            <Mail className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <Text className="text-small-regular font-semibold text-ui-fg-base">
              Email
            </Text>
            <Text className="text-small-regular text-ui-fg-subtle">
              {email}
            </Text>
          </div>
          <Text className="text-small-regular text-gray-600 font-medium">
            Email Us →
          </Text>
        </a>
      </div>

      <div className="mt-4 pt-4 border-t border-ui-border-base">
        <Text className="text-small-regular text-ui-fg-subtle">
          After placing your order, we'll contact you via WhatsApp or phone to confirm payment and delivery details.
        </Text>
      </div>
    </Container>
  )
}

export default PaymentContactInfo

