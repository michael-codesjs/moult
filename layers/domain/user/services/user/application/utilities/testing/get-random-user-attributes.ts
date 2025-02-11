import { Chance } from "chance";
import { UserDTO } from "@domain/models";

const chance = new Chance();

export const getRandomUserAttributes = (): UserDTO => {

  const id = chance.guid();

  return {
    entity_type: "USER",
    id: id,
    creator_type: "USER",
    creator: id,
    created: chance.date(),
    modified: chance.date(),
    discontinued: chance.bool(),
    username: chance.first().toLowerCase(),
    email: chance.email(),
    phone_number: chance.phone({ formatted: false }),
    password: chance.string({ length: 20, numeric: true, alpha: true, symbols: true })
  };

};