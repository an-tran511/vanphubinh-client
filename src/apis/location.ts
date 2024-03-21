import { fetchClient } from '@/utils/fetchClient'
import { ListResponse } from './types'
import { Location } from '@/validators/location'

export const getLocations = async (deps: string | object) => {
  const response = await fetchClient
    .url('/locations')
    .query(deps)
    .get()
    .json<ListResponse<Location>>()
  return response
}

export const getLocationOptions = async (deps: string | object) => {
  const { data } = await getLocations(deps)
  return data
}

export const findLocationById = async (id: string) => {
  const response = await fetchClient
    .url(`/locations/${id}`)
    .get()
    .json<Location>()
  return response
}

export const createLocation = async (data: object) => {
  const response = await fetchClient
    .url('/locations')
    .post(data)
    .json<Location>()
  return response
}
