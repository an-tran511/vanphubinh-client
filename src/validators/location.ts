import {
  Input,
  boolean,
  minLength,
  object,
  string,
  required,
  merge,
  nullable,
  picklist,
  pick,
} from 'valibot'
import { WarehouseInputSchema } from './warehouse'

export const LocationInputSchema = object({
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
        pick(LocationInputSchema, ['name']),
        object({ id: string(), path: string() }),
      ]),
    ),
  }),
])

export type Location = Input<typeof CreateLocationInputSchema> & {
  id: string
  computedName: string
}
