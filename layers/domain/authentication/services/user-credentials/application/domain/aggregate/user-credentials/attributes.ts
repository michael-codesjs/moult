import { Attributes, CommonAttributes, AttributeSchema, Attribute, EntriesFromAttributesSchema } from "@shared";
import validator from "validator";

export type UserCredentialsAttributesSchema = CommonAttributes & {
    entityType: AttributeSchema<"USER_CREDENTIALS", true>,
    creatorType: AttributeSchema<"USER_CREDENTIALS", true>,
    email?: AttributeSchema<string>,
    phoneNumber?: AttributeSchema<string>,
    username?: AttributeSchema<string>,
    emailVerified: AttributeSchema<boolean>,
    phoneNumberVerified: AttributeSchema<boolean>,
    password: AttributeSchema<string>
};

export class UserCredentialsAttributes extends Attributes<UserCredentialsAttributesSchema> {

    constructor() {

        const creatorType = new Attribute<"USER_CREDENTIALS", true>({ required: true, value: "USER_CREDENTIALS" });
        const entityType = new Attribute<"USER_CREDENTIALS", true>({ required: true, value: "USER_CREDENTIALS" });
        const email = new Attribute<string>({ required: false, value: null, validate: (value) => validator.isEmail(value) });
        const phoneNumber = new Attribute<string>({ required: false, value: null, validate: (value) => validator.isMobilePhone(value) });
        const emailVerified = new Attribute<boolean>({ required: false, value: null });
        const phoneNumberVerified = new Attribute<boolean>({ required: false, value: null });
        const password = new Attribute<string>({ required: false, value: null });

        super({ creatorType, entityType, email, phoneNumber, emailVerified, phoneNumberVerified, password });

    }

    parse(attributes: Partial<EntriesFromAttributesSchema<UserCredentialsAttributesSchema>>): void {
        super.parse({ ...attributes, entityType: "USER_CREDENTIALS", creatorType: "USER_CREDENTIALS" });
    }

}