import { z } from 'zod'

const AddressSchema = z.object({
	street: z.string().optional(),
	suite: z.string().optional(),
	city: z.string().optional(),
	zipcode: z.string().optional(),
	geo: z.object({
		lat: z.string().optional(),
		lng: z.string().optional(),
	}),
})

const CompanySchema = z.object({
	name: z.string().optional(),
	catchPhrase: z.string().optional(),
	bs: z.string().optional(),
})

export const editUserSchema = z.object({
	id: z.number(),
	name: z.string().min(3, 'Name must be at least 3 characters').optional(),
	username: z
		.string()
		.min(3, 'Username must be at least 3 characters')
		.optional(),
	email: z.string().email().optional(),
	phone: z
		.string()
		.min(10, 'Phone must be at least 10 digits')
		.max(11, 'Phone must be at most 11 digits')
		.refine(value => /^\d+$/.test(value), {
			message: 'Phone must contain only digits',
		})
		.optional(),

	website: z.union([z.string().url(), z.string().nullable()]),
	address: AddressSchema.optional(),
	company: CompanySchema.optional(),
})

export type TEditUserSchema = z.infer<typeof editUserSchema>
