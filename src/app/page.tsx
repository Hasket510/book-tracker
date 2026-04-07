import styles from './page.module.scss'

export default function Home() {
	return (
		<main className={styles.main}>
			<section className={styles.section}>
				<h1 className={styles.title}>Добро пожаловать в Book-tracker</h1>
				<p className={styles.description}>
					Book-tracker это простое приложение, чтобы находить книги и вести свой
					список избранных.
				</p>
				<p className={styles.description}>
					Ищите в каталоге и сохраняйте понравившиеся в избранное.
				</p>
			</section>
		</main>
	)
}
