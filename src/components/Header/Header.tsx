import { NAV_ITEMS } from '@/constants/navigation'
import Link from 'next/link'
import { ThemeToggle } from '../ThemeToggle/ThemeToggle'
import styles from './Header.module.scss'

export function Header() {
	return (
		<header className={styles.header}>
			<h1 className={styles.title}>
				<Link className={styles.titleLink} href='/'>
					Book-tracker
				</Link>
			</h1>
			<nav>
				<ul className={styles.navList}>
					{NAV_ITEMS.map(({ path, label }) => (
						<li key={path} className={styles.navItem}>
							<Link className={styles.navLink} href={path}>
								{label}
							</Link>
						</li>
					))}
				</ul>
			</nav>
			<ThemeToggle />
		</header>
	)
}
