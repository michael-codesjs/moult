import { Chance } from "chance";
import { UserDTO } from "@typings";

const chance = new Chance();

export const getRandomUserAttributes = (): UserDTO => {

  const id = chance.guid();

  return {
    entityType: "USER",
    id: id,
    creatorType: "USER",
    creator: id,
    created: chance.date(),
    modified: chance.date(),
    discontinued: chance.bool(),
    name: chance.name(),
    email: chance.email(),
    phoneNumber: chance.phone({ formatted: false }),
    dateOfBirth: new Date(),
    gender: chance.gender() as "MALE" | "FEMALE"
  };

};