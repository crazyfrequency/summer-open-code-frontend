import { TPaginationSearch } from "@/types/root.types";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ReadonlyURLSearchParams } from "next/navigation";

export const get_params = (pagination?: TPaginationSearch, query?: string) => {
	return {
		page: (pagination?.page ?? 1) - 1,
		size: pagination?.limit ?? 10,
		searchEdno: query ?? undefined
	}
}

export const check_params = (
	router: AppRouterInstance,
	path: string,
	params: ReadonlyURLSearchParams,
	pagination: TPaginationSearch,
	query: string,
  update: () => any
) => {
  let new_params = new URLSearchParams(params);
  let updated = false;
  if ((params.get("page") ?? "1") !== (pagination?.page ?? 1).toString()) {
    new_params.set("page", (pagination?.page ?? 1).toString());
    updated = true;
  }
  if ((params.get("limit") ?? "10") !== (pagination?.limit ?? 10).toString()) {
    new_params.set("limit", (pagination?.limit ?? 10).toString());
    updated = true;
  }
  if ((params.get("query") ?? "") !== query) {
    new_params.set("query", query);
    updated = true;
  }
  
  if (updated) {
    if (new_params.get("query") === "") new_params.delete("query");
    if (new_params.get("page") === "1") new_params.delete("page");
    if (new_params.get("limit") === "10") new_params.delete("limit");
    router.push(`${path}?${new_params.toString()}`);
    pagination = get_pagination(params);
    update();
  }
};

export const get_pagination = (params: ReadonlyURLSearchParams) => {
  return {
    page: parseInt(params.get("page") ?? "1"),
    limit: parseInt(params.get("limit") ?? "10"),
  }
}