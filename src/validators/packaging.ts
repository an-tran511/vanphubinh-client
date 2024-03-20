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

export const PackagingInputSchema = merge([
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
        spreadDimension: string([
          custom(
            (input) => dimensionRegex.test(String(input)),
            'Kích thước phải có định dạng 123x123',
          ),
        ]),
        thickness: fallback(number(), 0),
        numberOfColors: fallback(number(), 0),
        filmWidth: fallback(number(), 0),
      }),
    ),
  }),
])
export const UpdatePackagingInputSchema = merge([
  PackagingInputSchema,
  object({ id: string() }),
])
export type Packaging = Input<typeof PackagingInputSchema> & { id: string }
export type PackagingAttributesInput = Partial<
  Input<typeof PackagingInputSchema>['attributes']
>
