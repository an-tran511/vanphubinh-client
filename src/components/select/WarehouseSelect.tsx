import { Control } from 'react-hook-form'
import debounce from 'debounce-promise'
import { getWarehouses } from '@/apis/warehouse'
import { Warehouse } from '@/validators/warehouse'
import { HookFormCombobox } from './HookFormCombobox'
import { useQueryClient } from '@tanstack/react-query'

interface WarehouseSelectProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>
  name: string
  withAsterisk?: boolean
  label: string
}
export function WarehouseSelect(props: WarehouseSelectProps) {
  const { control, name, label, withAsterisk } = props
  const queryClient = useQueryClient()
  const promiseOptions = (inputValue: string) =>
    queryClient
      .ensureQueryData({
        queryKey: ['warehouses', { page: 1, searchValue: inputValue }],
        queryFn: () => getWarehouses({ searchValue: inputValue }),
      })
      .then((data) => data.data)

  return (
    <HookFormCombobox
      placeholder="Chọn kho tổng..."
      withAsterisk={withAsterisk}
      control={control}
      loadOptions={debounce(promiseOptions, 500)}
      name={name}
      label={label}
      getOptionLabel={(option: Warehouse) => option.name}
      getOptionValue={(option: Warehouse) => option.id}
    />
  )
}
