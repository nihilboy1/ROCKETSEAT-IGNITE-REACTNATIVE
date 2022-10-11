import { TouchableOpacityProps } from 'react-native'
import { Container, Icon, Title } from './styles'

type groupCardProps = TouchableOpacityProps & {
  title: string
}

export function GroupCard({ title, ...rest }: groupCardProps) {
  return (
    <Container {...rest}>
      <Icon />
      <Title>{title}</Title>
    </Container>
  )
}
