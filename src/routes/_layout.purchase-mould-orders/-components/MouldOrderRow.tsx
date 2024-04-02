import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import classes from '@/components/input/Input.module.css'
import comboboxClasses from '@/components/select/Combobox.module.css'
import { MouldSelect } from '@/components/select/MouldSelect'
import { ActionIcon, Center, Table, Tooltip } from '@mantine/core'
import { MouldMakerSelect } from '@/components/select/MouldMakerSelect'
import { Select, NumberInput, Textarea } from 'react-hook-form-mantine'
import { Trash, WarningCircle } from '@phosphor-icons/react'
import {
  MultiplePurchaseMouldOrderInput,
  PurchaseMouldOrder,
} from '@/validators/purchaseMouldOrder'

interface MouldOrderRowProps {
  idx: number
  removeRow: (idx: number) => void
}
export const MouldOrderRow = (props: MouldOrderRowProps) => {
  const { idx, removeRow } = props
  console.log(idx)
  const {
    watch,
    setValue,
    control,
    formState: { errors },
  } = useFormContext<MultiplePurchaseMouldOrderInput>()
  const [oldMould, setOldMould] = useState<PurchaseMouldOrder['mould']>()

  const order = watch(`orders.${idx}.mould`)

  useEffect(() => {
    if (order !== oldMould) {
      const supplier = order?.defaultSupplier
      if (supplier) {
        setValue(`orders.${idx}.supplier`, supplier)
      }
    }
    setOldMould(order)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order, idx])
  return (
    <>
      <Table.Td className="p-0">
        <MouldSelect
          name={`orders.${idx}.mould`}
          control={control}
          error={!!errors?.orders?.[idx]?.mould}
          rightSection={
            errors?.orders?.[idx]?.mould && (
              <Tooltip label={errors?.orders?.[idx]?.mould?.message}>
                <WarningCircle size={16} />
              </Tooltip>
            )
          }
          classNames={{
            root: classes.root,
            wrapper: classes.fullHeightWrapper,
            input: classes.input,
          }}
        />
      </Table.Td>
      <Table.Td className="p-0">
        <MouldMakerSelect
          name={`orders.${idx}.supplier`}
          control={control}
          error={!!errors?.orders?.[idx]?.supplier}
          rightSection={
            errors?.orders?.[idx]?.supplier && (
              <Tooltip label={errors?.orders?.[idx]?.supplier?.message}>
                <WarningCircle size={16} />
              </Tooltip>
            )
          }
          classNames={{
            root: classes.root,
            wrapper: classes.fullHeightWrapper,
            input: classes.input,
          }}
        />
      </Table.Td>
      <Table.Td className="p-0">
        <NumberInput
          name={`orders.${idx}.quantity`}
          control={control}
          aria-label="quantity"
          radius="md"
          hideControls
          error={!!errors?.orders?.[idx]?.quantity}
          rightSection={
            errors?.orders?.[idx]?.quantity && (
              <Tooltip label={errors?.orders?.[idx]?.quantity?.message}>
                <WarningCircle size={16} />
              </Tooltip>
            )
          }
          classNames={{
            root: classes.root,
            wrapper: classes.fullHeightWrapper,
            input: classes.input,
          }}
        />
      </Table.Td>
      <Table.Td className="p-0">
        <Select
          name={`orders.${idx}.type`}
          control={control}
          classNames={{
            root: classes.root,
            wrapper: classes.fullHeightWrapper,
            input: classes.input,
            option: comboboxClasses.option,
          }}
          data={[
            {
              value: 'new',
              label: 'Trục mới',
            },
            {
              value: 'repair',
              label: 'Sửa chữa (trục mòn)',
            },
            {
              value: 'replace',
              label: 'Tận dụng lõi, khắc lại',
            },
            {
              value: 'warranty',
              label: 'Bảo hành',
            },
          ]}
        />
      </Table.Td>
      <Table.Td className="p-0">
        <Textarea
          name={`orders.${idx}.notes`}
          control={control}
          h="100%"
          autosize
          maxRows={2}
          classNames={{
            root: classes.root,
            wrapper: classes.fullHeightWrapper,
            input: classes.input,
          }}
        />
      </Table.Td>
      <Table.Td className="p-0">
        <Center>
          <ActionIcon
            aria-label="Remove row"
            variant="transparent"
            color="red"
            bg="white"
          >
            <Trash
              onClick={() => {
                removeRow(idx)
              }}
            />
          </ActionIcon>
        </Center>
      </Table.Td>
    </>
  )
}
