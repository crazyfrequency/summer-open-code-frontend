import { checkErrorMessage } from "@/api/error";
import { AUTH_PAGES } from "@/constants/pages.constants";
import { check_params, get_pagination } from "@/lib/pagination";
import { ImportDataService } from "@/services/import-data.service";
import { IImportData } from "@/types/import-data.types";
import { TPaginationSearch, TResponse } from "@/types/root.types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function useImportData() {
  const router = useRouter();
  const path = usePathname();
  const params = useSearchParams();
  let [data, setData] = useState<TResponse<IImportData>>(null);
  let [isLoading, setLoading] = useState(true);
  let [pagination, setPagination] = useState<TPaginationSearch>(get_pagination(params));
  let [query, setQuery] = useState(params.get("query") ?? "");
  const update = async () => {
    setLoading(true);
    let response = await ImportDataService.getImportData(pagination, query);
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
  useEffect(() => check_params(
    router, path, params, pagination, query, update
  ),[pagination, query]);
  useEffect(() => {
    setPagination(get_pagination(params));
    setQuery(params.get("query") ?? "");
    update();
  }, [params]);
  return { data, update, isLoading, pagination, setPage: setPagination, query, setQuery };
}
