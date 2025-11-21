import { Separator } from '@/components/ui/separator';
import { KanbanContainer } from './_components/kanban-container';
import { RouteBreadcrumb } from './_components/route-breadcrumb';

export default function Home() {
  return (
    <main className="h-[calc(100vh-61px)] w-screen overflow-scroll px-6 py-12">
      <RouteBreadcrumb />
      <Separator className="mt-8 mb-12" />
      <KanbanContainer />
    </main>
  );
}
