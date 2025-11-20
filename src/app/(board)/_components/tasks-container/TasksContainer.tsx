import { useMemo } from "react";
import { Task } from "../task";
import { useTaskStore } from "@/store/tasks";
import { SortableContext } from "@dnd-kit/sortable";
import { AnimatePresence, motion } from "motion/react";

interface ITasksContainer {
    columnId: string;
    shouldAnimateLists?: boolean;
}

export function TasksContainer({ columnId, shouldAnimateLists = true }: ITasksContainer) {
    
    const {tasks: allTasks} = useTaskStore();
    const filteredTasks = useMemo(() => allTasks.filter(task => task.columnId === columnId), [columnId, allTasks]);
    const taskIds = useMemo(() => filteredTasks.map(task => task.id), [filteredTasks]);
    
    return (
        <ul className="py-4 flex flex-col gap-4">
            <SortableContext items={taskIds}>

                {
                    shouldAnimateLists === false && filteredTasks.map(task => (
                        <li key={task.id}>
                            <Task id={task.id} title={task.title}  />
                        </li>
                    ))
                }

                {
                    shouldAnimateLists === true && (
                     <AnimatePresence>
                    {filteredTasks.map(task => (
                                <motion.li 
                                    key={task.id}
                                    initial={{ opacity: 0, height: 0 }} 
                                    animate={{ opacity: 1, height: "auto" }} 
                                    exit={{ opacity: 0, height: 0 }} 
                                    transition={{ duration: 0.15 }}
                                >
                                    <Task id={task.id} title={task.title}  />
                                </motion.li>
                            ))}
                        </AnimatePresence>
                    
                    )
                }
               
            </SortableContext>
        </ul>
    )
}