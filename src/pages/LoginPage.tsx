import { CenteringWrap } from '../styles/utils'
import { Title } from '../components/Title'
import { Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/rtkHooks'
import { Link, useNavigate } from 'react-router-dom'
import { logIn } from '../store/users'
import { InnerWrap } from '../styles/Login'
import { LoginPasswordField, LoginUsernameField } from '../components/Fields'
import { useFetchUsers } from '../hooks/useCheckUsers'
import { TUser } from '../types/TUsers'
import { emptyUser } from '../utils/userObj'

export const LoginPage = () => {
	let navigate = useNavigate()
	const dispatch = useAppDispatch()
	const users = useAppSelector(state => state.users.users)
	const authUser = useAppSelector(state => state.users.authUser)
	const [user, setUser] = useState<TUser>(emptyUser)
	const [showPassword, setShowPassword] = useState(false)
	const [error, setError] = useState(false)

	useEffect(() => {
		authUser.name !== '' && navigate('/posts')
	}, [authUser.username])

	useFetchUsers()

	const handleClickShowPassword = () => setShowPassword(show => !show)

	const handleMouseDownPassword = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		event.preventDefault()
	}

	const handleChangeUser = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setError(false)
		setUser(prevUser => ({
			...prevUser,
			[name]: value,
		}))
	}

	const handleClickLogin = () => {
		const existingUser = users.find(u => u.username === user.username)
		if (!existingUser) {
			setError(true)
		} else {
			dispatch(logIn(user))
		}
	}

	return (
		<>
			<CenteringWrap>
				<InnerWrap>
					<Title>Sign in</Title>
					<LoginUsernameField error={error} onChange={handleChangeUser} />
					<LoginPasswordField
						showPassword={showPassword}
						error={error}
						handleClick={handleClickShowPassword}
						handleMouseDown={handleMouseDownPassword}
						handleChange={handleChangeUser}
					/>
					<Typography
						component={Link}
						to={'/registration'}
						variant='subtitle1'
						sx={{
							color: '#3f50b5',
							textAlign: 'left',
							width: '25ch',
						}}
					>
						Create account
					</Typography>
					{error && (
						<Typography variant='subtitle1' color='#c62828'>
							Incorrect username or password
						</Typography>
					)}
				</InnerWrap>

				<Button
					variant='outlined'
					sx={{ width: '240px', height: '45px' }}
					onClick={handleClickLogin}
				>
					Login
				</Button>
			</CenteringWrap>
		</>
	)
}
