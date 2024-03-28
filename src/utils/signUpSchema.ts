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

export const signUpSchema = z
	.object({
		name: z.string().min(3, 'Name must be at least 3 characters'),
		username: z.string().min(3, 'Username must be at least 3 characters'),
		email: z.string().email(),
		phone: z
			.string()
			.min(10, 'Phone must be at least 10 digits')
			.max(11, 'Phone must be at most 11 digits')
			.refine(value => /^\d+$/.test(value), {
				message: 'Phone must contain only digits',
			}),

		website: z.union([z.string().url(), z.string().nullable()]),
		password: z.string().min(11, 'Password must be at least 11 digits'),
		confirmPassword: z
			.string()
			.min(11, 'Password must be at least 11 digits')
			.optional(),
		address: AddressSchema.optional(),
		company: CompanySchema.optional(),
	})
	.refine(data => data.password === data.confirmPassword, {
		message: 'Passwords must match',
		path: ['confirmPassword'],
	})

export type TSignUpSchema = z.infer<typeof signUpSchema>
