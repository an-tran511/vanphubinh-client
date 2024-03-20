import { createFileRoute, getRouteApi } from '@tanstack/react-router'
import { useMutation, useSuspenseQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useForm, FormProvider } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { PackagingForm } from './-components/PackagingForm'
import { updatePackaging } from '@/apis/packaging'
import { Packaging, UpdatePackagingInputSchema } from '@/validators/packaging'
import { Show } from '@/components/crud/show'
import { findPackagingByIdQueryOptions } from '@/apis/queryOptions'

export const Route = createFileRoute('/_layout/packagings/$id')({
  component: UpdateComponent,
})
const routeApi = getRouteApi('/_layout/packagings/$id')

function UpdateComponent() {
  const { id } = routeApi.useParams()
  const { data } = useSuspenseQuery(findPackagingByIdQueryOptions({ id }))
  //Mutation
  const { mutate, isPending } = useMutation({
    mutationKey: ['packagings', 'update', id],
    mutationFn: updatePackaging,
    onSuccess: (updatedData: Packaging) => {
      toast.success(`${updatedData.name} đã được cập nhật thành công`)
    },
    onError: () => {
      toast.error('Cập nhật bao bì thất bại')
    },
  })

  const methods = useForm<Packaging>({
    resolver: valibotResolver(UpdatePackagingInputSchema),
    defaultValues: {
      id,
      name: data.name,
      uom: data.uom,
      itemCode: data.itemCode,
      customer: data.customer,
      itemCategory: data.itemCategory,
      defaultSupplier: data.defaultSupplier,
      notes: data.notes,
      attributes: {
        dimension: data?.attributes?.dimension,
        spreadDimension: data?.attributes?.spreadDimension,
        thickness: data?.attributes?.thickness,
        numberOfColors: data?.attributes?.numberOfColors,
        filmWidth: data?.attributes?.filmWidth,
      },
      // newMoulds: [],
    },
  })
  const onSubmit = (data: Packaging) => {
    mutate(data, {
      onSuccess: (updatedData) => {
        methods.reset(
          {
            id,
            name: updatedData.name,
            uom: updatedData.uom,
            itemCode: updatedData.itemCode,
            customer: updatedData.customer,
            itemCategory: updatedData.itemCategory,
            defaultSupplier: updatedData.defaultSupplier,
            notes: updatedData.notes,
            attributes: {
              dimension: updatedData?.attributes?.dimension,
              spreadDimension: updatedData?.attributes?.spreadDimension,
              thickness: updatedData?.attributes?.thickness,
              numberOfColors: updatedData?.attributes?.numberOfColors,
              filmWidth: updatedData?.attributes?.filmWidth,
            },
          },
          {
            keepDirtyValues: true,
          },
        )
      },
    })
  }
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={(e) => {
          methods.clearErrors()
          methods.handleSubmit(onSubmit)(e)
        }}
      >
        <Show
          title="Bao bì"
          savingState={isPending}
          reset={methods.reset}
          isDirty={methods.formState.isDirty}
        >
          <PackagingForm control={methods.control} viewType="create" />
        </Show>
      </form>
    </FormProvider>
  )
}
