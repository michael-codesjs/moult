import { Chance } from 'chance'
import { Attribute, Attributes } from '..'
import { AttributeSchema, CommonAttributes } from '../types'

const chance = new Chance()

describe('Attributes', () => {
  /** constructs POJO of type RefinedToAttributeParams<T>*/
  const getRandomAttributeDefinitions = () => {
    const randomAttributeKeys = Array(chance.integer({ min: 5, max: 100 }))
      .fill(null)
      .map(() => chance.word())

    const randomAttributes = randomAttributeKeys.reduce(
      (cumulative, current) => ({
        ...cumulative,
        [current]: new Attribute({
          required: false,
          value: current,
          immutable: false,
        }),
      }),
      {} as Record<string, Attribute<string, boolean>>,
    ) // construct POJO of type RefinedToAttributeParams<T> to be passed to new Attributes()

    return randomAttributes
  }

  /** returns POJO of string values with values of the supplied array as keys */
  const getRandomAttributeValues = <T extends string>(
    attributes: Array<T>,
  ): Record<T, any> => {
    return attributes.reduce(
      (cumulative, current) => ({
        ...cumulative,
        [current]: chance.string(),
      }),
      {} as Record<T, any>,
    )
  }

  type GetRandomAttributesReturnType = () => {
    attributes: Attributes<
      CommonAttributes & Record<string, AttributeSchema<any, boolean>>
    >
    definitions: ReturnType<typeof getRandomAttributeDefinitions>
  }

  const getRandomAttributes: GetRandomAttributesReturnType = () => {
    const definitions = getRandomAttributeDefinitions()
    const attributes = new Attributes<
      CommonAttributes & Record<string, AttributeSchema<any, boolean>>
    >(definitions)

    return {
      attributes,
      definitions,
    }
  }

  const COMMON_ATTRIBUTES = [
    'entityType',
    'id',
    'creatorType',
    'creator',
    'created',
    'modified',
    'discontinued',
  ]

  test('instanciates Common attributes on Attributes instaciation', () => {
    const attributes = new Attributes()
    const instanciatedAttributes = (attributes as any).Attributes as Record<
      keyof CommonAttributes,
      Attribute<any, boolean>
    >

    expect(Object.keys(instanciatedAttributes)).toEqual(
      expect.arrayContaining(COMMON_ATTRIBUTES),
    )

    Object.entries(instanciatedAttributes).forEach((value) => {
      const attribute = value[1]
      expect(attribute).toBeInstanceOf(Attribute)
    })
  })

  test('instanciates T attributes on Attributes instanciation', () => {
    const randomAttributes = getRandomAttributeDefinitions()
    const attributes = new Attributes(randomAttributes)
    const instanciatedAttributes = (attributes as any).Attributes as Record<
      string,
      Attribute<string, boolean>
    >

    expect(Object.keys(instanciatedAttributes)).toEqual(
      expect.arrayContaining(Object.keys(randomAttributes)),
    )
  })

  test('.parse(common)', () => {
    const attributes = new Attributes()

    const commonAttributesValues = {
      entityType: chance.word(),
      id: chance.fbid(),
      creatorType: chance.word(),
      creator: chance.fbid(),
      created: new Date(),
      modified: new Date(),
      discontinued: chance.bool(),
    }

    attributes.parse(commonAttributesValues)

    const _Attributes = (attributes as any).Attributes as Record<
      keyof CommonAttributes,
      Attribute<string, boolean>
    >

    Object.entries(commonAttributesValues).forEach(([key, value]) => {
      const attribute = _Attributes[key]
      expect(attribute.get()).toStrictEqual(value)
    })
  })

  test('.parse(common) implicit', () => {
    const attributes = new Attributes()

    attributes.parse({
      entityType: chance.word(),
    })

    const _Attributes = (attributes as any).Attributes as Record<
      keyof CommonAttributes,
      Attribute<string, boolean>
    >
    const id = _Attributes.id
    const created = _Attributes.created

    expect(id.get()).toBeDefined()
    expect(id.get()).not.toBeNull()
    expect(created.get()).toBeDefined()
    expect(created.get()).not.toBeNull()
  })

  test('.parse(T)', () => {
    const { attributes, definitions } = getRandomAttributes()

    const values = getRandomAttributeValues(Object.keys(definitions))

    attributes.parse({
      entityType: chance.word(), // is the only requireed attribute when parsing attributes
      ...values,
    })

    const _Attributes = (attributes as any).Attributes as Record<
      keyof typeof values,
      Attribute<string, boolean>
    >

    Object.entries(values).forEach(([key, value]) => {
      const attribute = _Attributes[key]
      expect(attribute.get()).toStrictEqual(value)
    })
  })

  test('.set()', () => {
    const { attributes, definitions } = getRandomAttributes()
    const values = getRandomAttributeValues(Object.keys(definitions))

    attributes.set(values)

    const _Attributes = (attributes as any).Attributes as Record<
      keyof typeof values,
      Attribute<string, boolean>
    >

    Object.entries(values).forEach(([key, value]) => {
      const attribute = _Attributes[key]
      expect(attribute.get()).toStrictEqual(value)
    })
  })

  test('.collective()', () => {
    const { attributes, definitions } = getRandomAttributes()
    const collective = attributes.collective()

    expect(Object.keys(collective)).toEqual(
      expect.arrayContaining(Object.keys(definitions)),
    )
  })
})
