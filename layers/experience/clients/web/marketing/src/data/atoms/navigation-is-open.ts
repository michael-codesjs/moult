import { atom } from "recoil";

export const navigationIsOpenAtom = atom<boolean>({
    key: "navigation-is-open",
    default: false,
});