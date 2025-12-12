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
    <>
      <h1>Sign in</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-3 w-full p-3">
        <div className="w-full max-w-md">
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="text"
                  placeholder="your-email@example.com"
                  {...register('email')}
                />
                <FieldDescription>Write your email account</FieldDescription>
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <FieldDescription>Write your password account</FieldDescription>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  {...register('password')}
                />
              </Field>
            </FieldGroup>
          </FieldSet>
        </div>
        <Input type="submit" />
      </form>
      <Button asChild variant={'link'}>
        <Link href="/sign-up">Don&apos;t have an account? Create it ...</Link>
      </Button>
    </>
  );
};
