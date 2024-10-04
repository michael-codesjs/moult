import { Model } from "dynamodb-onetable";
import { table } from "./table";
import { UserCredentialsDTO } from "@domain/models";

export const userCredentials = new Model<UserCredentialsDTO>(table, "USER", {
  fields: {
    // key fields
    PK: { type: String, value: 'USER#${id}', hidden: true },
    SK: { type: String, value: 'USER#${id}', hidden: true },
    EntityIndexPK: { type: String, value: 'USER', hidden: true },
    EntityIndexSK: { type: String, value: 'DATE#${created}#${discontinued}', hidden: true },
    CreatorIndexPK: { type: String, value: '${creatorType}#${id}', hidden: true },
    CreatorIndexSK: { type: String, value: '${creatorType}#DATE#${created}#${discontinued}', hidden: true },
    EmailIndexPK: { type: String, value: '${creatorType}#${email}', hidden: true },
    PhoneNumberIndexPK: { type: String, value: '${creatorType}#${phoneNumber}', hidden: true },
    UsernameIndexPK: { type: String, value: '${creatorType}#${username}' },
    // attributes
    entityType: { type: String, validate: "USER", required: true, default: "USER" },
    id: { type: String, required: true },
    creatorType: { type: String, required: true, default: "USER" },
    creator: { type: String, required: true },
    created: { type: Date, required: true },
    modified: { type: Date },
    discontinued: { type: Boolean, required: true },
    username: { type: String },
    email: { type: String },
    phoneNumber: { type: String },
    password: { type: String, required: true },
    phoneNumberVerified: { type: Boolean },
    emailVerified: { type: Boolean }
  }
});