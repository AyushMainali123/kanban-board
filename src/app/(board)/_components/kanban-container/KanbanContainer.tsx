"use client";

import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { ColumnsContainer } from "../columns-container";
import { ColumnAdder } from "../column-adder";
import { useActiveDrag } from "@/store/active-drag";
import { Column } from "../column";
import { Task } from "../task";
import { useDragController } from "../../_hooks/use-drag-controller";

const DRAG_DISTANCE_FOR_ACTIVATION = 5;

export const KanbanContainer = () => {

    const { activeColumn, activeTask } = useActiveDrag();
    
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: DRAG_DISTANCE_FOR_ACTIVATION
            }
        })
    );

    const {handleDragStart, handleDragEnd, handleDragOver} = useDragController();


    return (
    <div className="flex gap-8">
        <DndContext sensors={sensors}  onDragStart={handleDragStart}  onDragEnd={handleDragEnd} onDragOver={handleDragOver}> 
            <ColumnsContainer />
            {(activeColumn || activeTask)  && (
                    <DragOverlay>
                        {activeColumn && (
                            <Column state="overlay"  {...activeColumn} />
                        )}
                        {
                            activeTask && (
                                <Task {...activeTask} state="overlay" />
                            )
                        }
                    </DragOverlay>
                )}
        </DndContext>
        <ColumnAdder />
    </div>
    );
};