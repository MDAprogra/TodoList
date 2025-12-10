import { TodoListItem } from '@/features/todolist/todolistItem';
import { prisma } from '@/lib/prisma';

export const HomePage = async () => {
  const todos = await prisma.todo.findMany();
  return (
    <>
      {todos.map((todo) => (
        <TodoListItem todo={todo} key={todo.id} />
      ))}
    </>
  );
};
