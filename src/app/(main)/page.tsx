'use client'

import DataTable from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { columnsImportData } from "@/constants/import-data.constants";
import { ADMIN_PAGES } from "@/constants/pages.constants";
import { useImportData } from "@/hooks/useImportData";
import { cn } from "@/lib/utils";
import { Plus, RefreshCcw, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Data from "@/components/data";
import { TPaginationSearch } from "@/types/root.types";

export default function Home() {
  const {data, update, isLoading, pagination, setPage, query, setQuery} = useImportData();

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
          <Link href={ADMIN_PAGES.CREATE_IMPORT_DATA}>
            <Plus />
          </Link>
        </Button>
      </div>
      <div className="w-full my-6">
        <Data
          columns={columnsImportData}
          data={data}
          isLoading={isLoading}
          pagination={pagination}
          set_page={(pagination: TPaginationSearch) => setPage(pagination)}
        />
      </div>
    </div>
  );
}
