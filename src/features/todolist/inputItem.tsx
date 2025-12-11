import { SubmitHandler, useForm } from "react-hook-form"

type CreateTodoFormValues = {
        label : string;
    }

export const InputItem = ()=>{
    const {register, handleSubmit,formState: { errors },} = useForm<CreateTodoFormValues>()
    const onSubmit: SubmitHandler<CreateTodoFormValues> = (data) => console.log(data)


    return (
        <form 
    onSubmit={handleSubmit(onSubmit)} 
    className="flex flex-col gap-3 w-full max-w-sm"
>
    <input 
        className="border rounded px-3 py-2 text-sm"
        {...register("label", { 
            required: "Veuillez completer le champ 'LABEL' !" 
        })} 
    />

    {errors.label && (
        <span className="text-red-500 text-xs">
            {errors.label.message}
        </span>
    )}

    <input 
        type="submit" 
        className="bg-blue-600 text-white py-2 rounded cursor-pointer hover:bg-blue-700 transition"
    />
</form>


    )
}
