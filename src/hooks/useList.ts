'use client'
import { IBookProps } from '@/app/bookList/BookList.types'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

interface IBooksResponse {
	items: IBookProps[]
	totalItems: number
}

const BOOKS_PAGE_SIZE = 10

const fetchBooks = async (
	search: string,
	startIndex: number
): Promise<IBooksResponse> => {
	const response = await fetch(
		`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
			search
		)}&startIndex=${startIndex}&maxResults=${BOOKS_PAGE_SIZE}&orderBy=newest`,
		{
			headers: {
				'Content-Type': 'application/json',
			},
		}
	)

	if (!response.ok) {
		const errorData = await response.json()
		throw new Error(errorData.error.message || 'Failed to fetch books')
	}

	const data = await response.json()

	return data
}
export function useList(search: string) {
	const {
		data,
		isLoading,
		isError,
		isFetchingNextPage,
		hasNextPage,
		fetchNextPage,
	} = useInfiniteQuery({
		queryKey: ['books', search],
		queryFn: ({ pageParam = 0 }) => fetchBooks(search, pageParam),
		initialPageParam: 0,
		getNextPageParam: (lastPage: IBooksResponse, allPages) => {
			const totalLoaded = allPages.flatMap(page => page.items).length
			return totalLoaded < lastPage.totalItems ? totalLoaded : undefined
		},
	})

	const uniqueBooks = useMemo(() => {
		const allBooks = data?.pages.flatMap(page => page.items) || []
		return allBooks.filter(
			(book, index, arr) => index === arr.findIndex(b => b.id === book.id)
		)
	}, [data])

	return {
		data: uniqueBooks,
		isLoading,
		isError,
		isFetchingNextPage,
		fetchNextPage,
		hasNextPage,
	}
}
