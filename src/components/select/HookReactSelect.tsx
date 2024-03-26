import {
  type UseControllerProps,
  useController,
  type FieldValues,
} from 'react-hook-form'
import AsyncSelect, { AsyncProps } from 'react-select/async'
import { StylesConfig } from 'react-select'
import { Input, Paper } from '@mantine/core'

export type CreatableSelectProps<T extends FieldValues> =
  UseControllerProps<T> &
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Omit<AsyncProps<any, any, any>, 'value' | 'defaultValue'> & {
      label: string
      withAsterisk?: boolean
    }

export function HookReactSelect<T extends FieldValues>({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  label,
  withAsterisk,
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
  const stylesBase: StylesConfig = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: (base: any) => ({
      ...base,
      fontSize: '0.88rem',
      minHeight: '34px',
      maxHeight: '34px',
      margin: '0',
      padding: '0',
      borderRadius: '0.5rem',
      border: error?.message ? '1px solid red' : '1px solid #ced4da',
      boxShadow: 'none',
      '&:hover': {
        border: '1px solid #2b3882',
      },
    }),

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    menuPortal: (base: any) => ({
      ...base,
      zIndex: 9999,
    }),

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    menu: (base: any) => ({
      ...base,
      fontSize: '0.88rem',
      padding: '0',
    }),
    placeholder: (base) => ({
      ...base,
      textWrap: 'nowrap',
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    option: (base: any, { isDisabled, isFocused, isSelected }) => ({
      ...base,
      fontSize: '0.88rem',
      backgroundColor: isDisabled
        ? undefined
        : isSelected
          ? '#f0f1fa'
          : isFocused
            ? '#2b3882'
            : undefined,
      color: isDisabled
        ? undefined
        : isSelected
          ? 'black'
          : isFocused
            ? 'white'
            : undefined,
    }),
  }
  return (
    <Paper>
      <Input.Wrapper
        label={label}
        error={error?.message}
        withAsterisk={withAsterisk}
      >
        <AsyncSelect
          loadingMessage={() => 'Đang tìm...'}
          noOptionsMessage={() => 'Không có kết quả'}
          menuPortalTarget={document.body}
          styles={stylesBase}
          value={value}
          placeholder="Chọn hoặc nhập..."
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onChange={(e: any) => {
            if (e?.id === value?.id) {
              fieldOnChange(null)
            } else {
              fieldOnChange(e)
            }
          }}
          className=".m-4081bf90"
          theme={(theme) => ({
            ...theme,
            border: '1px solid red',
            colors: {
              ...theme.colors,
              primary50: '#2b3882',
              danger: 'red',
            },
          })}
          {...field}
          {...props}
        />
      </Input.Wrapper>
    </Paper>
  )
}
