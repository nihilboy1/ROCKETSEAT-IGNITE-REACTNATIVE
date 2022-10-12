import { Button } from '@components/Button'
import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { Input } from '@components/Input'
import { useNavigation } from '@react-navigation/native'
import { Container, Content, Icon } from './styles'

export function NewGroup() {
  const navigation = useNavigation()

  function moveToPlayers() {
    navigation.navigate('players', { group: 'turma 1' })
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
        <Input placeholder="Nome da turma" />
        <Button
          title="Criar"
          style={{ marginTop: 20 }}
          onPress={moveToPlayers}
        />
      </Content>
    </Container>
  )
}
