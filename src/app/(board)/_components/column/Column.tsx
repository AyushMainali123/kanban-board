"use client";

import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { TasksContainer } from "../tasks-container";
import { TaskAdder } from "../task-adder";


interface IColumnProps {
    id: string;
    title: string;
    taskIds: string[];
    onDelete?: (id: string) => void;
}

export function Column({id, title, taskIds, onDelete}: IColumnProps) {

    return (
        <div className="bg-gray-900 text-white px-4 pt-6 pb-3 rounded-sm w-xs h-min max-h-[600px] cursor-pointer">
            <div className="flex justify-between items-center">
                <h4 className="text-xl font-semibold">{title}</h4>
                <Button size={"icon"} aria-label="Delete Column" variant={"secondary"} onClick={() => onDelete?.(id)}>
                    <TrashIcon />
                </Button>
            </div>

            <TasksContainer tasks={taskIds}  />
            <TaskAdder columnId={id} />
        </div>
    )
}