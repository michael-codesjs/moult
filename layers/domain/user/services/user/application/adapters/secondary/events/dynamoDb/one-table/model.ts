import { Model } from "dynamodb-onetable";
import { table } from "./table";
import { USER_DOMAIN_EVENTS } from "@domain/events";

export const events = new Model<USER_DOMAIN_EVENTS>(table, "USER", {
  fields: {
    id: { type: String, required: true },
    source: { type: String },
    name: { type: String },
    payload: { type: Object, schema: {
      entity_type: { type: String },
      id: { type: String },
      creator: { type: String },
      creator_type: { type: String },
      created: { type: Date },
      modified: { type: Date },
      discontinued: { type: Boolean },
      email: { type: String },
      phone_number: { type: String },
      email_verified: { type: Boolean },
      phone_number_verified: { type: Boolean },
      password: { type: String }
    }},
    date: { type: Date },
    version: { type: Number },
  }
});