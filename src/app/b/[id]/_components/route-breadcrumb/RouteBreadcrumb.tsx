'use client';

import Link from 'next/link';
import { HomeIcon, SlashIcon } from 'lucide-react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useBoardStore } from '@/store/boards';
import { useParams } from 'next/navigation';

export function RouteBreadcrumb() {
  const params = useParams();
  const { boards } = useBoardStore();

  const boardId = params.id;
  const currentBoard = boards.find((board) => board.id === boardId);

  if (!currentBoard) return null;
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">
              <HomeIcon aria-hidden="true" />
              <span className="sr-only">Home</span>
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <SlashIcon />
        </BreadcrumbSeparator>
        <BreadcrumbItem>{currentBoard.title}</BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
