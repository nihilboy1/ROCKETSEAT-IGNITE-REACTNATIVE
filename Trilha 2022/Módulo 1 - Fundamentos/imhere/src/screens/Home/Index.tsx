import { Text, TextInput, View } from 'react-native'
import { S } from './styles'

export function Home() {
  return (
    <View style={S.container}>
      <Text style={S.eventName}>Nome do evento</Text>
      <Text style={S.eventDate}>Sexta, 4 de Novembro de 2022</Text>
      <TextInput style={S.input} placeholder="Nome do participante" placeholderTextColor="#6B6B6B"/>
    </View>
  )
}
