export interface ISearchFormProps {
	inputText: string
	isLoading: boolean
	onSearch: () => void
	setInputText: (value: string) => void
}
