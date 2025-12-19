"use client"

import { useActionState, useRef, useEffect } from "react"
import Input from "@modules/common/components/input"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import { requestPasswordReset } from "@lib/data/customer"

type FormState = string | null

const ResetPasswordRequest = () => {
  // useActionState: returns [state, formAction]
  // state is null on success, error string on error, or null initially
  const [state, formAction] = useActionState<FormState, FormData>(
    requestPasswordReset,
    null
  )
  const hasSubmittedRef = useRef(false)

  // Track if form has been submitted
  useEffect(() => {
    if (state !== null) {
      hasSubmittedRef.current = true
    }
  }, [state])

  // Success state: state is null AND form has been submitted
  const isSuccess = state === null && hasSubmittedRef.current

  // Show success message
  if (isSuccess) {
    return (
      <div
        className="w-full flex flex-col items-center"
        data-testid="reset-password-request-page"
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
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-semibold uppercase mb-4 text-center">Check your email</h1>
        <div className="w-full text-center space-y-3">
          <p className="text-base text-ui-fg-base">
            We've sent a password reset link to your email address. Please check
            your inbox and click the link to reset your password.
          </p>
          <div className="pt-4 border-t border-ui-border-base">
            <p className="text-sm text-ui-fg-subtle">
              If you don't see the email, please check your spam folder.
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Show form
  return (
    <div
      className="w-full flex flex-col"
      data-testid="reset-password-request-page"
    >
      <h1 className="text-2xl font-semibold uppercase mb-2 text-center">Reset Password</h1>
      <p className="text-center text-base text-ui-fg-subtle mb-8">
        Enter your email address and we'll send you a link to reset your
        password.
      </p>
      <form className="w-full" action={formAction}>
        <div className="flex flex-col w-full gap-y-4">
          <Input
            label="Email"
            name="email"
            type="email"
            title="Enter a valid email address."
            autoComplete="email"
            required
            data-testid="email-input"
          />
        </div>
        <ErrorMessage error={state} data-testid="reset-password-error-message" />
        <SubmitButton 
          data-testid="send-reset-link-button" 
          className="w-full mt-6"
        >
          Send Reset Link
        </SubmitButton>
      </form>
    </div>
  )
}

export default ResetPasswordRequest
