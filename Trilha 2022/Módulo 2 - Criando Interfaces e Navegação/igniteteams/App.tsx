import { Loading } from '@components/Loading'
import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts
} from '@expo-google-fonts/roboto'
import { Groups } from '@screens/Groups'
import { StatusBar } from 'react-native'
import { ThemeProvider } from 'styled-components'
import theme from './src/theme'

export default function App() {
  const [fontsHasBeenLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })
  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      {fontsHasBeenLoaded ? <Groups /> : <Loading />}
    </ThemeProvider>
  )
}
