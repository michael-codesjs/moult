import { Chance } from "chance";
import { UserCredentialsDTO } from "@domain/models";

const chance = new Chance();

export const getRandomUserCredentialsAttributes = (): UserCredentialsDTO => {

  const id = chance.guid();

  return {
    entityType: "USER_CREDENTIALS",
    id: id,
    creatorType: "USER_CREDENTIALS",
    creator: id,
    created: chance.date(),
    modified: chance.date(),
    discontinued: chance.bool(),
    username: chance.first().toLowerCase(),
    email: chance.email(),
    phoneNumber: chance.phone({ formatted: false }),
    password: chance.string({ length: 20, numeric: true, alpha: true, symbols: true })
  };

};