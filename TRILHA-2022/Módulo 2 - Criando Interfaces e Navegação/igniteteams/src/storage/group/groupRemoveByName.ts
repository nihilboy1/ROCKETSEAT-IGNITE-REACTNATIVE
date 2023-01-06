import AsyncStorage from '@react-native-async-storage/async-storage'
import { GROUP_COLLECTION, PLAYER_COLLECTION } from '@storage/storageConfig'

import { groupGetAll } from './groupGetAll'

export async function groupRemoveByName(groupToBeDeleted: string) {
  try {
    const storedGroups = await groupGetAll()
    const groups = storedGroups.filter(group => group !== groupToBeDeleted)

    await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify(groups))
    await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${groupToBeDeleted}`)
  } catch (error) {
    throw error
  }
}
