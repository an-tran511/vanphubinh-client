import {
  Input,
  object,
  string,
  number,
  merge,
  nullish,
  omit,
  fallback,
  custom,
} from 'valibot'
import { ItemInputSchema } from '@/validators/item'
import { dimensionRegex } from '@/utils/stringMatcher'

export const MouldInputSchema = merge([
  omit(ItemInputSchema, ['isStockable']),
  object({
    attributes: nullish(
      object({
        dimension: string([
          custom(
            (input) => dimensionRegex.test(String(input)),
            'Kích thước phải có định dạng 123x123',
          ),
        ]),
        numberOfMoulds: fallback(number(), 0),
      }),
    ),
  }),
])
export const UpdateMouldInputSchema = merge([
  MouldInputSchema,
  object({ id: string() }),
])
export type Mould = Input<typeof MouldInputSchema> & { id: string }
export type MouldAttributesInput = Partial<
  Input<typeof MouldInputSchema>['attributes']
>
