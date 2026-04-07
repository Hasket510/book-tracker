import styles from './Loader.module.scss'

export function Loader() {
	return (
		<div
			className={styles.spinnerContainer}
			role='status'
			aria-label='Загрузка'
		>
			<span className={styles.spinner} />
		</div>
	)
}
