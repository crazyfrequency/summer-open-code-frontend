import { axiosWithAuth } from "@/api/interceptors"
import { get_params } from "@/lib/pagination"
import { IBicDirectoryEntry, IImportData } from "@/types/import-data.types"
import { TPagination, TPaginationSearch } from "@/types/root.types"

export class ImportDataService {
	private static BASE_URL = '/importData'

	public static getImportData = async (
		pagination?: TPaginationSearch,
		filter?: string
	) => await axiosWithAuth.get<TPagination<IImportData>>(`${this.BASE_URL}`, {
		params: get_params(pagination, filter)
	})
}

export class BicDirectoryEntryService {
	private static BASE_URL = '/bicDirectoryEntry'

	public static getBicDirectoryEntry = async (
		pagination?: TPaginationSearch,
		filter?: string
	) => await axiosWithAuth.get<TPagination<IBicDirectoryEntry>>(`${this.BASE_URL}`, {
		params: get_params(pagination, filter)
	})

	public static getBicDirectoryEntryByImportDataId = async (
		id: number,
		pagination?: TPaginationSearch,
		filter?: string
	) => await axiosWithAuth.get<TPagination<IBicDirectoryEntry>>(
		`${this.BASE_URL}`, {
			params: {
				...get_params(pagination, filter),
				importDataId: id
			}
		})
}