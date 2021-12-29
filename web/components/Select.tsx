import styled from '@emotion/styled'
import { LabelBase, InputGroup } from './Input'

const SelectEl = styled.select`
  padding: calc(1.25 * var(--spacing));
`

const Option = styled.option`
  padding: calc(1.25 * var(--spacing));
`

const OptionGroup = styled.optgroup`
  padding: calc(1.25 * var(--spacing));
`

interface OptProps {
  id: string
  name?: string
}

interface Props {
  items?: OptProps[]
  groups?: {
    items: OptProps[]
    label: string
  }[]
  onUpdate?: (optId: string) => void
  defaultValue?: string
  label: string
  id: string
}

export const Select = ({
  items = [],
  groups,
  onUpdate,
  defaultValue,
  label,
  id,
}: Props) => (
  <InputGroup className="input-group">
    <LabelBase htmlFor={id} id={`${id}-label`}>
      {label}
    </LabelBase>
    <SelectEl
      defaultValue={defaultValue}
      id={id}
      onChange={(e) => onUpdate && onUpdate(e.target.value)}
    >
      {groups
        ? groups.map((group) => (
            <OptionGroup label={group.label} key={group.label}>
              {group.items.map((opt) => (
                <Option value={opt.id} key={opt.id}>
                  {opt.name || opt.id}
                </Option>
              ))}
            </OptionGroup>
          ))
        : items!.map((opt) => (
            <Option value={opt.id} key={opt.id}>
              {opt.name || opt.id}
            </Option>
          ))}
    </SelectEl>
  </InputGroup>
)

export default Select
