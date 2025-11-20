import { Navbar } from "@/components/shared/navbar";
import { KanbanContainer } from "./_components/kanban-container";

export default function Home() {
  return (
    <div>
      <Navbar />
      <main className="px-6 py-12 w-screen overflow-scroll h-[calc(100vh-61px)]">
        <KanbanContainer />
      </main>
    </div>
  );
}
