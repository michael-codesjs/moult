import { Attributes, CommonAttributes, AttributeSchema, Attribute, EntriesFromAttributesSchema } from "@shared";
import validator from "validator";

export type UserAttributesSchema = CommonAttributes & {
    entityType: AttributeSchema<"USER", true>,
    creatorType: AttributeSchema<"USER", true>,
    name: AttributeSchema<string>,
    email: AttributeSchema<string>,
    phoneNumber: AttributeSchema<string>,
    dateOfBirth: AttributeSchema<Date>,
    gender: AttributeSchema<"MALE" | "FEMALE">
};

export class UserAttributes extends Attributes<UserAttributesSchema> {

    constructor() {

        const creatorType = new Attribute<"USER", true>({ required: true, value: "USER" });
        const entityType = new Attribute<"USER", true>({ required: true, value: "USER" });
        const name = new Attribute({ required: true, value: null });
        const email = new Attribute({ required: true, value: null, validate: (value) => validator.isEmail(value) });
        const phoneNumber = new Attribute({ required: true, value: null, validate: (value) => validator.isMobilePhone(value) });
        const dateOfBirth = new Attribute({ required: true, value: null });
        const gender = new Attribute({ required: true, value: null });

        super({ creatorType, entityType, name, email, phoneNumber, dateOfBirth, gender })

    }

    parse(attributes: Partial<EntriesFromAttributesSchema<UserAttributesSchema>>): void {
        super.parse({ ...attributes, entityType: "USER", creatorType: "USER" });
    }

}