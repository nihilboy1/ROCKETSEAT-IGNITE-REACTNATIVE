import { Container, Message } from './styles'

interface listEmptyProps {
  message: string
}

export function ListEmpty({ message }: listEmptyProps) {
  return (
    <Container>
      <Message>{message}</Message>
    </Container>
  )
}
