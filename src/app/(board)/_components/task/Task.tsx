import { cn } from "@/lib/utils";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface ITask {
    id: string;
    title: string;
    description?: string;
    state?: "overlay" | "normal";
}

export function Task({id, title, state="normal"}: ITask) {
    const {listeners, attributes, transform, transition, setNodeRef, isDragging} = useSortable({
        id,
        data: {
            task: {id, title},
            type: "Task"
        }
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    };

    return (
        <li 
            className={cn(
                "relative bg-gray-700 text-white rounded-sm py-3 px-4 hover:ring-2 ring-white" ,
                state === "overlay" && "opacity-70",
                isDragging && "opacity-30"
            )}
            ref={setNodeRef} 
            {...attributes} 
            {...listeners}
            style={style}
        >
            {title}
        </li>
    )
}