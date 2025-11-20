import { arrayMove } from "@dnd-kit/sortable";
import { createId } from "@paralleldrive/cuid2";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface ITask {
    id: string;
    columnId: string;
    title: string;
    content: string;
}

interface ITaskState {
    tasks: ITask[];
    create: (columnId: string, title: string) => void;
    remove: (taskId: string) => void;
    swapTasks: (fromIndex: number, toIndex: number) => void;
    updateColumn: (taskIndex: number, columnId: string) => void;
    updateTitle: (taskId: string, title: string) => void;
    updateContent: (taskId: string, content: string) => void;
}

export const useTaskStore = create<ITaskState>()(
    devtools(
        persist(
            (set) => ({
                tasks: [],
                create: (columnId: string, title: string) => {
                    const newTask: ITask = {
                        id: createId(),
                        columnId,
                        title,
                        content: ""
                    }
                    set(state => ({
                        tasks: [...state.tasks, newTask]
                    }));
                },
                remove(taskId: string) {
                    set(state => ({
                        tasks: state.tasks.filter(task => task.id !== taskId)
                    }))
                },
                updateTitle(taskId: string,title: string) {
                    set(state => ({
                        tasks: state.tasks.map(task => task.id === taskId ? {...task, title} : task)
                    }))
                },
                updateContent(taskId: string, content: string) {
                    set(state => ({
                        tasks: state.tasks.map(task => task.id === taskId ? {...task, content} : task)
                    }))
                },
                swapTasks(fromIndex: number, toIndex: number) {
                    set(state => {
                        const newTasks = [...state.tasks];
                        newTasks[fromIndex].columnId = state.tasks[toIndex].columnId;
                        return ({
                            tasks: arrayMove(newTasks, fromIndex, toIndex)
                        })
                    })
                },
                updateColumn(taskIndex: number, columnId: string) {
                    set(state => {
                        const newTasks = [...state.tasks];
                        newTasks[taskIndex].columnId = columnId;
                        return ({
                            tasks: newTasks
                        })
                    })
                }
            }),
            
            {
                name: "task-storage"
            }
        )
    )
)