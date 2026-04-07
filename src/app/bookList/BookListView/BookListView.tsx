'use client'
import { BookCard } from '@/components/BookCard'
import { Loader } from '@/components/Loader'
import { SearchForm } from '@/components/SearchForm'
import { useList } from '@/hooks/useList'
import { useCallback, useEffect, useRef, useState } from 'react'
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
	const observerRef = useRef<HTMLDivElement>(null)

	const handleSearch = useCallback(() => {
		if (!inputText.trim()) return
		setSearchBook(inputText)
	}, [inputText])

	useEffect(() => {
		const obs = observerRef.current
		if (!obs) return

		const observer = new IntersectionObserver(([entry]) => {
			if (hasNextPage && !isFetchingNextPage && entry.isIntersecting)
				fetchNextPage()
		})

		if (obs) {
			observer.observe(obs)
		}
		return () => {
			if (obs) {
				observer.unobserve(obs)
			}
		}
	}, [hasNextPage, isFetchingNextPage, fetchNextPage])

	return (
		<section className={styles.bookListView}>
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
				<div className={styles.observerTrigger} ref={observerRef} />
			)}

			{isError && <p>Не удалось загрузить книги</p>}
		</section>
	)
}
