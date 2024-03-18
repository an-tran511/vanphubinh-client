import { valibotResolver } from '@hookform/resolvers/valibot'
import { Button, Stack } from '@mantine/core'
import { TextInput, Textarea } from 'react-hook-form-mantine'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Partner, PartnerInputSchema } from '@/validators/partner'
import { createPartner } from '@/apis/partner'

interface PartnerCreateProps {
  onClose: () => void
}
export function PartnerCreate(props: PartnerCreateProps) {
  const { onClose } = props
  const queryClient = useQueryClient()

  const { control, handleSubmit, clearErrors } = useForm<Partner>({
    resolver: valibotResolver(PartnerInputSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      notes: '',
    },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: createPartner,
    onSuccess: (data: Partner) => {
      queryClient.invalidateQueries({ queryKey: ['partners'] })
      toast.success(`${data.name} đã được tạo thành công`)
      onClose()
    },
  })

  const onSubmit = (data: Partner) => {
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
        <TextInput name="email" control={control} label="Email" radius="md" />
        <TextInput
          control={control}
          name="phone"
          label="Số điện thoại"
          radius="md"
        />
        <TextInput
          name="address"
          control={control}
          label="Địa chỉ"
          radius="md"
        />
        <Textarea name="notes" label="Ghi chú" radius="md" control={control} />
        <Button radius="md" type="submit" loading={isPending}>
          Tạo
        </Button>
      </Stack>
    </form>
  )
}
