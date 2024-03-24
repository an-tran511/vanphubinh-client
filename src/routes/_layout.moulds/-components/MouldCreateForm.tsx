import { PartnerSelect } from '@/components/select/PartnerSelect'
import { Card, Group, Stack, Button, Box } from '@mantine/core'
import { DataTable } from 'mantine-datatable'
import { Control, useFieldArray } from 'react-hook-form'
import { NumberInput, TextInput } from 'react-hook-form-mantine'
import { randomId } from '@mantine/hooks'

interface MouldCreateFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>
}
export const MouldCreateForm = (props: MouldCreateFormProps) => {
  const { control } = props
  const { fields, append } = useFieldArray({
    control: control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'moulds', // unique name for your Field Array
  })

  const formInput = []
  for (let i = 0; i < fields.length; i++) {
    formInput.push({
      id: randomId(),
      name: (
        <TextInput control={control} name={`moulds.${i}.name`} radius="md" />
      ),
      customer: (
        <PartnerSelect
          control={control}
          name={`moulds.${i}.customer`}
          label=""
        />
      ),
      itemCode: (
        <TextInput
          control={control}
          name={`moulds.${i}.itemCode`}
          radius="md"
        />
      ),
      dimension: (
        <TextInput
          control={control}
          name={`moulds.${i}.dimension`}
          radius="md"
        />
      ),
      location: (
        <TextInput
          control={control}
          name={`moulds.${i}.location`}
          radius="md"
        />
      ),
      numberOfMoulds: (
        <NumberInput
          control={control}
          name={`moulds.${i}.numberOfMoulds`}
          hideControls
        />
      ),
    })
  }
  return (
    <Card shadow="0" radius="0" px={{ base: 'lg', md: 'xl' }}>
      <Stack gap="md">
        <PartnerSelect control={control} name="partner" label="Nhà trục" />
        <Box>
          <Group justify="flex-end" mb="5">
            <Button
              variant="outline"
              size="compact-sm"
              onClick={() =>
                append({
                  name: '',
                  customer: '',
                  itemCode: '',
                  dimension: '',
                  location: '',
                  numberOfMoulds: 0,
                })
              }
            >
              Thêm dòng
            </Button>
          </Group>
          <DataTable
            columns={[
              { accessor: 'name', title: 'Tên trục' },
              { accessor: 'customer', title: 'Nhà trục', width: '23%' },
              { accessor: 'itemCode', title: 'Mã trục', width: '12%' },
              { accessor: 'dimension', title: 'Kích thước', width: '12%' },
              { accessor: 'location', title: 'Vị trí', width: '12%' },
              {
                accessor: 'numberOfMoulds',
                title: 'Số cây trục',
                width: '8%',
              },
            ]}
            records={formInput}
          />
        </Box>
      </Stack>
    </Card>
  )
}
