import { Control } from 'react-hook-form'
import debounce from 'debounce-promise'
import { HookReactSelect } from './\bHookReactSelect'
import { getWarehouseOptions } from '@/apis/warehouse'
import { Warehouse } from '@/validators/warehouse'

interface WarehouseSelectProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>
  name: string
  withAsterisk?: boolean
  label: string
}
export function WarehouseSelect(props: WarehouseSelectProps) {
  const { control, name, label, withAsterisk } = props
  const promiseOptions = (inputValue: string) =>
    new Promise<Warehouse[]>((resolve) => {
      resolve(getWarehouseOptions({ searchValue: inputValue }))
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
