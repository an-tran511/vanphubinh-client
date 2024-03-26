import { Control } from 'react-hook-form'
import debounce from 'debounce-promise'
import { getLocationOptions } from '@/apis/location'
import { Location } from '@/validators/location'
import { useQueryClient } from '@tanstack/react-query'
import { HookFormCombobox } from './HookFormCombobox'

interface LocationSelectProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>
  name: string
  withAsterisk?: boolean
  label: string
}
export function LocationSelect(props: LocationSelectProps) {
  const { control, name, label, withAsterisk } = props
  const queryClient = useQueryClient()
  const promiseOptions = (inputValue: string) =>
    queryClient.ensureQueryData({
      queryKey: ['locations', inputValue],
      queryFn: () => getLocationOptions({ searchValue: inputValue }),
    })

  return (
    <HookFormCombobox
      placeholder="Chọn vị trí..."
      withAsterisk={withAsterisk}
      control={control}
      loadOptions={debounce(promiseOptions, 500)}
      name={name}
      label={label}
      getOptionLabel={(option: Location) => option.name}
      getOptionValue={(option: Location) => option.id}
    />
  )
}
