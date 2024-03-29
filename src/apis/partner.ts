import { fetchClient } from '@/utils/fetchClient'
import { ListResponse } from './types'
import { Partner } from '@/validators/partner'

export const getPartners = async (deps: string | object) => {
  const response = await fetchClient
    .url('/partners')
    .query(deps)
    .get()
    .json<ListResponse<Partner>>()
  return response
}

export const getPartnerOptions = async (deps: string | object) => {
  const { data } = await getPartners(deps)
  return data
}

export const createPartner = async (data: object) => {
  const response = await fetchClient.url('/partners').post(data).json<Partner>()
  return response
}

export const updatePartner = async ({
  partnerId,
  data,
}: {
  partnerId: string
  data: object
}) => {
  const response = await fetchClient
    .url(`/partners/${partnerId}`)
    .put(data)
    .json<Partner>()
  return response
}

export const findPartnerById = async (partnerId: string) => {
  console.log(partnerId)
  const response = await fetchClient
    .get(`/partners/${partnerId}`)
    .json<Partner>()
  return response
}

export const getMouldMakers = async (deps: string | object) => {
  const response = await fetchClient
    .url('/partners/mould-makers')
    .query(deps)
    .get()
    .json<ListResponse<Partner>>()
  return response
}

export const getMouldMakersOptions = async (deps: string | object) => {
  const { data } = await getMouldMakers(deps)
  return data
}
