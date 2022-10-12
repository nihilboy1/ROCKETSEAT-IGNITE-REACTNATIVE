import { NavigationContainer } from '@react-navigation/native'
import { AppRoutes } from './app.routes'

export function Routes() {
  return (
    // esse container de navegação compartilha entre todas as telas a função de navigation
    <NavigationContainer>
      <AppRoutes />
    </NavigationContainer>
  )
}
