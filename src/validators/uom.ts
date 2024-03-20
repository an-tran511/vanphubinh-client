import { Input, minLength, object, string } from 'valibot'

export const UomInputSchema = object({
  name: string([minLength(1, 'Trường bắt buộc')]),
})

export type Uom = Input<typeof UomInputSchema> & { id: string }
