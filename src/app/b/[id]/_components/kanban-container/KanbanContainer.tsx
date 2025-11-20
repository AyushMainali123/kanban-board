"use client";

import { DndContext, DragOverlay, KeyboardSensor, PointerSensor,  useSensor, useSensors } from "@dnd-kit/core";
import { ColumnsContainer } from "../columns-container";
import { ColumnAdder } from "../column-adder";
import { useActiveDrag } from "@/store/active-drag";
import { Column } from "../column";
import { Task } from "../task";
import { useDragController } from "../../_hooks/use-drag-controller";
import { useIsClient } from "@/hooks/use-is-client";
import { Loader2 } from "lucide-react";
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';


const DRAG_DISTANCE_FOR_ACTIVATION = 5;

export const KanbanContainer = () => {

    const { activeColumn, activeTask } = useActiveDrag();
    const isClient = useIsClient();
    
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: DRAG_DISTANCE_FOR_ACTIVATION
            }
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
            keyboardCodes: {
                start: ['Space',],
                cancel: ['Escape'],
                end: ['Space'],
            }
        })
    );

    const {handleDragStart, handleDragEnd, handleDragOver} = useDragController();


    if(!isClient) return (
        <div className="flex justify-center items-center h-32">
            <Loader2 className="animate-spin" />
        </div>
    )

    return (
    <div className="flex gap-8">
        <DndContext sensors={sensors}  onDragStart={handleDragStart}  onDragEnd={handleDragEnd} onDragOver={handleDragOver}> 
            <ColumnsContainer />
            {(activeColumn || activeTask)  && (
                    <DragOverlay>
                        {activeColumn && (
                            <Column shouldAnimateLists={false} state="overlay"  {...activeColumn} />
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