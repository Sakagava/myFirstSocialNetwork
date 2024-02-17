import styled from '@emotion/styled'
import { Typography } from '@mui/material'

const TitleTypography = styled(Typography)(() => ({
	display: 'flex',
	justifyContent: 'center',
	fontSize: '52px',
}))

export default function Title({ children }) {
	return <TitleTypography variant={'h1'}>{children}</TitleTypography>
}
