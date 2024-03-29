import {
  Input,
  object,
  string,
  toTrimmed,
  email,
  minLength,
  union,
  literal,
} from 'valibot'

export const PartnerInputSchema = object({
  name: string([minLength(1, 'Trường bắt buộc')]),
  phone: string(),
  email: union([
    string([toTrimmed(), email('Email không hợp lệ')]),
    literal(''),
  ]),
  address: string(),
  notes: string(),
})

export type Partner = Input<typeof PartnerInputSchema> & {
  id: string
}
