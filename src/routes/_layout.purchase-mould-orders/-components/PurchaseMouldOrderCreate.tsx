import { type MultiplePurchaseMouldOrderInput } from '@/validators/purchaseMouldOrder'
import { Button, Group, Card, Table, Box, Input } from '@mantine/core'
import tableClasses from '@/components/table/Table.module.css'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { MouldOrderRow } from './MouldOrderRow'

export const PurchaseMouldOrderCreate = () => {
  const { control, getValues } =
    useFormContext<MultiplePurchaseMouldOrderInput>()

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'orders',
  })

  const columns = [
    {
      title: 'Trục',
      width: '23%',
      required: true,
    },
    {
      title: 'Nhà trục',
      width: '16%',
      required: true,
    },
    {
      title: 'Số lượng',
      required: true,
    },
    {
      title: 'Loại',
      required: true,
    },
    {
      title: 'Ghi chú',
      width: '23%',
    },
    { title: '' },
  ]

  return (
    <Card shadow="0" radius="0" px={{ base: 'md', md: 'lg' }}>
      <Box
        visibleFrom="md"
        style={{
          border: '1px solid #E0E0E0',
          borderRadius: `var(--mantine-radius-md)`,
        }}
      >
        <Table
          withColumnBorders
          classNames={{
            table: tableClasses.table,
            thead: tableClasses.thead,
            tfoot: tableClasses.tfoot,
          }}
        >
          <Table.Thead>
            <Table.Tr>
              {columns.map((column, index) => (
                <Table.Th key={index} w={column.width} maw={column.width}>
                  <Input.Label required={column.required || false}>
                    {' '}
                    {column.title}
                  </Input.Label>
                </Table.Th>
              ))}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {fields.map((field, i) => (
              <Table.Tr key={field.id}>
                <MouldOrderRow idx={i} removeRow={remove} />
              </Table.Tr>
            ))}
          </Table.Tbody>
          <Table.Tfoot
            style={{
              borderBottom: 'none',
            }}
          >
            <Table.Tr>
              <Table.Td>
                <Group gap="lg">
                  <Button
                    p="0"
                    variant="transparent"
                    size="xs"
                    onClick={() =>
                      append({
                        mould: undefined,
                        type: 'new',
                        supplier: undefined,
                        quantity: 0,
                        notes: '',
                      })
                    }
                  >
                    Thêm dòng
                  </Button>
                  <Button
                    variant="transparent"
                    size="xs"
                    p="0"
                    bg="white"
                    disabled={fields.length === 0}
                    onClick={() => {
                      const lastRow = fields.length - 1
                      const lastRowValues = getValues(`orders.${lastRow}`)
                      append(lastRowValues)
                    }}
                  >
                    Copy dòng cuối
                  </Button>
                </Group>
              </Table.Td>
            </Table.Tr>
          </Table.Tfoot>
        </Table>
      </Box>
    </Card>
  )
}
