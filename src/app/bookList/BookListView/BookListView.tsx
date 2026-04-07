'use client'
import { BookCard } from '@/components/BookCard'
import { Loader } from '@/components/Loader'
import { SearchForm } from '@/components/SearchForm'
import { useList } from '@/hooks/useList'
import { useCallback, useState } from 'react'
import styles from './BookListView.module.scss'

export function BookListView() {
	const [inputText, setInputText] = useState('')
	const [searchBook, setSearchBook] = useState('случайные книги')
	const {
		data,
		isLoading,
		isError,
		isFetchingNextPage,
		fetchNextPage,
		hasNextPage,
	} = useList(searchBook)

	const handleSearch = useCallback(() => {
		if (!inputText.trim()) return
		setSearchBook(inputText.trim())
	}, [inputText])

	const loadMoreRef = useCallback(
		(node: HTMLDivElement | null) => {
			if (!node) return

			const observer = new IntersectionObserver(([entry]) => {
				if (hasNextPage && !isFetchingNextPage && entry.isIntersecting)
					fetchNextPage()
			})

			observer.observe(node)

			return () => observer.disconnect()
		},
		[hasNextPage, isFetchingNextPage, fetchNextPage],
	)

	return (
		<section className={styles.bookListView}>
			<h1 className={styles.title}>Каталог</h1>
			<SearchForm
				inputText={inputText}
				isLoading={isLoading}
				onSearch={handleSearch}
				setInputText={setInputText}
			/>

			<ul className={styles.bookList}>
				{data?.map(book => (
					<BookCard key={book.id} {...book} />
				))}
			</ul>

			{(isLoading || isFetchingNextPage) && (
				<div className={styles.loader}>
					<Loader />
				</div>
			)}

			{hasNextPage && (
				<div className={styles.observerTrigger} ref={loadMoreRef} />
			)}

			{isError && <p role='alert'>Не удалось загрузить книги</p>}
		</section>
	)
}
