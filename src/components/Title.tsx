import styled from '@emotion/styled'
import { Typography } from '@mui/material'
import React from 'react'

const TitleTypography = styled(Typography)(() => ({
	display: 'flex',
	justifyContent: 'center',
	fontSize: '52px',
	marginBottom: '10px',
	textAlign: 'center',
}))

export const Title: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	return (
		<TitleTypography
			sx={{
				fontSize: { xs: '30px', sm: '35px', md: '40px' },
				paddingTop: { xs: '30px', sm: '25px', md: '0' },
			}}
			variant={'h1'}
		>
			{children}
		</TitleTypography>
	)
}
