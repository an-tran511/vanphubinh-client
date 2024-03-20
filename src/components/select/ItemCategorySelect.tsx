import { Control } from 'react-hook-form'
import debounce from 'debounce-promise'
import { HookReactSelect } from './\bHookReactSelect'
import { getItemCategoryOptions } from '@/apis/itemCategory'
import { ItemCategory } from '@/validators/itemCategory'

interface ItemCategorySelectProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>
  name: string
  withAsterisk?: boolean
  label: string
}
export function ItemCategorySelect(props: ItemCategorySelectProps) {
  const { control, name, label } = props
  const promiseOptions = (inputValue: string) =>
    new Promise<ItemCategory[]>((resolve) => {
      resolve(getItemCategoryOptions({ searchValue: inputValue }))
    })

  return (
    <HookReactSelect
      cacheOptions
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
