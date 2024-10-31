'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import AuthLayout from '@/components/layouts/AuthLayout';
import {
  AvatarIcon,
  EmailIcon,
  EyeIcon,
  EyeSlashIcon,
  SpinnerIcon,
} from '@/assets/icons';

import { Button } from '@/components/core/button';
import {
  Form,
  FormControl,
  FormField,
  FormMessage,
} from '@/components/core/form';
import { useLoginMutation } from '@/store/features/auth/authApi';
import { IconInput } from '@/components/core/icon-input';
import { IconType } from '@/lib/types';
import { setCookies } from '@/lib/helpers';

const authSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email')
    .min(1, 'Email is required'),
  password: z.string().min(1, 'Password is Required'),
});

type FormFields = z.infer<typeof authSchema>;

export default function PartialLogin() {
  const router = useRouter();
  const [showPass, setShowPass] = useState<boolean>(false);

  const formFields: Array<{
    name: keyof FormFields;
    label: string;
    type: string;
    icon?: IconType;
    showRightIcon?: boolean;
    rightIcon?: IconType;
  }> = [
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      icon: EmailIcon,
    },
    {
      name: 'password',
      label: 'Enter your password',
      type: showPass ? 'text' : 'password',
      rightIcon: showPass ? EyeIcon : EyeSlashIcon,
      showRightIcon: true,
    },
  ];

  const [login, { isLoading }] = useLoginMutation();

  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (values: z.infer<typeof authSchema>) => {
    try {
      const response = await login(values);
      if (
        response &&
        response.data &&
        response.data.data &&
        response.data.data.token
      )
        await setCookies(response.data.data.token);
      router.push('/products');
    } catch (error) {
      console.error('Login Error:', error);
    }
  };

  const toggleHidePassword = () => {
    setShowPass(!showPass);
  };

  return (
    <AuthLayout>
      <div className="w-full flex flex-col items-center justify-center">
        <div className="w-full  md:w-1/2 2xl:w-1/3 py-8 px-4 md:px-8 flex items-center flex-col justify-center bg-foreground rounded-3xl  border-2 border-primary">
          <AvatarIcon className="w-15 h-16" />
          <h1 className="text-3xl text-center font-semibold text-headingColor mt-2">
            Welcome Back!
          </h1>
          <div className="flex align-center pt-2">
            <p className="text-base font-normal text-center text-subHeadingColor pb-6">
              Please enter your credentials to access your account.
            </p>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid w-full gap-0.5"
            >
              <div className="flex flex-col">
                <div className="flex flex-col">
                  {formFields.map((field) => (
                    <FormField
                      key={field.name}
                      control={form.control}
                      name={field.name}
                      render={({ field: formField }) => (
                        <div>
                          <FormControl>
                            <IconInput
                              {...formField}
                              type={field.type}
                              icon={field.icon}
                              showIcon={false}
                              showRightIcon={field.showRightIcon}
                              rightIcon={field.rightIcon}
                              onClickRightIcon={toggleHidePassword}
                              id={field.label
                                .replace(/\s+/g, '-')
                                .toLowerCase()}
                              aria-label={field.label}
                              label={field.label}
                              error={!!form.formState.errors[field.name]}
                              className={
                                formField.name === 'password'
                                  ? 'mt-4 pt-4 pb-2'
                                  : 'pt-4 pb-2'
                              }
                              inputClassName="text-base h-10 -mt-2"
                            />
                          </FormControl>
                          <FormMessage className="text-destructive">
                            {form.formState.errors[field.name]?.message}
                          </FormMessage>
                        </div>
                      )}
                    />
                  ))}
                </div>
                <Button
                  variant="default"
                  type="submit"
                  className="w-full mt-5"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <SpinnerIcon className="text-white" />
                  ) : (
                    'Log in'
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </AuthLayout>
  );
}
