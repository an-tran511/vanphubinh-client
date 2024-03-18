import { keepPreviousData, queryOptions } from '@tanstack/react-query'
import { getPartners } from './partner'

export const partnersQueryOptions = ({ deps }: { deps: string | object }) =>
  queryOptions({
    queryKey: ['partners', deps],
    queryFn: () => getPartners(deps),
    placeholderData: keepPreviousData,
    select: (data) => data,
  })
