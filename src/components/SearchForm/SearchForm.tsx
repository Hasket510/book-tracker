import styles from './SearchForm.module.scss'
import type { ISearchFormProps } from './SearchForm.types'

export function SearchForm({
	inputText,
	isLoading,
	onSearch,
	setInputText,
}: ISearchFormProps) {
	return (
		<div className={styles.searchContainer}>
			<input
				className={styles.inputSearch}
				type='text'
				value={inputText}
				placeholder='Search book'
				onChange={e => setInputText(e.target.value)}
				onKeyDown={e => e.key === 'Enter' && onSearch()}
			/>
			<button
				type='button'
				className={styles.searchButton}
				onClick={onSearch}
				disabled={!inputText || isLoading}
			>
				Search
			</button>
		</div>
	)
}
