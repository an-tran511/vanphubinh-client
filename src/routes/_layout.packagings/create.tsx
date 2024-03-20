import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useForm, FormProvider } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { modals } from '@mantine/modals'
import { Text } from '@mantine/core'
import { PackagingForm } from './-components/PackagingForm'
import { Create } from '@/components/crud/create'
import { createPackaging } from '@/apis/packaging'
import { Packaging, PackagingInputSchema } from '@/validators/packaging'

export const Route = createFileRoute('/_layout/packagings/create')({
  component: CreateComponent,
})

function CreateComponent() {
  const navigate = useNavigate({ from: '/packagings/create' })

  //Mutation
  const { mutate, isPending } = useMutation({
    mutationFn: createPackaging,
    onSuccess: (data: Packaging) => {
      const itemId = data.id
      navigate({ to: '/packagings/$id', params: { id: itemId } })
      toast.success(`${data.name} đã được tạo thành công`)
    },
    onError: () => {
      toast.error('Tạo bao bì thất bại')
    },
  })

  const methods = useForm<Packaging>({
    resolver: valibotResolver(PackagingInputSchema),
    defaultValues: {
      name: '',
      uom: undefined,
      itemCode: '',
      customer: undefined,
      itemCategory: undefined,
      notes: '',
      isStockable: true,
      // attributes: {
      //   dimension: '',
      //   spreadDimension: '',
      //   thickness: 0,
      //   numberOfColors: 0,
      // },
      // newMoulds: [],
    },
  })
  console.log(methods.formState.errors)
  const onSubmit = (data: Packaging) => {
    const partnerId = methods.getValues('customer')
    if (partnerId) {
      mutate(data)
    } else {
      modals.openConfirmModal({
        title: 'Bạn chưa chọn khách hàng',
        centered: true,
        children: (
          <Text size="sm">
            Mã sản phẩm được tạo dựa trên mã khách hàng. Hãy xác nhận bạn không
            muốn chọn khách hàng.
          </Text>
        ),
        labels: { confirm: 'Xác nhận', cancel: 'Huỷ' },
        onCancel: () => console.log('Cancel'),
        onConfirm: () => mutate(data),
      })
    }
  }
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={(e) => {
          methods.clearErrors()
          methods.handleSubmit(onSubmit)(e)
        }}
      >
        <Create title="Tạo bao bì" savingState={isPending}>
          <PackagingForm control={methods.control} viewType="create" />
        </Create>
      </form>
    </FormProvider>
  )
}
