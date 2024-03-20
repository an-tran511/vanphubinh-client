import { Input, object, string, number, merge } from 'valibot'
import { ItemInputSchema } from '@/validators/item'

export const PackagingInputSchema = merge([
  ItemInputSchema,
  object({
    attributes: object({
      dimension: string(),
      spreadDimension: string(),
      thickness: number(),
      numberOfColors: number(),
    }),
  }),
])
export type Packaging = Input<typeof PackagingInputSchema>
export type PackagingAttributesInput = Partial<
  Input<typeof PackagingInputSchema>['attributes']
>
