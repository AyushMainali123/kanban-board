"use client";

import { IColumn, useColumnsStore } from "@/store/columns";
import { Column } from "../column";
import { SortableContext } from "@dnd-kit/sortable";
import { DragOverlay } from "@dnd-kit/core";


interface IColumnsContainerProps {
    activeColumn: IColumn | null;
}

export  function ColumnsContainer({activeColumn}: IColumnsContainerProps) {
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
                {activeColumn && (
                    <DragOverlay>
                        <Column state="overlay"  {...activeColumn} />
                    </DragOverlay>
                )}
            </SortableContext>
        </div>
    )
}