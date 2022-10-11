import styled, { css } from 'styled-components/native'

export type ButtonTypeStyleProps = 'primary' | 'secondary'

type containerProps = {
  type: ButtonTypeStyleProps
}

export const Container = styled.TouchableOpacity<containerProps>`
  flex: 1;
  min-height: 56px;
  max-height: 56px;

  background-color: ${({ theme, type }) =>
    type === 'primary' ? theme.colors.green_700 : theme.colors.red_dark};

  border-radius: 6px;

  justify-content: center;
  align-items: center;
`

export const Title = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.font_size.md}px;
    color: ${theme.colors.white};
    font-family: ${theme.font_family.bold};
  `}
`
