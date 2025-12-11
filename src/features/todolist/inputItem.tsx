import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Todo } from '@/generated/prisma/client';
import { useMutation } from '@tanstack/react-query';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

type CreateTodoFormValues = {
  label: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
};

export const InputItem = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: async (todo: Todo) => {
      const result = await fetch('/api/todo', {
        method: 'POST',
        body: JSON.stringify(todo),
      });

      if (!result.ok) {
        throw new Error('Verifier tous les champs');
      }

      return (await result.json()) as { data: Todo };
    },
    onSuccess: (_data, _vars, _onMutate, ctx) => {
      ctx.client.invalidateQueries({ queryKey: ['todos'] });
      reset();
    },
    onError: (error) => {
      toast.error('Oups ...', {
        description: error.message,
      });
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<CreateTodoFormValues>();
  const onSubmit: SubmitHandler<CreateTodoFormValues> = (data) => {
    mutate({
      id: '',
      label: data.label,
      status: 'NOT_CHECKED',
      priority: data.priority,
      deadline: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-3 w-full p-3">
      <Field>
        <FieldLabel htmlFor="input-id">Label</FieldLabel>
        <Input disabled={isPending} {...register('label')} />

        <Controller
          name="priority"
          control={control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="input-priority">Priority</FieldLabel>
              <Select
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a priority status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Priority</SelectLabel>
                    <SelectItem value="LOW">Low</SelectItem>
                    <SelectItem value="MEDIUM">Medium</SelectItem>
                    <SelectItem value="HIGH">High</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          )}
        />

        <Input type="submit" disabled={isPending} />
        {errors.label && <FieldError>{errors.label.message}</FieldError>}
      </Field>
    </form>
  );
};
