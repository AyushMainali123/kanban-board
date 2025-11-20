"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useTaskStore } from "@/store/tasks";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { Activity, useEffect, useId, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

interface ITaskAdder {
    columnId: string;
}

const taskFormSchema = z.object({
    taskname: z.string().min(3, "Task should be atleast 3 characters long!")
})

type TaskForm = z.infer<typeof taskFormSchema>;


type TMode = "default" | "add";

const DEFAULT_FORM_VALUES: TaskForm = {
    taskname: "",
}

export function TaskAdder({columnId}: ITaskAdder) {

    const [mode, setMode] = useState<TMode>("default");
    const {create} = useTaskStore();
    const inputRef = useRef<HTMLInputElement>(null);
    const id = useId();
   
    const formMethods = useForm<TaskForm>({
        resolver: zodResolver(taskFormSchema),
        defaultValues: DEFAULT_FORM_VALUES,
    });    
    
    function changeModeToAdd() {
        setMode("add");
        inputRef.current?.focus();
    }

    function handleFormSubmit(data: TaskForm) {
        create(columnId, data.taskname);
        formMethods.reset();
    }


    useEffect(() => {
        if(mode === "add") inputRef.current?.focus();
    }, [mode])

    return (
        <>
            <Activity mode={mode === "default" ? "visible" : "hidden"}>
                <Button onClick={changeModeToAdd} className="w-full bg-transparent hover:bg-gray-700">
                    <Plus aria-hidden="true" />  Add a card
                </Button>
            </Activity>

            <Activity mode={mode === "add" ? "visible" : "hidden"}>
                <form id={`create-task-form-${id}`} className="w-full bg-transparent" onSubmit={formMethods.handleSubmit(handleFormSubmit)}>
                        <Controller
                            control={formMethods.control}
                            name="taskname"
                            render={({field, fieldState}) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name}>Enter Task name</FieldLabel>
                                    <Input
                                        type="text"
                                        placeholder="Task name" 
                                        id={field.name}  
                                        autoComplete="off"
                                        onKeyDown={e => e.stopPropagation()}
                                        {...field}
                                        ref={inputRef}
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                </Field>
                            )}
                        />
                        <div className="flex gap-2 items-center mt-2">
                            <Button type="submit" variant={"secondary"}  >Submit</Button>
                            <Button type="button" variant={"ghost"} onClick={() => setMode("default")}>Cancel</Button>
                        </div>
                    </form>
            </Activity>
        </>
    )
}