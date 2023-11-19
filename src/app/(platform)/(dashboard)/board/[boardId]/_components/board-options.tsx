'use client';

import { MoreHorizontal, X } from 'lucide-react';
import { toast } from 'sonner';

import { deleteBoard } from '@/actions/delete-board';
import { Button } from '@/components/ui/button';
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useAction } from '@/hooks/use-action';

interface BoardOptionsProps {
  id: string;
}

export const BoardOptions = ({ id }: BoardOptionsProps) => {
  const { execute, isLoading } = useAction(deleteBoard, {
    onError: (error) => {
      toast.error(error);
    },
  });

  const onDelete = () => {
    execute({ id });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='transparent' className='h-auto w-auto p-2'>
          <MoreHorizontal className='h-4 w-4' />
        </Button>
      </PopoverTrigger>
      <PopoverContent side='bottom' align='start' className='px-0 pb-3 pt-3'>
        <div className='pb-4 text-center text-sm font-medium text-neutral-600'>Boarder actions</div>
        <PopoverClose asChild>
          <Button
            variant='ghost'
            className='absolute right-2 top-2 h-auto w-auto p-2 text-neutral-600'
          >
            <X className='h-4 w-4' />
          </Button>
        </PopoverClose>
        <Button
          variant='ghost'
          onClick={onDelete}
          disabled={isLoading}
          className='h-auto  w-full justify-start rounded-none p-2 px-5 text-sm'
        >
          Delete this board
        </Button>
      </PopoverContent>
    </Popover>
  );
};
