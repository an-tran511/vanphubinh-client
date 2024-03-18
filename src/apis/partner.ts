import { fetchClient } from '@/utils/fetchClient'
import { ListResponse } from './types'
import { Partner } from '@/validators/partner'
import { cp } from 'fs'

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
