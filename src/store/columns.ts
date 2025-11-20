import { arrayMove } from "@dnd-kit/sortable";
import { createId } from "@paralleldrive/cuid2";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface IColumn {
    id: string;
    title: string;
    taskIds: string[];
}

interface IColumnsState {
    columns: IColumn[];
    addColumn: (title: string) => void;
    removeColumn: (columnId: string) => void;
    updateColumn: (column: IColumn) => void;
    swapColumn: (fromIndex: number, toIndex: number) => void;
}



export const useColumnsStore = create<IColumnsState>()(
  devtools(
    persist(
        (set, get) => ({
            columns: [],
            addColumn: (title: string) => {
                const newColumn: IColumn = {title, taskIds: [], id: createId()};
                set((state) => ({
                    columns: [...state.columns, newColumn]
                }))
            },
            removeColumn: (columnId: string) => {
                const column = get().columns.find(col => col.id === columnId);
                if (!column) return;

                set((state) => ({
                    columns: state.columns.filter((col) => col.id !== columnId),
                }));
            },
            updateColumn: (updatedColumn: IColumn) => {
                set((state) => ({
                    columns: state.columns.map((col) =>
                        col.id === updatedColumn.id ? updatedColumn : col
                    ),
                }));
            },
            swapColumn: (fromIndex: number, toIndex: number) => {
                set((state) => ({
                    columns: arrayMove(state.columns, fromIndex, toIndex)
                }));
            }

        }),

      {
        name: "columns-storage",
      }
    )
    )
);