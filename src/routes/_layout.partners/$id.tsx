import { createFileRoute, getRouteApi } from '@tanstack/react-router'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { Text, Stack } from '@mantine/core'
import { TextInput, Textarea } from 'react-hook-form-mantine'
import { useMutation, useSuspenseQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Partner, PartnerInputSchema } from '@/validators/partner'
import { updatePartner } from '@/apis/partner'
import { singlePartnerQueryOption } from '@/apis/queryOptions'
import { Show } from '@/components/crud/show'

export const Route = createFileRoute('/_layout/partners/$id')({
  component: EditPartner,
})

const routeApi = getRouteApi('/_layout/partners/$id')

function EditPartner() {
  const { id } = routeApi.useParams()

  const { data } = useSuspenseQuery(singlePartnerQueryOption({ id }))

  const {
    control,
    handleSubmit,
    clearErrors,
    reset,
    formState: { isDirty },
  } = useForm<Partner>({
    resolver: valibotResolver(PartnerInputSchema),
    defaultValues: {
      name: data.name ?? '',
      email: data.email ?? '',
      phone: data.phone ?? '',
      address: data.address ?? '',
      notes: data.notes ?? '',
    },
  })

  const { mutate } = useMutation({
    mutationFn: updatePartner,
    onSuccess: (data: Partner) => {
      toast.success(`${data.name} đã được cập nhật thành công`)
      reset({
        name: data.name ?? '',
        email: data.email ?? '',
        phone: data.phone ?? '',
        address: data.address ?? '',
        notes: data.notes ?? '',
      })
    },
  })

  const onSubmit = (data: Partner) => {
    mutate({ partnerId: id, data })
  }

  return (
    <form
      onSubmit={(e) => {
        clearErrors()
        handleSubmit(onSubmit)(e)
      }}
    >
      <Show title="Đối tác" isDirty={isDirty} reset={reset}>
        <Stack gap="sm" px={{ base: 'lg', md: 'xl' }} pt="md">
          <Stack gap="0">
            <Text size="sm" fw={500}>
              Mã đối tác
            </Text>
            <Text size="md">{data.id}</Text>
          </Stack>
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
          <Textarea
            name="notes"
            label="Ghi chú"
            radius="md"
            control={control}
          />
        </Stack>
      </Show>
    </form>
  )
}
