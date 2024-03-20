import { Stack, SimpleGrid, Group } from '@mantine/core'
import { Control } from 'react-hook-form'
import { TextInput, Textarea } from 'react-hook-form-mantine'

import { UomCreatableSelect } from '@/components/select/UomCreatableSelect'
// import { PartnerCreatableSelect } from '@/components/select/PartnerCreatableSelect'
// import { ItemCategoryCreatableSelect } from '@/components/select/ItemCategoryCreatableSelect'
// import { client } from '@/utils/client'
// import { deleteImage } from '@/apis/image'

interface GeneralFieldsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>
  imageUrl: string
}

export function GeneralFields(props: GeneralFieldsProps) {
  const { control } = props

  return (
    <Stack gap="sm">
      <SimpleGrid cols={{ base: 1, md: 2 }} verticalSpacing="md" spacing="xl">
        <UomCreatableSelect
          control={control}
          name="uom"
          label="Đơn vị tính"
          withAsterisk
        />
        {/* <PartnerCreatableSelect
          control={control}
          name="customer"
          label="Khách hàng"
        />
        <ItemCategoryCreatableSelect
          control={control}
          name="itemCategory"
          label="Nhóm hàng hoá"
        /> */}
        <Group grow>
          <TextInput
            name="itemCode"
            control={control}
            label="Mã nội bộ"
            radius="md"
          />
        </Group>
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
