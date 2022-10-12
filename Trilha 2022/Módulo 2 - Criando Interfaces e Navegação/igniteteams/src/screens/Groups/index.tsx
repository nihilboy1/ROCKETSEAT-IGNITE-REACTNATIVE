import { Button } from '@components/Button'
import { GroupCard } from '@components/GroupCard'
import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { ListEmpty } from '@components/ListEmpty'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { groupGetAll } from '@storage/group/groupGetAll'
import { useCallback, useState } from 'react'
import { FlatList } from 'react-native'
import { Container } from './styles'

export function Groups() {
  const [groups, setGroups] = useState<string[]>(['Rocket Team', 'RPG Group'])

  const { navigate } = useNavigation()

  function moveToNewGroup() {
    navigate('new')
  }

  async function fetchGroups() {
    try {
      const data = await groupGetAll()
      setGroups(data)
    } catch (error) {
      console.log(error)
    }
  }

  function handleOpenGroup(group: string) {
    navigate('players', { group })
  }

  // dispara a função quando essa tela for o foco
  useFocusEffect(
    useCallback(() => {
      fetchGroups()
    }, [])
  )

  return (
    <Container>
      <Header />
      <Highlight title="Turmas" subtitle="Jogue com a sua turma!" />
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={() => (
          <ListEmpty message="Nenhuma turma cadastrada ainda..." />
        )}
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <GroupCard
            onPress={() => {
              handleOpenGroup(item)
            }}
            title={item}
          />
        )}
      />
      <Button title="Criar nova turma" onPress={moveToNewGroup} />
    </Container>
  )
}
