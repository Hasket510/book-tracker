import Image from 'next/image'
import styles from './BookCardBase.module.scss'
import { IBookCardBaseProps } from './BookCardBase.types'

export function BookCardBase({ book, action }: IBookCardBaseProps) {
	const { title, authors, imageLinks, description } = book.volumeInfo

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
				{action}
			</div>
		</li>
	)
}
