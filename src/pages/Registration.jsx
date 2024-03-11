import { TitleWrap } from '../styles/Home'
import Title from '../components/Title'
import { Box, TextField, Typography, Button } from '@mui/material'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from '../store/users'
import { userRegister } from '../store/users'
import { useNavigate } from 'react-router-dom'
import IconButton from '@mui/material/IconButton'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

export const Registration = () => {
	const dispatch = useDispatch()
	const users = useSelector(state => state.users.users)
	let navigate = useNavigate()
	const [showPassword, setShowPassword] = useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)
	const [password, setPassword] = useState('')
	const [errorFields, setErrorFields] = useState({})
	const [authUser, setAuthUser] = useState({
		name: '',
		username: '',
		email: '',
		phone: '',
		website: '',
		password: '',
		address: {
			street: '',
			suite: '',
			city: '',
			zipcode: '',
			geo: {
				lat: '',
				lng: '',
			},
		},
		company: {
			name: '',
			catchPhrase: '',
			bs: '',
		},
	})

	useEffect(() => {
		if (!users.length) {
			dispatch(fetchUsers())
		}
	}, [dispatch])

	const handleInputChangeMain = e => {
		const { name, value } = e.target
		errorFields[name] = value

		setAuthUser(prevState => ({
			...prevState,
			[name]: value,
		}))
	}

	const handleInputChangePassword = e => {
		errorFields.password = e.target.value
		setPassword(e.target.value)
	}

	const handleInputChangeConfirmPassword = e => {
		errorFields.password = e.target.value

		e.target.value === password &&
			setAuthUser(prevState => ({
				...prevState,
				password: e.target.value,
			}))
	}

	const handleInputChangeAddress = e => {
		const { name, value } = e.target
		setAuthUser(prevState => ({
			...prevState,
			address: {
				...prevState.address,
				[name]: value,
			},
		}))
	}

	const handleInputChangeAddressGeo = e => {
		const { name, value } = e.target
		setAuthUser(prevState => ({
			...prevState,
			address: {
				...prevState.address,
				geo: {
					...prevState.address.geo,
					[name]: value,
				},
			},
		}))
	}

	const handleInputChangeCompany = e => {
		const { name, value } = e.target
		setAuthUser(prevState => ({
			...prevState,
			company: {
				...prevState.company,
				[name]: value,
			},
		}))
	}

	const handleRegister = e => {
		e.preventDefault()
		const name = authUser.name !== ''
		const username = authUser.username !== ''
		const email = authUser.email !== ''
		const phone = authUser.phone !== ''
		const password = authUser.password !== ''

		const allFieldsIsNotEmpty = name & username & email & phone && password
		if (allFieldsIsNotEmpty) {
			dispatch(userRegister(authUser))
			navigate(`/posts`)
		} else {
			setErrorFields(authUser)
		}
	}

	const handleClickShowPassword = () => setShowPassword(show => !show)
	const handleClickShowConfirmPassword = () =>
		setShowConfirmPassword(show => !show)

	const handleMouseDownPassword = event => {
		event.preventDefault()
	}

	return (
		<>
			<TitleWrap>
				<Title>Please, enter your contacts</Title>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-around',
						width: '70%',
						alignItems: 'start',
						paddingTop: '40px',
						marginBottom: '50px',
					}}
				>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							alignItems: 'center',
							gap: '10px',
						}}
					>
						<Typography variant='h6'>Main Info</Typography>
						<TextField
							required
							id='outlined-name'
							label='Name'
							name='name'
							error={errorFields.name === ''}
							onChange={handleInputChangeMain}
						/>
						<TextField
							required
							id='outlined-username'
							label='Username'
							name='username'
							error={errorFields.username === ''}
							onChange={handleInputChangeMain}
						/>
						<FormControl sx={{ width: '22ch' }} variant='outlined'>
							<InputLabel htmlFor='outlined-adornment-password'>
								Password
							</InputLabel>
							<OutlinedInput
								id='outlined-adornment-password'
								type={showPassword ? 'text' : 'password'}
								endAdornment={
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
								}
								onChange={handleInputChangePassword}
								label='Password'
								name='password'
								error={errorFields.password === ''}
							/>
						</FormControl>
						<FormControl sx={{ width: '22ch' }} variant='outlined'>
							<InputLabel htmlFor='outlined-adornment-ConfirmPassword'>
								Confirm Password
							</InputLabel>
							<OutlinedInput
								id='outlined-adornment-ConfirmPassword'
								type={showConfirmPassword ? 'text' : 'password'}
								endAdornment={
									<InputAdornment position='end'>
										<IconButton
											aria-label='toggle password visibility'
											onClick={handleClickShowConfirmPassword}
											onMouseDown={handleMouseDownPassword}
											edge='end'
										>
											{showConfirmPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								}
								onChange={handleInputChangeConfirmPassword}
								label='Confirm Password'
								name='confirmPassword'
								error={errorFields.password === ''}
							/>
						</FormControl>
						<TextField
							required
							id='outlined-email'
							label='Email'
							name='email'
							onChange={handleInputChangeMain}
							error={errorFields.email === ''}
						/>
						<TextField
							required
							id='outlined-phone'
							label='Phone'
							name='phone'
							onChange={handleInputChangeMain}
							error={errorFields.phone === ''}
						/>
						<TextField id='outlined-website' label='Website' name='website' />
					</Box>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							alignItems: 'center',
							gap: '10px',
						}}
					>
						<Typography variant='h6'>Adress</Typography>
						<TextField
							id='outlined-street'
							label='Street'
							name='street'
							onChange={handleInputChangeAddress}
						/>
						<TextField
							id='outlined-suite'
							label='Suite'
							name='suite'
							onChange={handleInputChangeAddress}
						/>
						<TextField
							id='outlined-city'
							label='City'
							name='city'
							onChange={handleInputChangeAddress}
						/>
						<TextField
							id='outlined-zipcode'
							label='Zipcode'
							name='zipcode'
							onChange={handleInputChangeAddress}
						/>
					</Box>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							alignItems: 'center',
							gap: '10px',
						}}
					>
						<Typography variant='h6'>Geo</Typography>
						<TextField
							id='outlined-lat'
							label='Lat'
							name='lat'
							onChange={handleInputChangeAddressGeo}
						/>
						<TextField
							id='outlined-lng'
							label='Lng'
							name='lng'
							onChange={handleInputChangeAddressGeo}
						/>
					</Box>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							alignItems: 'center',
							gap: '10px',
						}}
						name='Company'
					>
						<Typography variant='h6'>Company</Typography>
						<TextField
							id='outlined-company-name'
							label='Name'
							name='name'
							onChange={handleInputChangeCompany}
						/>
						<TextField
							id='outlined-company-catchPhrase'
							label='CatchPhrase'
							name='catchPhrase'
							onChange={handleInputChangeCompany}
						/>
						<TextField
							id='outlined-company-bs'
							label='Bs'
							name='bs'
							onChange={handleInputChangeCompany}
						/>
					</Box>
				</Box>
				<Button
					variant='outlined'
					sx={{ width: '300px', height: '50px' }}
					onClick={e => handleRegister(e)}
				>
					Register
				</Button>
			</TitleWrap>
		</>
	)
}
