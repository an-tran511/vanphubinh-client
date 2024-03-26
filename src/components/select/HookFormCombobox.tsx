import {
  type UseControllerProps,
  useController,
  type FieldValues,
} from 'react-hook-form'
import { CreatableCombobox, CreatableComboboxProps } from './Combobox'

export type CreatableSelectProps<T extends FieldValues> =
  UseControllerProps<T> & CreatableComboboxProps

export function HookFormCombobox<T extends FieldValues>({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  label,
  withAsterisk,
  onChange,
  ...props
}: CreatableSelectProps<T>) {
  const {
    field: { value, onChange: fieldOnChange, ...field },
    fieldState: { error },
  } = useController<T>({
    name,
    control,
    defaultValue,
    rules,
    shouldUnregister,
  })
  console.log('HookFormCombobox', error)
  return (
    <CreatableCombobox
      value={value}
      defaultValue={defaultValue}
      label={label}
      error={error?.message}
      withAsterisk={withAsterisk}
      onChange={(value) => {
        fieldOnChange(value)
        onChange?.(value)
      }}
      {...field}
      {...props}
    />
  )
}
