import { Heading } from '../components/Typography'
import { Avatar } from '../components/Image'

import styled from '@emotion/styled'
import Link from 'next/link'

import Logo from '../public/images/logo.png'
import { Divider } from './Divider'

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5rem;
  .headline {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: calc(2 * var(--spacing));

    .img-avatar {
      margin-left: calc(4 * var(--spacing));
    }
  }
`

interface Props {
  title?: string
}

export const SiteHeader = ({ title }: Props) => (
  <>
    <Header>
      <div>{title && <Heading variant="h1">{title}</Heading>}</div>
      <div className="headline">
        <Heading variant="h2">Logan Bear</Heading>
        <Link href="/">
          <a title="Let's Go Home" aria-label="Let's Go Home">
            <Avatar src={Logo} alt="Logan Bear" />
          </a>
        </Link>
      </div>
    </Header>
    <Divider />
  </>
)

export default SiteHeader
