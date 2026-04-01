export interface IBooksApiResponse {
	items?: IBookProps[]
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
