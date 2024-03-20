import { fetchClient } from '@/utils/fetchClient'
import { ListResponse } from './types'
import { Packaging } from '@/validators/packaging'

export const getPackagings = async (deps: string | object) => {
  const response = await fetchClient
    .url('/packagings')
    .query(deps)
    .get()
    .json<ListResponse<Packaging>>()
  return response
}

export const createPackaging = async (data: Packaging) => {
  const response = await fetchClient
    .url('/packagings')
    .post(data)
    .json<Packaging>()
  return response
}
