import {
  Group,
  Stack,
  Card,
  Box,
  Button,
  Title,
  Pagination,
  Text,
  em,
  ActionIcon,
} from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { Plus } from '@phosphor-icons/react'
import { ReactNode } from 'react'

interface ListProps {
  children: ReactNode
  title: string
  onCreateHandler: () => void
  pagination?: {
    isLoading: boolean
    total: number
    page: number
    lastPage: number
    onPageChange: (page: number) => void
  }
}

export const List = (props: ListProps) => {
  const { title, children, onCreateHandler, pagination } = props
  const {
    page,
    onPageChange,
    lastPage = 0,
    isLoading,
    total,
  } = pagination ?? {}
  const isTablet = useMediaQuery(`(max-width: ${em(801)})`)

  return (
    <Stack h={{ base: 'calc(100vh - 60px)', md: '100vh' }} gap="0">
      <Box
        px={{ base: 'lg', md: 'xl' }}
        py="md"
        style={{
          borderBottom: '1px solid var(--mantine-color-gray-3)',
        }}
      >
        <Group justify="space-between">
          <Group>
            <Title order={isTablet ? 4 : 2}>{title}</Title>
          </Group>
          <Group justify="flex-end" gap="xs">
            {isTablet ? (
              <ActionIcon
                size="md"
                aria-label="Settings"
                onClick={onCreateHandler}
              >
                <Plus size={14} weight="bold" />
              </ActionIcon>
            ) : (
              <Button
                size={isTablet ? 'xs' : 'sm'}
                variant="filled"
                justify="space-between"
                onClick={onCreateHandler}
                radius="md"
              >
                Tạo
              </Button>
            )}
          </Group>
        </Group>
      </Box>
      <Card py="0" px="0" h="100%" mah="100%">
        {children}
      </Card>
      {page && onPageChange && (
        <Box px={{ base: 'md', md: 'lg' }}>
          <Group justify="space-between" py="xs" visibleFrom="md">
            <Text size="sm" c="dimmed">
              Hiện{' '}
              <b>
                {(page - 1) * 30 + 1} - {page === lastPage ? total : page * 30}
              </b>{' '}
              trong tổng <b>{total}</b>
            </Text>
            <Pagination
              size="sm"
              disabled={isLoading}
              value={page}
              onChange={onPageChange}
              total={lastPage}
              withEdges
              radius="xl"
            />
          </Group>
          <Group
            justify="space-between"
            py={{ base: 'xs', md: 'sm' }}
            hiddenFrom="md"
          >
            <Text c="dimmed" size="xs">
              <b>
                {(page - 1) * 30 + 1} - {page === lastPage ? total : page * 30}
              </b>{' '}
              / <b>{total}</b>
            </Text>
            <Pagination.Root
              total={lastPage}
              disabled={isLoading}
              size="xs"
              onChange={onPageChange}
              radius="xl"
            >
              <Group gap={7} justify="center">
                <Pagination.Previous />
                <Text size="xs">
                  {page} / {lastPage}
                </Text>
                <Pagination.Next />
              </Group>
            </Pagination.Root>
          </Group>
        </Box>
      )}
    </Stack>
  )
}
