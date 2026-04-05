'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import styles from './ThemeToggle.module.scss'

export function ThemeToggle() {
	const [mounted, setMounted] = useState(false)
	const { resolvedTheme, setTheme } = useTheme()
	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) return null

	return (
		<button
			className={styles.themeToggle}
			aria-label='Toggle theme'
			onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
			type='button'
		>
			{resolvedTheme === 'dark' ? '🌞' : '🌙'}
		</button>
	)
}
