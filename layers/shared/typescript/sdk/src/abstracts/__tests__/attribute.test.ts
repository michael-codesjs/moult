import { Attribute } from '..'
import { Chance } from 'chance'
import { InvalidAttributeValue } from '../errors'

const chance = new Chance()

describe('Attribute', () => {
  test('.set', () => {
    const attribute = new Attribute<string, false>({ value: 'value' })

    const secondValue = 'second value'
    const modified = new Date()

    attribute.set(secondValue, modified)

    const postSetValue = attribute.get()
    const postSetModified = (attribute as any).modified // as any so we can get the private property 'modified'

    expect(postSetValue).toBe(secondValue)
    expect(postSetModified.valueOf()).toBe(modified.valueOf())
  })

  test('validator on .set', () => {
    const validValue = chance.string()
    let mockValidator = jest.fn((value: string) => value === validValue)
    const attribute = new Attribute<string, false>({
      value: validValue,
      validate: mockValidator,
    })

    attribute.set(validValue)

    expect(mockValidator.mock.calls).toHaveLength(1)
    expect(() => attribute.set('other value')).toThrowError(
      new InvalidAttributeValue(),
    )
    expect(mockValidator.mock.calls).toHaveLength(2)
  })

  test('.isUpdateable', () => {
    const attribute = new Attribute<string, false>({ value: 'value' })
    const castedAttribute = attribute as any

    expect(attribute.isUpdateable()).toBe(true) // is updateable on pre set.

    const modified = new Date()
    castedAttribute.value = 'modified value(updateable falsy)'
    castedAttribute.modified = new Date(
      modified.valueOf() + chance.integer({ min: 1, max: 1000 }),
    )

    expect(attribute.isUpdateable(modified)).toBe(false)
  })
})

describe('Required Attribute', () => {
  let attribute: Attribute

  beforeEach(() => {
    attribute = new Attribute({ required: true, value: 'value' })
  })

  test('Truthy isPutable', () => {
    expect(attribute.isPutable()).toBe(true)
  })

  test('Falsy isPutable', () => {
    ;(attribute as any).value = null
    expect(attribute.isPutable()).toBe(false)
  })
})
