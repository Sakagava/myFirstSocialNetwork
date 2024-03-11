import styled from '@emotion/styled'
import { Box, Button } from '@mui/material'

export const TitleWrap = styled(Box)(() => ({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	paddingTop: '0px',
}))
export const MainButton = styled(Button)(() => ({
	width: '49.5%',
	height: '730px',
	cursor: 'pointer',
	fontSize: '50px',
	borderRadius: '20px',
	transition: '0.5s',
}))
