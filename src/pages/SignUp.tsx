import { CenteringWrap } from '../styles/utils'
import { Title } from '../components/Title'
import {
	TextField,
	Button,
	Typography,
	InputAdornment,
	IconButton,
} from '@mui/material'
import { useState } from 'react'
import { useAppDispatch } from '../store/rtkHooks'
import { signUp } from '../store/users'
import { useNavigate } from 'react-router-dom'
import { InnerWrap } from '../styles/SignUp'
import { useFetchUsers } from '../hooks/useCheckUsers'
import { TUserSignUp } from '../types/TUsers'
import { useForm } from 'react-hook-form'
import { TSignUpSchema, signUpSchema } from '../utils/signUpSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

export const Registration = () => {
	const dispatch = useAppDispatch()
	let navigate = useNavigate()
	const [showPassword, setShowPassword] = useState(false)
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<TSignUpSchema>({
		resolver: zodResolver(signUpSchema),
	})

	const onSubmit = (data: TSignUpSchema) => {
		const SignUpUser = structuredClone(data)
		delete SignUpUser.confirmPassword
		const finalUser: TUserSignUp = structuredClone(SignUpUser)
		dispatch(signUp(finalUser))
		reset()
		navigate(`/posts`)
	}

	const handleClickShowPassword = () => setShowPassword(show => !show)
	const handleMouseDownPassword = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		event.preventDefault()
	}

	useFetchUsers()

	return (
		<>
			<CenteringWrap>
				<Title>Please, enter your contacts</Title>
				<InnerWrap>
					<form
						onSubmit={handleSubmit(onSubmit)}
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							gap: '25px',
						}}
					>
						<fieldset
							style={{
								display: 'flex',
								flexDirection: 'column',
								gap: '10px',
								border: 'none',
								width: '100%',
							}}
						>
							<TextField
								{...register('name')}
								required
								id='outlined-required-name'
								label='Name'
								name='name'
								helperText={errors.name && `${errors.name.message}`}
							/>
							<TextField
								{...register('username')}
								required
								id='outlined-required-username'
								label='Username'
								name='username'
								helperText={errors.username && `${errors.username.message}`}
							/>
							<TextField
								{...register('email')}
								required
								id='outlined-required-email'
								label='Email'
								name='email'
								helperText={errors.email && `${errors.email.message}`}
							/>
							<TextField
								{...register('phone')}
								required
								id='outlined-required-phone'
								label='Phone'
								name='phone'
								helperText={errors.phone && `${errors.phone.message}`}
							/>
							<TextField
								id='outlined-adornment-password'
								label='Password'
								type={showPassword ? 'text' : 'password'}
								InputProps={{
									endAdornment: (
										<InputAdornment position='end'>
											<IconButton
												aria-label='toggle password visibility'
												onClick={handleClickShowPassword}
												onMouseDown={handleMouseDownPassword}
												edge='end'
											>
												{showPassword ? <VisibilityOff /> : <Visibility />}
											</IconButton>
										</InputAdornment>
									),
								}}
								helperText={errors.password && `${errors.password.message}`}
								{...register('password')}
							/>
							<TextField
								required
								id='outlined-required-adornment-confirmPassword'
								label='ConfirmPassword'
								type={showPassword ? 'text' : 'password'}
								InputProps={{
									endAdornment: (
										<InputAdornment position='end'>
											<IconButton
												aria-label='toggle password visibility'
												onClick={handleClickShowPassword}
												onMouseDown={handleMouseDownPassword}
												edge='end'
											>
												{showPassword ? <VisibilityOff /> : <Visibility />}
											</IconButton>
										</InputAdornment>
									),
								}}
								helperText={
									errors.confirmPassword && `${errors.confirmPassword.message}`
								}
								{...register('confirmPassword')}
							/>
							<TextField
								{...register('website', { required: false })}
								id='outlined-website'
								label='Website'
								name='website'
								helperText={errors.website && `${errors.website.message}`}
							/>
						</fieldset>
						<fieldset
							style={{
								display: 'flex',
								flexDirection: 'column',
								gap: '10px',
								border: 'none',
								width: '100%',
							}}
						>
							<Typography variant='subtitle1'>Address</Typography>
							<TextField
								{...register('address.suite', { required: false })}
								id='outlined-address-suite'
								label='Suite'
								name='address.suite'
								helperText={
									errors.address?.suite && `${errors.address.suite.message}`
								}
							/>
							<TextField
								{...register('address.city', { required: false })}
								id='outlined-address-city'
								label='City'
								name='address.city'
								helperText={
									errors.address?.city && `${errors.address.city.message}`
								}
							/>
							<TextField
								{...register('address.zipcode', { required: false })}
								id='outlined-address-zipcode'
								label='Zipcode'
								name='address.zipcode'
								helperText={
									errors.address?.zipcode && `${errors.address.zipcode.message}`
								}
							/>
							<TextField
								{...register('address.geo.lat', { required: false })}
								id='outlined-address-geo-lat'
								label='Lat'
								name='address.geo.lat'
								helperText={
									errors.address?.geo?.lat &&
									`${errors.address.geo.lat.message}`
								}
							/>
							<TextField
								{...register('address.geo.lng', { required: false })}
								id='outlined-address-geo-lng'
								label='Lng'
								name='address.geo.lng'
								helperText={
									errors.address?.geo?.lng &&
									`${errors.address.geo.lng.message}`
								}
							/>
						</fieldset>
						<fieldset
							style={{
								display: 'flex',
								flexDirection: 'column',
								gap: '10px',
								border: 'none',
								width: '100%',
							}}
						>
							<Typography variant='subtitle1'>Company</Typography>

							<TextField
								{...register('company.name', { required: false })}
								id='outlined-company-name'
								label='Name'
								name='company.name'
								helperText={
									errors.company?.name && `${errors.company.name.message}`
								}
							/>
							<TextField
								{...register('company.catchPhrase', { required: false })}
								id='outlined-company-catchPhrase'
								label='CatchPhrase'
								name='company.catchPhrase'
								helperText={
									errors.company?.catchPhrase &&
									`${errors.company.catchPhrase.message}`
								}
							/>
							<TextField
								{...register('company.bs', { required: false })}
								id='outlined-company-bs'
								label='BS'
								name='company.bs'
								helperText={
									errors.company?.bs && `${errors.company.bs.message}`
								}
							/>
						</fieldset>
						<Button
							type='submit'
							variant='outlined'
							sx={{
								width: { sm: '200px', md: '350px' },
								height: '50px',
								mb: 3,
							}}
							disabled={isSubmitting}
						>
							Register
						</Button>
					</form>
				</InnerWrap>
			</CenteringWrap>
		</>
	)
}
