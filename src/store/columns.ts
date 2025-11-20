import { createId } from "@paralleldrive/cuid2";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface Column {
    id: string;
    title: string;
    taskIds: string[];
}

interface ColumnsState {
    columns: Column[];
    addColumn: (title: string) => void;
    removeColumn: (columnId: string) => void;
    updateColumn: (column: Column) => void;
}



export const useColumnsStore = create<ColumnsState>()(
  devtools(
    persist(
        (set, get) => ({
            columns: [],
            addColumn: (title: string) => {
                const newColumn: Column = {title, taskIds: [], id: createId()};
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
            updateColumn: (updatedColumn: Column) => {
                set((state) => ({
                    columns: state.columns.map((col) =>
                        col.id === updatedColumn.id ? updatedColumn : col
                    ),
                }));
            },
        }),

      {
        name: "columns-storage",
      }
    )
    )
);