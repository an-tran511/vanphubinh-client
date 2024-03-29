import { Control } from 'react-hook-form'
import debounce from 'debounce-promise'
import { getPartnerOptions } from '@/apis/partner'
import { Partner } from '@/validators/partner'
import { HookFormCombobox } from './HookFormCombobox'
import { useQueryClient } from '@tanstack/react-query'
import { type CreatableComboboxProps } from './Combobox'

interface PartnerSelectProps extends Partial<CreatableComboboxProps> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>
  name: string
  withAsterisk?: boolean
  label: string
}

export function PartnerSelect(props: PartnerSelectProps) {
  const { control, name, label, withAsterisk, classNames, className } = props
  const queryClient = useQueryClient()
  const promiseOptions = (inputValue: string) =>
    queryClient.ensureQueryData({
      queryKey: ['partners', inputValue],
      queryFn: () => getPartnerOptions({ searchValue: inputValue }),
    })

  return (
    <HookFormCombobox
      classNames={classNames}
      className={className}
      placeholder="Chọn đối tác..."
      withAsterisk={withAsterisk}
      control={control}
      loadOptions={debounce(promiseOptions, 500)}
      name={name}
      label={label}
      getOptionLabel={(option: Partner) => option.id + ' - ' + option.name}
      getOptionValue={(option: Partner) => option.id}
    />
  )
}
