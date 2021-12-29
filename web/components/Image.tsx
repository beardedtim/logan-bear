import NImage from 'next/image'
import styled from '@emotion/styled'

export const Image = ({
  src,
  alt,
  ...props
}: {
  src: string
  alt: string
  [x: string]: any
}) => <NImage src={src} alt={alt} {...props} title={alt} aria-label={alt} />

interface WrapProps {
  size: number
  radius?: number
  round?: boolean
  background?: string
}

const Wrap = styled.div`
  width: ${({ size }: WrapProps) => size}px;
  height: ${({ size }: WrapProps) => size}px;
  border-radius: ${({ radius, round }: WrapProps) =>
    round ? `50%;` : radius ? `${radius}px` : 'inherit;'};
  background: ${({ background }) => background ?? 'var(--white)'};
  padding: var(--spacing);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Avatar = ({
  src,
  alt,
  size = 64,
  ...props
}: {
  src: any
  alt: string
  size?: number
  [x: string]: any
}) => (
  <Wrap size={size} round className="img-avatar">
    <Image src={src} alt={alt} width={size} height={size} {...props} />
  </Wrap>
)
