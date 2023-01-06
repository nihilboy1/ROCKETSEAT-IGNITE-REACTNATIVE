import { useState } from 'react'
import {
  Alert,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import { Participant } from '../../Components/Participant'
import { S } from './styles'

export function Home() {
  const [participants, setParticipants] = useState<string[]>([])
  const [participantName, setParticipantName] = useState('')

  function handleParticipantAdd() {
    if (participants.includes(participantName)) {
      return Alert.alert(
        'Participante Duplicado',
        'Alguém na lista de participantes ja possui esse nome :/'
      )
    }
    setParticipants(oldState => [...oldState, participantName])
    setParticipantName("")
  }
  function handleParticipantRemove(name: string) {
    return Alert.alert(
      'Remover',
      `Deseja realmente remover o participante ${name}?`,
      [
        {
          text: 'Sim',
          onPress: () => setParticipants(oldsState => oldsState.filter(participant => participant !== name))
        },
        {
          text: 'Não',
          style: 'cancel'
        }
      ]
    )
  }

  return (
    <View style={S.container}>
      <Text style={S.eventName}>Nome do evento</Text>
      <Text style={S.eventDate}>Sexta, 4 de Novembro de 2022</Text>
      <View style={S.form}>
        <TextInput
          style={S.input}
          placeholder="Nome do participante"
          placeholderTextColor="#6B6B6B"
          onChangeText={text => setParticipantName(text) }
          value={participantName}
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
            onRemove={() => handleParticipantRemove(item)}
            key={item}
          />
        )}
      />
    </View>
  )
}
