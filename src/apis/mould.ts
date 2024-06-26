import { fetchClient } from '@/utils/fetchClient'
import { ListResponse } from './types'
import { Mould, MultipleMoulds } from '@/validators/mould'
import { PickAsRequired } from '@tanstack/react-router'

export const getMoulds = async (deps: string | object) => {
  const response = await fetchClient
    .url('/moulds')
    .query(deps)
    .get()
    .json<ListResponse<Mould>>()
  return response
}

export const createMould = async (data: Mould) => {
  const response = await fetchClient.url('/moulds').post(data).json<Mould>()
  return response
}

export const findMouldById = async (id: string) => {
  const response = await fetchClient.url(`/moulds/${id}`).get().json<Mould>()
  return response
}

export const updateMould = async ({
  id,
  ...packageToUpdate
}: PickAsRequired<Partial<Mould>, 'id'>) => {
  const response = await fetchClient
    .url(`/moulds/${id}`)
    .put(packageToUpdate)
    .json<Mould>()
  return response
}

export const storeManyMoulds = async (data: MultipleMoulds) => {
  const response = await fetchClient
    .url('/moulds/bulk')
    .post(data)
    .json<{ success: boolean }>()
  return response
}
