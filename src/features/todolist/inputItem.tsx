import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Todo } from '@/generated/prisma/client';
import { useMutation } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';

type CreateTodoFormValues = {
  label: string;
};

export const InputItem = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: async (todo: Todo) => {
      const result = await fetch('/api/todo', {
        method: 'POST',
        body: JSON.stringify(todo),
      });

      return (await result.json()) as { data: Todo };
    },
    onSuccess: (_data, _vars, _onMutate, ctx) => {
      ctx.client.invalidateQueries({ queryKey: ['todos'] });
      reset();
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateTodoFormValues>();
  const onSubmit: SubmitHandler<CreateTodoFormValues> = (data) => {
    mutate({
      id: '',
      label: data.label,
      status: 'NOT_CHECKED',
      priority: 'MEDIUM',
      deadline: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-3 w-full p-3">
      <Field>
        <FieldLabel htmlFor="input-id">Label</FieldLabel>
        <Input
          disabled={isPending}
          {...register('label', {
            required: "Veuillez completer le champ 'LABEL' !",
          })}
        />

        <Input type="submit" disabled={isPending} />
        {errors.label && <FieldError>{errors.label.message}</FieldError>}
      </Field>
    </form>
  );
};
