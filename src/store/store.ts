import { IBookProps } from '@/app/bookList/BookList.types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface IBookStore {
	books: IBookProps[]
	addBook: (book: IBookProps) => void
	removeBook: (id: string) => void
}

export const useBookStore = create<IBookStore>()(
	persist(
		set => ({
			books: [],
			addBook: book => set(state => ({ books: [...state.books, book] })),
			removeBook: id =>
				set(state => ({ books: state.books.filter(b => b.id !== id) })),
		}),
		{ name: 'book-store' }
	)
)

export const useBooks = () => useBookStore(state => state.books)
export const useFavorite = (id: string) =>
	useBookStore(state => state.books.some(book => book.id === id))
export const useAddBook = () => useBookStore(state => state.addBook)
export const useRemoveBook = () => useBookStore(state => state.removeBook)
