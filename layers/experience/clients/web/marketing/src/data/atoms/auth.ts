import { withLocalStoragePersistEffect } from "../atom-effects";
import { atom } from "recoil";

export const isAuthenticatedAtom = atom<boolean>({
    key: "is-authenticated",
    default: false,
    effects: [
        withLocalStoragePersistEffect()
    ]
});