'use client'
import { FavoritesCard } from '@/components/FavoritesCard'
import { useBooks } from '@/store/store'
import Link from 'next/link'
import styles from './FavoritesView.module.scss'

export function FavoritesView() {
	const books = useBooks()

	if (books.length === 0) {
		return (
			<section className={styles.favoritesView}>
				<div className={styles.emptyState} role='status'>
					<p className={styles.emptyTitle}>No favorites yet</p>
					<p className={styles.emptyHint}>
						Add books from the catalog to see them here.
					</p>
					<Link className={styles.emptyLink} href='/bookList'>
						Browse book list
					</Link>
				</div>
			</section>
		)
	}

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
