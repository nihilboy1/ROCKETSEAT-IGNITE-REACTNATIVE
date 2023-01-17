import as from "@react-native-async-storage/async-storage";
import { UserDTO } from "@dtos/UserDTO";

import { USER_STORAGE } from "@storage/storageConfig";

export async function storageUserSave(user: UserDTO) {
  await as.setItem(USER_STORAGE, JSON.stringify(user));
}

export async function storageUserGet() {
  const storage = await as.getItem(USER_STORAGE);
  const user: UserDTO = storage ? JSON.parse(storage) : {};
  return user;
}

export async function storageUserRemove() {
  await as.removeItem(USER_STORAGE);
}
