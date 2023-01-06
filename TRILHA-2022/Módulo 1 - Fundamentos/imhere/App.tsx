import { StatusBar } from 'react-native'
import { Home } from './src/screens/Home/Index'

export default function App() {
  return (
    <>
      <Home />
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
    </>
  )
}
