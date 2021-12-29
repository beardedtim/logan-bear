import styled from '@emotion/styled'
import { useState } from 'react'

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
`

export const InputBase = styled.input`
  padding: var(--spacing);
  font-family: var(--body-font);
  border-radius: 4.5px;
  border: none;
`

export const LabelBase = styled.label`
  font-family: var(--header-font);
  font-size: 1.25rem;
  margin-bottom: var(--spacing);
`

export const TextAreaBase = styled.textarea`
  padding: var(--spacing);
  font-family: var(--body-font);
  border-radius: 4.5px;
  border: none;
`

interface TextAreaProps {
  id?: string
  name?: string
  minRows?: number
  defaultValue?: string
}

export const TextArea = ({
  id,
  name,
  minRows,
  defaultValue,
  ...rest
}: TextAreaProps) => (
  <TextAreaBase
    rows={minRows}
    {...rest}
    id={id}
    name={name}
    defaultValue={defaultValue}
  />
)

interface InputProps {
  variant?:
    | 'text'
    | 'email'
    | 'password'
    | 'number'
    | 'range'
    | 'datetime-local'
    | 'date'
    | 'time'
    | 'textarea'
  label: string
  id: string
  placeholder?: string
  name?: string
  defaultValue?: any
  min?: string | number
  max?: string | number
  required?: boolean
  minRows?: number
}

export const Input = ({
  variant,
  label,
  id,
  defaultValue,
  ...rest
}: InputProps) => {
  return (
    <InputGroup className="input-group">
      <LabelBase htmlFor={id} id={`${id}-label`}>
        {label}
      </LabelBase>
      {variant === 'textarea' ? (
        <TextArea
          id={id}
          name={rest.name}
          defaultValue={defaultValue}
          {...rest}
        />
      ) : (
        <InputBase
          type={variant ?? 'text'}
          {...rest}
          id={id}
          defaultValue={defaultValue}
        />
      )}
    </InputGroup>
  )
}
