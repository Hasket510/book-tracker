import { Header } from '@/components/Header/Header'
import '@styles/globals.scss'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { TanStackQueryProvider } from './TanStackQueryProvider'

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 400 500 600 900',
})
const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 400 500 600 900',
})

export const metadata: Metadata = {
	title: 'Book-tracker',
	description: 'Book-tracker',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={`${geistSans.variable} ${geistMono.variable}`}>
				<TanStackQueryProvider>
					<Header />
					{children}
				</TanStackQueryProvider>
			</body>
		</html>
	)
}
