export interface IBooksApiResponse {
	items?: unknown[]
	totalItems?: number
}

export interface IBookProps {
	id: string
	volumeInfo: {
		title?: string
		authors?: string[]
		description?: string
		imageLinks?: {
			thumbnail?: string
		}
	}
}
