import AsyncStorage from '@react-native-async-storage/async-storage'
import { PLAYER_COLLECTION } from '@storage/storageConfig'
import { AppError } from '@utils/AppError'
import { playersGetByGroup } from './playersGetByGroup'
import { PlayerStorageDTO } from './playerStorageDTO'

export async function playerAddByGroup(
  newPlayer: PlayerStorageDTO,
  group: string
) {
  try {
    const storedPlayers = await playersGetByGroup(group)
    const playerAlreadyExists = storedPlayers.filter(
      player => player.name === newPlayer.name
    )

    if (playerAlreadyExists.length > 0) {
      throw new AppError(
        `${newPlayer.name} já está adicionado em um time por aqui...`
      )
    }

    const storage = JSON.stringify([...storedPlayers, newPlayer])
    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage)
  } catch (error) {
    throw error
  }
}
