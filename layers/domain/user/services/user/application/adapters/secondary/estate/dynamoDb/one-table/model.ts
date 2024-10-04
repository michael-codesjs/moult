import { Model } from "dynamodb-onetable";
import { table } from "./table";
import { UserDTO } from "@typings";

export const user = new Model<UserDTO>(table, "USER", {
  fields: {
    // key fields
    PK: { type: String, value: 'USER#${id}', hidden: true },
    SK: { type: String, value: 'USER#${id}', hidden: true },
    EntityIndexPK: { type: String, value: 'USER', hidden: true },
    EntityIndexSK: { type: String, value: 'DATE#${created}#${discontinued}', hidden: true },
    CreatorIndexPK: { type: String, value: '${creatorType}#${id}', hidden: true },
    CreatorIndexSK: { type: String, value: '${creatorType}#DATE#${created}#${discontinued}', hidden: true },
    EmailIndexPK: { type: String, value: '${creatorType}#${email}', hidden: true },
    // EmailIndexSK: { type: String, value: '${creatorType}#${email}', hidden: true },
    PhoneNumberIndexPK: { type: String, value: '${creatorType}#${phoneNumber}', hidden: true },
    // PhoneNumberIndexSK: { type: String, value: '${creatorType}#${phoneNumber}', hidden: true },
    // attributes
    entityType: { type: String, validate: "USER", required: true, default: "USER" },
    id: { type: String, required: true },
    creatorType: { type: String, required: true, default: "USER" },
    creator: { type: String, required: true },
    created: { type: Date, required: true },
    modified: { type: Date },
    discontinued: { type: Boolean, required: true },
    name: { type: String, required: true },
    email: { type: String },
    phoneNumber: { type: String },
    dateOfBirth: { type: Date },
    gender: { type: String }
  }
});