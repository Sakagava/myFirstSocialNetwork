import styled from '@emotion/styled'
import { Paper, Box } from '@mui/material'

export const InfoBlockWrap = styled(Paper)(() => ({
	display: 'flex',
	position: 'relative',
	flexDirection: 'column',
	justifyContent: 'space-between',
	width: '35%',
	paddingTop: '4%',
	height: '620px',
}))

export const AvatarWrap = styled(Box)(() => ({
	display: 'flex',
	justifyContent: 'center',
	marginBottom: '30px',
}))
