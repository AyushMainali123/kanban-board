'use client';

import { useBoardStore } from '@/store/boards';
import { BoardAdder } from '../board-adder';
import { Board } from '../board';
import { useIsClient } from '@/hooks/use-is-client';
import { Loader2 } from 'lucide-react';

export function BoardsContainer() {
  const { boards, removeBoard } = useBoardStore();
  const isClient = useIsClient();

  function handleBoardDelete(boardId: string) {
    removeBoard(boardId);
  }

  if (!isClient)
    return (
      <div className="flex h-32 items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );

  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold">Your Boards</h2>
      {!!boards.length && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {boards.map((board) => (
            <Board {...board} key={board.id} onDelete={handleBoardDelete} />
          ))}
        </div>
      )}

      {boards.length === 0 && (
        <p>It is all empty here. Add boards to get started!</p>
      )}

      <div className="mt-12">
        <BoardAdder />
      </div>
    </div>
  );
}
