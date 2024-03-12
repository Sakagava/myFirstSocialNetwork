import styled from '@emotion/styled'
import { Box } from '@mui/material'

export const InnerWrap = styled(Box)(() => ({
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-around',
	width: '90%',
	alignItems: 'center',
	paddingTop: '40px',
	marginBottom: '50px',
	'@media (min-width: 900px)': {
		flexDirection: 'row',
		alignItems: 'start',
	},
}))

export const Substrate = styled(Box)(() => ({
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	gap: '10px',
}))
