"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface ITaskAdder {
    columnId: string;
}

export function TaskAdder({columnId}: ITaskAdder) {

    function addATask() {
        console.log({columnId});
    }
    return (
        <Button onClick={addATask} className="w-full bg-transparent hover:bg-gray-700">
            <Plus aria-hidden="true" />  Add a card
        </Button>
    )
}