export type AttributeParams<T, I> = {
  required?: boolean,
  validate?: (value: T) => boolean,
  value: T,
  immutable?: I
};

export type AttributeSchema<T = any, I extends boolean = false> = {
  type: T,
  immutable: I,
};

export type CommonAttributes = {
  entityType: AttributeSchema<string, true>
  id: AttributeSchema<string, true>,
  creator: AttributeSchema<string, true>,
  creatorType: AttributeSchema<string, true>,
  created: AttributeSchema<Date, true>,
  modified: AttributeSchema<Date, true>,
  discontinued: AttributeSchema<boolean, true>
};