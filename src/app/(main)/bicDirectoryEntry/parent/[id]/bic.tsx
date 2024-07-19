'use client'

import DataTable from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ADMIN_PAGES } from "@/constants/pages.constants";
import { cn } from "@/lib/utils";
import { Plus, RefreshCcw, Search } from "lucide-react";
import Link from "next/link";
import Data from "@/components/data";
import { TPaginationSearch } from "@/types/root.types";
import { useBicDirectoryEntryByImportData } from "@/hooks/useBicDirectoryEntry";
import { columnsBicDirectoryEntry } from "@/constants/bic-directory-entry.constants";

export default function Bic({
  id
}: {
  id: string
}) {
  const {data, update, isLoading, pagination, setPage, query, setQuery} = useBicDirectoryEntryByImportData(id);

  return (
    <div className="w-full">
      <div className="flex gap-2">
        <Input placeholder="Поиск" value={query} onChange={e => setQuery(e.currentTarget.value)} />
        <Button
          variant="outline"
          size="icon"
          onClick={()=>update()}
          disabled={isLoading}
        >
          <RefreshCcw
            className={cn(isLoading && "cursor-not-allowed animate-spin")}
          />
        </Button>
        <Button
          variant="outline"
          size="icon"
          asChild
        >
          <Link href={ADMIN_PAGES.CREATE_BIC_DIRECTORY_ENTRY}>
            <Plus />
          </Link>
        </Button>
      </div>
      <div className="w-full my-6">
        <Data
          columns={columnsBicDirectoryEntry}
          data={data}
          isLoading={isLoading}
          pagination={pagination}
          set_page={(pagination: TPaginationSearch) => setPage(pagination)}
        />
      </div>
    </div>
  );
}
