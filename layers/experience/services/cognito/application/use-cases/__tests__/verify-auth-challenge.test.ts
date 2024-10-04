import Chance from "chance";
import { verifyAuthChallenge } from "..";

const chance = new Chance();

describe("Verify Auth Challenge", () => {

    it(".verifies challenge answer", () => {
        
        const challenge = chance.integer({ min: 100000, max: 999999 }).toString();
        const challengeAnswer = challenge;

        const response = verifyAuthChallenge({ challenge, challengeAnswer });
        expect(response).toBe(true);

    });

});