export class MutateImmutable extends Error {
  constructor() {
    super()
    this.name = 'Attempt To Mutate Immutable'
    this.message = 'Attempting to mutate an immutable attribute'
  }
}
