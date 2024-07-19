import { checkErrorMessage } from "@/api/error";
import { AUTH_PAGES } from "@/constants/pages.constants";
import { check_params, get_pagination } from "@/lib/pagination";
import { BicDirectoryEntryService } from "@/services/import-data.service";
import { IBicDirectoryEntry } from "@/types/import-data.types";
import { TPaginationSearch, TResponse } from "@/types/root.types";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function useBicDirectoryEntry() {
	const router = useRouter();
	const path = usePathname();
	const params = useSearchParams();
  let [data, setData] = useState<TResponse<IBicDirectoryEntry>>(null);
  let [isLoading, setLoading] = useState(true);
  let [pagination, setPagination] = useState<TPaginationSearch>(get_pagination(params));
  let [query, setQuery] = useState(params.get("query") ?? "");

  const update = async () => {
    if (
      (params.get("page") ?? "1") !== (pagination?.page ?? 1).toString() ||
      (params.get("limit") ?? "10") !== (pagination?.limit ?? 10).toString() ||
      (params.get("query") ?? "") !== query
    ) {
      router.push(path+`?page=${pagination?.page ?? 1}&limit=${pagination?.limit ?? 10}&query=${query}`);
    };
    setLoading(true);
    let response = await BicDirectoryEntryService.getBicDirectoryEntry(pagination, query);
    setLoading(false);
    let status = checkErrorMessage(response);
    if (!status.ok) {
      toast.error("Не удалось получить БИКи", {
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

  return {data, isLoading, pagination, setPage: setPagination, query, setQuery, update}
}

export function useBicDirectoryEntryByImportData() {
	const router = useRouter();
	const path = usePathname();
  const { id } = useParams();
	const params = useSearchParams();
  let [data, setData] = useState<TResponse<IBicDirectoryEntry>>(null);
  let [isLoading, setLoading] = useState(true);
  let [pagination, setPagination] = useState<TPaginationSearch>(get_pagination(params));
  let [query, setQuery] = useState(params.get("query") ?? "");

  const update = async () => {
    setLoading(true);
    let response = await BicDirectoryEntryService.getBicDirectoryEntryByImportDataId(parseInt(id as string), pagination, query);
    setLoading(false);
    let status = checkErrorMessage(response);
    if (!status.ok) {
      toast.error("Не удалось получить БИКи", {
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

  return {data, isLoading, pagination, setPage: setPagination, query, setQuery, update}
}