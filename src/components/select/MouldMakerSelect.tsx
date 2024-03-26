import { Control } from 'react-hook-form'
import debounce from 'debounce-promise'
import { getMouldMakersOptions } from '@/apis/partner'
import { Partner } from '@/validators/partner'
import { HookFormCombobox } from './HookFormCombobox'
import { useQueryClient } from '@tanstack/react-query'

interface PartnerSelectProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>
  name: string
  withAsterisk?: boolean
  label: string
}
export function MouldMakerSelect(props: PartnerSelectProps) {
  const { control, name, label, withAsterisk } = props
  const queryClient = useQueryClient()
  const promiseOptions = (inputValue: string) =>
    queryClient.ensureQueryData({
      queryKey: ['mould-makers', inputValue],
      queryFn: () => getMouldMakersOptions({ searchValue: inputValue }),
    })
  return (
    <HookFormCombobox
      placeholder="Chọn nhà trục..."
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
