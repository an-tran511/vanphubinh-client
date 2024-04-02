import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { PurchaseMouldOrderCreate } from './-components/PurchaseMouldOrderCreate'
import { FormProvider, useForm } from 'react-hook-form'
import {
  MultiplePurchaseMouldOrderInput,
  MultiplePurchaseMouldOrderInputSchema,
} from '@/validators/purchaseMouldOrder'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { Create } from '@/components/crud/create'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { createMultiPurchaseMouldOrder } from '@/apis/purchaseMouldOrder'

export const Route = createFileRoute('/_layout/purchase-mould-orders/create')({
  component: CreateComponent,
})

function CreateComponent() {
  const navigate = useNavigate({ from: '/purchase-mould-orders/create' })
  const queryClient = useQueryClient()

  const methods = useForm<MultiplePurchaseMouldOrderInput>({
    resolver: valibotResolver(MultiplePurchaseMouldOrderInputSchema),
    defaultValues: {
      orders: [
        {
          mould: undefined,
          supplier: undefined,
          quantity: 0,
          type: 'new',
          notes: '',
        },
      ],
    },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: createMultiPurchaseMouldOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['purchase-mould-orders'] })
      toast.success(`Lệnh đặt trục được tạo thành công`)
      navigate({ to: '/purchase-mould-orders' })
    },
  })

  const onSubmit = (data: MultiplePurchaseMouldOrderInput) => {
    mutate(data)
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={(e) => {
          methods.clearErrors()
          methods.handleSubmit(onSubmit)(e)
        }}
      >
        <Create title="Tạo lệnh đặt trục" savingState={isPending}>
          <PurchaseMouldOrderCreate />
        </Create>
      </form>
    </FormProvider>
  )
}
