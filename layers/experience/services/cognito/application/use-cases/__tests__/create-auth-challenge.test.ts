import { DEFAULT_AUTH_CHALLENGE } from "@shared";
import Chance from "chance";
import * as digitGenerator from "crypto-secure-random-digit";
import { createAuthChallenge } from "..";

jest.mock("crypto-secure-random-digit");

const chance = new Chance();

describe("Create Auth Challenge", () => {

    afterAll(() => {
        jest.clearAllMocks();
    });

    it(".generates random challenge in 'prod'", async () => {

        const phoneNumber = chance.phone();
        const email = chance.email();

        process.env.STAGE = "prod";

        const randomDigits = [1, 2, 3, 4, 5, 6];

        let mockedRandomDigits = jest.spyOn(digitGenerator, "randomDigits");
        mockedRandomDigits.mockImplementationOnce(() => randomDigits);

        const challenge = await createAuthChallenge({ phoneNumber, email });

        expect(mockedRandomDigits).toHaveBeenCalled();
        expect(mockedRandomDigits).toHaveBeenCalledWith(6);
        expect(challenge).toBe(randomDigits.join(""));

    });

    it(".generates DEFAULT_AUTH_CHALLENGE in stages other than 'prod'", async () => {

        const phoneNumber = chance.phone();
        const email = chance.email();

        process.env.STAGE = "dev";

        const challenge = await createAuthChallenge({ phoneNumber, email });

        expect(challenge).toBe(DEFAULT_AUTH_CHALLENGE);

    });

})