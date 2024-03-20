import { Input, minLength, object, string } from 'valibot'

export const UomInputSchema = object({
  name: string([minLength(1, 'Trường bắt buộc')]),
})

export type UomInput = Input<typeof UomInputSchema>
