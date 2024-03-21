import { valibotResolver } from '@hookform/resolvers/valibot'
import { Button, Stack } from '@mantine/core'
import { Checkbox, TextInput } from 'react-hook-form-mantine'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { createLocation } from '@/apis/location'
import { CreateLocationInputSchema, Location } from '@/validators/location'
import { WarehouseSelect } from '@/components/select/WarehouseSelect'
import { LocationSelect } from '@/components/select/LocationSelect'

interface LocationCreateProps {
  onClose: () => void
}

export function LocationCreate(props: LocationCreateProps) {
  const { onClose } = props
  const queryClient = useQueryClient()

  const { control, handleSubmit, clearErrors } = useForm<Location>({
    resolver: valibotResolver(CreateLocationInputSchema),
    defaultValues: {
      name: '',
      isScrapLocation: false,
      isReturnLocation: false,
      warehouse: undefined,
      parentLocation: null,
      type: 'internal',
    },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: createLocation,
    onSuccess: (data: Location) => {
      queryClient.invalidateQueries({ queryKey: ['locations'] })
      toast.success(`${data.name} đã được tạo thành công`)
      onClose()
    },
  })

  const onSubmit = (data: Location) => {
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
        <TextInput
          name="name"
          label="Tên"
          radius="md"
          control={control}
          withAsterisk
        />
        <WarehouseSelect name="warehouse" label="Kho tổng" control={control} />
        <LocationSelect
          name="parentLocation"
          label="Vị trí cha"
          control={control}
        />
        <Checkbox
          name="isReturnLocation"
          label="Vị trí trả hàng"
          control={control}
        />
        <Checkbox
          name="isScrapLocation"
          label="Vị trí phế liệu"
          control={control}
        />
        <TextInput
          name="maxStockLevel"
          label="Số lượng tối đa"
          type="number"
          radius="md"
          control={control}
        />

        <Button radius="md" type="submit" loading={isPending}>
          Tạo
        </Button>
      </Stack>
    </form>
  )
}
