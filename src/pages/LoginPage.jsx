import { CenteringWrap } from '../styles/utils'
import Title from '../components/Title'
import { Button, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logIn } from '../store/users'
import { InnerWrap } from '../styles/Login'
import { LoginPasswordField, LoginUsernameField } from '../components/Fields'
import { useFetchUsers } from '../hooks/useCheckUsers'

export const LoginPage = () => {
	let navigate = useNavigate()
	const dispatch = useDispatch()
	const users = useSelector(state => state.users.users)
	const authUser = useSelector(state => state.users.authUser)
	const [user, setUser] = useState({})
	const [showPassword, setShowPassword] = useState(false)
	const [error, setError] = useState(false)

	useEffect(() => {
		authUser.name !== undefined && navigate('/myFirstSocialNetwork/posts')
	}, [authUser.username])

	useFetchUsers()

	const handleClickShowPassword = () => setShowPassword(show => !show)

	const handleMouseDownPassword = event => {
		event.preventDefault()
	}

	const handleChangeUser = e => {
		const { name, value } = e.target
		setError(false)
		setUser(prevUser => ({
			...prevUser,
			[name]: value,
		}))
	}

	const handleClickLogin = () => {
		if (!users.includes(user => user.username == user.username)) {
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
						to={'/myFirstSocialNetwork/registration'}
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
