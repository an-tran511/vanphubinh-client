import { fetchClient } from '@/utils/fetchClient'
import { ListResponse } from './types'
import { Uom } from '@/validators/uom'

export const getUoms = async (deps: string | object) => {
  const response = await fetchClient
    .url('/uoms')
    .query(deps)
    .get()
    .json<ListResponse<Uom>>()
  return response
}

export const getUomOptions = async (deps: string | object) => {
  const { data } = await getUoms(deps)
  return data
}
