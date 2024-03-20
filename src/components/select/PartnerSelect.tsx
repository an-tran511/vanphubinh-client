import { Control } from 'react-hook-form'
import debounce from 'debounce-promise'
import { HookReactSelect } from './\bHookReactSelect'
import { getPartnerOptions } from '@/apis/partner'
import { Partner } from '@/validators/partner'

interface PartnerSelectProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>
  name: string
  withAsterisk?: boolean
  label: string
}
export function PartnerSelect(props: PartnerSelectProps) {
  const { control, name, label, withAsterisk } = props
  const promiseOptions = (inputValue: string) =>
    new Promise<Partner[]>((resolve) => {
      resolve(getPartnerOptions({ searchValue: inputValue }))
    })

  return (
    <HookReactSelect
      withAsterisk={withAsterisk}
      cacheOptions
      control={control}
      loadOptions={debounce(promiseOptions, 500)}
      defaultOptions
      name={name}
      label={label}
      getOptionLabel={(option) => option.id + '-' + option.name}
      getOptionValue={(option) => option.id}
    />
  )
}
