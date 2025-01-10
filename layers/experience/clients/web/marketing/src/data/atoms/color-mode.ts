import { withLocalStoragePersistEffect } from "@data/atom-effects";
import { ColorMode } from "@typings/index";
import { changeColorMode } from "@utilities/functions";
import { atom, AtomEffect } from "recoil";

const localStoragePersistEffect: AtomEffect<ColorMode> = withLocalStoragePersistEffect({
    onGetItem: (item) => {
        const colorMode = (item || "light") as ColorMode;
        changeColorMode(colorMode);
        return colorMode;
    }
});

const onSet: AtomEffect<ColorMode> = ({ onSet }) => onSet(value => changeColorMode(value));

export const colorModeAtom = atom<ColorMode>({
    key: "color-mode",
    default: "light",
    effects: [
        localStoragePersistEffect,
        onSet
    ]
});