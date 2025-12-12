'use client';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

type CreateDataFormValues = {
  email: string;
  password: string;
  name: string;
  image?: string;
  isSignIn: boolean;
};

export const PageSignUp = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CreateDataFormValues>();

  const router = useRouter();

  const onSubmit: SubmitHandler<CreateDataFormValues> = (data) => {
    authClient.signUp.email(
      {
        email: data.email, // user email address
        password: data.password, // user password -> min 8 characters by default
        name: data.name, // user display name
        image: data?.image, // User image URL (optional)
        callbackURL: '/', // A URL to redirect to after the user verifies their email (optional)
      },
      {
        onError: (ctx) => {
          // display the error message
          alert(ctx.error.message);
        },
        onSuccess: () => {
          router.replace('/');
        },
      }
    );
  };

  return (
    <>
      <h1>Sign up</h1>

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
                <FieldDescription>Write your name account</FieldDescription>
              </Field>
              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input id="name" type="text" {...register('name')} />
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
    </>
  );
};
