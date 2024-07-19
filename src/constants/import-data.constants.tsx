import { Button } from "@/components/ui/button";
import { IImportData } from "@/types/import-data.types";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { ADMIN_PAGES } from "./pages.constants";

export const columnsImportData: ColumnDef<IImportData>[] = [
	{
		id: "main",
		header: "файлы",
		columns: [
			{
				accessorKey: "id",
			},
			{
				accessorKey: "edno",
				header: "Номер ЭС"
			},
			{
				accessorKey: "edDate",
				header: "Дата составления ЭС"
			},
			{
				accessorKey: "edAuthor",
				header: "Уникальный идентификатор составителя ЭС - УИС"
			},
			{
				accessorKey: "edReceiver",
				header: "Уникальный идентификатор получателя ЭС",
			},
			{
				accessorKey: "creationReason",
				header: "Код причины создания ЭС",
			},
			{
				accessorKey: "creationDateTime",
				header: "Дата и время создания ЭС",
			},
			{
				accessorKey: "infoTypeCode",
				header: "Код вида представления информации",
			},
			{
				accessorKey: "businessDay",
				header: "Дата ОД, к которой относятся данные Справочника БИК",
			},
			{
				accessorKey: "directoryVersion",
				header: "Версия Справочника БИК",
			},
		]
	},
	{
		accessorKey: "partInfo",
		header: "Информация о части",
		columns: [
			{
				accessorKey: "partInfo.partNo",
				header: "Номер части"
			},
			{
				accessorKey: "partInfo.partQuantity",
				header: "Количество частей"
			},
			{
				accessorKey: "partInfo.partAggregateId",
				header: "Уникальный идентификатор части",
			}
		]
	},
	{
		accessorKey: "initialED",
		header: "Идентификаторы исходного ЭСИС",
		columns: [
			{
				accessorKey: "initialED.edno",
				header: "Номер ЭС в течение опердня"
			},
			{
				accessorKey: "initialED.edDate",
				header: "Дата составления ЭС"
			},
			{
				accessorKey: "initialED.edAuthor",
				header: "Уникальный идентификатор составителя ЭС - УИС"
			}
		]
	},
	{
		accessorKey: "bicDirectoryEntryList",
		header: "Список БИК",
		cell: ({ row }) => (
			<Button variant='ghost' asChild>
				<Link href={`${ADMIN_PAGES.BIC_DIRECTORY_ENTRY}/parent/${row.getValue("id")}`}>
					Открыть список
				</Link>
			</Button>
		)
	}
]