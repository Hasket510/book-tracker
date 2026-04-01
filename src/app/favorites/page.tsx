import { Metadata } from 'next'
import { FavoritesView } from './FavoritesView'

export const metadata: Metadata = {
	title: 'Favorites',
	description: 'Book-list favorites',
}

export default function Page() {
	return <FavoritesView />
}
