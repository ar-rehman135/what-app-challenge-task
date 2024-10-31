import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { LogOutIcon, MenuIcon } from 'lucide-react';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getAuthDataSelector } from '@/store/selectors';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/core/dropdown-menu';
import { loginUrl } from '@/constants';
import { userLoggedOut } from '@/store/features/auth/authSlice';

const TopNavbar = ({ title }: { title: string }) => {
  const [emailAddress, setEmailAddress] = useState<string>('');
  // redux
  const { user } = useAppSelector(getAuthDataSelector);

  const router = useRouter();

  // rtq
  const dispatch = useAppDispatch();

  // handlers
  const handleLogout = async () => {
    try {
      dispatch(userLoggedOut());
      router.push(loginUrl);
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  useEffect(() => {
    if (user) setEmailAddress(user.email);
  }, [user]);

  return (
    <div className="flex w-full items-center justify-between">
      <div className="bg-primary text-white text-xl font-bold w-[70px] h-[70px] flex justify-center items-center shadow-lg">
        <div>what.</div>
      </div>
      <div className="py-4 flex flex-row justify-center items-center">
        <div className="mr-6">{emailAddress}</div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="border-border flex flex-row items-center cursor-pointer space-x-2 ">
              <div className="flex relative w-full items-center justify-center ">
                <MenuIcon />
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={handleLogout}>
              <LogOutIcon className="w-4 h-4 mr-2" /> Logout{' '}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default TopNavbar;
