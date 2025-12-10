'use client'
import { Spinner } from '@/components/ui/spinner';
import { TodoListItem } from '@/features/todolist/todolistItem';
import { Todo } from '@/generated/prisma/client';
import { useQuery } from '@tanstack/react-query';

export const HomePage = () => {

  const {data, isLoading} = useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const result = await fetch('/api/todo');
      if (!result.ok) throw new Error('Cannot get todos')
      return await result.json() as { data :  Array<Todo>};
    }

  })

  const todos = data?.data || [];



  
  return (
    <>
    <div>
      <h1 className="mb-4 text-4xl font-bold tracking-tight text-heading md:text-5xl lg:text-6xl items-center p-3">Todo List</h1>
    {isLoading && (
      <div className='flex gap-2 items-center'>
        <Spinner/>
        Loading todos ...
      </div>
      )}  
      {todos.map((todo) => (
        <TodoListItem todo={todo} key={todo.id} />
      ))}
      </div>
    </>
  );
};
