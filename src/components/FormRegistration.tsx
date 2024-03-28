export const Form: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<form
			style={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				gap: '10px',
			}}
		>
			{children}
		</form>
	)
}
