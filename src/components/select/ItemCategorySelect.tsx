import { Control } from 'react-hook-form'
import debounce from 'debounce-promise'
import { getItemCategories } from '@/apis/itemCategory'
import { ItemCategory } from '@/validators/itemCategory'
import { HookFormCombobox } from './HookFormCombobox'
import { useQueryClient } from '@tanstack/react-query'

interface ItemCategorySelectProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>
  name: string
  withAsterisk?: boolean
  label: string
}
export function ItemCategorySelect(props: ItemCategorySelectProps) {
  const { control, name, label, withAsterisk } = props
  const queryClient = useQueryClient()
  const promiseOptions = (inputValue: string) =>
    queryClient
      .ensureQueryData({
        queryKey: ['item-categories', { page: 1, searchValue: inputValue }],
        queryFn: () => getItemCategories({ searchValue: inputValue }),
      })
      .then((data) => data.data)

  return (
    <HookFormCombobox
      placeholder="Chọn nhóm hàng hoá..."
      withAsterisk={withAsterisk}
      control={control}
      loadOptions={debounce(promiseOptions, 500)}
      name={name}
      label={label}
      getOptionLabel={(option: ItemCategory) => option.computedName}
      getOptionValue={(option: ItemCategory) => option.id}
    />
  )
}
