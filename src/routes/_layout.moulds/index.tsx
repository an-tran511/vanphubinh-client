import { ActionIcon, Box, Group, TextInput, Text } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import {
  createFileRoute,
  getRouteApi,
  useNavigate,
} from '@tanstack/react-router'
import { DataTable, DataTableColumnTextAlign } from 'mantine-datatable'
import { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { fallback, number, object, parse, string } from 'valibot'
import classes from '@/components/table/Table.module.css'
import { List } from '@/components/crud/list'
import { mouldsQueryOptions } from '@/apis/queryOptions'
import { Eye } from '@phosphor-icons/react'
import { type Mould } from '@/validators/mould'

const mouldsSearchSchema = object({
  page: fallback(number(), 1),
  searchValue: fallback(string(), ''),
  // filter: z.string().catch(''),
  // sort: z.enum(['newest', 'oldest', 'price']).catch('newest'),
})

export const Route = createFileRoute('/_layout/moulds/')({
  component: ListComponent,
  validateSearch: (search) => parse(mouldsSearchSchema, search),
  preSearchFilters: [
    (search) => ({
      ...search,
      page: search.page ?? 1,
      searchValue: search.searchValue ?? '',
    }),
  ],
  loaderDeps: (search) => search.search,
  loader: ({ context: { queryClient }, deps }) =>
    queryClient.ensureQueryData(mouldsQueryOptions({ deps })),
})

const routeApi = getRouteApi('/_layout/moulds/')

function ListComponent() {
  const navigate = useNavigate({ from: Route.fullPath })

  const { page, searchValue } = routeApi.useSearch()
  const [searchValueDraft, setSearchValueDraft] = useState(searchValue ?? '')

  const { data, isFetching } = useQuery(
    mouldsQueryOptions({
      deps: { page, searchValue },
    }),
  )

  const meta = data?.meta
  const moulds = data?.data
  const columns = [
    {
      accessor: 'itemCode',
      title: 'Mã trục in',
      textAlign: 'right' as DataTableColumnTextAlign,
      width: '10%',
      render: (mould: Mould) => (
        <Text
          style={{
            fontSize: '0.875rem',
            textWrap: 'nowrap',
          }}
        >
          {mould.itemCode}
        </Text>
      ),
    },
    {
      accessor: 'name',
      title: 'Tên trục in',
      width: '30%',
    },

    {
      accessor: 'uom.name',
      title: 'Đơn vị tính',
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
      render: (mould: Mould) => (
        <Group>
          <ActionIcon
            size="sm"
            variant="light"
            onClick={() => navigate({ to: `/moulds/${mould.id}` })}
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
      title="Trục in"
      onCreateHandler={() => navigate({ to: '/moulds/create' })}
      pagination={pagination}
    >
      <Box px="lg" py="md" bg="white">
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
            overflowY: 'auto',
          },
        }}
        fetching={isFetching}
        highlightOnHover
        columns={columns}
        records={moulds}
        verticalSpacing="sm"
        verticalAlign="top"
        noRecordsText="Không có dữ liệu"
      />
    </List>
  )
}
