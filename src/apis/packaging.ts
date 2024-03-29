import { fetchClient } from '@/utils/fetchClient'
import { ListResponse } from './types'
import { Packaging } from '@/validators/packaging'
import { PickAsRequired } from '@tanstack/react-router'

export const getPackagings = async (deps: string | object) => {
  const response = await fetchClient
    .url('/packagings')
    .query(deps)
    .get()
    .json<ListResponse<Packaging>>()
  return response
}

export const getPackagingOptions = async (deps: string | object) => {
  const { data } = await getPackagings(deps)
  return data
}

export const createPackaging = async (data: Packaging) => {
  const response = await fetchClient
    .url('/packagings')
    .post(data)
    .json<Packaging>()
  return response
}

export const findPackagingById = async (id: string) => {
  const response = await fetchClient
    .url(`/packagings/${id}`)
    .get()
    .json<Packaging>()
  return response
}

export const updatePackaging = async ({
  id,
  ...packageToUpdate
}: PickAsRequired<Partial<Packaging>, 'id'>) => {
  console.log(id)
  const response = await fetchClient
    .url(`/packagings/${id}`)
    .put(packageToUpdate)
    .json<Packaging>()
  return response
}
