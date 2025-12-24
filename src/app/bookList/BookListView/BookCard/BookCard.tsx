import { useAddBook, useFavorite, useRemoveBook } from '@/store/store'
import Image from 'next/image'
import { IBookProps } from '../../BookList.types'
import styles from './BookCard.module.scss'

export function BookCard({
	id,
	volumeInfo: { title, authors, imageLinks, description },
}: IBookProps) {
	const isFavorite = useFavorite(id)
	const addBook = useAddBook()
	const removeBook = useRemoveBook()

	const handleChange = () => {
		if (isFavorite) removeBook(id)
		else
			addBook({ id, volumeInfo: { title, authors, imageLinks, description } })
	}

	return (
		<li className={styles.card}>
			<Image
				className={styles.cardImage}
				src={imageLinks?.thumbnail || '/images/notFound.png'}
				alt={title || 'book'}
				width={100}
				height={200}
			/>
			<div className={styles.cardInfo}>
				<h3 className={styles.cardTitle}>{title || 'No title information'}</h3>
				<span className={styles.cardAuthors}>
					Author(s): {authors?.join(', ') || 'No authors information'}
				</span>
				<p className={styles.cardDescription}>
					{description || 'No description'}
				</p>
				<button
					className={`${styles.cardButton} ${isFavorite && styles.added}`}
					onClick={handleChange}
				>
					{isFavorite ? 'Remove from favorites' : 'Add to favorites'}
				</button>
			</div>
		</li>
	)
}
