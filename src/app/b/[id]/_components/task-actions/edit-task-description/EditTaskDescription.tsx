'use client';

import { useEffect, useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';

import { Edit, Check } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useTaskStore } from '@/store/tasks';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface IEditTaskDescription {
  taskId: string;
  content: string;
}

const contentFormSchema = z.object({
  content: z.string(),
});

type ContentForm = z.infer<typeof contentFormSchema>;
type Mode = 'default' | 'edit';

export function EditTaskDescription({ taskId, content }: IEditTaskDescription) {
  const [mode, setMode] = useState<Mode>('default');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { updateContent } = useTaskStore();

  const formMethods = useForm<ContentForm>({
    resolver: zodResolver(contentFormSchema),
    defaultValues: { content },
  });

  useEffect(() => {
    if (mode === 'edit') textareaRef.current?.focus();
  }, [mode]);

  function handleBlur() {
    formMethods.handleSubmit(handleSubmit)();
  }

  function handleSubmit(data: ContentForm) {
    updateContent(taskId, data.content);
    setMode('default');
  }

  return (
    <div>
      {/* Title + Edit button */}
      <div className="flex h-12 items-center justify-between">
        <h4 className="text-base font-medium">Description</h4>
        {mode === 'default' && (
          <Button
            variant="ghost"
            size="icon"
            aria-label="Edit Description"
            onClick={() => setMode('edit')}
            className="hover:bg-muted"
          >
            <Edit className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Content / Edit Form */}
      <AnimatePresence mode="wait">
        {mode === 'default' && (
          <motion.p
            key="content-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-muted-foreground text-sm wrap-anywhere break-all whitespace-pre-line"
          >
            {content.trim() || 'No description provided.'}
          </motion.p>
        )}

        {mode === 'edit' && (
          <motion.form
            key="content-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={formMethods.handleSubmit(handleSubmit)}
          >
            <Controller
              control={formMethods.control}
              name="content"
              render={({ field, fieldState }) => (
                <div>
                  <Textarea
                    {...field}
                    ref={textareaRef}
                    onBlur={handleBlur}
                    onKeyDown={(e) => e.stopPropagation()}
                    autoComplete="off"
                    className={cn(
                      fieldState.invalid && 'border-destructive',
                      'max-w-full'
                    )}
                  />
                </div>
              )}
            />

            <div className="mt-2 flex justify-end gap-2">
              <Button type="submit" size="sm" className="flex gap-2">
                <Check className="h-4 w-4" />
                Save
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
