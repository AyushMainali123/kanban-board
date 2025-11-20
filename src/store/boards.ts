import { createId } from "@paralleldrive/cuid2";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { useColumnsStore } from "./columns";


interface IBoard {
    id: string;
    title: string;
    description: string
}

interface IBoardsState {
    boards: IBoard[];
    addBoard: (title: string, description?: string) => void;
    removeBoard: (boardId: string) => void;
}


export const useBoardStore = create<IBoardsState>()(
    devtools(
        persist(
            (set) => ({
                boards: [],
                addBoard: (title: string, description="") => {
                    set(state => {
                        const newBoard: IBoard = {
                            title,
                            description,
                            id: createId()
                        }

                        return ({
                            boards: [...state.boards, newBoard]
                        })
                    })
                },
                removeBoard: (boardId: string) => {
                    const columnState = useColumnsStore.getState();
                    const columnsToDelete  = columnState.columns.filter(col => col.boardId === boardId);
                    
                    for(const col of columnsToDelete) {
                        columnState.removeColumn(col.id);
                    }

                    set(state => {
                        return ({
                            boards: state.boards.filter(b => b.id !== boardId)
                        })
                    })
                }
            }),
            {
                name: "board-storage"
            }
        )
    )
)