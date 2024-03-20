import {
  Input,
  minLength,
  object,
  nullable,
  string,
  merge,
  boolean,
} from 'valibot'
import { PartnerInputSchema } from '@/validators/partner'
import { UomInputSchema } from '@/validators/uom'

export const ItemInputSchema = object({
  name: string([minLength(1, 'Trường bắt buộc')]),
  uom: merge([UomInputSchema, object({ id: string() })]),
  customer: nullable(merge([PartnerInputSchema, object({ id: string() })])),
  itemCategory: nullable(string([minLength(1, 'Giá trị không hợp lệ')])),
  defaultSupplier: nullable(string([minLength(1, 'Giá trị không hợp lệ')])),
  notes: string(),
  isStockable: boolean(),
  itemCode: string(),
  // attributes: nullable(object({})),
})

export const UpdateItemInputSchema = merge([
  ItemInputSchema,
  object({ id: nullable(string()) }),
])

export type ItemInput = Input<typeof ItemInputSchema>
