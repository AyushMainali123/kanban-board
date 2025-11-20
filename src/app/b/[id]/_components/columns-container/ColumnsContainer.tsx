"use client";

import { useColumnsStore } from "@/store/columns";
import { Column } from "../column";
import { SortableContext } from "@dnd-kit/sortable";
import { useParams } from "next/navigation";
import { useMemo } from "react";


export  function ColumnsContainer() {
    const { columns, removeColumn } = useColumnsStore();
    const params = useParams();
    const boardId = params.id;
    
    const boardColumns = useMemo(() => columns.filter(col => col.boardId === boardId), [columns, boardId]);
    const columnsId = boardColumns.map(column => column.id);

    function handleColumnDelete(columnId: string) {
        removeColumn(columnId);
    }

    return (
        <div className="flex gap-8">
            <SortableContext items={columnsId}>
                {boardColumns.map(column => (
                    <Column {...column} onDelete={() => handleColumnDelete(column.id)} key={column.id} />
                ))}
                
            </SortableContext>
        </div>
    )
}