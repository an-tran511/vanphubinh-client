/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import {
  Combobox,
  Input,
  InputBase,
  Loader,
  useCombobox,
  SelectProps,
  Factory,
  factory,
  useProps,
  CloseButton,
  Text,
} from '@mantine/core'
import classes from './Combobox.module.css'

export type CreatableComboboxProps = Omit<SelectProps, 'onChange' | 'ref'> & {
  label?: string
  withAsterisk?: boolean
  data?: unknown[]
  getOptionValue: (item: any) => string
  getOptionLabel: (item: any) => string
  loadOptions: (inputValue: string) => Promise<unknown[]>
  searchValue?: string
  onChange?: (item: unknown) => void
  inputClassNames?: any
}
export type SelectFactory = Factory<{
  props: CreatableComboboxProps
  ref: HTMLInputElement
}>

const defaultProps: Partial<CreatableComboboxProps> = {}

export const CreatableCombobox = factory<SelectFactory>((_props, ref) => {
  const props: CreatableComboboxProps = useProps(
    'CreatableComboboxProps',
    defaultProps,
    _props,
  )

  const {
    label,
    value,
    withAsterisk,
    getOptionValue,
    getOptionLabel,
    loadOptions,
    searchValue = '',
    onChange,
    classNames,
    placeholder,
    error,
  } = props
  const [search, setSearch] = useState(searchValue)
  const [shouldSearch, setShouldSearch] = useState(false)
  const [data, setData] = useState<unknown[]>([])
  const [loading, setLoading] = useState(false)
  const [initialOptions, setInitialOptions] = useState<unknown[]>([])

  const combobox = useCombobox({
    onDropdownClose: () => {
      combobox.resetSelectedOption()
      combobox.focusTarget()
      setShouldSearch(false)
      setSearch('')
      setData(initialOptions)
    },

    onDropdownOpen: () => {
      combobox.focusSearchInput()
    },
  })
  useEffect(() => {
    setLoading(true)
    loadOptions(search)
      .then((options) => {
        setData(options)
        setInitialOptions(options)
      })
      .finally(() => {
        setLoading(false)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (shouldSearch) {
      setLoading(true)
      loadOptions(search)
        .then((options) => {
          setData(options)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [search, shouldSearch, loadOptions])

  const options = data.map((item) => (
    <Combobox.Option
      value={getOptionValue?.(item)}
      key={getOptionValue?.(item)}
    >
      <Text size="sm" lineClamp={3}>
        {getOptionLabel?.(item)}
      </Text>
    </Combobox.Option>
  ))

  const getLabel = () => {
    if (value) {
      return getOptionLabel(value)
    }
    return (
      <Input.Placeholder>
        <Text size="sm" truncate="end">
          {placeholder}
        </Text>
      </Input.Placeholder>
    )
  }

  return (
    <Combobox
      store={combobox}
      withinPortal={true}
      classNames={{
        option: classes.option,
        dropdown: classes.dropdown,
      }}
      onOptionSubmit={(val) => {
        const nextValue =
          data?.find((item) => getOptionValue(item) === val) ?? null
        combobox.closeDropdown()
        onChange?.(nextValue)
      }}
    >
      <Combobox.Target>
        <InputBase
          error={error}
          classNames={classNames}
          label={label ?? ''}
          withAsterisk={withAsterisk}
          component="button"
          type="button"
          pointer
          rightSection={
            loading ? (
              <Loader size="xs" />
            ) : value !== null ? (
              <CloseButton
                size="sm"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => {
                  onChange?.(null)
                }}
              />
            ) : (
              <Combobox.Chevron />
            )
          }
          onClick={() => combobox.toggleDropdown()}
          rightSectionPointerEvents={value === null ? 'none' : 'all'}
        >
          {getLabel()}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Search
          ref={ref}
          value={search}
          onChange={(event) => {
            combobox.updateSelectedOptionIndex()
            setSearch(event.currentTarget.value)
            setShouldSearch(true)
          }}
          placeholder="Tìm kiếm..."
        />
        <Combobox.Options mah={300} style={{ overflowY: 'auto' }}>
          {loading ? (
            <Combobox.Empty>Đang tải...</Combobox.Empty>
          ) : options.length > 0 ? (
            options
          ) : (
            <Combobox.Empty>Không tìm thấy kết quả</Combobox.Empty>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  )
})
