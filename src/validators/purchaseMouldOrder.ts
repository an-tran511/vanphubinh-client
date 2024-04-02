import {
  Input,
  number,
  object,
  string,
  fallback,
  picklist,
  array,
  required,
  pick,
  merge,
  minValue,
} from 'valibot'
import { MouldInputSchema } from './mould'
import { PartnerInputSchema } from './partner'

export const PurchaseMouldOrderInputSchema = object({
  mould: required(
    merge([
      pick(MouldInputSchema, ['name', 'defaultSupplier']),
      object({ id: string() }),
    ]),
    'Trường bắt buộc',
  ),
  supplier: required(
    merge([pick(PartnerInputSchema, ['name']), object({ id: string() })]),
    'Trường bắt buộc',
  ),
  quantity: number([minValue(1, 'Số lượng phải lớn hơn 0')]),
  type: picklist(['new', 'repair', 'replace', 'warranty']),
  notes: fallback(string(), ''),
})

export const MultiplePurchaseMouldOrderInputSchema = object({
  orders: array(PurchaseMouldOrderInputSchema),
})

export type MultiplePurchaseMouldOrderInput = Omit<
  Input<typeof MultiplePurchaseMouldOrderInputSchema>,
  'orders'
> & {
  orders: PurchaseMouldOrderInput[]
}

type PurchaseMouldOrderInput = Omit<
  Input<typeof PurchaseMouldOrderInputSchema>,
  'mould' | 'supplier'
> & {
  mould?: Input<typeof PurchaseMouldOrderInputSchema>['mould']
  supplier?: Input<typeof PurchaseMouldOrderInputSchema>['supplier']
}

export type PurchaseMouldOrder = Input<typeof PurchaseMouldOrderInputSchema> & {
  id: string
  status: 'new' | 'mould_issue' | 'cancelled' | 'ongoing' | 'completed'
}
