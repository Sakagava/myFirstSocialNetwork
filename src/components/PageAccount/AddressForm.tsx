import React from 'react'
import { useForm } from 'react-hook-form'
import { TextField, Button } from '@mui/material'
import { TEditUserSchema } from '../../utils/editUserProfile'

interface AddressFormProps {
	onSubmit: (data: TEditUserSchema) => void
}

const AddressForm: React.FC<AddressFormProps> = ({ onSubmit }) => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<TEditUserSchema>()

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<TextField {...register('address.street')} label='Street' />
			{/* Остальные поля */}
			<Button type='submit' disabled={isSubmitting}>
				Save
			</Button>
		</form>
	)
}

export default AddressForm
