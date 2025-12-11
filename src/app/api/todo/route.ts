import { prisma } from '@/lib/prisma';

export async function GET() {
  const todos = await prisma.todo.findMany({
    orderBy: [{
      status: 'desc',
    },
    {
      createdAt: 'asc',
    },]
  });
  return Response.json({ data: todos });
}

export async function POST(req: Request) {
  const todo = await req.json();

  const upsertTodo = await prisma.todo.upsert({
    where: {
      id: todo.id,
      // Autre(s) si besoin ...
    },
    update: {
      status: todo.status === 'CHECKED' ? 'NOT_CHECKED' : 'CHECKED',
      // Autre(s) si besoin ...
    },
    create: {
      label: todo.label,
      // Autre(s) si besoin ...
    },
  });
  return Response.json({ data: upsertTodo });
}
