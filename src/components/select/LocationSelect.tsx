import { Control } from 'react-hook-form'
import debounce from 'debounce-promise'
import { getLocations } from '@/apis/location'
import { Location } from '@/validators/location'
import { useQueryClient } from '@tanstack/react-query'
import { HookFormCombobox } from './HookFormCombobox'
import { CreatableComboboxProps } from './Combobox'

interface LocationSelectProps extends Partial<CreatableComboboxProps> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>
  name: string
}
export function LocationSelect(props: LocationSelectProps) {
  const { control, name, label, withAsterisk, classNames, className } = props
  const queryClient = useQueryClient()
  const promiseOptions = (inputValue: string) =>
    queryClient
      .ensureQueryData({
        queryKey: ['locations', { page: 1, searchValue: inputValue }],
        queryFn: () => getLocations({ searchValue: inputValue }),
      })
      .then((data) => data.data)

  return (
    <HookFormCombobox
      classNames={classNames}
      className={className}
      placeholder="Chọn vị trí..."
      withAsterisk={withAsterisk}
      control={control}
      loadOptions={debounce(promiseOptions, 500)}
      name={name}
      label={label}
      getOptionLabel={(option: Location) => option.computedName}
      getOptionValue={(option: Location) => option.id}
    />
  )
}
