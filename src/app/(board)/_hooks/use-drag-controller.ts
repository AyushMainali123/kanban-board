import {  DragEndEvent, DragOverEvent, DragStartEvent } from "@dnd-kit/core";

import {useColumnsStore, type  IColumn } from "@/store/columns";
import { useActiveDrag } from "@/store/active-drag";
import { ITask, useTaskStore } from "@/store/tasks";


export const useDragController  = () => {
      const {setActiveColumn, setActiveTask, clearActiveDrag } = useActiveDrag();
        const {columns, swapColumn } = useColumnsStore();
        const {swapTasks, tasks, updateColumn} = useTaskStore();

    
        function handleDragStart(ev: DragStartEvent) {
            const data = ev.active.data.current as ({column: IColumn, type: "Column" | "Task", task: ITask});
            if(data.type === "Column") {
                const activeColumn = data.column;
                setActiveColumn(activeColumn);
            }
    
            if(data.type === "Task") {
                const activeTask = data.task;
                setActiveTask(activeTask)
            }
        }
    
        function handleDragEnd(ev: DragEndEvent) {
            clearActiveDrag();
            const {active, over} = ev;
            
            if(!over) return;
    
            const activeColumnId = active.id;
            const overColumnId = over.id;
    
            if(activeColumnId === overColumnId) return;
    
            const activeColumnIndex = columns.findIndex(col => col.id === activeColumnId);
            const overColumnIndex = columns.findIndex(col => col.id === overColumnId);
    
            swapColumn(activeColumnIndex, overColumnIndex);
        }
    
        function handleDragOver(ev: DragOverEvent) {
            const {active, over} = ev;
            
            if(!over) return;
    
            const activeColumnId = active.id;
            const overColumnId = over.id;
            if(activeColumnId === overColumnId) return;
    
            const activeData = active.data.current as ({column: IColumn, type: "Column" | "Task", task: ITask});
            const overData = over.data.current as ({column: IColumn, type: "Column" | "Task", task: ITask});
    
    
            const isActiveATask = activeData.type === "Task";
            const isOverATask = overData.type === "Task";
    
            if(!isActiveATask) return;
    
            if(isActiveATask && isOverATask) {
                const activeIndex = tasks.findIndex(task => task.id === active.id);
                const overIndex = tasks.findIndex(task => task.id === over.id);
                swapTasks(
                    activeIndex,
                    overIndex
                );
            }
    
            const isOverAColumn = overData.type === "Column";
            if(isActiveATask && isOverAColumn) {
                const activeIndex = tasks.findIndex(task => task.id === active.id);
                const overColumnId = overData.column.id;
                updateColumn(activeIndex, overColumnId);
            }
        }


        return {handleDragOver, handleDragStart, handleDragEnd}
}