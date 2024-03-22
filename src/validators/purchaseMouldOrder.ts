import {
  Input,
  nullable,
  number,
  object,
  string,
  fallback,
  date,
  picklist,
  array,
  omit,
  nullish,
  required,
} from 'valibot'

export const PurchaseMouldOrderInputSchema = object({
  mould: required(
    object({ id: string(), name: string() }),
    'Trục không được để trống',
  ),
  supplier: nullable(object({ id: string(), name: string() })),
  quantity: fallback(number(), 1),
  createdDate: date(),
  type: picklist(['new', 'repair', 'replace']),
  notes: string(),
})

export const MultiplePurchaseMouldOrderInputSchema = object({
  supplier: required(
    object({ id: string(), name: string() }),
    'Nhà cung cấp không được để trống',
  ),
  createdDate: date(),
  orders: array(omit(PurchaseMouldOrderInputSchema, ['supplier'])),
})

export type MultiplePurchaseMouldOrderInput = Input<
  typeof MultiplePurchaseMouldOrderInputSchema
>

export type PurchaseMouldOrder = Input<typeof PurchaseMouldOrderInputSchema> & {
  id: string
}
