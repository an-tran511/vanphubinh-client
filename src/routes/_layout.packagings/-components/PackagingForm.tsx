import { Text, Card, Tabs, Stack, Divider } from '@mantine/core'
import { Cylinder, Info } from '@phosphor-icons/react'
import { Control } from 'react-hook-form'
import { Textarea } from 'react-hook-form-mantine'
import { Packaging } from '@/validators/packaging'
import { GeneralSection } from '@/routes/_layout.items/-components/GeneralSection'
import { PackagingAttributesSection } from './PackagingAttributesSection'

interface PackagingFormProps {
  control: Control<Packaging>
  viewType: 'create' | 'detail'
}

export function PackagingForm(props: PackagingFormProps) {
  const { control } = props

  return (
    <Card shadow="0" radius="0" px={{ base: 'lg', md: 'lg' }}>
      <Textarea
        name="name"
        control={control}
        autosize
        // ref={focusTrapRef}
        minRows={1}
        withAsterisk
        radius="md"
        variant="unstyled"
        label="Tên hàng hoá"
        styles={{
          input: {
            // biome-ignore lint/complexity/useLiteralKeys: <explanation>
            fontSize: '1.5rem',
            '&[dataError]': {
              border: '5px solid green',
            },
          },
          wrapper: {
            '&[dataError]': {
              border: '5px solid green',
            },
          },
        }}
      />
      <Tabs defaultValue="info">
        <Tabs.List>
          <Tabs.Tab value="info" leftSection={<Info size={16} />}>
            Thông tin chung
          </Tabs.Tab>
          <Tabs.Tab value="mould" leftSection={<Cylinder size={16} />}>
            Trục in
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="info">
          <Stack>
            <Stack mt="md">
              <Text fw="500" size="sm" c="">
                Thông tin cơ bản
              </Text>
              <GeneralSection control={control} />
            </Stack>
            <Divider />
            <Stack>
              <Text fw="500" size="sm" c="">
                Thông số khác
              </Text>
              <PackagingAttributesSection control={control} />
            </Stack>
          </Stack>
        </Tabs.Panel>
      </Tabs>
    </Card>
  )
}
