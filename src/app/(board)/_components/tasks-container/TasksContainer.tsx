import { useMemo } from "react";
import { Task } from "../task";
import { useTaskStore } from "@/store/tasks";
import { SortableContext } from "@dnd-kit/sortable";

interface ITasksContainer {
    columnId: string;
}

export function TasksContainer({ columnId }: ITasksContainer) {
    
    const {tasks: allTasks} = useTaskStore();
    const filteredTasks = useMemo(() => allTasks.filter(task => task.columnId === columnId), [columnId, allTasks]);
    const taskIds = useMemo(() => filteredTasks.map(task => task.id), [filteredTasks]);
    
    return (
        <ul className="py-4 flex flex-col gap-4">
            <SortableContext items={taskIds}>
                {filteredTasks.map(task => (
                    <Task id={task.id} title={task.title} key={task.id}  />
                ))}
            </SortableContext>
        </ul>
    )
}