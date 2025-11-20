"use client";

import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { useTaskStore } from "@/store/tasks";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";


interface IEditTaskTitle {
  taskId: string;
  title: string;
}

const titleFormSchema = z.object({
  title: z.string().min(3, "Title should be at least 3 characters long!"),
});

type TitleForm = z.infer<typeof titleFormSchema>;
type Mode = "default" | "edit";


export function EditTaskTitle({ taskId, title }: IEditTaskTitle) {
  const [mode, setMode] = useState<Mode>("default");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const { updateTitle } = useTaskStore();

  const formMethods = useForm<TitleForm>({
    resolver: zodResolver(titleFormSchema),
    defaultValues: { title },
  });

  const handleFormSubmit = (data: TitleForm) => {
    updateTitle(taskId, data.title.trim());
    setMode("default");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        e.stopPropagation();
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            formRef.current?.requestSubmit();
        }
  };


  useEffect(() => {
    if (mode === "edit") textareaRef.current?.focus();
  }, [mode]);

  return (
    <>
      {mode === "default" && (
        <div className="flex items-center gap-2 w-full">
          <h4 className="font-semibold text-base transition-colors break-all max-w-[80%] wrap-break-word">
            {title}
          </h4>

          <Button
            variant="ghost"
            size="icon-sm"
            className="hover:bg-accent hover:text-primary transition"
            aria-label={`Edit Title: ${title}`}
            onClick={() => setMode("edit")}
          >
            <Edit aria-hidden="true" />
          </Button>
        </div>
      )}

      {mode === "edit" && (
        <form
          className="flex items-center w-full"
          onSubmit={formMethods.handleSubmit(handleFormSubmit)}
          ref={formRef}
        >
          <Controller
            name="title"
            control={formMethods.control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className="flex-1"
              >
                <Textarea
                  {...field}
                  ref={textareaRef}
                  onBlur={() => formMethods.handleSubmit(handleFormSubmit)()}
                  autoComplete="off"
                  onKeyDown={handleKeyDown}
                  className="resize-none min-h-fit rounded-md border bg-background p-2 shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-primary break-all wrap-anywhere"
                />
              </Field>
            )}
          />
        </form>
      )}
    </>
  );
}
