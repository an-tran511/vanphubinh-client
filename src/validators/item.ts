import {
  Input,
  minLength,
  object,
  nullable,
  string,
  merge,
  boolean,
  required,
  optional,
  pick,
} from 'valibot'
import { PartnerInputSchema } from '@/validators/partner'
import { UomInputSchema } from '@/validators/uom'
import { ItemCategoryInputSchema } from './itemCategory'

export const ItemInputSchema = object({
  name: string([minLength(1, 'Trường bắt buộc')]),
  uom: required(
    merge([UomInputSchema, object({ id: string() })]),
    'Trường bắt buộc',
  ),
  customer: nullable(
    merge([pick(PartnerInputSchema, ['name']), object({ id: string() })]),
  ),
  itemCategory: nullable(
    merge([ItemCategoryInputSchema, object({ id: string() })]),
  ),
  defaultSupplier: nullable(
    merge([pick(PartnerInputSchema, ['name']), object({ id: string() })]),
  ),
  notes: optional(string(), ''),
  isStockable: boolean(),
  itemCode: string(),
  attributes: nullable(object({})),
})

export const UpdateItemInputSchema = merge([
  ItemInputSchema,
  object({ id: nullable(string()) }),
])

export type ItemInput = Input<typeof ItemInputSchema>
