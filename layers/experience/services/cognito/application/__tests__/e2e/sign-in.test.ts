import { DEFAULT_AUTH_CHALLENGE } from '@shared'
import { adminCreateUser } from '../utilities'
import { auth } from '../utilities'

describe('Sign In', () => {
  let user: Awaited<ReturnType<typeof adminCreateUser>>

  beforeEach(async () => {
    user = await adminCreateUser()
  })

  afterEach(async () => await auth.signOut())

  const postSignIn = async (session: any, username: string) => {
    const cognitoUser = await (auth as any).createCognitoUser(username) // auth.createCognitoUser is a private method thus the (auth as any);
    cognitoUser.Session = session

    await auth.sendCustomChallengeAnswer(cognitoUser, DEFAULT_AUTH_CHALLENGE) // send challenge response which is DEFAULT_AUTH_CHALLENGE for all stages other than production
    await auth.currentAuthenticatedUser() // will throw an error if sign-in was unsuccessful
  }

  it('.signs in using phoneNumber', async () => {
    const { Session } = await auth.signIn(user.phoneNumber)
    await postSignIn(Session, user.phoneNumber)
  })

  it('.signs in using email', async () => {
    const { Session } = await auth.signIn(user.email)
    await postSignIn(Session, user.email)
  })
})
