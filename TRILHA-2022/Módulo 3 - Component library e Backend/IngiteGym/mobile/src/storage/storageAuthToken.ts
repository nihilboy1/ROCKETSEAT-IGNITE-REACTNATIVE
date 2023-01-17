import as from "@react-native-async-storage/async-storage"

import { AUTH_TOKEN_STORAGE } from "@storage/storageConfig"

export async function storageAuthTokenSave(token: string){
    await as.setItem(AUTH_TOKEN_STORAGE, token)
}

export async function storageAuthTokenGet(){
    const token = await as.getItem(AUTH_TOKEN_STORAGE)

    return token
}


export async function storageAuthTokenRemove(){
    const token = await as.removeItem(AUTH_TOKEN_STORAGE)

    return token
}