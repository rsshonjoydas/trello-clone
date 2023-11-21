'use client';

import { List } from '@prisma/client';
import { MoreHorizontal, X } from 'lucide-react';
import { ElementRef, useRef } from 'react';
import { toast } from 'sonner';

import { copyList } from '@/actions/copy-list';
import { deleteList } from '@/actions/delete-list';
import { FormSubmit } from '@/components/form/form-submit';
import { Button } from '@/components/ui/button';
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { useAction } from '@/hooks/use-action';

interface ListOptionsProps {
  data: List;
  onAddCard: () => void;
}

export const ListOptions = ({ data, onAddCard }: ListOptionsProps) => {
  const closeRef = useRef<ElementRef<'button'>>(null);

  const { execute: executeDelete } = useAction(deleteList, {
    onSuccess: (deleteData) => {
      toast.success(`List "${deleteData.title}" deleted`);
      closeRef.current?.click();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const { execute: executeCopy } = useAction(copyList, {
    onSuccess: (copyData) => {
      toast.success(`List "${copyData.title}" copied`);
      closeRef.current?.click();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onDelete = (formData: FormData) => {
    const id = formData.get('id') as string;
    const boardId = formData.get('boardId') as string;

    executeDelete({ id, boardId });
  };

  const onCopy = (formData: FormData) => {
    const id = formData.get('id') as string;
    const boardId = formData.get('boardId') as string;

    executeCopy({ id, boardId });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='ghost' className='h-auto w-auto p-2'>
          <MoreHorizontal className='h-4 w-4' />
        </Button>
      </PopoverTrigger>
      <PopoverContent side='bottom' align='start' className='px-0 pb-3 pt-3'>
        <div className='pb-4 text-center text-sm font-medium text-neutral-600'>List actions</div>
        <PopoverClose ref={closeRef} asChild>
          <Button
            variant='ghost'
            className='absolute right-2 top-2 h-auto w-auto p-2 text-neutral-600'
          >
            <X className='h-4 w-4' />
          </Button>
        </PopoverClose>
        <Button
          onClick={onAddCard}
          variant='ghost'
          className='h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal'
        >
          Add card...
        </Button>
        <form action={onCopy}>
          <input hidden name='id' id='id' value={data.id} />
          <input hidden name='boardId' id='boardId' value={data.boardId} />
          <FormSubmit
            variant='ghost'
            className='h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal'
          >
            Copy list...
          </FormSubmit>
        </form>
        <Separator />
        <form action={onDelete}>
          <input hidden name='id' id='id' value={data.id} />
          <input hidden name='boardId' id='boardId' value={data.boardId} />
          <FormSubmit
            variant='ghost'
            className='h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal'
          >
            Delete this list
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};
