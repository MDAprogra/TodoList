'use client';

import { Spinner } from '@/components/ui/spinner';
import { Todo } from '@/generated/prisma/client';
import { useMutation, useQuery } from '@tanstack/react-query';
import { TodoListItem } from '../todolist/todolistItem';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const HomePageArchive = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const result = await fetch('/api/todo/archive');
      if (!result.ok) throw new Error('Cannot get todos');
      return (await result.json()) as { data: Array<Todo> };
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (todo: Todo) => {
      const result = await fetch('/api/todo/archive', {
        method: 'POST',
        body: JSON.stringify(todo),
      });

      return (await result.json()) as { data: Todo };
    },
    onSuccess: (_data, _vars, _onMutate, ctx) => {
      ctx.client.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const todos = data?.data || [];

  return (
    <>
      <div>
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-heading md:text-5xl lg:text-6xl items-center p-3">
          Todo List
        </h1>
        <Button asChild variant={'outline'}>
        <Link href="/">Go Back</Link>
        </Button>

        {isLoading && (
          <div className="flex gap-2 items-center">
            <Spinner />
            Loading todos ...
          </div>
        )}
        {todos.map((todo) => (
          <TodoListItem
            todo={todo}
            key={todo.id}
            onChange={() => mutate(todo)}
            disableDeleteButton={true}
          />
        ))}
      </div>
    </>
  );
};
