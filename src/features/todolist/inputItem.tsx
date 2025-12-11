import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { SubmitHandler, useForm } from 'react-hook-form';

type CreateTodoFormValues = {
  label: string;
};

export const InputItem = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTodoFormValues>();
  const onSubmit: SubmitHandler<CreateTodoFormValues> = (data) =>
    console.log(data);

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)}
      className="flex gap-3 w-full p-3">
        <Field>
            <FieldLabel htmlFor="input-id">Label</FieldLabel>
            <Input
            {...register('label', {
                required: "Veuillez completer le champ 'LABEL' !",
            })}
            />
            <Input type="submit"/>
            {errors.label &&(<FieldError>{errors.label.message}</FieldError>)}
        </Field>
    </form>
  );
};
