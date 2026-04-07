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
				aria-label='Поиск книг'
				value={inputText}
				placeholder='Название книги или автор'
				onChange={e => setInputText(e.target.value)}
				onKeyDown={e => e.key === 'Enter' && onSearch()}
			/>
			<button
				type='button'
				className={styles.searchButton}
				onClick={onSearch}
				disabled={!inputText.trim() || isLoading}
			>
				Найти
			</button>
		</div>
	)
}
