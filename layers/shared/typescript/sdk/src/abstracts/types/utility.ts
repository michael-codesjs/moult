import { AttributeParams, AttributeSchema, CommonAttributes } from ".";
import { WithPartial } from "../../types";
import { Attribute } from "../attribute";

export type ToAttributeRecord<T extends Record<string, AttributeSchema<any, boolean>>> = {
  [Key in keyof T]: Attribute<T[Key]["type"], T[Key]["immutable"]>
};

export type ToAttributeParams<T extends Record<string, AttributeSchema<any, boolean>>> = {
  [Key in keyof T]: Pick<AttributeParams<T[Key]["type"], T[Key]["immutable"]>, "required" | "validate" | "immutable"> & {
    initial?: T[Key]["type"] | null
  }
};

/** Makes ICommon attributes optional. */
export type AttributesConstructorParams<T extends Record<string, AttributeSchema<any, boolean>>> = (
  WithPartial<ToAttributeRecord<T>, keyof CommonAttributes>
);

export type EntriesFromAttributesSchema<T extends Record<string, AttributeSchema<any, boolean>>> = {
  [Key in keyof T]: T[Key]["type"]
};

export type GetMutableAttributes<T extends Record<string, AttributeSchema<any, boolean>>> = {
  [Key in keyof T]-?: T[Key]["immutable"] extends false ? Key : never
}[keyof T];

export type GetSetMutableAttributes<T extends Record<string, AttributeSchema<any, boolean>>> = Partial<
  Pick<EntriesFromAttributesSchema<T>, GetMutableAttributes<T>>
>;