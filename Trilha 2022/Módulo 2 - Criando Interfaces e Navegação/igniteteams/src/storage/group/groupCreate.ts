import AsyncStorage from '@react-native-async-storage/async-storage'
import { GROUP_COLLECTION } from '@storage/storageConfig'
import { AppError } from '@utils/AppError'
import { groupGetAll } from './groupGetAll'

export async function groupCreate(newGroupName: string) {
  try {
    const allCurrentGroups = await groupGetAll()
    const groupAlreadyExists = allCurrentGroups.includes(newGroupName)
    if(groupAlreadyExists){
      throw new AppError("Já existe um grupo cadastrado com esse nome.")
    }
    const newStorage = JSON.stringify([...allCurrentGroups, newGroupName])
    await AsyncStorage.setItem(GROUP_COLLECTION, newStorage)
  } catch (error) {
    throw error
  }
}
