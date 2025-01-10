import { isLiteralObject } from "@utilities/functions";
import { AtomEffect, DefaultValue } from "recoil";

export type WithLocalPersistEffect = <T = unknown>(params?: {
    onGetItem: (item: string | null) => T
}) => AtomEffect<T>;

export const withLocalStoragePersistEffect: WithLocalPersistEffect = (params) => {

    const { onGetItem } = params || {};

    return ({ node, setSelf, onSet }) => { 

        const storedItem = localStorage.getItem(node.key);

        if (onGetItem) {
            const parsedStoreItem = onGetItem(storedItem);
            setSelf(parsedStoreItem);
        } else {
            setSelf(storedItem as any);
        }

        onSet(newItems => {
            if (newItems instanceof DefaultValue) localStorage.removeItem(node.key);
            else localStorage.setItem(node.key, isLiteralObject(newItems) ? JSON.stringify(newItems) : newItems as string);
        });

    }

};