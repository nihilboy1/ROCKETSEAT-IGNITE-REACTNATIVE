import { Button } from '@components/Button'
import { ButtonIcon } from '@components/ButtonIcon'
import { Filter } from '@components/Filter'
import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { Input } from '@components/Input'
import { ListEmpty } from '@components/ListEmpty'
import { PlayerCard } from '@components/PlayerCard'
import { useRoute } from '@react-navigation/native'
import { useState } from 'react'
import { FlatList } from 'react-native'
import { Container, Form, HeaderList, PlayerAmount } from './styles'


type routeParams = {
  group: string
}

export function Players() {
  const [team, setTeam] = useState('time a')
  const [players, setPlayers] = useState([
    'Sam',
    'Myke',
    'Nori',
    'Bob',
    'Dog',
    'Blake',
    'Gog',
    'Floq'
  ])

  const route = useRoute()
  const { group } = route.params as routeParams

  return (
    <Container>
      <Header showBackButton />
      <Highlight
        title={group}
        subtitle="Adicione a galera e separe os times"
      />
      <Form>
        <Input placeholder="Nome da pessoa" autoCorrect={false} />
        <ButtonIcon icon="add" />
      </Form>
      <HeaderList>
        <FlatList
          data={['time a', 'time b']}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />
        <PlayerAmount>{players.length}</PlayerAmount>
      </HeaderList>
      <FlatList
        data={players}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <PlayerCard name={item} onRemove={() => {}} />
        )}
        ListEmptyComponent={() => (
          <ListEmpty message="Não há pessoas nesse time :/" />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          { paddingBottom: 100 },
          players.length === 0 && { flex: 1 }
        ]}
      />

      <Button title="Remover Turma" type="secondary" />
    </Container>
  )
}
