'use client';

import { Button } from '@/components/ui/button';
import { TrashIcon } from 'lucide-react';
import { TasksContainer } from '../tasks-container';
import { TaskAdder } from '../task-adder';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cn } from '@/lib/utils';
import { ColumnHeader } from '../column-header';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

interface IColumnProps {
  id: string;
  title: string;
  state?: 'overlay' | 'normal';
  shouldAnimateLists?: boolean;
  onDelete?: (id: string) => void;
}

export function Column({
  id,
  title,
  state = 'normal',
  shouldAnimateLists = true,
  onDelete,
}: IColumnProps) {
  const {
    attributes,
    listeners,
    transform,
    transition,
    setNodeRef,
    isDragging,
  } = useSortable({
    id,
    data: {
      type: 'Column',
      column: { id, title },
    },
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  return (
    <Card
      className={cn(
        'relative h-min w-xs cursor-pointer',
        state === 'overlay' && 'rotate-3 opacity-70'
      )}
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      {isDragging && (
        <div className="absolute top-0 left-0 h-full w-full rounded-sm bg-gray-300" />
      )}
      <CardContent className="flex items-center justify-between gap-2">
        <ColumnHeader columnId={id} title={title} />
        <Button
          size={'icon'}
          aria-label="Delete Column"
          variant={'secondary'}
          onClick={() => onDelete?.(id)}
        >
          <TrashIcon />
        </Button>
      </CardContent>
      <CardContent className="h-min max-h-[600px] overflow-auto">
        <TasksContainer shouldAnimateLists={shouldAnimateLists} columnId={id} />
      </CardContent>
      <CardFooter>
        <TaskAdder columnId={id} />
      </CardFooter>
    </Card>
  );
}
