"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useColumnsStore } from "@/store/columns";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { Activity, useId, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

type Mode = "default" | "create";

const columnFormSchema = z.object({
    columnName: z.string().min(3, "Column should be atleast 3 characters long!")
})

type ColumnForm = z.infer<typeof columnFormSchema>;

const DEFAULT_FORM_VALUES: ColumnForm = {
    columnName: "",
}

export function ColumnAdder() {
    const { addColumn } = useColumnsStore();
    const params = useParams();
    const boardId = params.id as string;
    const [mode, setMode] = useState<Mode>("default");
    const id = useId();
    
    const formMethods = useForm<ColumnForm>({
        resolver: zodResolver(columnFormSchema),
        defaultValues: DEFAULT_FORM_VALUES,
    });
    

    function handleFormSubmit(data: ColumnForm) {
        if(!boardId || typeof boardId !== "string") return;
        addColumn(data.columnName, boardId);
        formMethods.reset(DEFAULT_FORM_VALUES);
        setMode("default");
    }

    return (
        <>
        
        <Activity mode={mode === "default" ? "visible" : "hidden"}>
            <Button variant={"outline"} className="w-xs" onClick={() => setMode("create")}>+ Add New Column</Button> 
        </Activity>
         
        <Activity mode={mode === "create" ? "visible" : "hidden"}>
            <Card className=" h-min max-h-[600px] min-w-xs">
                <CardContent>

                <form id={`create-column-form-${id}`} className="" onSubmit={formMethods.handleSubmit(handleFormSubmit)}>
                        <Controller
                            control={formMethods.control}
                            name="columnName"
                            render={({field, fieldState}) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name}>Enter Column name</FieldLabel>
                                    <Input
                                     type="text"
                                     placeholder="Column name" 
                                     id={field.name}  
                                     autoComplete="off"  
                                     {...field}
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                         <div className="flex gap-2 items-center mt-4">
                            <Button type="submit" >Submit</Button>
                            <Button type="button" variant={"ghost"} onClick={() => setMode("default")}>Cancel</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </Activity>
        </>
      
    )
}