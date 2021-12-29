import styled from '@emotion/styled'

export const P = styled.p`
  font-family: var(--body-font);
`

export const Body1 = styled(P)`
  font-size: calc(1.6 * var(--base-text-size));
  letter-spacing: calc(0.05 * var(--base-text-size));
`

export const Body2 = styled(P)`
  font-size: calc(1.4 * var(--base-text-size));
  letter-spacing: calc(0.025 * var(--base-text-size));
`

export const H1 = styled.h1`
  font-family: var(--header-font);
  font-size: calc(9.6 * var(--base-text-size));
  font-weight: 300;
  letter-spacing: calc(-0.15 * var(--base-text-size));
`

export const H2 = styled.h2`
  font-family: var(--header-font);
  font-size: calc(6 * var(--base-text-size));
  font-weight: 300;
`

export const H3 = styled.h3`
  font-family: var(--header-font);
  font-size: calc(4.8 * var(--base-text-size));
`

export const H4 = styled.h4`
  font-family: var(--header-font);
  font-size: calc(3.4 * var(--base-text-size));
`

export const H5 = styled.h5`
  font-family: var(--header-font);
  font-size: calc(2.4 * var(--base-text-size));
`

export const H6 = styled.h6`
  font-family: var(--header-font);
  font-size: calc(2 * var(--base-text-size));
  font-weight: 500;
`

export const Heading = ({
  variant,
  ...props
}: {
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  [x: string]: any
}) => {
  if (variant === 'h1') {
    return <H1 {...props} />
  }

  if (variant === 'h2') {
    return <H2 {...props} />
  }

  if (variant === 'h3') {
    return <H3 {...props} />
  }

  if (variant === 'h4') {
    return <H4 {...props} />
  }

  if (variant === 'h5') {
    return <H5 {...props} />
  }

  if (variant === 'h6') {
    return <H6 {...props} />
  }

  throw new TypeError(`Cannot rendering heading of variant "${variant}"`)
}

export const Subtitle1 = styled(P)`
  font-size: calc(1.6 * var(--base-text-size));
  letter-spacing: calc(0.15 * var(--base-text-size));
`
export const Subtitle2 = styled(P)`
  font-size: calc(1.4 * var(--base-text-size));
  letter-spacing: calc(0.01 * var(--base-text-size));
  font-weight: 500;
`

export const A = styled.a`
  font-size: calc(1.6 * var(--base-text-size));
  letter-spacing: calc(0.05 * var(--base-text-size));
  text-decoration: none;
  color: inherit;

  &:hover {
    color: var(--primary-color);
    transition: all 0.25s ease-in;
  }
`
