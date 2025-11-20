"use client";

import { DndContext } from "@dnd-kit/core";
import { ColumnsContainer } from "../columns-container";
import { ColumnAdder } from "../column-adder";

export const KanbanContainer = () => {
    return (
    <div className="flex gap-8">
        <DndContext> 
            <ColumnsContainer />
        </DndContext>
        <ColumnAdder />
    </div>
    );
};