/* eslint-disable @typescript-eslint/no-explicit-any */
import { PartnerSelect } from '@/components/select/PartnerSelect'
import {
  Card,
  Group,
  Stack,
  Button,
  Box,
  Table,
  Center,
  ActionIcon,
  Text,
  Space,
  SimpleGrid,
  Tooltip,
} from '@mantine/core'
import { Control, UseFormGetValues, useFieldArray } from 'react-hook-form'
import { NumberInput, TextInput } from 'react-hook-form-mantine'
import classes from '@/components/input/Input.module.css'
import { LocationSelect } from '@/components/select/LocationSelect'
import tableClasses from '@/components/table/Table.module.css'
import { MouldMakerSelect } from '@/components/select/MouldMakerSelect'
import { Trash, WarningCircle } from '@phosphor-icons/react'
import { PackagingSelect } from '@/components/select/PackagingSelect'

interface MouldCreateFormProps {
  control: Control<any>
  getValues: UseFormGetValues<any>
  errors?: any
}
export const MouldCreateForm = (props: MouldCreateFormProps) => {
  const { control, getValues, errors } = props
  const { fields, append, remove } = useFieldArray({
    control: control,
    name: 'moulds',
  })

  const columns = [
    {
      title: 'Tên',
      width: '30%',
    },
    {
      title: 'Bao bì    ',
      width: '30%',
    },
    {
      title: 'Kich thước',
      width: '10%',
    },

    {
      title: 'Số cây trục',
      width: '10%',
    },
    {
      title: 'Vị trí',
    },
    {
      title: '',
    },
  ]

  const body = []
  for (let i = 0; i < fields.length; i++) {
    body.push([
      <Group grow>
        <TextInput
          control={control}
          name={`moulds.${i}.name`}
          radius="md"
          error={!!errors?.moulds?.[i]?.name}
          rightSection={
            errors?.moulds?.[i]?.name && (
              <Tooltip label={errors?.moulds?.[i]?.name?.message}>
                <WarningCircle size={16} />
              </Tooltip>
            )
          }
          classNames={{
            input: classes.input,
          }}
        />
      </Group>,
      <PackagingSelect
        control={control}
        name={`moulds.${i}.packaging`}
        error={!!errors?.moulds?.[i]?.packaging}
        rightSection={
          errors?.moulds?.[i]?.name && (
            <Tooltip label={errors?.moulds?.[i]?.packaging?.message}>
              <WarningCircle size={16} />
            </Tooltip>
          )
        }
        classNames={{
          input: classes.input,
        }}
      />,
      <TextInput
        control={control}
        name={`moulds.${i}.dimension`}
        error={!!errors?.moulds?.[i]?.dimension}
        rightSection={
          errors?.moulds?.[i]?.dimension && (
            <Tooltip label={errors?.moulds?.[i]?.dimension?.message}>
              <WarningCircle size={16} />
            </Tooltip>
          )
        }
        radius="md"
        classNames={{
          input: classes.input,
        }}
      />,
      <NumberInput
        control={control}
        name={`moulds.${i}.numberOfMoulds`}
        error={!!errors?.moulds?.[i]?.numberOfMoulds}
        hideControls
        classNames={{
          input: classes.input,
        }}
        rightSection={
          errors?.moulds?.[i]?.numberOfMoulds && (
            <Tooltip label={errors?.moulds?.[i]?.numberOfMoulds?.message}>
              <WarningCircle size={16} />
            </Tooltip>
          )
        }
      />,
      <LocationSelect
        control={control}
        name={`moulds.${i}.location`}
        classNames={{
          input: classes.input,
        }}
      />,
      <Center>
        <ActionIcon
          aria-label="Remove row"
          variant="transparent"
          color="red"
          bg="white"
          disabled={fields.length === 1}
        >
          <Trash
            onClick={() => {
              remove(i)
            }}
          />
        </ActionIcon>
      </Center>,
    ])
  }

  return (
    <Card shadow="0" radius="0" px={{ base: 'md', md: 'lg' }}>
      <SimpleGrid cols={{ base: 1, md: 2 }}>
        <PartnerSelect control={control} name={`customer`} label="Khách hàng" />
        <MouldMakerSelect
          control={control}
          name="defaultSupplier"
          label="Nhà trục"
        />
      </SimpleGrid>
      <Space h="lg" />

      <Stack gap="2">
        <Text fw="500" size="sm">
          Danh sách trục
        </Text>
        <Box
          visibleFrom="md"
          style={{
            border: '1px solid #E0E0E0',
            borderRadius: `var(--mantine-radius-md)`,
          }}
        >
          <Table
            withColumnBorders
            classNames={{
              table: tableClasses.table,
              thead: tableClasses.thead,
              tfoot: tableClasses.tfoot,
            }}
          >
            <Table.Thead>
              <Table.Tr>
                {columns.map((column, index) => (
                  <Table.Th key={index} w={column.width} maw={column.width}>
                    {column.title}
                  </Table.Th>
                ))}
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {body.map((row, index) => (
                <Table.Tr key={index}>
                  {row.map((cell, index) => (
                    <Table.Td
                      styles={{
                        td: {
                          padding: '0',
                        },
                      }}
                      key={index}
                    >
                      {cell}
                    </Table.Td>
                  ))}
                </Table.Tr>
              ))}
            </Table.Tbody>
            <Table.Tfoot>
              <Table.Tr>
                <Table.Td>
                  <Group gap="lg">
                    <Button
                      p="0"
                      variant="transparent"
                      size="xs"
                      onClick={() =>
                        append({
                          name: '',
                          packaging: null,
                          dimension: '',
                          location: null,
                          numberOfMoulds: 0,
                        })
                      }
                    >
                      Thêm dòng
                    </Button>
                    <Button
                      variant="transparent"
                      size="xs"
                      p="0"
                      bg="white"
                      disabled={fields.length === 0}
                      onClick={() => {
                        const lastRow = fields.length - 1
                        const lastRowValues = getValues(`moulds.${lastRow}`)
                        append(lastRowValues)
                      }}
                    >
                      Copy dòng cuối
                    </Button>
                  </Group>
                </Table.Td>
              </Table.Tr>
            </Table.Tfoot>
          </Table>
        </Box>
      </Stack>
    </Card>
  )
}
