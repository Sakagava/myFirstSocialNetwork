import styled from '@emotion/styled'
import { Paper, Box } from '@mui/material'

export const InfoBlockWrap = styled(Paper)(() => ({
	display: 'flex',
	flexDirection: 'column',
	width: '35%',
	paddingTop: '4%',
}))

export const AvatarWrap = styled(Box)(() => ({
	display: 'flex',
	justifyContent: 'center',
	marginBottom: '30px',
}))
