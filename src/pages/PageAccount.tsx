import { useAppDispatch, useAppSelector } from '../store/rtkHooks'
import { ContentBlock } from '../components/Content/ContentBlock'
import {
	Container,
	Box,
	Typography,
	Avatar,
	Stack,
	CircularProgress,
	IconButton,
	Button,
	TextField,
} from '@mui/material'
import { Title } from '../components/Title'
import { InfoBlockWrap, AvatarWrap } from '../styles/Account'
import { useEffect, useState } from 'react'
import { patchAuthUser } from '../store/users'
import { useParams } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit'
import { useFetchPosts } from '../hooks/useCheckPosts'
import { useFetchUsers } from '../hooks/useCheckUsers'
import { CenteringWrap } from '../styles/utils'
import { TPost } from '../types/TPosts'
import { TUser } from '../types/TUsers'
import { emptyUser } from '../utils/userObj'

export default function PageAccount() {
	const posts = useAppSelector(state => state.posts.posts)
	const loading = useAppSelector(state => state.users.loading)
	const dispatch = useAppDispatch()
	const params = useParams()
	const users = useAppSelector(state => state.users.users)
	const user = users.find(user => user.id == Number(params.id))
	const authUser = useAppSelector(state => state.users.authUser)
	let allPostsUser: TPost[] = []
	const [editBasics, setEditBasics] = useState(false)
	const [editAddress, setEditAddress] = useState(false)
	const [editCompany, setEditCompany] = useState(false)
	const [newUser, setNewUser] = useState<TUser>({
		...emptyUser,
		id: authUser.id,
	})

	useEffect(() => {
		window.scrollTo({ top: 0 })
	}, [])

	useFetchPosts()
	useFetchUsers()

	if (!loading) {
		allPostsUser = user
			? posts.filter(post => {
					return post.userId == user.id
			  })
			: []
	}

	const handleClickEditBasics = () => {
		if (user && user.username == authUser.username) {
			editBasics && dispatch(patchAuthUser(newUser))
			setEditBasics(!editBasics)
		}
	}

	const handleClickEditAddress = () => {
		if (user && user.username == authUser.username) {
			editAddress && dispatch(patchAuthUser(newUser))
			setEditAddress(!editAddress)
		}
	}

	const handleClickEditCompany = () => {
		if (user && user.username == authUser.username) {
			editCompany && dispatch(patchAuthUser(newUser))
			setEditCompany(!editCompany)
		}
	}

	const onChangeBasics = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setNewUser(prevState => ({ ...prevState, [name]: value }))
	}

	const handleInputChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setNewUser(prevState => ({
			...prevState,
			address: {
				...prevState.address,
				geo: { ...prevState.address.geo },
				[name]: value,
			},
		}))
	}

	const handleInputChangeAddressGeo = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const { name, value } = e.target
		setNewUser(prevState => ({
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

	const onChangeCompany = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setNewUser(prevState => ({
			...prevState,
			company: {
				...prevState.company,
				[name]: value,
			},
		}))
	}
	return (
		<>
			{loading || loading == null ? (
				<CenteringWrap>
					<CircularProgress sx={{ color: 'black' }} />
				</CenteringWrap>
			) : (
				<Container>
					<Title>{user && user.name}</Title>
					<AvatarWrap>
						<Avatar
							alt={`User ${user && user.id}`}
							sx={{
								width: '50vw',
								maxWidth: '350px',
								height: '50vw',
								maxHeight: '350px',
							}}
						>
							<Typography variant='h2'>{user && user.name[0]}</Typography>
						</Avatar>
					</AvatarWrap>
					<Stack
						direction={{ xs: 'column', sm: 'row' }}
						spacing={2}
						alignItems='cenert'
						height={{ xs: 'auto', sm: '500px' }}
						marginBottom={{ xs: '50px', sm: '150px' }}
						width={{ xs: '100%', sm: 'auto' }}
						justifyContent='space-between'
					>
						<InfoBlockWrap
							sx={{
								width: { xs: '100%', sx: '35%' },
								height: { xs: '450px', sm: '620px' },
							}}
							elevation={3}
							square={false}
						>
							<Box>
								<Box
									sx={{
										display: 'flex',
										justifyContent: 'space-between',
										width: '94%',
										paddingLeft: '4%',
										marginBottom: '4%',
									}}
								>
									<Typography variant='h4'>Basics:</Typography>
									{user && user.username == authUser.username && (
										<IconButton onClick={handleClickEditBasics}>
											<EditIcon />
										</IconButton>
									)}
								</Box>

								<Box paddingLeft={'4%'}>
									{editBasics ? (
										<>
											<Typography variant='h5'>Name</Typography>
											<TextField
												id='outlined-name'
												name='name'
												size='small'
												onChange={onChangeBasics}
											></TextField>
											<Typography variant='h5'>Email:</Typography>
											<TextField
												id='outlined-email'
												name='email'
												size='small'
												onChange={onChangeBasics}
											></TextField>
											<Typography variant='h5'>Phone:</Typography>
											<TextField
												id='outlined-phone'
												name='phone'
												size='small'
												onChange={onChangeBasics}
											></TextField>
											<Typography variant='h5'>Website:</Typography>
											<TextField
												id='outlined-website'
												name='website'
												size='small'
												onChange={onChangeBasics}
											></TextField>
										</>
									) : (
										<>
											<Typography variant='h5'>Name</Typography>
											<Typography>{user && user.name}</Typography>
											<Typography variant='h5'>Email:</Typography>
											<Typography>{user && user.email}</Typography>
											<Typography variant='h5'>Phone:</Typography>
											<Typography>{user && user.phone}</Typography>
											<Typography variant='h5'>Website:</Typography>
											<Typography>
												{(user && user.website) || 'None'}
											</Typography>
										</>
									)}
								</Box>
							</Box>

							{editBasics && (
								<Button onClick={handleClickEditBasics}>Save</Button>
							)}
						</InfoBlockWrap>
						<InfoBlockWrap
							sx={{
								width: { xs: '100%', sx: '35%' },
								height: { xs: '570px', sm: '620px' },
							}}
							elevation={3}
							square={false}
						>
							<Box>
								<Box
									sx={{
										display: 'flex',
										justifyContent: 'space-between',
										width: '94%',
										paddingLeft: '4%',
										marginBottom: '4%',
									}}
								>
									<Typography variant='h4'>Address:</Typography>
									{user && user.username == authUser.username && (
										<IconButton onClick={handleClickEditAddress}>
											<EditIcon />
										</IconButton>
									)}
								</Box>

								<Box sx={{ paddingLeft: '4%' }}>
									{editAddress ? (
										<>
											<Typography variant='h5'>Street:</Typography>
											<TextField
												id='outlined-street'
												name='street'
												size='small'
												onChange={handleInputChangeAddress}
											></TextField>
											<Typography variant='h5'>Suite:</Typography>
											<TextField
												id='outlined-suite'
												name='suite'
												size='small'
												onChange={handleInputChangeAddress}
											></TextField>
											<Typography variant='h5'>City:</Typography>
											<TextField
												id='outlined-city'
												name='city'
												size='small'
												onChange={handleInputChangeAddress}
											></TextField>
											<Typography variant='h5'>Zipcode:</Typography>
											<TextField
												id='outlined-zipcode'
												name='zipcode'
												size='small'
												onChange={handleInputChangeAddress}
											></TextField>
											<Typography variant='h5'>Lat:</Typography>
											<TextField
												id='outlined-lat'
												name='lat'
												size='small'
												onChange={handleInputChangeAddressGeo}
											></TextField>
											<Typography variant='h5'>Lng:</Typography>
											<TextField
												id='outlined-lng'
												name='lng'
												size='small'
												onChange={handleInputChangeAddressGeo}
											></TextField>
										</>
									) : (
										<>
											<Typography variant='h5'>Street:</Typography>
											<Typography>
												{(user && user.address.street) || 'None'}
											</Typography>
											<Typography variant='h5'>Suite:</Typography>
											<Typography>
												{(user && user.address.suite) || 'None'}
											</Typography>
											<Typography variant='h5'>City:</Typography>
											<Typography>
												{(user && user.address.city) || 'None'}
											</Typography>
											<Typography variant='h5'>Zipcode:</Typography>
											<Typography>
												{(user && user.address.zipcode) || 'None'}
											</Typography>
											<Typography variant='h5'>Lat:</Typography>
											<Typography>
												{(user && user.address.geo.lat) || 'None'}
											</Typography>
											<Typography variant='h5'>Lng:</Typography>
											<Typography>
												{(user && user.address.geo.lng) || 'None'}
											</Typography>
										</>
									)}
								</Box>
							</Box>
							{editAddress && (
								<Button onClick={handleClickEditAddress}>Save</Button>
							)}
						</InfoBlockWrap>
						<InfoBlockWrap
							sx={{
								width: { xs: '100%', sx: '35%' },
								height: { xs: '400px', sm: '620px' },
							}}
							elevation={3}
							square={false}
						>
							<Box>
								<Box
									sx={{
										display: 'flex',
										justifyContent: 'space-between',
										width: '94%',
										paddingLeft: '4%',
										marginBottom: '4%',
									}}
								>
									<Typography variant='h4'>Company:</Typography>
									{user && user.username == authUser.username && (
										<IconButton onClick={handleClickEditCompany}>
											<EditIcon />
										</IconButton>
									)}
								</Box>

								<Box sx={{ paddingLeft: '4%' }}>
									{editCompany ? (
										<>
											<Typography variant='h5'>Name:</Typography>
											<TextField
												id='outlined-company-name'
												name='name'
												size='small'
												onChange={onChangeCompany}
											></TextField>
											<Typography variant='h5'>CatchPhrase:</Typography>
											<TextField
												id='outlined-company-catchPhrase'
												name='catchPhrase'
												size='small'
												onChange={onChangeCompany}
											></TextField>
											<Typography variant='h5'>Bs:</Typography>
											<TextField
												id='outlined-company-bs'
												name='bs'
												size='small'
												onChange={onChangeCompany}
											></TextField>
										</>
									) : (
										<>
											<Typography variant='h5'>Name:</Typography>
											<Typography>
												{(user && user.company.name) || 'None'}
											</Typography>
											<Typography variant='h5'>CatchPhrase:</Typography>
											<Typography>
												{(user && user.company.catchPhrase) || 'None'}
											</Typography>
											<Typography variant='h5'>Bs:</Typography>
											<Typography>
												{(user && user.company.bs) || 'None'}
											</Typography>
										</>
									)}
								</Box>
							</Box>

							{editCompany && (
								<Button onClick={handleClickEditCompany}>Save</Button>
							)}
						</InfoBlockWrap>
					</Stack>

					<Typography variant='h4' marginBottom={'20px'}>
						All posts {user && user.name}
					</Typography>
					<Stack direction={'column'} spacing={2}>
						{allPostsUser.length == 0 ? (
							<Typography variant='h6' sx={{ paddingBottom: '20px' }}>
								This user has not posted anything yet
							</Typography>
						) : (
							allPostsUser.map(post => {
								return <ContentBlock key={post.id} post={post} />
							})
						)}
					</Stack>
				</Container>
			)}
		</>
	)
}
