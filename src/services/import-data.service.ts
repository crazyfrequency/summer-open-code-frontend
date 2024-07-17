import { axiosWithAuth } from "@/api/interceptors"
import { IImportData } from "@/types/import-data.types"

export class ImportDataService {
	private static BASE_URL = '/main/importDataGet'

	public static getImportData = async () => await axiosWithAuth.get<IImportData[]>(this.BASE_URL)
}