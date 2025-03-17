'use client'
import { useBooks } from '@/store/store'
import { FavoritesCard } from './FavoritesCard/FavoritesCard'
import styles from './FavoritesView.module.scss'

export function FavoritesView() {
	const books = useBooks()

	return (
		<section className={styles.favoritesView}>
			<ul className={styles.favoritesList}>
				{books.map(book => (
					<FavoritesCard key={book.id} {...book} />
				))}
			</ul>
		</section>
	)
}
