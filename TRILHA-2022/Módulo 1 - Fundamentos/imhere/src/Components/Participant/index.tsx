import { Text, TouchableOpacity, View } from 'react-native'
import { S } from './styles'

interface ParticipantProps {
  name: string
  onRemove: () => void
}

export function Participant({ name, onRemove }: ParticipantProps) {
  return (
    <View style={S.container}>
      <Text style={S.name}>{name}</Text>
      <TouchableOpacity style={S.button} onPress={onRemove}>
        <Text style={S.buttonText}>-</Text>
      </TouchableOpacity>
    </View>
  )
}
