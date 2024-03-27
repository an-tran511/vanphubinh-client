import { ItemCategorySelect } from '@/components/select/ItemCategorySelect'
import { PartnerSelect } from '@/components/select/PartnerSelect'
import { UomSelect } from '@/components/select/UomSelect'
import { Packaging } from '@/validators/packaging'
import { SimpleGrid, Stack } from '@mantine/core'
import { Control } from 'react-hook-form'
import { TextInput, Textarea } from 'react-hook-form-mantine'

interface GeneralSectionProps {
  control: Control<Packaging>
}

export const GeneralSection = (props: GeneralSectionProps) => {
  const { control } = props
  return (
    <Stack gap="sm">
      <SimpleGrid cols={{ base: 1, md: 4 }} verticalSpacing="sm" spacing="sm">
        <UomSelect
          control={control}
          name="uom"
          label="Đơn vị tính"
          withAsterisk
        />
        <PartnerSelect control={control} name="customer" label="Khách hàng" />
        <ItemCategorySelect
          control={control}
          name="itemCategory"
          label="Nhóm hàng hoá"
        />
        <TextInput
          name="itemCode"
          control={control}
          label="Mã nội bộ"
          radius="md"
        />
      </SimpleGrid>
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
