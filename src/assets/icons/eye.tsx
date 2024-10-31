import { cn } from '@/lib/cn';

export const EyeIcon = ({
  className,
  ...props
}: React.ComponentProps<'svg'>) => {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="currentColor"
      className={cn('h-8 w-8', className)}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14 4.5C8.5 4.5 3.6 8.5 2 14C3.6 19.5 8.5 23.5 14 23.5C19.5 23.5 24.4 19.5 26 14C24.4 8.5 19.5 4.5 14 4.5ZM14 20C10.7 20 8 17.3 8 14C8 10.7 10.7 8 14 8C17.3 8 20 10.7 20 14C20 17.3 17.3 20 14 20ZM14 10.5C12.1 10.5 10.5 12.1 10.5 14C10.5 15.9 12.1 17.5 14 17.5C15.9 17.5 17.5 15.9 17.5 14C17.5 12.1 15.9 10.5 14 10.5Z"
        fill="currentColor"
      />
    </svg>
  );
};
