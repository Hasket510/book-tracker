'use client'
import { useList } from '@/hooks/useList'
import { useCallback, useEffect, useRef, useState } from 'react'
import { BookCard } from './BookCard/BookCard'
import styles from './BookListView.module.scss'
import { SearchForm } from './SearchForm/SearchForm'

export function BookListView() {
	const [inputText, setInputText] = useState('')
	const [searchBook, setSearchBook] = useState('random books')
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

			{hasNextPage && <div ref={observerRef}></div>}

			{(isLoading || isFetchingNextPage) && <p>Loading...</p>}

			{isError && <p>Error fetching books</p>}
		</section>
	)
}
