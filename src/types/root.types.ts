export interface IBase {
	id: number
	createdDate: string
	lastModifiedDate: string
	createdBy: string
	lastModifiedBy: string
}

export type TResponse<T> = T | "error" | null