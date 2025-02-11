import { Model } from "dynamodb-onetable";
import { table } from "./table";
import { USER_DOMAIN_EVENTS } from "@domain/events";

export const events = new Model<USER_DOMAIN_EVENTS>(table, "USER", {
  fields: {
    id: { type: String, required: true },
    source: { type: String },
    name: { type: String },
    payload: { type: String },
    date: { type: Date },
    version: { type: Number },
  }
});