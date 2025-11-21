'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useBoardStore } from '@/store/boards';
import { zodResolver } from '@hookform/resolvers/zod';
import { Activity, useId, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';

type Mode = 'default' | 'create';

const boardFormSchema = z.object({
  boardName: z.string().min(3, 'board should be atleast 3 characters long!'),
  boardDescription: z.string(),
});

type BoardForm = z.infer<typeof boardFormSchema>;

const DEFAULT_FORM_VALUES: BoardForm = {
  boardName: '',
  boardDescription: '',
};

export function BoardAdder() {
  const { addBoard } = useBoardStore();
  const [mode, setMode] = useState<Mode>('default');
  const id = useId();

  const formMethods = useForm<BoardForm>({
    resolver: zodResolver(boardFormSchema),
    defaultValues: DEFAULT_FORM_VALUES,
  });

  function handleFormSubmit(data: BoardForm) {
    addBoard(data.boardName, data.boardDescription);
    formMethods.reset(DEFAULT_FORM_VALUES);
    setMode('default');
  }

  return (
    <>
      <Activity mode={mode === 'default' ? 'visible' : 'hidden'}>
        <Button
          variant={'outline'}
          className="w-xs"
          onClick={() => setMode('create')}
        >
          + Add New board
        </Button>
      </Activity>

      <Activity mode={mode === 'create' ? 'visible' : 'hidden'}>
        <Card className="max-w-sm">
          <CardContent>
            <form
              id={`create-board-form-${id}`}
              onSubmit={formMethods.handleSubmit(handleFormSubmit)}
            >
              <Controller
                control={formMethods.control}
                name="boardName"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      Enter board name
                    </FieldLabel>
                    <Input
                      type="text"
                      placeholder="Board name"
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

              <Controller
                control={formMethods.control}
                name="boardDescription"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="mt-6">
                    <FieldLabel htmlFor={field.name}>
                      Enter board Description
                    </FieldLabel>
                    <Textarea
                      placeholder="Board description"
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

              <div className="mt-2 flex items-center gap-2">
                <Button type="submit">Submit</Button>
                <Button
                  type="button"
                  variant={'secondary'}
                  onClick={() => setMode('default')}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </Activity>
    </>
  );
}
