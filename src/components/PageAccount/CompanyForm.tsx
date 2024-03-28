import React from 'react'
import { useForm } from 'react-hook-form'
import { TextField, Button } from '@mui/material'
import { TEditUserSchema } from '../../utils/editUserProfile'

interface CompanyFormProps {
	onSubmit: (data: TEditUserSchema) => void
}

const CompanyForm: React.FC<CompanyFormProps> = ({ onSubmit }) => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<TEditUserSchema>()

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<TextField {...register('name')} label='Company Name' />
			{/* Остальные поля */}
			<Button type='submit' disabled={isSubmitting}>
				Save
			</Button>
		</form>
	)
}

export default CompanyForm
