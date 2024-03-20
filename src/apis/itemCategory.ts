import { fetchClient } from '@/utils/fetchClient'
import { ListResponse } from './types'
import { ItemCategory } from '@/validators/itemCategory'

export const getItemCategories = async (deps: string | object) => {
  const response = await fetchClient
    .url('/item-categories')
    .query(deps)
    .get()
    .json<ListResponse<ItemCategory>>()
  return response
}

export const getItemCategoryOptions = async (deps: string | object) => {
  const { data } = await getItemCategories(deps)
  return data
}
export const createItemCategory = async (data: object) => {
  const response = await fetchClient
    .url('/item-categories')
    .post(data)
    .json<ItemCategory>()
  return response
}
