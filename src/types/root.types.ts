export interface IBase {
	id: number
	createdDate: string
	lastModifiedDate: string
	createdBy: string
	lastModifiedBy: string
}

export type TPagination<T> = {
	totalPages: number,
	totalElements: number,
	size: number,
	content: T[],
	pageNumber: number
}

export type TPaginationSearch = {
	page?: number,
	limit?: number
}

export type TResponse<T> = TPagination<T> | "error" | null
