import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store, { persistor } from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.js'
import ErrorPage from './pages/ErrorPage.js'
import { Content } from './pages/Content.js'
import Navbar from './components/Navbar.js'
import './App.css'
import PageAllAccounts from './pages/PageAllAccounts.js'
import AboutUs from './pages/AboutUs.js'
import PageAccount from './pages/PageAccount.js'
import { Registration } from './pages/SignUp.js'
import { PersistGate } from 'redux-persist/integration/react'
import { LoginPage } from './pages/LoginPage.js'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Navbar />,
		errorElement: <ErrorPage />,
		children: [
			{
				errorElement: <ErrorPage />,
				children: [
					{ index: true, element: <Home /> },
					{
						path: 'posts',
						element: <Content />,
					},
					{
						path: 'users',
						element: <PageAllAccounts />,
					},
					{
						path: 'about',
						element: <AboutUs />,
					},
					{
						path: 'users/user/:id',
						element: <PageAccount />,
					},
					{
						path: 'registration',
						element: <Registration />,
					},
					{
						path: 'login',
						element: <LoginPage />,
					},
				],
			},
		],
	},
])

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<RouterProvider router={router} />
			</PersistGate>
		</Provider>
	</React.StrictMode>
)
