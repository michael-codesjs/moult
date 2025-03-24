export type PreSignUpParams = { phoneNumber?: string; email?: string }

export type PreSignUpReturnType = {
  confirmed: boolean
  emailVerified: boolean
  phoneNumberVerified: boolean
  alias_exists: false
}

export type PreSignUpUseCase = (
  params: PreSignUpParams,
) => Promise<PreSignUpReturnType>

/** Pre sign-up use-case. */

export const preSignUp: PreSignUpUseCase = async () => {
  // TODO: check if user exists.
  return {
    confirmed: true,
    emailVerified: false,
    phoneNumberVerified: false,
    alias_exists: false,
  }
}
