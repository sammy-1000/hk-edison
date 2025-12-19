import { Metadata } from "next"
import ResetPasswordRequest from "@modules/account/components/reset-password-request"
import ResetPasswordForm from "@modules/account/components/reset-password-form"

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Reset your password for your Medusa Store account.",
}

type Props = {
  searchParams: Promise<{ token?: string; email?: string }>
}

export default async function ResetPasswordPage({ searchParams }: Props) {
  const params = await searchParams
  const { token, email } = params

  // Validate token and email are present and valid
  const hasValidParams = token && email && token.trim() !== "" && email.trim() !== ""

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="bg-ui-bg-base border border-ui-border-base rounded-lg shadow-lg p-8 md:p-10">
          {hasValidParams ? (
            <ResetPasswordForm token={token} email={decodeURIComponent(email)} />
          ) : (
            <ResetPasswordRequest />
          )}
        </div>
      </div>
    </div>
  )
}
