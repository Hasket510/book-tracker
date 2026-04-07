import { Metadata } from 'next'
import { BookListView } from './BookListView'

export const metadata: Metadata = {
	title: 'Каталог',
	description: 'Поиск и список книг',
}

export default function Page() {
	return <BookListView />
}
