import { BookCardBase } from '@/components/BookCardBase'
import styles from '@/components/BookCardBase/BookCardBase.module.scss'
import { useRemoveBook } from '@/store/store'
import { IBookProps } from '@/types/books'

export function FavoritesCard(book: IBookProps) {
	const removeBook = useRemoveBook()

	return (
		<BookCardBase
			book={book}
			action={
				<button
					type='button'
					className={`${styles.cardButton} ${styles.added}`}
					onClick={() => removeBook(book.id)}
				>
					Убрать из избранного −
				</button>
			}
		/>
	)
}
