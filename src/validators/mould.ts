import {
  Input,
  object,
  string,
  number,
  merge,
  nullish,
  omit,
  pick,
  fallback,
  custom,
  nullable,
  array,
  required,
  minLength,
  minValue,
  maxValue,
  toTrimmed,
} from 'valibot'
import { ItemInputSchema } from '@/validators/item'
import { dimensionRegex } from '@/utils/stringMatcher'
import { PartnerInputSchema } from './partner'
import { LocationInputSchema } from './location'
import { PackagingInputSchema } from './packaging'

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

export const MultipleMouldsInputSchema = object({
  defaultSupplier: required(
    merge([pick(PartnerInputSchema, ['name']), object({ id: string() })]),
    'Trường bắt buộc',
  ),
  customer: required(
    merge([pick(PartnerInputSchema, ['name']), object({ id: string() })]),
    'Trường bắt buộc',
  ),
  moulds: array(
    object({
      name: string([minLength(1, 'Trường bắt buộc')]),
      packaging: nullable(
        merge([
          pick(PackagingInputSchema, ['name', 'itemCode']),
          object({ id: string() }),
        ]),
      ),
      dimension: string([
        toTrimmed(),
        custom(
          (input) => dimensionRegex.test(String(input)),
          'Kích thước phải có định dạng 123x123',
        ),
      ]),
      location: nullable(
        merge([pick(LocationInputSchema, ['name']), object({ id: string() })]),
      ),
      numberOfMoulds: number([
        minValue(1, 'Phải lớn hơn 1'),
        maxValue(13, 'Phải nhỏ hơn 13'),
      ]),
    }),
  ),
})
export type Mould = Input<typeof MouldInputSchema> & { id: string }
export type MouldAttributesInput = Partial<
  Input<typeof MouldInputSchema>['attributes']
>
export type MultipleMoulds = Input<typeof MultipleMouldsInputSchema>
