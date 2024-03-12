import styled from '@emotion/styled'
import { Box } from '@mui/material'

export const InnerWrap = styled(Box)(() => ({
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'space-around',
	width: '70%',
	alignItems: 'start',
	paddingTop: '40px',
	marginBottom: '50px',
}))

export const Substrate = styled(Box)(() => ({
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	gap: '10px',
}))
