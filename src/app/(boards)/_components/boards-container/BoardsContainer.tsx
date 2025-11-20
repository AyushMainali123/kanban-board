"use client";

import { useBoardStore } from "@/store/boards";
import { BoardAdder } from "../board-adder";
import { Board } from "../board";
import { useIsClient } from "@/hooks/use-is-client";
import { Loader2 } from "lucide-react";



export function BoardsContainer() {
    const {boards, removeBoard} = useBoardStore();
    const isClient = useIsClient();

    function handleBoardDelete(boardId: string) {
        removeBoard(boardId)
    }

    if(!isClient) return (
        <div className="flex justify-center items-center h-32">
            <Loader2 className="animate-spin" />
        </div>
    )

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-4">
                {boards.map(board => (
                    <Board {...board} key={board.id} onDelete={handleBoardDelete}/>
                ))}
            </div>

            <div className="mt-12">
                <BoardAdder />
            </div>
        </div>
    )
}