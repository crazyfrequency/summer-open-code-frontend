'use client'

import { useImportData } from "@/hooks/useImportData";

export default function Home() {
  const {data, update, isLoading} = useImportData();
  return (
    <div className="w-full">
      <div>
        
      </div>
    </div>
  );
}
