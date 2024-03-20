import { Control } from 'react-hook-form'
import debounce from 'debounce-promise'
import { HookReactSelect } from './\bHookReactSelect'
import { getUomOptions } from '@/apis/uom'
import { Uom } from '@/validators/uom'

interface UomCreatableSelectProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>
  name: string
  withAsterisk?: boolean
  label: string
}
export function UomCreatableSelect(props: UomCreatableSelectProps) {
  const { control, name, label, withAsterisk } = props
  const promiseOptions = (inputValue: string) =>
    new Promise<Uom[]>((resolve) => {
      resolve(getUomOptions({ searchValue: inputValue }))
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
      getOptionLabel={(option) => option.name}
      getOptionValue={(option) => option.id}
    />
  )
}
