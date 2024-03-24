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
  picklist,
} from 'valibot'
import { WarehouseInputSchema } from './warehouse'

const LocationInputSchema = object({
  name: string([minLength(1, 'Trường bắt buộc')]),
  isScrapLocation: boolean(),
  isReturnLocation: boolean(),
  warehouse: required(
    merge([WarehouseInputSchema, object({ id: string() })]),
    'Trường bắt buộc',
  ),
  type: picklist([
    'view',
    'internal',
    'customer',
    'inventory',
    'production',
    'transit',
    'supplier',
  ]),
})

export const CreateLocationInputSchema = merge([
  LocationInputSchema,
  object({
    parentLocation: nullable(
      merge([
        omit(LocationInputSchema, [
          'isReturnLocation',
          'isScrapLocation',
          'warehouse',
        ]),
        object({ id: string(), path: string() }),
      ]),
    ),
  }),
])

export type Location = Input<typeof CreateLocationInputSchema> & {
  id: string
  computedName: string
}
