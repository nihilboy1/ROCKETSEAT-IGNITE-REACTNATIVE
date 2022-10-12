import { Button } from '@components/Button'
import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { Input } from '@components/Input'
import { useNavigation } from '@react-navigation/native'
import { groupCreate } from '@storage/group/groupCreate'
import { AppError } from '@utils/AppError'
import { useState } from 'react'
import { Alert } from 'react-native'
import { Container, Content, Icon } from './styles'

export function NewGroup() {
  const navigation = useNavigation()
  const [groupName, setGroupName] = useState('')

  async function moveToPlayers() {
    try {
      if(groupName.trim().length < 1){
        return Alert.alert('Novo Grupo', "O nome da turma não pode ser vazio!")
      }

      await groupCreate(groupName)
      navigation.navigate('players', { group: groupName })
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Novo Grupo', error.message)
      } else {
        Alert.alert('Novo Grupo', 'Não foi possivel criar um novo grupo')
        console.log(error)
      }
    }
  }

  return (
    <Container>
      <Header showBackButton />
      <Content>
        <Icon />
        <Highlight
          title="Nova turma"
          subtitle="Crie uma turma e adicione pessoas"
        />
        <Input placeholder="Nome da turma" onChangeText={setGroupName} />
        <Button
          title="Criar"
          style={{ marginTop: 20 }}
          onPress={moveToPlayers}
        />
      </Content>
    </Container>
  )
}
