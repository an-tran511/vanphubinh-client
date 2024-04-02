import { Control } from 'react-hook-form'
import debounce from 'debounce-promise'
import { getUoms } from '@/apis/uom'
import { Uom } from '@/validators/uom'
import { useQueryClient } from '@tanstack/react-query'
import { HookFormCombobox } from './HookFormCombobox'

interface UomSelectProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>
  name: string
  withAsterisk?: boolean
  label: string
}
export function UomSelect(props: UomSelectProps) {
  const { control, name, label, withAsterisk } = props
  const queryClient = useQueryClient()
  const promiseOptions = (inputValue: string) =>
    queryClient
      .ensureQueryData({
        queryKey: ['uoms', { page: 1, searchValue: inputValue }],
        queryFn: () => getUoms({ searchValue: inputValue }),
      })
      .then((data) => data.data)

  return (
    <HookFormCombobox
      placeholder="Chọn đơn vị..."
      withAsterisk={withAsterisk}
      control={control}
      loadOptions={debounce(promiseOptions, 500)}
      name={name}
      label={label}
      getOptionLabel={(option: Uom) => option.name}
      getOptionValue={(option: Uom) => option.id}
    />
  )
}
