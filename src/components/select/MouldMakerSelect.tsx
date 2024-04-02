import { Control } from 'react-hook-form'
import debounce from 'debounce-promise'
import { getMouldMakers } from '@/apis/partner'
import { Partner } from '@/validators/partner'
import { HookFormCombobox } from './HookFormCombobox'
import { useQueryClient } from '@tanstack/react-query'
import { CreatableComboboxProps } from './Combobox'

interface PartnerSelectProps extends Partial<CreatableComboboxProps> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>
  name: string
  withAsterisk?: boolean
  label?: string
}
export function MouldMakerSelect(props: PartnerSelectProps) {
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
        queryKey: ['mould-makers', { page: 1, searchValue: inputValue }],
        queryFn: () => getMouldMakers({ searchValue: inputValue }),
      })
      .then((data) => data.data)

  return (
    <HookFormCombobox
      className={className}
      classNames={classNames}
      placeholder="Chọn nhà trục..."
      withAsterisk={withAsterisk}
      control={control}
      loadOptions={debounce(promiseOptions, 500)}
      name={name}
      error={error}
      label={label}
      getOptionLabel={(option: Partner) => option.id + ' - ' + option.name}
      getOptionValue={(option: Partner) => option.id}
      rightSection={rightSection}
    />
  )
}
