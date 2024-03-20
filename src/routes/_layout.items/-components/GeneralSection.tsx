import { UomCreatableSelect } from '@/components/select/UomCreatableSelect'
import { Packaging } from '@/validators/packaging'
import { Stack } from '@mantine/core'
import { Control } from 'react-hook-form'
import { Textarea } from 'react-hook-form-mantine'

interface GeneralSectionProps {
  control: Control<Packaging>
}

export const GeneralSection = (props: GeneralSectionProps) => {
  const { control } = props
  return (
    <Stack gap="sm">
      <UomCreatableSelect control={control} name="uom" label="Đơn vị tính" />
      <Textarea
        control={control}
        name="notes"
        autosize
        minRows={2}
        radius="md"
        label="Ghi chú"
        placeholder="Ghi chú cho sản phẩm"
      />
    </Stack>
  )
}
