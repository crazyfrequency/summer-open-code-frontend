import { checkErrorMessage } from "@/api/error";
import { AUTH_PAGES } from "@/constants/pages.constants";
import { ImportDataService } from "@/services/import-data.service";
import { IImportData } from "@/types/import-data.types";
import { TResponse } from "@/types/root.types";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function useImportData() {
  const router = useRouter();
  const path = usePathname();
  let [data, setData] = useState<TResponse<IImportData[]>>(null);
  let [isLoading, setLoading] = useState(true);
  const update = async (pagination?: {
    page: number,
    limit: number
  }, filter?: string) => {
    setLoading(true);
    let response = await ImportDataService.getImportData();
    setLoading(false);
    let status = checkErrorMessage(response);
    if (!status.ok) {
      toast.error("Не удалось получить файлы", {
        description: status.message,
        important: true,
        action: {
          label: "ок",
          onClick: () => null
        }
      });
      if (status.code === 401) router.replace(`${AUTH_PAGES.LOGIN}?next=${path}`)
    }
    if (status.ok || data === null) {
      setData(response?.data || "error");
    }
  };
  useEffect(() => {update()}, []);
  return { data, update, isLoading };
}
