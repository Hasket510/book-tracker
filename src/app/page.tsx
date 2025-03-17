import styles from './page.module.scss'

export default function Home() {
	return (
		<div className={styles.page}>
			<main className={styles.main}>
				<h2>Welcome to our book-tracker</h2>
			</main>
		</div>
	)
}
