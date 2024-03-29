import { Control } from 'react-hook-form'
import debounce from 'debounce-promise'
import { HookFormCombobox } from './HookFormCombobox'
import { useQueryClient } from '@tanstack/react-query'
import { CreatableComboboxProps } from './Combobox'
import { getPackagingOptions } from '@/apis/packaging'
import { Packaging } from '@/validators/packaging'

interface PackagingSelectProps extends Partial<CreatableComboboxProps> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>
  name: string
}
export function PackagingSelect(props: PackagingSelectProps) {
  const { control, name, label, withAsterisk, className, classNames } = props
  const queryClient = useQueryClient()
  const promiseOptions = (inputValue: string) =>
    queryClient.ensureQueryData({
      queryKey: ['packagings', inputValue],
      queryFn: () => getPackagingOptions({ searchValue: inputValue }),
    })

  return (
    <HookFormCombobox
      placeholder="Chọn bao bì..."
      withAsterisk={withAsterisk}
      control={control}
      loadOptions={debounce(promiseOptions, 500)}
      name={name}
      label={label}
      className={className}
      classNames={classNames}
      getOptionLabel={(option: Packaging) => option.name}
      getOptionValue={(option: Packaging) => option.id}
    />
  )
}
