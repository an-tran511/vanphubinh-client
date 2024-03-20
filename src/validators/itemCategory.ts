import { Input, object, string, minLength } from 'valibot'

export const ItemCategoryInputSchema = object({
  name: string([minLength(1, 'Trường bắt buộc')]),
})

export type ItemCategory = Input<typeof ItemCategoryInputSchema> & {
  id: number
  computedName: string
}
