import { ActionIcon, Badge, Box, Group, TextInput } from '@mantine/core'
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
import { purchaseMouldOrdersQueryOptions } from '@/apis/queryOptions'
import { Eye } from '@phosphor-icons/react'
import { PurchaseMouldOrder } from '@/validators/purchaseMouldOrder'

const purchaseMouldOrdersSearchSchema = object({
  page: fallback(number(), 1),
  searchValue: fallback(string(), ''),
  // filter: z.string().catch(''),
  // sort: z.enum(['newest', 'oldest', 'price']).catch('newest'),
})

export const Route = createFileRoute('/_layout/purchase-mould-orders/')({
  component: ListComponent,
  validateSearch: (search) => parse(purchaseMouldOrdersSearchSchema, search),
  preSearchFilters: [
    (search) => ({
      ...search,
      page: search.page ?? 1,
      searchValue: search.searchValue ?? '',
    }),
  ],
  loaderDeps: (search) => search.search,
  loader: ({ context: { queryClient }, deps }) =>
    queryClient.ensureQueryData(purchaseMouldOrdersQueryOptions({ deps })),
})

const routeApi = getRouteApi('/_layout/purchase-mould-orders/')

function ListComponent() {
  const navigate = useNavigate({ from: Route.fullPath })

  const { page, searchValue } = routeApi.useSearch()
  const [searchValueDraft, setSearchValueDraft] = useState(searchValue ?? '')

  const { data, isFetching } = useQuery(
    purchaseMouldOrdersQueryOptions({
      deps: { page, searchValue },
    }),
  )

  const meta = data?.meta
  const purchaseMouldOrders = data?.data
  const columns = [
    {
      accessor: 'id',
      title: 'Mã lệnh',
      width: '10%',
      textAlign: 'right' as DataTableColumnTextAlign,
    },
    {
      accessor: 'mould.name',
      title: 'Trục',
      width: '23%',
    },
    {
      accessor: 'type',
      title: 'Loại đơn hàng',
      render: (order: PurchaseMouldOrder) => {
        switch (order.type) {
          case 'new':
            return (
              <Badge variant="filled" color="blue.2" size="sm" autoContrast>
                Làm mới
              </Badge>
            )
          case 'repair':
            return (
              <Badge variant="filled" color="orange.2" size="sm" autoContrast>
                Sửa chữa
              </Badge>
            )
          case 'replace':
            return (
              <Badge variant="filled" color="green.2" size="sm" autoContrast>
                Tận dụng lõi, khắc lại
              </Badge>
            )
          default:
            return (
              <Badge variant="filled" color="grape.2" size="sm" autoContrast>
                Bảo hành
              </Badge>
            )
        }
      },
    },
    {
      accessor: 'supplier.name',
      title: 'Nhà trục',
    },
    {
      accessor: 'quantity',
      title: 'Số lượng',
    },
    {
      accessor: 'notes',
      title: 'Ghi chú',
    },

    {
      accessor: 'status',
      title: 'Trạng thái đơn hàng',
      render: (order: PurchaseMouldOrder) => {
        switch (order.status) {
          case 'mould_issue':
            return (
              <Badge variant="outline" color="orange" size="sm">
                Xuất trục sửa
              </Badge>
            )
          case 'new':
            return (
              <Badge variant="outline" color="gray" size="sm">
                Mới
              </Badge>
            )
          case 'ongoing':
            return (
              <Badge variant="outline" color="blue" size="sm">
                Đang tiến hành
              </Badge>
            )
          case 'completed':
            return (
              <Badge variant="outline" color="green" size="sm">
                Hoàn thành
              </Badge>
            )
          default:
            return (
              <Badge variant="outline" color="red" size="sm">
                Đã hủy
              </Badge>
            )
        }
      },
    },
    {
      accessor: 'actions',
      title: 'Hành động',
      render: (partner: PurchaseMouldOrder) => (
        <Group>
          <ActionIcon
            size="sm"
            variant="light"
            onClick={() =>
              navigate({ to: `/purchaseMouldOrders/${partner.id}` })
            }
          >
            <Eye size={12} weight="bold" />
          </ActionIcon>
        </Group>
      ),
    },
  ]

  const handleSearch = (searchValue: string) => {
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
      title="Lệnh đặt trục"
      onCreateHandler={() => navigate({ to: '/purchase-mould-orders/create' })}
      pagination={pagination}
    >
      <Box px={{ base: 'lg', md: 'lg' }} py="md" bg="white">
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
        records={purchaseMouldOrders}
        verticalSpacing="sm"
        verticalAlign="top"
        noRecordsText="Không có dữ liệu"
      />
    </List>
  )
}
