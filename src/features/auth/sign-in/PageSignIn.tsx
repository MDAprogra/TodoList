'use client';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';

type CreateDataFormValues = {
  email: string;
  password: string;
  isSignIn: boolean;
};

export const PageSignIn = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CreateDataFormValues>();
  const onSubmit: SubmitHandler<CreateDataFormValues> = (data) => {
    authClient.signIn.email(
      {
        /**
         * The user email
         */
        email: data.email,
        /**
         * The user password
         */
        password: data.password,
        /**
         * A URL to redirect to after the user verifies their email (optional)
         */
        callbackURL: '/',
        /**
         * remember the user session after the browser is closed.
         * @default true
         */
        rememberMe: false,
      },
      {
        onRequest: () => {},
      }
    );
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Sign in
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FieldSet>
            <FieldGroup className="space-y-5">
              <Field>
                <FieldLabel
                  htmlFor="email"
                  className="text-gray-700 font-medium mb-2 block"
                >
                  Email
                </FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="your-email@example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  {...register('email')}
                />
                <FieldDescription className="text-gray-500 text-sm mt-1">
                  Write your email account
                </FieldDescription>
              </Field>
              <Field>
                <FieldLabel
                  htmlFor="password"
                  className="text-gray-700 font-medium mb-2 block"
                >
                  Password
                </FieldLabel>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  {...register('password')}
                />
                <FieldDescription className="text-gray-500 text-sm mt-1">
                  Write your password account
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldSet>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Sign in
          </button>
        </form>

        <div className="mt-6 text-center">
          <Button
            asChild
            variant={'link'}
            className="text-indigo-600 hover:text-indigo-700"
          >
            <Link href="/sign-up">
              Don&apos;t have an account? Create it ...
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
