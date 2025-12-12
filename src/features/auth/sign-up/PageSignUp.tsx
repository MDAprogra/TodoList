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
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Sign up
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
                    htmlFor="name"
                    className="text-gray-700 font-medium mb-2 block"
                  >
                    Name
                  </FieldLabel>
                  <Input
                    id="name"
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    {...register('name')}
                  />
                  <FieldDescription className="text-gray-500 text-sm mt-1">
                    Write your name account
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
              Sign up
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
