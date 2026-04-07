import { Header } from '@/components/Header'
import '@styles/globals.scss'
import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import localFont from 'next/font/local'
import { TanStackQueryProvider } from './providers/TanStackQueryProvider'

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
	description: 'Поиск книг и избранное',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='ru' suppressHydrationWarning>
			<body className={`${geistSans.variable} ${geistMono.variable}`}>
				<ThemeProvider attribute='class' defaultTheme='system' enableSystem>
					<TanStackQueryProvider>
						<Header />
						{children}
					</TanStackQueryProvider>
				</ThemeProvider>
			</body>
		</html>
	)
}
