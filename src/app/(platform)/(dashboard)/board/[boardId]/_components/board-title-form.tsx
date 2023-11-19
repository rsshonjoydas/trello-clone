'use client';

import { Board } from '@prisma/client';
import { ElementRef, useRef, useState } from 'react';
import { toast } from 'sonner';

import { updateBoard } from '@/actions/update-board';
import { FormInput } from '@/components/form/form-input';
import { Button } from '@/components/ui/button';
import { useAction } from '@/hooks/use-action';

interface BoardTitleFormProps {
  data: Board;
}

export const BoardTitleForm = ({ data }: BoardTitleFormProps) => {
  const formRef = useRef<ElementRef<'form'>>(null);
  const inputRef = useRef<ElementRef<'input'>>(null);

  const [title, setTitle] = useState(data.title);
  const [isEditing, setIsEditing] = useState(false);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const { execute } = useAction(updateBoard, {
    onSuccess: (newData) => {
      toast.success(`Board "${newData.title}" updated!`);
      setTitle(newData.title);
      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const newTitle = formData.get('title') as string;

    execute({
      title: newTitle,
      id: data.id,
    });
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  if (isEditing) {
    return (
      <form action={onSubmit} ref={formRef} className='flex items-center gap-x-2'>
        <FormInput
          ref={inputRef}
          id='title'
          onBlur={onBlur}
          defaultValue={title}
          className='h-7 border-none bg-transparent px-[7px] py-1 text-lg font-bold focus-visible:outline-none focus-visible:ring-transparent'
        />
      </form>
    );
  }

  return (
    <Button
      onClick={enableEditing}
      variant='transparent'
      className='h-auto w-auto p-1 px-2 text-lg font-bold'
    >
      {title}
    </Button>
  );
};
