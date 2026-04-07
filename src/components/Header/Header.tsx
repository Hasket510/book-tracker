import { ThemeToggle } from '@/components/ThemeToggle'
import { NAV_ITEMS } from '@/constants/navigation'
import Link from 'next/link'
import styles from './Header.module.scss'

export function Header() {
	return (
		<header className={styles.header}>
			<p className={styles.title}>
				<Link className={styles.titleLink} href='/'>
					Book-tracker
				</Link>
			</p>
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
