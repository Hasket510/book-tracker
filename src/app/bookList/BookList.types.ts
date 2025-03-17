export interface IBookProps {
	id: string
	volumeInfo: {
		title: string
		authors: string[]
		description: string
		imageLinks: {
			thumbnail: string
		}
	}
}
