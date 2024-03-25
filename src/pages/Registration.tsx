import { CenteringWrap } from '../styles/utils'
import { Title } from '../components/Title'
import { Typography, Button } from '@mui/material'
import { useState } from 'react'
import { useAppDispatch } from '../store/rtkHooks'
import { userRegister } from '../store/users'
import { useNavigate } from 'react-router-dom'
import { InnerWrap, Substrate } from '../styles/Registration'
import {
	NameField,
	UsernameField,
	EmailField,
	PhoneField,
	WebsiteField,
	StreetField,
	SuiteField,
	ZipcodeField,
	LatField,
	LngField,
	CompanyNameField,
	CompanyCatchPhraseField,
	CompanyBsField,
	ConfirmPasswordField,
	PasswordField,
	CityField,
} from '../components/Fields'
import { emptyUser } from '../utils/userObj'
import { useFetchUsers } from '../hooks/useCheckUsers'
import { TUser } from '../types/TUsers'

export const Registration = () => {
	const dispatch = useAppDispatch()
	let navigate = useNavigate()
	const [showPassword, setShowPassword] = useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)
	const [password, setPassword] = useState('')
	const [authUser, setAuthUser] = useState<TUser>(emptyUser)
	const [againSubmit, setAgainSubmit] = useState(false)

	useFetchUsers()

	const handleInputChangeMain = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target

		setAuthUser(prevState => ({
			...prevState,
			[name]: value,
		}))
	}

	const handleInputChangePassword = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setPassword(e.target.value)
	}

	const handleInputChangeConfirmPassword = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		e.target.value === password &&
			setAuthUser(prevState => ({
				...prevState,
				password: e.target.value,
			}))
	}

	const handleInputChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setAuthUser(prevState => ({
			...prevState,
			address: {
				...prevState.address,
				[name]: value,
			},
		}))
	}

	const handleInputChangeAddressGeo = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
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

	const handleInputChangeCompany = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setAuthUser(prevState => ({
			...prevState,
			company: {
				...prevState.company,
				[name]: value,
			},
		}))
	}

	const handleRegister = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		const name = authUser.name !== ''
		const username = authUser.username !== ''
		const email = authUser.email !== ''
		const phone = authUser.phone !== ''
		const password = authUser.password !== ''
		const allFieldsIsNotEmpty = name && username && email && phone && password

		if (allFieldsIsNotEmpty) {
			dispatch(userRegister(authUser))
			navigate(`/posts`)
		} else {
			setAgainSubmit(true)
		}
	}

	const handleClickShowPassword = () => setShowPassword(show => !show)
	const handleClickShowConfirmPassword = () =>
		setShowConfirmPassword(show => !show)

	const handleMouseDownPassword = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		event.preventDefault()
	}

	return (
		<>
			<CenteringWrap>
				<Title>Please, enter your contacts</Title>
				<InnerWrap>
					<Substrate>
						<Typography variant='h6'>Main Info</Typography>
						<NameField
							error={authUser.name === '' && againSubmit}
							onChange={handleInputChangeMain}
						/>
						<UsernameField
							error={authUser.username === '' && againSubmit}
							onChange={handleInputChangeMain}
						/>
						<PasswordField
							showPassword={showPassword}
							handleClick={handleClickShowPassword}
							handleMouseDown={handleMouseDownPassword}
							handleChange={handleInputChangePassword}
							error={authUser.password === '' && againSubmit}
						/>
						<ConfirmPasswordField
							showConfirmPassword={showConfirmPassword}
							handleClick={handleClickShowConfirmPassword}
							handleMouseDown={handleMouseDownPassword}
							handleChange={handleInputChangeConfirmPassword}
							error={authUser.password === '' && againSubmit}
						/>
						<EmailField
							onChange={handleInputChangeMain}
							error={authUser.email === '' && againSubmit}
						/>
						<PhoneField
							onChange={handleInputChangeMain}
							error={authUser.phone === '' && againSubmit}
						/>
						<WebsiteField
							onChange={handleInputChangeMain}
							error={authUser.website === '' && againSubmit}
						/>
					</Substrate>
					<Substrate>
						<Typography variant='h6'>Adress</Typography>
						<StreetField onChange={handleInputChangeAddress} />
						<SuiteField onChange={handleInputChangeAddress} />
						<CityField onChange={handleInputChangeAddress} />
						<ZipcodeField onChange={handleInputChangeAddress} />
					</Substrate>
					<Substrate>
						<Typography variant='h6'>Geo</Typography>
						<LatField onChange={handleInputChangeAddressGeo} />
						<LngField onChange={handleInputChangeAddressGeo} />
					</Substrate>
					<Substrate>
						<Typography variant='h6'>Company</Typography>
						<CompanyNameField onChange={handleInputChangeCompany} />
						<CompanyCatchPhraseField onChange={handleInputChangeCompany} />
						<CompanyBsField onChange={handleInputChangeCompany} />
					</Substrate>
				</InnerWrap>
				<Button
					variant='outlined'
					sx={{ width: { sm: '200px', md: '350px' }, height: '50px', mb: 3 }}
					onClick={e => handleRegister(e)}
				>
					Register
				</Button>
			</CenteringWrap>
		</>
	)
}
