/* eslint-disable jsx-a11y/control-has-associated-label */

'use client';

import { List } from '@prisma/client';
import { ElementRef, useRef, useState } from 'react';
import { useEventListener } from 'usehooks-ts';

import { updateList } from '@/actions/update-list';
import { FormInput } from '@/components/form/form-input';
import { useAction } from '@/hooks/use-action';
import { toast } from 'sonner';

interface ListHeaderProps {
  data: List;
}

export const ListHeader = ({ data }: ListHeaderProps) => {
  const [title, setTitle] = useState(data.title);
  const [isEditing, setIsEditing] = useState(false);

  const formRef = useRef<ElementRef<'form'>>(null);
  const inputRef = useRef<ElementRef<'input'>>(null);

  const enabledEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const disabledEditing = () => {
    setIsEditing(false);
  };

  const { execute } = useAction(updateList, {
    onSuccess: (newData) => {
      toast.success(`Renamed to "${newData.title}" `);
      setTitle(newData.title);
      disabledEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const handleSubmit = (formData: FormData) => {
    const newTitle = formData.get('title') as string;
    const id = formData.get('id') as string;
    const boardId = formData.get('boardId') as string;

    if (newTitle === data.title) {
      return disabledEditing();
    }

    return execute({
      title: newTitle,
      id,
      boardId,
    });
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      formRef.current?.requestSubmit();
    }
  };

  useEventListener('keydown', onKeyDown);

  return (
    <div className='flex items-start justify-between gap-x-2 px-2 pt-2 text-sm font-semibold'>
      {isEditing ? (
        <form ref={formRef} action={handleSubmit} className='flex-1 px-0.5'>
          <input hidden id='id' name='id' value={data.id} />
          <input hidden id='boardId' name='boardId' value={data.boardId} />
          <FormInput
            ref={inputRef}
            id='title'
            onBlur={onBlur}
            placeholder='Enter list title'
            defaultValue={title}
            className='h-7 truncate border-transparent bg-transparent px-2 text-sm font-medium transition hover:border-input focus:border-input focus:bg-white'
          />
          <button type='submit' hidden />
        </form>
      ) : (
        <div
          onClick={enabledEditing}
          className='h-7 w-full border-transparent px-2.5 py-1 text-sm font-medium'
        >
          {title}
        </div>
      )}
    </div>
  );
};
