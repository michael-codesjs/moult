import { Attributes, CommonAttributes, AttributeSchema, Attribute, EntriesFromAttributesSchema } from "@shared";
import validator from "validator";

export type UserAttributesSchema = CommonAttributes & {
    entity_type: AttributeSchema<"USER", true>,
    creator_type: AttributeSchema<"USER", true>,
    email?: AttributeSchema<string>,
    phone_number?: AttributeSchema<string>,
    username?: AttributeSchema<string>,
    email_verified: AttributeSchema<boolean>,
    phone_number_verified: AttributeSchema<boolean>,
    password: AttributeSchema<string>
};

export class UserAttributes extends Attributes<UserAttributesSchema> {

    constructor() {

        const emailValidator = (value?: string) => {
            return true; // for dev purposes only
            // if(!value) return true;
            // return validator.isEmail(value);
        }

        const phoneNumberValidator = (value?: string) => {
            return true // for dev purposes only
            // if(!value) return true;
            // return validator.isMobilePhone(value); 
        }

        const creator_type = new Attribute<"USER", true>({ required: true, value: "USER" });
        const entity_type = new Attribute<"USER", true>({ required: true, value: "USER" });
        const email = new Attribute<string>({ required: false, value: null, validate: emailValidator });
        const phone_number = new Attribute<string>({ required: false, value: null, validate: phoneNumberValidator });
        const email_verified = new Attribute<boolean>({ required: false, value: null });
        const phone_number_verified = new Attribute<boolean>({ required: false, value: null });
        const password = new Attribute<string>({ required: false, value: null });

        super({ creator_type, entity_type, email, phone_number, email_verified, phone_number_verified, password });

    }

    parse(attributes: Partial<EntriesFromAttributesSchema<UserAttributesSchema>>): void {
        super.parse({ ...attributes, entity_type: "USER", creator_type: "USER" });
    }

}