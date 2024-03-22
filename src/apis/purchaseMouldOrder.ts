import { fetchClient } from '@/utils/fetchClient'
import { ListResponse } from './types'
import {
  MultiplePurchaseMouldOrderInput,
  PurchaseMouldOrder,
} from '@/validators/purchaseMouldOrder'

export const getPurchaseMouldOrders = async (deps: string | object) => {
  const response = await fetchClient
    .url('/purchase-mould-orders')
    .query(deps)
    .get()
    .json<ListResponse<PurchaseMouldOrder>>()
  return response
}

export const createMultiPurchaseMouldOrder = async (
  data: MultiplePurchaseMouldOrderInput,
) => {
  const response = await fetchClient
    .url('/purchase-mould-orders')
    .post(data)
    .json<PurchaseMouldOrder>()
  return response
}
