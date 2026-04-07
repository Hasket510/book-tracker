'use client'
import { IBookProps, IBooksApiResponse } from '@/types/books'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

interface IBooksPage {
	items: IBookProps[]
	totalItems: number
}

const BOOKS_PAGE_SIZE = 10

function normalizeVolumeItem(book: unknown): IBookProps | null {
	if (!book || typeof book !== 'object') return null
	const b = book as Partial<IBookProps> & { id?: string }
	if (!b.id) return null
	const vi = b.volumeInfo
	return {
		id: b.id,
		volumeInfo: {
			title: vi?.title,
			authors: vi?.authors,
			description: vi?.description,
			imageLinks: vi?.imageLinks?.thumbnail
				? { thumbnail: vi.imageLinks.thumbnail }
				: undefined,
		},
	}
}

function normalizeBooksPage(data: IBooksApiResponse): IBooksPage {
	const books = data.items ?? []
	const items = books
		.map(normalizeVolumeItem)
		.filter((book: IBookProps | null): book is IBookProps => book !== null)

	const totalItems = Math.max(0, data.totalItems ?? 0)

	return { items, totalItems }
}

const fetchBooks = async (
	search: string,
	startIndex: number,
	signal?: AbortSignal,
): Promise<IBooksPage> => {
	const response = await fetch(
		`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
			search,
		)}&startIndex=${startIndex}&maxResults=${BOOKS_PAGE_SIZE}&orderBy=newest`,
		{
			headers: {
				'Content-Type': 'application/json',
			},
			signal,
		},
	)

	if (!response.ok) {
		let message = 'Не удалось загрузить книги'
		try {
			const errorData = await response.json()
			message = errorData?.error?.message ?? message
		} catch {}
		throw new Error(message)
	}

	const data: IBooksApiResponse = await response.json()
	return normalizeBooksPage(data)
}

function getNextPageParam(lastPage: IBooksPage, allPages: IBooksPage[]) {
	const totalLoaded = allPages.reduce((acc, page) => acc + page.items.length, 0)
	const total = lastPage.totalItems

	if (total === 0 && lastPage.items.length === 0) {
		return undefined
	}

	if (total === 0) {
		return lastPage.items.length < BOOKS_PAGE_SIZE ? undefined : totalLoaded
	}

	return totalLoaded < total ? totalLoaded : undefined
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
		queryFn: ({ pageParam = 0, signal }) => fetchBooks(search, pageParam, signal),
		initialPageParam: 0,
		getNextPageParam: getNextPageParam,
	})

	const uniqueBooks = useMemo(() => {
		const allBooks = data?.pages.flatMap(page => page.items) ?? []
		return allBooks.filter(
			(book, index, arr) => index === arr.findIndex(b => b.id === book.id),
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
