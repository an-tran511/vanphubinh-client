import { Control } from 'react-hook-form'
import debounce from 'debounce-promise'
import { getMoulds } from '@/apis/mould'
import { Mould } from '@/validators/mould'
import { HookFormCombobox } from './HookFormCombobox'
import { useQueryClient } from '@tanstack/react-query'
import { CreatableComboboxProps } from './Combobox'

interface MouldSelectProps extends Partial<CreatableComboboxProps> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>
  name: string
}
export function MouldSelect(props: MouldSelectProps) {
  const {
    control,
    name,
    label,
    withAsterisk,
    className,
    classNames,
    error,
    rightSection,
  } = props
  const queryClient = useQueryClient()
  const promiseOptions = (inputValue: string) =>
    queryClient
      .ensureQueryData({
        queryKey: ['moulds', { page: 1, searchValue: inputValue }],
        queryFn: () => getMoulds({ searchValue: inputValue }),
      })
      .then((data) => data.data)

  return (
    <HookFormCombobox
      placeholder="Chọn trục..."
      withAsterisk={withAsterisk}
      control={control}
      loadOptions={debounce(promiseOptions, 500)}
      name={name}
      label={label}
      getOptionLabel={(option: Mould) => option.name}
      getOptionValue={(option: Mould) => option.id}
      className={className}
      classNames={classNames}
      error={error}
      rightSection={rightSection}
    />
  )
}
