'use client';

import { cn } from '@/lib/utils';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';
import { TaskActions } from '../task-actions';

interface ITask {
  id: string;
  title: string;
  description?: string;
  state?: 'overlay' | 'normal';
}

export function Task({ id, title, state = 'normal' }: ITask) {
  const [isHovering, setIsHovering] = useState(false);
  const {
    listeners,
    attributes,
    transform,
    transition,
    setNodeRef,
    isDragging,
  } = useSortable({
    id,
    data: {
      task: { id, title },
      type: 'Task',
    },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  function handleHover() {
    setIsHovering(true);
  }

  function handleHoverLeave() {
    setIsHovering(false);
  }

  return (
    <div
      className={cn(
        'relative flex min-h-14 items-center justify-between rounded-sm bg-gray-200 px-4 py-3 shadow-sm hover:ring-2 hover:ring-amber-400',
        state === 'overlay' && 'opacity-70',
        isDragging && 'opacity-30'
      )}
      ref={setNodeRef}
      onMouseEnter={handleHover}
      onMouseLeave={handleHoverLeave}
      {...attributes}
      {...listeners}
      style={style}
    >
      <h6>{title}</h6>

      <div className={isHovering ? 'block' : 'hidden'}>
        <TaskActions taskId={id} />
      </div>
    </div>
  );
}
