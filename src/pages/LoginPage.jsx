import { TitleWrap } from '../styles/Home'
import Title from '../components/Title'
import { Box, TextField, Button } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from '../store/users'
import { useNavigate } from 'react-router-dom'
import { logIn } from '../store/users'

import IconButton from '@mui/material/IconButton'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

export const LoginPage = () => {
	let navigate = useNavigate()
	const dispatch = useDispatch()
	const users = useSelector(state => state.users.users)
	const authUser = useSelector(state => state.users.authUser)
	const [user, setUser] = useState({})
	const [showPassword, setShowPassword] = useState(false)

	useEffect(() => {
		authUser.name !== undefined && navigate('/posts')
	}, [authUser.username])

	useEffect(() => {
		if (!users.length) {
			dispatch(fetchUsers())
		}
	}, [dispatch])

	const handleClickShowPassword = () => setShowPassword(show => !show)

	const handleMouseDownPassword = event => {
		event.preventDefault()
	}

	const handleChangeUser = e => {
		const { name, value } = e.target
		setUser(prevUser => ({
			...prevUser,
			[name]: value,
		}))
	}

	const handleClickLogin = () => {
		dispatch(logIn(user))
	}

	return (
		<>
			<TitleWrap>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						width: '70%',
						alignItems: 'center',
						paddingTop: '20vh',
						marginBottom: '30px',
						gap: '15px',
					}}
				>
					<Title>Sign in</Title>
					<TextField
						required
						id='outlined-required'
						label='Username'
						name='username'
						sx={{
							m: 1,
							width: '25ch',
						}}
						onChange={handleChangeUser}
					/>
					<FormControl sx={{ m: 1, width: '25ch' }} variant='outlined'>
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
							label='Password'
							name='password'
							onChange={handleChangeUser}
						/>
					</FormControl>
				</Box>
				<Button
					variant='outlined'
					sx={{ width: '240px', height: '45px' }}
					onClick={handleClickLogin}
				>
					Login
				</Button>
			</TitleWrap>
		</>
	)
}
