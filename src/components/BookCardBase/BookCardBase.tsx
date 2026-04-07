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
				alt={title || 'Обложка книги'}
				width={100}
				height={200}
			/>
			<div className={styles.cardInfo}>
				<h3 className={styles.cardTitle}>{title || 'Нет названия'}</h3>
				<span className={styles.cardAuthors}>
					Автор(ы): {authors?.join(', ') || 'Нет данных об авторах'}
				</span>
				<p className={styles.cardDescription}>
					{description || 'Нет описания'}
				</p>
				{action}
			</div>
		</li>
	)
}
