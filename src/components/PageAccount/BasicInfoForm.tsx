import React from 'react'
import { useForm } from 'react-hook-form'
import { TextField, Button } from '@mui/material'
import { TEditUserSchema, editUserSchema } from '../../utils/editUserProfile'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAppDispatch, useAppSelector } from '../../store/rtkHooks'
import { patchAuthUser } from '../../store/users'
import { useNavigate } from 'react-router-dom'

const BasicInfoForm: React.FC = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const authUser = useAppSelector(state => state.users.authUser)
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<TEditUserSchema>({ resolver: zodResolver(editUserSchema) })

	const onSubmit = (data: TEditUserSchema) => {
		const editUser = structuredClone(data)
		const finalUser: TEditUserSchema = structuredClone(editUser)
		dispatch(patchAuthUser({ ...finalUser, id: authUser.id }))
		reset()
		navigate(`/posts`)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<TextField
				{...register('name')}
				required
				id='outlined-required-name'
				label='Name'
				name='name'
				value={authUser.name}
				helperText={errors.name && `${errors.name.message}`}
			/>
			<TextField
				{...register('username')}
				required
				id='outlined-required-username'
				label='Username'
				name='username'
				value={authUser.username}
				helperText={errors.username && `${errors.username.message}`}
			/>
			<TextField
				{...register('email')}
				required
				id='outlined-required-email'
				label='Email'
				name='email'
				value={authUser.email}
				helperText={errors.email && `${errors.email.message}`}
			/>
			<TextField
				{...register('phone')}
				required
				id='outlined-required-phone'
				label='Phone'
				name='phone'
				value={authUser.phone}
				helperText={errors.phone && `${errors.phone.message}`}
			/>
			<TextField
				{...register('website', { required: false })}
				id='outlined-website'
				label='Website'
				name='website'
				value={authUser.website}
				helperText={errors.website && `${errors.website.message}`}
			/>
			<Button type='submit' disabled={isSubmitting}>
				Save
			</Button>
		</form>
	)
}

export default BasicInfoForm
