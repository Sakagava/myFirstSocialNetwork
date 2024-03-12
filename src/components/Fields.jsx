import { TextField } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

export const NameField = ({ onChange, error }) => {
	return (
		<TextField
			required
			id='outlined-name'
			label='Name'
			name='name'
			onChange={onChange}
			error={error}
		/>
	)
}

export const UsernameField = ({ onChange, error }) => {
	return (
		<TextField
			required
			id='outlined-username'
			label='Username'
			name='username'
			onChange={onChange}
			error={error}
		/>
	)
}

export const EmailField = ({ onChange, error }) => {
	return (
		<TextField
			required
			id='outlined-email'
			label='Email'
			name='email'
			onChange={onChange}
			error={error}
		/>
	)
}

export const PhoneField = ({ onChange, error }) => {
	return (
		<TextField
			required
			id='outlined-phone'
			label='Phone'
			name='phone'
			onChange={onChange}
			error={error}
		/>
	)
}

export const WebsiteField = ({ onChange }) => {
	return (
		<TextField
			id='outlined-website'
			label='Website'
			name='website'
			onChange={onChange}
		/>
	)
}

export const StreetField = ({ onChange, error }) => {
	return (
		<TextField
			id='outlined-street'
			label='Street'
			name='street'
			onChange={onChange}
			error={error}
		/>
	)
}

export const SuiteField = ({ onChange, error }) => {
	return (
		<TextField
			id='outlined-suite'
			label='Suite'
			name='suite'
			onChange={onChange}
			error={error}
		/>
	)
}

export const CityField = ({ onChange, error }) => {
	return (
		<TextField
			id='outlined-city'
			label='City'
			name='city'
			onChange={onChange}
			error={error}
		/>
	)
}

export const ZipcodeField = ({ onChange, error }) => {
	return (
		<TextField
			id='outlined-zipcode'
			label='Zipcode'
			name='zipcode'
			onChange={onChange}
			error={error}
		/>
	)
}

export const LatField = ({ onChange, error }) => {
	return (
		<TextField
			id='outlined-lat'
			label='Lat'
			name='lat'
			onChange={onChange}
			error={error}
		/>
	)
}

export const LngField = ({ onChange, error }) => {
	return (
		<TextField
			id='outlined-lng'
			label='Lng'
			name='lng'
			onChange={onChange}
			error={error}
		/>
	)
}

export const CompanyNameField = ({ onChange, error }) => {
	return (
		<TextField
			id='outlined-company-name'
			label='Name'
			name='name'
			onChange={onChange}
			error={error}
		/>
	)
}

export const CompanyCatchPhraseField = ({ onChange, error }) => {
	return (
		<TextField
			id='outlined-company-catchPhrase'
			label='CatchPhrase'
			name='catchPhrase'
			onChange={onChange}
			error={error}
		/>
	)
}

export const CompanyBsField = ({ onChange, error }) => {
	return (
		<TextField
			id='outlined-company-bs'
			label='Bs'
			name='bs'
			onChange={onChange}
			error={error}
		/>
	)
}

export const PasswordField = ({
	showPassword,
	handleClick,
	handleMouseDown,
	handleChange,
	error,
}) => {
	return (
		<FormControl required sx={{ width: '22ch' }} variant='outlined'>
			<InputLabel htmlFor='outlined-adornment-password'>Password</InputLabel>
			<OutlinedInput
				id='outlined-adornment-password'
				type={showPassword ? 'text' : 'password'}
				endAdornment={
					<InputAdornment position='end'>
						<IconButton
							aria-label='toggle password visibility'
							onClick={handleClick}
							onMouseDown={handleMouseDown}
							edge='end'
						>
							{showPassword ? <VisibilityOff /> : <Visibility />}
						</IconButton>
					</InputAdornment>
				}
				onChange={handleChange}
				label='Password'
				name='password'
				error={error}
			/>
		</FormControl>
	)
}

export const ConfirmPasswordField = ({
	showConfirmPassword,
	handleClick,
	handleMouseDown,
	handleChange,
	error,
}) => {
	return (
		<FormControl sx={{ width: '22ch' }} variant='outlined' required>
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
							onClick={handleClick}
							onMouseDown={handleMouseDown}
							edge='end'
						>
							{showConfirmPassword ? <VisibilityOff /> : <Visibility />}
						</IconButton>
					</InputAdornment>
				}
				onChange={handleChange}
				label='Confirm Password'
				name='confirmPassword'
				error={error}
			/>
		</FormControl>
	)
}

export const LoginUsernameField = ({ onChange, error }) => {
	return (
		<TextField
			required
			id='outlined-required'
			label='Username'
			name='username'
			sx={{
				width: '25ch',
				marginBottom: '15px',
			}}
			error={error}
			onChange={onChange}
		/>
	)
}

export const LoginPasswordField = ({
	showPassword,
	error,
	handleClick,
	handleMouseDown,
	handleChange,
}) => {
	return (
		<FormControl
			sx={{ marginBottom: '15px', width: '25ch' }}
			error={error}
			variant='outlined'
		>
			<InputLabel htmlFor='outlined-adornment-password'>Password</InputLabel>
			<OutlinedInput
				id='outlined-adornment-password'
				type={showPassword ? 'text' : 'password'}
				error={error}
				endAdornment={
					<InputAdornment position='end'>
						<IconButton
							aria-label='toggle password visibility'
							onClick={handleClick}
							onMouseDown={handleMouseDown}
							edge='end'
						>
							{showPassword ? <VisibilityOff /> : <Visibility />}
						</IconButton>
					</InputAdornment>
				}
				label='Password'
				name='password'
				onChange={handleChange}
			/>
		</FormControl>
	)
}
