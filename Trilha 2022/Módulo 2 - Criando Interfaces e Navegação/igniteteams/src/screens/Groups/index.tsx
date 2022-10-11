import { GroupCard } from '@components/GroupCard'
import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { ListEmpty } from '@components/ListEmpty'
import { useState } from 'react'
import { FlatList } from 'react-native'
import { Container } from './styles'
export function Groups() {
  const [groups, setGroups] = useState<string[]>(['Rocket Team', 'RPG Group'])
  return (
    <Container>
      <Header />
      <Highlight title="Turmas" subtitle="Jogue com a sua turma!" />
      <FlatList
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={() => (
          <ListEmpty message="Nenhuma turma cadastrada ainda..." />
        )}
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => <GroupCard title={item} />}
      />
    </Container>
  )
}
