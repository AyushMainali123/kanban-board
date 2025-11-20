import { create } from "zustand";
import { IColumn } from "./columns";
import { ITask } from "./tasks";
import { devtools } from "zustand/middleware";

interface IActiveDragState {
    activeColumn: IColumn | null;
    activeTask: ITask | null;
    setActiveColumn: (column: IColumn) => void;
    setActiveTask: (task: ITask) => void;
    clearActiveDrag: () => void;
}

export const useActiveDrag = create<IActiveDragState>()(
    devtools(
        (set) => ({
            column: null,
            task: null,
            setActiveColumn: activeColumn => {
                set(() => ({
                    activeTask: null,
                    activeColumn
                }))
            },
            setActiveTask: activeTask => {
                set(() => ({
                    activeTask,
                    column: null
                }))
            },
            clearActiveDrag: () => {
                set(() => ({
                    activeColumn: null,
                    activeTask: null
                }))
            }
        })
    )
)