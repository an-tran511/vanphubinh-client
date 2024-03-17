import { createFileRoute } from '@tanstack/react-router'
import { Center, Stack, Text } from '@mantine/core'

export const Route = createFileRoute('/_layout/')({
  component: Index,
})

function Index() {
  return (
    <Stack h={{ base: 'calc(100vh - 60px)', md: '100vh' }} gap="0">
      <Center h="100%">
        <Text size="xl">Trang trong quá trình xây dựng</Text>
      </Center>
    </Stack>
  )
}
