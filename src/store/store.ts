'use client'

import { IBookProps } from '@/app/bookList/BookList.types'
import { useMemo } from 'react'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface IBookStore {
	booksById: Record<string, IBookProps>
	favoriteBookIds: string[]
	addBook: (book: IBookProps) => void
	removeBook: (id: string) => void
}

export const useBookStore = create<IBookStore>()(
	persist(
		set => ({
			booksById: {},
			favoriteBookIds: [],
			addBook: book =>
				set(state => {
					if (!book.id || state.booksById[book.id]) return state
					return {
						booksById: { ...state.booksById, [book.id]: book },
						favoriteBookIds: [...state.favoriteBookIds, book.id],
					}
				}),
			removeBook: id =>
				set(state => {
					if (!state.booksById[id]) return state
					const booksById = { ...state.booksById }
					delete booksById[id]
					return {
						booksById,
						favoriteBookIds: state.favoriteBookIds.filter(i => i !== id),
					}
				}),
		}),
		{
			name: 'book-store',
			storage: createJSONStorage(() => localStorage),
			partialize: state => ({
				booksById: state.booksById,
				favoriteBookIds: state.favoriteBookIds,
			}),
		},
	),
)

export const useBooks = () => {
	const favoriteBookIds = useBookStore(state => state.favoriteBookIds)
	const booksById = useBookStore(state => state.booksById)
	return useMemo(
		() =>
			favoriteBookIds
				.map(id => booksById[id])
				.filter((b): b is IBookProps => b !== undefined),
		[favoriteBookIds, booksById],
	)
}

export const useFavorite = (id: string) =>
	useBookStore(state => Boolean(state.booksById[id]))

export const useAddBook = () => useBookStore(state => state.addBook)
export const useRemoveBook = () => useBookStore(state => state.removeBook)
