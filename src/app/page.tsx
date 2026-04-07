import styles from './page.module.scss'

export default function Home() {
	return (
		<main className={styles.main}>
			<section className={styles.section}>
				<h1 className={styles.title}>Welcome to book-tracker</h1>
				<p className={styles.description}>
					Book-tracker is a simple app that allows you to track your books.
				</p>
				<p className={styles.description}>
					Search books and save them to your favorite list.
				</p>
			</section>
		</main>
	)
}
