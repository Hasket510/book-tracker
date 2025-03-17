import { Metadata } from 'next/types'
import { FavoritesView } from './FavoritesView/FavoritesView'

export const metadata: Metadata = {
	title: 'Favorites',
	description: 'Book-list favorites',
}

export default function Page() {
	return <FavoritesView />
}
