import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import Link from 'next/link';
import { ArrowRight, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface IBoardProps {
  id: string;
  title: string;
  description: string;
  onDelete?: (id: string) => void;
}

export function Board({ id, title, description, onDelete }: IBoardProps) {
  return (
    <Link
      key={id}
      href={`/b/${id}`}
      className="group relative block h-full focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none"
    >
      <Card className="flex h-full transform flex-col bg-white shadow-md transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-blue-400 hover:shadow-xl dark:bg-gray-800">
        <CardHeader className="flex flex-row items-center justify-between border-b border-gray-100 dark:border-gray-700">
          <h3 className="truncate text-xl font-bold text-gray-900 dark:text-gray-50">
            {title}
          </h3>
          <ArrowRight className="h-5 w-5 text-gray-400 transition-colors duration-200 group-hover:text-blue-500" />
        </CardHeader>

        <CardContent className="text-sm text-gray-600 dark:text-gray-400">
          {description ? (
            <p className="line-clamp-3">{description}</p>
          ) : (
            <div className="text-gray-400 italic dark:text-gray-500">
              No description provided
            </div>
          )}
        </CardContent>
        <CardFooter className="justify-end">
          <Button
            variant="outline"
            size="icon"
            className="z-10 bg-white/70 hover:bg-gray-100 dark:bg-gray-700/70 dark:hover:bg-gray-600"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onDelete?.(id);
            }}
            title="Delete Board"
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
