'use client';

import { useQueryClient } from '@tanstack/react-query';
import { AlignLeft } from 'lucide-react';
import { useParams } from 'next/navigation';
import { ElementRef, useRef, useState } from 'react';
import { toast } from 'sonner';
import { useEventListener, useOnClickOutside } from 'usehooks-ts';

import { updateCard } from '@/actions/update-card';
import { FormSubmit } from '@/components/form/form-submit';
import { FormTextarea } from '@/components/form/form-textarea';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useAction } from '@/hooks/use-action';
import { CardWithList } from '@/types';

interface DescriptionProps {
  data: CardWithList;
}

export const Description = ({ data }: DescriptionProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const formRef = useRef<ElementRef<'form'>>(null);
  const textareaRef = useRef<ElementRef<'textarea'>>(null);

  const params = useParams();

  const queryClient = useQueryClient();

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      disableEditing();
    }
  };

  useEventListener('keydown', onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  const { execute, fieldErrors } = useAction(updateCard, {
    onSuccess: (newData) => {
      queryClient.invalidateQueries({
        queryKey: ['card', newData.id],
      });
      toast.success(`Card "${newData.title}" updated`);
      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const description = formData.get('description') as string;
    const boardId = params.boardId as string;

    execute({ id: data.id, description, boardId });
  };

  return (
    <div className='flex w-full items-start gap-x-3'>
      <AlignLeft className='mt-0.5 h-5 w-5 text-neutral-700' />
      <div className='w-full'>
        <p className='mb-2 font-semibold text-neutral-700'>Description</p>
        {isEditing ? (
          <form action={onSubmit} ref={formRef} className='space-y-2'>
            <FormTextarea
              id='description'
              ref={textareaRef}
              className='mt-2 w-full'
              placeholder='Add a more detailed description'
              defaultValue={data.description || undefined}
              errors={fieldErrors}
            />
            <div className='flex items-center gap-x-2'>
              <FormSubmit>Save</FormSubmit>
              <Button variant='ghost' size='sm' type='button' onClick={disableEditing}>
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div
            onClick={enableEditing}
            role='button'
            tabIndex={0} // Make the element focusable
            className='min-h-[78px] rounded-md bg-neutral-200 px-3.5 py-3 text-sm font-medium'
          >
            {data.description || 'Add a more detailed description...'}
          </div>
        )}
      </div>
    </div>
  );
};

Description.Skeleton = function DescriptionSkeleton() {
  return (
    <div className='flex w-full items-start gap-x-3'>
      <Skeleton className='h-6 w-6 bg-neutral-200' />
      <div className='w-full'>
        <Skeleton className='mb-2 h-6 w-24 bg-neutral-200' />
        <Skeleton className='h-[78px] w-full bg-neutral-200' />
      </div>
    </div>
  );
};
