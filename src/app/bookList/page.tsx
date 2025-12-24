import { Metadata } from 'next'
import { BookListView } from './BookListView/BookListView'

export const metadata: Metadata = {
	title: 'Book-list',
	description: 'Book-list',
}

export default function Page() {
	return <BookListView />
}
