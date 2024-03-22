import { Control } from 'react-hook-form'
import debounce from 'debounce-promise'
import { HookReactSelect } from './\bHookReactSelect'
import { getMouldOptions } from '@/apis/mould'
import { Mould } from '@/validators/mould'

interface MouldSelectProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>
  name: string
  withAsterisk?: boolean
  label?: string
}
export function MouldSelect(props: MouldSelectProps) {
  const { control, name, label, withAsterisk } = props
  const promiseOptions = (inputValue: string) =>
    new Promise<Mould[]>((resolve) => {
      resolve(getMouldOptions({ searchValue: inputValue }))
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
