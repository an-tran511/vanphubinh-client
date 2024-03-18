import { keepPreviousData, queryOptions } from '@tanstack/react-query'
import { getPartners, findPartnerById } from './partner'

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
