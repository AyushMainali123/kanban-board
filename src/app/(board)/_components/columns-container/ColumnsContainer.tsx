"use client";

import { useColumnsStore } from "@/store/columns";
import { Column } from "../column";

export  function ColumnsContainer() {
    const { columns, removeColumn } = useColumnsStore();

    function handleColumnDelete(columnId: string) {
        removeColumn(columnId);
    }
    
    return (
        <div className="flex gap-8">
           {columns.map(column => (
                <Column {...column} onDelete={() => handleColumnDelete(column.id)} key={column.id} />
           ))}
        </div>
    )
}