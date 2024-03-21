import { fetchClient } from '@/utils/fetchClient'
import { ListResponse } from './types'
import { Warehouse } from '@/validators/warehouse'

export const getWarehouses = async (deps: string | object) => {
  const response = await fetchClient
    .url('/warehouses')
    .query(deps)
    .get()
    .json<ListResponse<Warehouse>>()
  return response
}

export const getWarehouseOptions = async (deps: string | object) => {
  const { data } = await getWarehouses(deps)
  return data
}

export const findWarehouseById = async (id: string) => {
  const response = await fetchClient
    .url(`/warehouses/${id}`)
    .get()
    .json<Warehouse>()
  return response
}
