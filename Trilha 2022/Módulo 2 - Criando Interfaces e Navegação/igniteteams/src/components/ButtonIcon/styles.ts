import { MaterialIcons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components'

export type ButtonIconStyleProps = 'primary' | 'secondary'

type Props = {
  type: ButtonIconStyleProps
}

export const Container = styled(TouchableOpacity)`
  width: 56px;
  height: 56px;
  margin-right: 16px;
  justify-content: center;
  align-items: center;
`

export const Icon = styled(MaterialIcons).attrs<Props>(({ theme, type }) => ({
  size: 24,
  color: type === 'primary' ? theme.colors.green_700 : theme.colors.red
}))``
