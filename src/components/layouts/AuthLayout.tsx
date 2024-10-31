import React from 'react';

import { EmailIcon } from '@/assets/icons';

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="w-full flex flex-col justify-between p-4"
      style={{ height: '100dvh' }}
    >
      <div className="bg-primary text-white text-xl font-bold w-[100px] h-[100px] flex justify-center items-center">
        <div>what.</div>
      </div>
      <div className="w-full flex items-center justify-center px-4 md:px-10 ">
        {children}
      </div>
      <div className="flex h-fit justify-between">
        <div className="">
          <p className="text-accent font-normal text-xs sm:text-sm">
            © what. 2024
          </p>
        </div>
        <div className="flex items-center">
          <EmailIcon className="fill-transparent text-accent mr-2" />
          <p className="text-accent font-normal text-xs sm:text-sm">
            help@what.com
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
