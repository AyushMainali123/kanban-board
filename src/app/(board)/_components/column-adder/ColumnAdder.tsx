"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useColumnsStore } from "@/store/columns";
import { zodResolver } from "@hookform/resolvers/zod";
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
    const [mode, setMode] = useState<Mode>("default");
    const id = useId();
    
    const formMethods = useForm<ColumnForm>({
        resolver: zodResolver(columnFormSchema),
        defaultValues: DEFAULT_FORM_VALUES,
    });
    

    function handleFormSubmit(data: ColumnForm) {
        addColumn(data.columnName);
        formMethods.reset(DEFAULT_FORM_VALUES);
        setMode("default");
    }

    return (
        <>
        
        <Activity mode={mode === "default" ? "visible" : "hidden"}>
            <Button variant={"outline"} className="w-xs" onClick={() => setMode("create")}>Add New Column</Button> 
        </Activity>
         
        <Activity mode={mode === "create" ? "visible" : "hidden"}>
                <form id={`create-column-form-${id}`} className="min-w-xs bg-gray-900 text-white px-4 pt-6 pb-3 rounded-sm h-min max-h-[600px]" onSubmit={formMethods.handleSubmit(handleFormSubmit)}>
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
                         <div className="flex gap-2 items-center mt-2">
                            <Button type="submit" variant={"secondary"}  >Submit</Button>
                            <Button type="button" variant={"ghost"} onClick={() => setMode("default")}>Cancel</Button>
                        </div>
                    </form>
        </Activity>
        </>
      
    )
}