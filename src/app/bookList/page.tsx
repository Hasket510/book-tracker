import { Metadata } from 'next/types'
import { BookListView } from './BookListView/BookListView'

export const metadata: Metadata = {
	title: 'Book-list',
	description: 'Book-list',
}

export default function Page() {
	return <BookListView />
}
