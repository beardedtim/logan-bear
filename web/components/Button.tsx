import styled from '@emotion/styled'

interface ButtonProps {}

export const Button = styled.button<ButtonProps>`
  font-family: var(--body-font);
  font-size: calc(1.6 * var(--base-text-size));
  letter-spacing: calc(0.05 * var(--base-text-size));
  padding: calc(2 * var(--spacing)) calc(4 * var(--spacing));
  background: inherit;
  border: none;
  border-radius: 4.5px;
  cursor: pointer;
  color: var(--accent-color);

  &.primary {
    background: var(--primary-color);
  }

  &.secondary {
    background: var(--secondary-color);
  }
`

export const ButtonGroup = styled.div`
  width: 100%;
  padding: calc(4 * var(--spacing));
  display: flex;

  button:not(:last-of-type) {
    margin-right: calc(2 * var(--spacing));
  }
`
