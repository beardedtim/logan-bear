import styled from '@emotion/styled'

interface DividerProps {
  padding?: number
  margin?: number
}

const Wrap = styled.hr<DividerProps>`
  width: 98%;
  margin: calc(${({ margin }) => margin} * var(--spacing)) auto;
  padding: calc(var(--spacing) * ${({ padding }) => padding});
  background: var(--secondary-color);
`

export const Divider = ({ padding = 0.05, margin = 0 }: DividerProps) => (
  <Wrap padding={padding} margin={margin} />
)
