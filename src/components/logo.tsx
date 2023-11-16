import localFont from 'next/font/local';
import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';

const headingFont = localFont({
  src: '../../public/fonts/font.woff2',
});

export const Logo = () => (
  <Link href='/'>
    <div className='hidden items-center gap-x-2 transition hover:opacity-75 md:flex'>
      <Image src='/logo.svg' alt='Logo' height={30} width={30} />
      <p className={cn(headingFont.className, 'pb-1 text-lg text-neutral-700')}>Tastify</p>
    </div>
  </Link>
);
