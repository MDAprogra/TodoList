import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
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
import { ChevronDownIcon } from 'lucide-react';
import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

type CreateTodoFormValues = {
  label: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  deadline : Date;
};

export const InputItem = () => {
    const [open, setOpen] = React.useState(false)


  const { mutate, isPending } = useMutation({
    mutationFn: async (todo: Omit<CreateTodoFormValues, 'deadline'> & {deadline: string} ) => {
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
      label: data.label,
      priority: data.priority,
      deadline: data.deadline?.toISOString(),
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
          render={({ field }) => (
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

        <Controller
          name="deadline"
          control={control}
          render={({ field }) => (
        <div className="flex flex-col gap-3">
            <Label htmlFor="date" className="px-1">
        Deadline
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-48 justify-between font-normal"
          >
            {field.value ? field.value.toLocaleDateString() : "Select date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={field.value}
            captionLayout="dropdown"
            onSelect={(date) => {
              field.onChange(date)
              setOpen(false)              
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
    )}
        />

        <Input type="submit" disabled={isPending} />
        {errors.label && <FieldError>{errors.label.message}</FieldError>}
      </Field>
    </form>
  );
};
