import { BookCardBase } from '@/components/BookCardBase'
import styles from '@/components/BookCardBase/BookCardBase.module.scss'
import { useAddBook, useFavorite, useRemoveBook } from '@/store/store'
import { IBookProps } from '@/types/books'

export function BookCard(book: IBookProps) {
	const isFavorite = useFavorite(book.id)
	const addBook = useAddBook()
	const removeBook = useRemoveBook()

	const handleChange = () => {
		if (isFavorite) removeBook(book.id)
		else addBook(book)
	}

	return (
		<BookCardBase
			book={book}
			action={
				<button
					type='button'
					className={`${styles.cardButton} ${isFavorite ? styles.added : ''}`}
					onClick={handleChange}
					aria-pressed={isFavorite}
				>
					{isFavorite ? 'Убрать из избранного −' : 'В избранное +'}
				</button>
			}
		/>
	)
}
