export class UsernameAttributeInUseError extends Error {
  constructor(attribute: string) {
    super()
    this.name = 'Username Attributes In-use.'
    this.message = `The supplied username attribute(${attribute}) is already in use by another account.`
  }
}
