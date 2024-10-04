import Chance from "chance";

const chance = new Chance();

export const getRandomUserCognitoAttributes = () => {

    const name = chance.name();
    const phoneNumber = "+" + chance.phone({ formatted: false, mobile: true, country: "us" });
    const email = chance.email();
    const password = chance.string({ alpha: true, numeric: true, symbols: true, length: 20 });

    return { name, phoneNumber, email, password };

}