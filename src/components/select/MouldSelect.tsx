import { Control } from 'react-hook-form'
import debounce from 'debounce-promise'
import { getMouldOptions } from '@/apis/mould'
import { Mould } from '@/validators/mould'
import { HookFormCombobox } from './HookFormCombobox'
import { useQueryClient } from '@tanstack/react-query'

interface MouldSelectProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>
  name: string
  withAsterisk?: boolean
  label?: string
}
export function MouldSelect(props: MouldSelectProps) {
  const { control, name, label, withAsterisk } = props
  const queryClient = useQueryClient()
  const promiseOptions = (inputValue: string) =>
    queryClient.ensureQueryData({
      queryKey: ['moulds', inputValue],
      queryFn: () => getMouldOptions({ searchValue: inputValue }),
    })

  return (
    <HookFormCombobox
      placeholder="Chọn trục..."
      withAsterisk={withAsterisk}
      control={control}
      loadOptions={debounce(promiseOptions, 500)}
      name={name}
      label={label}
      getOptionLabel={(option: Mould) => option.id + ' - ' + option.name}
      getOptionValue={(option: Mould) => option.id}
    />
  )
}
