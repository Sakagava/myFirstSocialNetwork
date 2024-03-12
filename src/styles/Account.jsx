import styled from '@emotion/styled'
import { Paper, Box } from '@mui/material'

export const InfoBlockWrap = styled(Paper)(() => ({
	display: 'flex',
	position: 'relative',
	flexDirection: 'column',
	justifyContent: 'space-between',
	paddingTop: '4%',
}))

export const AvatarWrap = styled(Box)(() => ({
	display: 'flex',
	justifyContent: 'center',
	marginBottom: '30px',
}))
