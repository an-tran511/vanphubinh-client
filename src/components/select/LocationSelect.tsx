import { Control } from 'react-hook-form'
import debounce from 'debounce-promise'
import { HookReactSelect } from './\bHookReactSelect'
import { getLocationOptions } from '@/apis/location'
import { Location } from '@/validators/location'

interface LocationSelectProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>
  name: string
  withAsterisk?: boolean
  label: string
}
export function LocationSelect(props: LocationSelectProps) {
  const { control, name, label, withAsterisk } = props
  const promiseOptions = (inputValue: string) =>
    new Promise<Location[]>((resolve) => {
      resolve(getLocationOptions({ searchValue: inputValue }))
    })

  return (
    <HookReactSelect
      cacheOptions
      withAsterisk={withAsterisk}
      control={control}
      loadOptions={debounce(promiseOptions, 500)}
      defaultOptions
      name={name}
      label={label}
      getOptionLabel={(option) => option.computedName}
      getOptionValue={(option) => option.id}
    />
  )
}
