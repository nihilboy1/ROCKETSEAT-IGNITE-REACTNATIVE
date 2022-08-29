import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Participant } from '../../Components/Participant'
import { S } from './styles'

export function Home() {
  const participants = [
    'Rodrigo',
    'Jorge',
    'Abreu',
    'Marcia',
    'Ana',
    'Isa',
    'Jacke',
    'Myke',
    'Lina',
    'Bob',
    'Brown',
    'Clark',
    'Billie'
  ]

  function handleParticipantAdd() {}
  function handleParticipantRemove() {}

  return (
    <View style={S.container}>
      <Text style={S.eventName}>Nome do evento</Text>
      <Text style={S.eventDate}>Sexta, 4 de Novembro de 2022</Text>
      <View style={S.form}>
        <TextInput
          style={S.input}
          placeholder="Nome do participante"
          placeholderTextColor="#6B6B6B"
        />
        <TouchableOpacity style={S.button} onPress={handleParticipantAdd}>
          <Text style={S.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={participants}
        keyExtractor={item => item}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={S.listEmptyText}>
            Ninguém chegou ao evento ainda? Adicione participantes à sua lista
            de presença {':)'}
          </Text>
        )}
        renderItem={({ item }) => (
          <Participant
            name={item}
            onRemove={handleParticipantRemove}
            key={item}
          />
        )}
      />
    </View>
  )
}
