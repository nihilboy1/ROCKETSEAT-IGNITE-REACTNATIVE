import 'styled-components'

import theme from 'src/theme'

declare module 'styled-components' {
  type ThemeType = typeof theme // ThemeType é um tipo baseado no conteudo do objeto theme

  export interface DefaultTheme extends ThemeType {} // aqui eu faço o tema padrão do styledcomponents extender o tipo que eu criei baseado no tema
}
