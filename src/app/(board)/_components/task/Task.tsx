"use client";

import { cn } from "@/lib/utils";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { TaskActions } from "../task-actions";

interface ITask {
    id: string;
    title: string;
    description?: string;
    state?: "overlay" | "normal";
}

export function Task({id, title, state="normal"}: ITask) {
    const [isHovering, setIsHovering] = useState(false);
    const {listeners, attributes, transform, transition, setNodeRef, isDragging} = useSortable({
        id,
        data: {
            task: {id, title},
            type: "Task"
        }
    });



    const style = {
        transform: CSS.Translate.toString(transform),
        transition
    };

    function handleHover() {
        setIsHovering(true);
    }

    function handleHoverLeave() {
        setIsHovering(false);
    }


    return (
        <li 
            className={cn(
                "relative flex justify-between items-center bg-gray-700 text-white rounded-sm py-3 px-4 hover:ring-2 ring-white min-h-14" ,
                state === "overlay" && "opacity-70",
                isDragging && "opacity-30"
            )}
            ref={setNodeRef} 
            onMouseEnter={handleHover}
            onMouseLeave={handleHoverLeave}
            {...attributes} 
            {...listeners}
            style={style}
        >
            <h6>
                {title}
            </h6>

                <div className={isHovering ? "block" : "hidden"}>
                    <TaskActions taskId={id}  />
                </div>
        </li>
    )
}