import type { IBookProps } from '@/types/books'
import type { ReactNode } from 'react'

export interface IBookCardBaseProps {
	book: IBookProps
	action: ReactNode
}
