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
				<h1 className={styles.title}>Избранное</h1>
				<div className={styles.emptyState} role='status'>
					<p className={styles.emptyTitle}>Пока нет избранного</p>
					<p className={styles.emptyHint}>
						Добавьте книги из каталога — они появятся здесь.
					</p>
					<Link className={styles.emptyLink} href='/bookList'>
						Перейти в каталог
					</Link>
				</div>
			</section>
		)
	}

	return (
		<section className={styles.favoritesView}>
			<h1 className={styles.title}>Избранное</h1>
			<ul className={styles.favoritesList}>
				{books.map(book => (
					<FavoritesCard key={book.id} {...book} />
				))}
			</ul>
		</section>
	)
}
