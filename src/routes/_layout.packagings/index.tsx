import { ActionIcon, Box, Group, TextInput } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import {
  createFileRoute,
  getRouteApi,
  useNavigate,
} from '@tanstack/react-router'
import { DataTable } from 'mantine-datatable'
import { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { fallback, number, object, parse, string } from 'valibot'
import classes from '@/components/table/Table.module.css'
import { List } from '@/components/crud/list'
import { packagingsQueryOptions } from '@/apis/queryOptions'
import { Eye } from '@phosphor-icons/react'
import { type Packaging } from '@/validators/packaging'

const packagingsSearchSchema = object({
  page: fallback(number(), 1),
  searchValue: fallback(string(), ''),
  // filter: z.string().catch(''),
  // sort: z.enum(['newest', 'oldest', 'price']).catch('newest'),
})

export const Route = createFileRoute('/_layout/packagings/')({
  component: ListComponent,
  validateSearch: (search) => parse(packagingsSearchSchema, search),
  preSearchFilters: [
    (search) => ({
      ...search,
      page: search.page ?? 1,
      searchValue: search.searchValue ?? '',
    }),
  ],
  loaderDeps: (search) => search.search,
  loader: ({ context: { queryClient }, deps }) =>
    queryClient.ensureQueryData(packagingsQueryOptions({ deps })),
})

const routeApi = getRouteApi('/_layout/packagings/')

function ListComponent() {
  const navigate = useNavigate({ from: Route.fullPath })

  const { page, searchValue } = routeApi.useSearch()
  const [searchValueDraft, setSearchValueDraft] = useState(searchValue ?? '')

  const { data, isFetching } = useQuery(
    packagingsQueryOptions({
      deps: { page, searchValue },
    }),
  )

  const meta = data?.meta
  const packagings = data?.data
  const columns = [
    {
      accessor: 'itemCode',
      title: 'Mã sản phẩm',
    },
    {
      accessor: 'name',
      title: 'Tên bao bì',
    },

    {
      accessor: 'uom.name',
      title: 'Dơn vị tính',
    },
    {
      accessor: 'customer.name',
      title: 'Khách hàng',
    },
    {
      accessor: 'notes',
      title: 'Ghi chú',
    },
    {
      accessor: 'actions',
      title: 'Hành động',
      render: (packaging: Packaging) => (
        <Group>
          <ActionIcon
            size="sm"
            variant="light"
            onClick={() => navigate({ to: `/packagings/${packaging.id}` })}
          >
            <Eye size={12} weight="bold" />
          </ActionIcon>
        </Group>
      ),
    },
  ]

  function handleSearch(searchValue: string) {
    navigate({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      search: (old: any) => ({
        ...old,
        searchValue,
        page: 1,
      }),
    })
  }

  const pagination = {
    page: meta?.currentPage ?? 1,
    lastPage: meta?.lastPage ?? 1,
    total: meta?.total ?? 0,
    onPageChange: (nextPage: number) => {
      navigate({
        search: () => ({ page: nextPage, searchValue: searchValueDraft }),
      })
    },
    isLoading: isFetching,
  }

  const debounced = useDebouncedCallback(handleSearch, 500)

  return (
    <List
      title="Bao bì"
      onCreateHandler={() => navigate({ to: '/packagings/create' })}
      pagination={pagination}
    >
      <Box px={{ base: 'lg', md: 'xl' }} py="md" bg="white">
        <Group>
          <TextInput
            visibleFrom="md"
            radius="md"
            placeholder="Tìm kiếm"
            value={searchValueDraft}
            onChange={(event) => {
              setSearchValueDraft(event.currentTarget.value)
              debounced(event.target.value)
            }}
          />
          <TextInput
            size="xs"
            hiddenFrom="md"
            radius="md"
            placeholder="Tìm kiếm"
            value={searchValueDraft}
            onChange={(event) => {
              setSearchValueDraft(event.currentTarget.value)
              debounced(event.target.value)
            }}
          />
        </Group>
      </Box>
      <DataTable
        withTableBorder={false}
        minHeight={180}
        classNames={{
          header: classes.header,
          table: classes.table,
        }}
        scrollAreaProps={{
          style: {
            minWidth: 'calc(300px)',
            overflowY: 'auto',
          },
        }}
        fetching={isFetching}
        highlightOnHover
        columns={columns}
        records={packagings}
        verticalSpacing="sm"
        verticalAlign="top"
        noRecordsText="Không có dữ liệu"
      />
    </List>
  )
}
