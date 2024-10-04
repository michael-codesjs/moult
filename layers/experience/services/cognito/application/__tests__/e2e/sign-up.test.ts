import { auth, getRandomUserCognitoAttributes } from "../utilities";
import Chance from "chance";

const chance = new Chance();

describe("Sign-up", () => {

    const getSignUpParams = () => {

        const { name, phoneNumber, email, password } = getRandomUserCognitoAttributes();

        return {
            username: chance.first() + chance.integer({ min: 1 }),
            password,
            attributes: {
                name,
                phone_number: phoneNumber,
                email
            }
        };

    };

    it(".signs up", async () => {
        const signUpParams = getSignUpParams();
        await auth.signUp(signUpParams);
    });

})