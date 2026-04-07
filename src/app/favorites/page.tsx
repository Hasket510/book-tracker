import { Metadata } from 'next'
import { FavoritesView } from './FavoritesView'

export const metadata: Metadata = {
	title: 'Избранное',
	description: 'Сохранённые книги',
}

export default function Page() {
	return <FavoritesView />
}
