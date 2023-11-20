interface ListWrapperProps {
  children: React.ReactNode;
}

export const ListWrapper = ({ children }: ListWrapperProps) => (
  <div className='h-full w-[272px] shrink-0 select-none'>{children}</div>
);
