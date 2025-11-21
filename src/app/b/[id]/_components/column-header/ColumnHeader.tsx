'use client';

import { Field } from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';
import { useColumnsStore } from '@/store/columns';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';

interface IColumnHeaderProps {
  title: string;
  columnId: string;
}

type Mode = 'default' | 'edit';

const columnTitleFormSchema = z.object({
  columnName: z.string().min(3, 'Task should be atleast 1 characters long!'),
});

type ColumnTitleForm = z.infer<typeof columnTitleFormSchema>;

export function ColumnHeader({ columnId, title }: IColumnHeaderProps) {
  const [mode, setMode] = useState<Mode>('default');
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { updateColumn } = useColumnsStore();

  const formMethods = useForm<ColumnTitleForm>({
    resolver: zodResolver(columnTitleFormSchema),
    defaultValues: {
      columnName: title,
    },
  });

  useEffect(() => {
    if (mode === 'edit') inputRef.current?.focus();
  }, [mode]);

  useEffect(() => {
    if (!inputRef.current) return;
    const inputEl = inputRef.current;
    function handleBlur() {
      formRef?.current?.requestSubmit();
    }
    inputEl.addEventListener('blur', handleBlur);
    return () => {
      inputEl.removeEventListener('blur', handleBlur);
    };
  });

  function handleFormSubmit(data: ColumnTitleForm) {
    updateColumn({ id: columnId, title: data.columnName });
    setMode('default');
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    e.stopPropagation();
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
  };

  return (
    <>
      {mode === 'default' && (
        <button
          className="cursor-pointer text-left text-xl font-semibold [line-break:anywhere]"
          onClick={() => setMode('edit')}
        >
          {title}
        </button>
      )}

      {mode === 'edit' && (
        <form
          ref={formRef}
          id={`edit-column-title`}
          className="max-w-[80%] bg-transparent"
          onSubmit={formMethods.handleSubmit(handleFormSubmit)}
        >
          <Controller
            control={formMethods.control}
            name="columnName"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Textarea
                  className="min-h-fit resize-none"
                  id={field.name}
                  autoComplete="off"
                  {...field}
                  onKeyDown={handleKeyDown}
                  ref={inputRef}
                />
              </Field>
            )}
          />
        </form>
      )}
    </>
  );
}
