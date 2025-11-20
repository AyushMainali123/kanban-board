"use client";

import { Button } from "@/components/ui/button";
import { Dialog,  DialogClose,  DialogContent,  DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useTaskStore } from "@/store/tasks";
import { Trash, View, X } from "lucide-react";
import { EditTaskTitle } from "./edit-task-title";
import { useState } from "react";
import { EditTaskDescription } from "./edit-task-description";

interface ITaskActionsProps {
    taskId: string;
}

export function TaskActions({ taskId}: ITaskActionsProps) {
    const {remove, tasks} = useTaskStore();
    const [isActionsDialogOpen, setActionDialogOpen] = useState(false);
    const currentTask = tasks.find(task => task.id === taskId);

    if(!currentTask) return null;
    return (
        <div className="flex gap-0.5" >
            <Dialog open={isActionsDialogOpen} onOpenChange={setActionDialogOpen}>
                <Button variant={"ghost"} size="icon-sm" aria-label={`View Task ${currentTask.title}`} onClick={() => setActionDialogOpen(true)}>
                    <View aria-hidden="true" />
                </Button>
                <DialogContent
                    showCloseButton={false}
                    onPointerDown={(e) => e.stopPropagation()}
                    onMouseDown={(e) => e.stopPropagation()}
                >
                    <DialogHeader>
                    <DialogTitle className="flex justify-between items-center">
                        <EditTaskTitle  taskId={taskId} title={currentTask.title}  />
                        <DialogClose className="curs or-pointer"  asChild>
                            <Button aria-label="Close Dialog" size={"icon-sm"} variant={"ghost"}>
                                <X />
                            </Button>
                        </DialogClose>
                    </DialogTitle>
                    </DialogHeader>
                    <EditTaskDescription  content={currentTask.content} taskId={currentTask.id}  />
                </DialogContent>
            </Dialog>
 
            <Button variant={"ghost"} size="icon-sm" aria-label={`Delete task ${currentTask.title}`} onClick={() => remove(taskId)}>
                <Trash aria-hidden="true" />
            </Button>
        </div>
    )
}