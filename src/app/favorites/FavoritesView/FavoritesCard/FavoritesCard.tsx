import { IBookProps } from '@/app/bookList/BookList.types'
import { useRemoveBook } from '@/store/store'
import notUrl from '@public/images/notFound.png'
import Image from 'next/image'
import styles from './FavoritesCard.module.scss'
export function FavoritesCard({
	id,
	volumeInfo: { title, authors, imageLinks, description },
}: IBookProps) {
	const removeBook = useRemoveBook()

	return (
		<li key={id} className={styles.card}>
			<Image
				className={styles.cardImage}
				src={imageLinks?.thumbnail || notUrl}
				alt={title || 'book'}
				width={100}
				height={200}
			/>
			<div className={styles.cardInfo}>
				<h3 className={styles.cardTitle}>
					{title ? title : 'No title information'}
				</h3>
				<span className={styles.cardAuthors}>
					Author(s): {authors ? authors.join(', ') : 'No authors information'}
				</span>
				<p className={styles.cardDescription}>
					{description ? description : 'No description'}
				</p>
				<button className={styles.cardButton} onClick={() => removeBook(id)}>
					Remove from favorites
				</button>
			</div>
		</li>
	)
}
