import { keepPreviousData, queryOptions } from '@tanstack/react-query'
import { getPartners, findPartnerById } from './partner'
import { getPackagings, findPackagingById } from './packaging'
import { findLocationById, getLocations } from './location'
import { getWarehouses } from './warehouse'
import { getMoulds } from './mould'

export const partnersQueryOptions = ({ deps }: { deps: string | object }) =>
  queryOptions({
    queryKey: ['partners', deps],
    queryFn: () => getPartners(deps),
    placeholderData: keepPreviousData,
    select: (data) => data,
  })
export const singlePartnerQueryOption = ({ id }: { id: string }) =>
  queryOptions({
    queryKey: ['partners', id],
    queryFn: () => findPartnerById(id),
  })

export const packagingsQueryOptions = ({ deps }: { deps: string | object }) =>
  queryOptions({
    queryKey: ['packagings', deps],
    queryFn: () => getPackagings(deps),
    placeholderData: keepPreviousData,
    select: (data) => data,
  })
export const findPackagingByIdQueryOptions = ({ id }: { id: string }) =>
  queryOptions({
    queryKey: ['packagings', id],
    queryFn: () => findPackagingById(id),
  })

export const locationsQueryOptions = ({ deps }: { deps: string | object }) =>
  queryOptions({
    queryKey: ['locations', deps],
    queryFn: () => getLocations(deps),
    placeholderData: keepPreviousData,
    select: (data) => data,
  })

export const findLocationByIdQueryOptions = ({ id }: { id: string }) =>
  queryOptions({
    queryKey: ['locations', id],
    queryFn: () => findLocationById(id),
  })

export const warehousesQueryOptions = ({ deps }: { deps: string | object }) =>
  queryOptions({
    queryKey: ['warehouses', deps],
    queryFn: () => getWarehouses(deps),
    placeholderData: keepPreviousData,
    select: (data) => data,
  })

export const findWarehouseByIdQueryOptions = ({ id }: { id: string }) =>
  queryOptions({
    queryKey: ['warehouses', id],
    queryFn: () => findLocationById(id),
  })
export const mouldsQueryOptions = ({ deps }: { deps: string | object }) =>
  queryOptions({
    queryKey: ['moulds', deps],
    queryFn: () => getMoulds(deps),
    placeholderData: keepPreviousData,
    select: (data) => data,
  })
