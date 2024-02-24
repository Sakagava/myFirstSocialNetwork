import { useSelector, useDispatch } from 'react-redux'
import ContentBlock from '../components/ContentBlock'
import {
	Container,
	Box,
	Typography,
	Avatar,
	Stack,
	CircularProgress,
} from '@mui/material'
import Title from '../components/Title'
import { InfoBlockWrap, AvatarWrap } from '../styles/Account'
import { useEffect } from 'react'
import { fetchPosts } from '../store/posts'
import { fetchUsers } from '../store/users'
import { useParams } from 'react-router-dom'

export default function PageAccount() {
	useEffect(() => {
		window.scrollTo({ top: 0 })
	}, [])

	const posts = useSelector(state => state.posts.posts)
	const dispatch = useDispatch()
	const params = useParams()
	const users = useSelector(state => state.users.users)
	const user = users.find(user => user.id == params.id)

	useEffect(() => {
		dispatch(fetchPosts())
		dispatch(fetchUsers())
	}, [dispatch])

	return (
		<>
			{users.length == 0 ? (
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						height: '80vh',
					}}
				>
					<CircularProgress sx={{ color: 'black' }} />
				</Box>
			) : (
				<Container>
					<Title>{user.name}</Title>
					<AvatarWrap>
						<Avatar
							alt={`User ${user.id}`}
							src={`/src/assets/img/usersPhoto/photo${user.id}.jpeg`}
							sx={{ width: '400px', height: '400px' }}
						/>
					</AvatarWrap>
					<Stack
						direction='row'
						spacing={2}
						justifyContent={'space-between'}
						height={'500px'}
						marginBottom={'30px'}
					>
						<InfoBlockWrap elevation={3} square={false}>
							<Typography variant='h4' textAlign={'center'}>
								Basics:
							</Typography>
							<Box paddingLeft={'4%'}>
								<Typography variant='h5'>Name</Typography>
								<Typography>{user.name}</Typography>
								<Typography variant='h5'>Email:</Typography>
								<Typography>{user.email}</Typography>
								<Typography variant='h5'>Phone:</Typography>
								<Typography>{user.phone}</Typography>
								<Typography variant='h5'>Website:</Typography>
								<Typography>{user.website}</Typography>
							</Box>
						</InfoBlockWrap>
						<InfoBlockWrap elevation={3} square={false}>
							<Typography variant='h4' textAlign={'center'}>
								Address:
							</Typography>
							<Box sx={{ paddingLeft: '4%' }}>
								<Typography variant='h5'>Street:</Typography>
								<Typography>{user.address.street}</Typography>
								<Typography variant='h5'>Suite:</Typography>
								<Typography>{user.address.suite}</Typography>
								<Typography variant='h5'>City:</Typography>
								<Typography>{user.address.city}</Typography>
								<Typography variant='h5'>Zipcode:</Typography>
								<Typography>{user.address.zipcode}</Typography>
								<Typography variant='h5'>Lat:</Typography>
								<Typography>{user.address.geo.lat}</Typography>
								<Typography variant='h5'>Lng:</Typography>
								<Typography>{user.address.geo.lng}</Typography>
							</Box>
						</InfoBlockWrap>
						<InfoBlockWrap elevation={3} square={false}>
							<Typography variant='h4' textAlign={'center'}>
								Company:
							</Typography>
							<Box sx={{ paddingLeft: '4%' }}>
								<Typography variant='h5'>Name:</Typography>
								<Typography>{user.company.name}</Typography>
								<Typography variant='h5'>CatchPhrase:</Typography>
								<Typography>{user.company.catchPhrase}</Typography>
								<Typography variant='h5'>Bs:</Typography>
								<Typography>{user.company.bs}</Typography>
							</Box>
						</InfoBlockWrap>
					</Stack>

					<Typography variant='h4' marginBottom={'20px'}>
						All posts {user.name}
					</Typography>
					<Stack direction={'column'} spacing={2}>
						{posts.map(post => {
							if (post.userId == user.id) {
								return <ContentBlock key={post.id} post={post} />
							}
						})}
					</Stack>
				</Container>
			)}
		</>
	)
}
