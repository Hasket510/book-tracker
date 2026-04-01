import { Metadata } from 'next'
import { BookListView } from './BookListView'

export const metadata: Metadata = {
	title: 'Book-list',
	description: 'Book-list',
}

export default function Page() {
	return <BookListView />
}
