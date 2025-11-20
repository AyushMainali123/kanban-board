"use client";

import { useColumnsStore } from "@/store/columns";
import { Column } from "../column";
import { SortableContext } from "@dnd-kit/sortable";


export  function ColumnsContainer() {
    const { columns, removeColumn } = useColumnsStore();
    const columnsId = columns.map(column => column.id);

    function handleColumnDelete(columnId: string) {
        removeColumn(columnId);
    }

    return (
        <div className="flex gap-8">
            <SortableContext items={columnsId}>
                {columns.map(column => (
                    <Column {...column} onDelete={() => handleColumnDelete(column.id)} key={column.id} />
                ))}
                
            </SortableContext>
        </div>
    )
}