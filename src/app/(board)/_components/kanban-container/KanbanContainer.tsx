"use client";

import { DndContext, DragOverEvent, DragStartEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { ColumnsContainer } from "../columns-container";
import { ColumnAdder } from "../column-adder";
import { useState } from "react";
import {useColumnsStore, type  IColumn } from "@/store/columns";

// Move the container for X px before activating the drag
const DRAG_DISTANCE_FOR_ACTIVATION = 5;

export const KanbanContainer = () => {

    const [activeColumn, setActiveColumn] = useState<IColumn | null>(null);
    const {columns, swapColumn } = useColumnsStore();
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: DRAG_DISTANCE_FOR_ACTIVATION
            }
        })
    )

    function handleDragStart(ev: DragStartEvent) {
        const activeColumn = (ev.active.data.current as {data: IColumn}).data;
        setActiveColumn(activeColumn);
    }

    function handleDragOver(ev: DragOverEvent) {
        const {active, over} = ev;
        if(!over) return;

        const activeColumnId = active.id;
        const overColumnId = over.id;

        if(activeColumnId === overColumnId) return;
        const activeColumnIndex = columns.findIndex(col => col.id === activeColumnId);
        const overColumnIndex = columns.findIndex(col => col.id === overColumnId);
        swapColumn(activeColumnIndex, overColumnIndex);
    }

    return (
    <div className="flex gap-8">
        <DndContext sensors={sensors}  onDragStart={handleDragStart}  onDragOver={handleDragOver}> 
            <ColumnsContainer activeColumn={activeColumn} />
        </DndContext>
        <ColumnAdder />
    </div>
    );
};