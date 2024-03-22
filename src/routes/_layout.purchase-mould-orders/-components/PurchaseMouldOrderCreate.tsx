import { MouldMakerSelect } from '@/components/select/MouldMakerSelect'
import { MouldSelect } from '@/components/select/MouldSelect'
import {
  MultiplePurchaseMouldOrderInputSchema,
  type MultiplePurchaseMouldOrderInput,
} from '@/validators/purchaseMouldOrder'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { Button, Stack, Group } from '@mantine/core'
import { useMutation } from '@tanstack/react-query'
import { DataTable } from 'mantine-datatable'
import { useFieldArray, useForm } from 'react-hook-form'
import {
  DateInput,
  NumberInput,
  SegmentedControl,
  TextInput,
} from 'react-hook-form-mantine'
import { createMultiPurchaseMouldOrder } from '@/apis/purchaseMouldOrder'
import classes from './Table.module.css'

interface PurchaseMouldOrderCreateProps {
  onClose: () => void
}

export const PurchaseMouldOrderCreate = (
  props: PurchaseMouldOrderCreateProps,
) => {
  const { onClose } = props
  const queryClient = useQueryClient()
  const { control, clearErrors, handleSubmit } =
    useForm<MultiplePurchaseMouldOrderInput>({
      resolver: valibotResolver(MultiplePurchaseMouldOrderInputSchema),
      defaultValues: {
        supplier: undefined,
        createdDate: new Date(),
        orders: [
          {
            mould: undefined,
            quantity: 0,
            createdDate: new Date(),
            type: 'new',
            notes: '',
          },
        ],
      },
    })

  const { fields, append } = useFieldArray({
    control,
    name: 'orders',
  })

  const columns = [
    {
      accessor: 'mould',
      title: 'Trục',
      width: '25%',
    },
    {
      accessor: 'quantity',
      title: 'Số lượng',
      width: '13%',
    },
    {
      accessor: 'createdDate',
      title: 'Ngày tạo',
    },

    {
      accessor: 'type',
      title: 'Loại',
    },
    {
      accessor: 'notes',
      title: 'Ghi chú',
      width: '20%',
    },
  ]
  const rows = []
  for (let i = 0; i < fields.length; i++) {
    rows.push({
      id: i,
      mould: <MouldSelect name={`orders.${i}.mould`} control={control} />,
      quantity: (
        <NumberInput
          name={`orders.${i}.quantity`}
          control={control}
          aria-label="quantity"
          radius="md"
        />
      ),
      createdDate: (
        <DateInput
          name={`orders.${i}.createdDate`}
          control={control}
          radius="md"
          valueFormat="DD/MM/YYYY"
        />
      ),

      type: (
        <SegmentedControl
          name={`orders.${i}.type`}
          control={control}
          radius="md"
          // color="blue.9"
          data={[
            {
              value: 'new',
              label: 'Mới',
            },
            {
              value: 'repair',
              label: 'Sửa chữa',
            },
            {
              value: 'replace',
              label: 'Tận dụng',
            },
          ]}
        />
      ),
      notes: (
        <TextInput
          name={`orders.${i}.notes`}
          control={control}
          label=""
          radius="md"
        />
      ),
    })
  }

  const { mutate } = useMutation({
    mutationFn: createMultiPurchaseMouldOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['purchase-mould-orders'] })
      toast.success(`Lệnh đặt trục được tạo thành công`)
      onClose()
    },
  })
  const onSubmit = (data: MultiplePurchaseMouldOrderInput) => {
    mutate(data)
  }
  return (
    <form
      onSubmit={(e) => {
        clearErrors()
        handleSubmit(onSubmit)(e)
      }}
    >
      <Stack>
        <MouldMakerSelect name="supplier" control={control} label="Nhà trục" />
        <Group justify="flex-end">
          <Button
            size="compact-sm"
            variant="outline"
            onClick={() => {
              append({
                mould: null,
                quantity: 0,
                createdDate: new Date(),
                type: 'new',
                notes: '',
              })
            }}
          >
            Thêm dòng
          </Button>
        </Group>
        <DataTable
          columns={columns}
          records={rows}
          classNames={{
            table: classes.table,
          }}
        />
        <Button type="submit">Tạo lệnh đặt trục</Button>
      </Stack>
    </form>
  )
}
