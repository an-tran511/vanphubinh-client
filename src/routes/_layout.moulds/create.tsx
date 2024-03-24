import { useForm, FormProvider } from 'react-hook-form'
import { Button } from '@mantine/core'
import { Create } from '@/components/crud/create'
import { createFileRoute } from '@tanstack/react-router'
import { MouldCreateForm } from './-components/MouldCreateForm'

export const Route = createFileRoute('/_layout/moulds/create')({
  component: CreateComponent,
})

function CreateComponent() {
  const methods = useForm({
    defaultValues: {
      moulds: [
        {
          name: '',
          customer: '',
          itemCode: '',
          dimension: '',
          location: '',
          numberOfMoulds: 0,
        },
      ],
    },
  })

  return (
    <FormProvider {...methods}>
      <form>
        <Create title="Tạo trục">
          <MouldCreateForm control={methods.control} />
        </Create>
      </form>
    </FormProvider>
  )
}
