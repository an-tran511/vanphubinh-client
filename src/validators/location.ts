import {
  Input,
  boolean,
  minLength,
  number,
  object,
  string,
  fallback,
  required,
  merge,
  nullable,
  omit,
} from 'valibot'
import { WarehouseInputSchema } from './warehouse'

const LocationInputSchema = object({
  name: string([minLength(1, 'Trường bắt buộc')]),
  isScrapLocation: boolean(),
  isReturnLocation: boolean(),
  maxStockLevel: fallback(number(), 0),
  warehouse: required(
    merge([WarehouseInputSchema, object({ id: string() })]),
    'Trường bắt buộc',
  ),
})

export const CreateLocationInputSchema = merge([
  LocationInputSchema,
  object({
    parentLocation: nullable(
      merge([
        omit(LocationInputSchema, [
          'isReturnLocation',
          'isScrapLocation',
          'maxStockLevel',
          'warehouse',
        ]),
        object({ id: string() }),
      ]),
    ),
  }),
])

export type Location = Input<typeof CreateLocationInputSchema> & {
  id: string
}
