"use client"

import { useActionState, useState, useRef, useEffect } from "react"
import Input from "@modules/common/components/input"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import { resetPassword } from "@lib/data/customer"
import { useRouter } from "next/navigation"

type Props = {
  token: string
  email: string
}

type FormState = string | null

const ResetPasswordForm = ({ token, email }: Props) => {
  const [state, formAction] = useActionState<FormState, FormData>(
    resetPassword,
    null
  )
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const hasSubmittedRef = useRef(false)
  const router = useRouter()

  // Track if form has been submitted
  useEffect(() => {
    if (state !== null) {
      hasSubmittedRef.current = true
    }
  }, [state])

  // Handle successful password reset - redirect after delay
  useEffect(() => {
    if (state === null && hasSubmittedRef.current) {
      const timer = setTimeout(() => {
        router.push("/account")
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [state, router])

  // Client-side validation before submission
  const handleSubmit = async (formData: FormData) => {
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirm_password") as string

    // Clear previous errors
    setPasswordError(null)

    // Validate passwords match
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match")
      return
    }

    // Validate password length
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long")
      return
    }

    // Submit form if validation passes
    return formAction(formData)
  }

  // Success state: state is null AND form has been submitted
  const isSuccess = state === null && hasSubmittedRef.current

  // Show success message
  if (isSuccess) {
    return (
      <div
        className="w-full flex flex-col items-center"
        data-testid="reset-password-form-page"
      >
        <div className="w-16 h-16 rounded-full bg-ui-bg-interactive/10 flex items-center justify-center mb-6">
          <svg
            className="w-8 h-8 text-ui-fg-interactive"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-semibold uppercase mb-4 text-center">Password Reset</h1>
        <div className="w-full text-center space-y-3">
          <p className="text-base text-ui-fg-base">
            Your password has been successfully reset!
          </p>
          <div className="pt-4 border-t border-ui-border-base">
            <div className="flex items-center justify-center gap-2 text-sm text-ui-fg-subtle">
              <svg
                className="w-4 h-4 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span>Redirecting to your account...</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Show form
  return (
    <div
      className="w-full flex flex-col"
      data-testid="reset-password-form-page"
    >
      <h1 className="text-2xl font-semibold uppercase mb-2 text-center">Set New Password</h1>
      <p className="text-center text-base text-ui-fg-subtle mb-8">
        Please enter your new password below.
      </p>
      <form className="w-full" action={handleSubmit}>
        <input type="hidden" name="token" value={token} />
        <input type="hidden" name="email" value={email} />
        <div className="flex flex-col w-full gap-y-4">
          <Input
            label="New Password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            data-testid="password-input"
          />
          <Input
            label="Confirm Password"
            name="confirm_password"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            data-testid="confirm-password-input"
          />
        </div>
        <div className="mt-2 mb-4">
          <p className="text-xs text-ui-fg-subtle">
            Password must be at least 8 characters long
          </p>
        </div>
        <ErrorMessage 
          error={passwordError || state} 
          data-testid="reset-password-error-message" 
        />
        <SubmitButton 
          data-testid="reset-password-button" 
          className="w-full mt-6"
        >
          Reset Password
        </SubmitButton>
      </form>
    </div>
  )
}

export default ResetPasswordForm
