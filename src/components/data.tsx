import DataTable from '@/components/data-table';
import { TPaginationSearch, TResponse } from '@/types/root.types';
import { ColumnDef } from '@tanstack/react-table';
import { ChevronLeft, ChevronRight, Loader } from 'lucide-react';
import React from 'react'
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface IProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[],
  data: TResponse<TData>,
  isLoading: boolean,
  pagination?: TPaginationSearch,
  set_page: (pagination: TPaginationSearch) => any,
}

export default function Data<TData, TValue>({
  columns,
  data,
  isLoading,
  pagination,
  set_page
}: IProps<TData, TValue>) {
  if (isLoading && (data === null || data === "error"))
    return (
      <div className="flex justify-center gap-2">
        <Loader className="animate-spin"/> Загрузка...
      </div>
    )

  if (data === "error")
    return <div className="flex justify-center gap-2 text-red-500">Произошла ошибка...</div>
  
  return (
    <div className="w-full">
      <div className="w-full border rounded-md mb-3">
        <DataTable columns={columns} data={data} />
      </div>
      <div className='flex justify-between'>
        <div className="flex items-center gap-2">
          <span>Показывать по</span>
          <Select
            value={`${pagination?.limit ?? 10}`}
            onValueChange={(value) => set_page({...pagination, limit: Number(value)})}
            disabled={isLoading}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='5'>5</SelectItem>
              <SelectItem value='10'>10</SelectItem>
              <SelectItem value='15'>15</SelectItem>
              <SelectItem value='25'>25</SelectItem>
              <SelectItem value='50'>50</SelectItem>
              <SelectItem value='100'>100</SelectItem>
            </SelectContent>
          </Select>
          <span>записей</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => set_page({
              ...pagination,
              page: (pagination?.page ?? 1) - 1
            })}
            disabled={data?.pageNumber === 0 || isLoading}
          >
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => set_page({
              ...pagination,
              page: (pagination?.page ?? 1) + 1
            })}
            disabled={data?.pageNumber === (data?.totalPages ?? 0) - 1 || isLoading}
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  )
}
