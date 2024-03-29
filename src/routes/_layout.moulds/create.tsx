import { useForm, FormProvider } from 'react-hook-form'
import { Create } from '@/components/crud/create'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { MouldCreateForm } from './-components/MouldCreateForm'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { MultipleMoulds, MultipleMouldsInputSchema } from '@/validators/mould'
import { useMutation } from '@tanstack/react-query'
import { bulkCreateMoulds } from '@/apis/mould'
import { toast } from 'sonner'

export const Route = createFileRoute('/_layout/moulds/create')({
  component: CreateComponent,
})

function CreateComponent() {
  const navigate = useNavigate({ from: '/moulds/create' })
  //Mutation
  const { mutate, isPending } = useMutation({
    mutationFn: bulkCreateMoulds,
    onSuccess: () => {
      navigate({ to: '/moulds' })
      toast.success('Trục đã được tạo thành công')
    },
    onError: () => {
      toast.error('Tạo trục thất bại')
    },
  })

  const methods = useForm<MultipleMoulds>({
    resolver: valibotResolver(MultipleMouldsInputSchema),
    defaultValues: {
      defaultSupplier: undefined,
      customer: undefined,
      moulds: [
        {
          name: '',
          packaging: null,
          dimension: '',
          location: null,
          numberOfMoulds: 0,
        },
      ],
    },
  })
  const onSubmit = (data: MultipleMoulds) => {
    mutate(data)
  }
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          methods.handleSubmit(onSubmit)(e)
        }}
      >
        <Create title="Tạo trục in" savingState={isPending}>
          <MouldCreateForm
            control={methods.control}
            getValues={methods.getValues}
            errors={methods.formState.errors}
          />
        </Create>
      </form>
    </FormProvider>
  )
}
