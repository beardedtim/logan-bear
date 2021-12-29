import styled from '@emotion/styled'

interface Props {
  [x: string]: any
}

const Wrap = styled.div`
  width: 100%;
  min-height: 100%;
  background: var(--black);
  color: var(--white);
`

export const Page = ({ children, ...props }: Props) => (
  <Wrap {...props}>{children}</Wrap>
)
