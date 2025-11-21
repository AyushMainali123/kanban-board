import { KanbanContainer } from './_components/kanban-container';

export default function Home() {
  return (
    <main className="h-[calc(100vh-61px)] w-screen overflow-scroll px-6 py-12">
      <KanbanContainer />
    </main>
  );
}
