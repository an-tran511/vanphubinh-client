import { Packaging } from '@/validators/packaging'
import { SimpleGrid, Stack } from '@mantine/core'
import { Control } from 'react-hook-form'
import { NumberInput, TextInput } from 'react-hook-form-mantine'

interface PackagingAttributesSectionProps {
  control: Control<Packaging>
}
export const PackagingAttributesSection = (
  props: PackagingAttributesSectionProps,
) => {
  const { control } = props

  return (
    <Stack gap="sm">
      <SimpleGrid cols={{ base: 1, md: 4 }} verticalSpacing="sm" spacing="sm">
        <TextInput
          control={control}
          name="attributes.dimension"
          size="sm"
          radius="md"
          placeholder="123x123"
          label="Kích thước (rộng x cao)"
        />
        <TextInput
          control={control}
          name="attributes.spreadDimension"
          size="sm"
          radius="md"
          placeholder="123x123"
          label="Kích thước trải (rộng x cao)"
        />
        <NumberInput
          control={control}
          name="attributes.thickness"
          size="sm"
          radius="md"
          min={0}
          placeholder="40"
          label="Độ dày (micro)"
          allowDecimal={false}
        />

        <NumberInput
          control={control}
          name="attributes.numberOfColors"
          size="sm"
          radius="md"
          min={0}
          placeholder="4"
          label="Số màu"
          allowDecimal={false}
        />
      </SimpleGrid>

      <SimpleGrid cols={{ base: 1, md: 4 }} verticalSpacing="sm" spacing="sm">
        <NumberInput
          control={control}
          name="attributes.filmWidth"
          size="sm"
          radius="md"
          min={0}
          placeholder="340"
          label="Khổ màng (cm)"
          allowDecimal={false}
        />
      </SimpleGrid>
    </Stack>
  )
}
