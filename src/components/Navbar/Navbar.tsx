import React from 'react';

import TopNavbar from './Components/TopNavbar';
import { cn } from '@/lib/cn';
import { EmailIcon } from '@/assets/icons';

interface INavbar {
  children: React.ReactNode;
  title: string;
}

function Navbar({ children, title }: INavbar) {
  return (
    <div className="flex w-full flex-col justify-between min-h-screen px-8 py-4">
      <div className="flex flex-col w-full">
        <TopNavbar title={title} />
        <div className='rounded-2xl shadow-lg bg-white p-4 flex flex-col gap-5 mt-4'>
          <p className="font-bold text-xl md:text-4xl">{title}</p>
          <div
            className={cn('flex flex-col bg-middle h-full overflow-none ')}
          >
            {children}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 px-5 gap-y-3 my-3">
        <div className="col-span-6">
          <p className="text-accent font-normal text-xs md:text-sm ">
            © what. 2024
          </p>
        </div>
        <div className="col-span-6 flex flex-row gap-x-1 items-center justify-end">
          <EmailIcon className="fill-transparent text-accent mt-0.5" />
          <p className="text-accent font-normal text-xs md:text-sm">
            help@what.com
          </p>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
