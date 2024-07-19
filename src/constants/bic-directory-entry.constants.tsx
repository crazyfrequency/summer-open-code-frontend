import { Button } from "@/components/ui/button";
import { IBicDirectoryEntry } from "@/types/import-data.types";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { ADMIN_PAGES } from "./pages.constants";

export const columnsBicDirectoryEntry: ColumnDef<IBicDirectoryEntry>[] = [
	{
		id: "main",
		header: "БИКи",
		columns: [
			{
				accessorKey: "id",
			},
			{
				accessorKey: "bic",
				header: "БИК",
			},
			{
				accessorKey: "changeType",
				header: "Тип изменения",
			}
		]
	},
	{
		accessorKey: "participantInfo",
		header: "Информация о участнике",
		columns: [
			{
				id: "participantInfo.id",
				accessorKey: "participantInfo.id",
				header: "id"
			},
			{
				accessorKey: "participantInfo.nameP",
				header: "Наименование участника",
			},
			{
				accessorKey: "participantInfo.englName",
				header: "Наименование участника (англ.)",
			},
			{
				accessorKey: "participantInfo.regN",
				header: "Регистрационный номер участника",
			},
			{
				accessorKey: "participantInfo.cntrCd",
				header: "Код страны",
			},
			{
				accessorKey: "participantInfo.rgn",
				header: "Регион",
			},
			{
				accessorKey: "participantInfo.ind",
				header: "Индекс",
			},
			{
				accessorKey: "participantInfo.tnp",
				header: "Тип населенного пункта",
			},
			{
				accessorKey: "participantInfo.nnp",
				header: "Наименование населенного пункта",
			},
			{
				accessorKey: "participantInfo.adr",
				header: "Адрес",
			},
			{
				accessorKey: "participantInfo.prntBIC",
				header: "БИК головной организации",
			},
			{
				accessorKey: "participantInfo.dateInParticipant",
				header: "Дата вступления в состав участников перевода",
			},
			{
				accessorKey: "participantInfo.dateOutParticipant",
				header: "Дата исключения информации об участнике",
			},
			{
				accessorKey: "participantInfo.ptType",
				header: "Тип участника перевода",
			},
			{
				accessorKey: "participantInfo.srvcs",
				header: "Доступные сервисы перевода денежных средств",
			},
			{
				accessorKey: "participantInfo.xchType",
				header: "Участник обмена",
			},
			{
				accessorKey: "participantInfo.uid",
				header: "Уникальный идентификатор участника",
			},
			{
				accessorKey: "participantInfo.participantStatus",
				header: "Статус участника",
			},
			{
				accessorKey: "participantInfo.rstrLists",
				header: "Перечень ограничений участника",
				cell: ({ row }) => (
					<Button variant='ghost' asChild>
						<Link href={`${ADMIN_PAGES.RSTR_LIST}/parent/${row.getValue("participantInfo.id")}`}>
							Открыть список
						</Link>
					</Button>
				)
			}
		]
	},
	{
		accessorKey: "accounts",
		header: "Счета",
		cell: ({ row }) => (
			<Button variant='ghost' asChild>
				<Link href={`${ADMIN_PAGES.ACCOUNTS}/parent/${row.getValue("id")}`}>
					Открыть список
				</Link>
			</Button>
		)
	}
]