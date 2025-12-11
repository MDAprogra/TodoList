import { prisma } from '@/lib/prisma';
import { PrismaClientValidationError } from '@prisma/client/runtime/client';

export async function GET() {
  const todos = await prisma.todo.findMany({
    orderBy: [
      {
        status: 'desc',
      },
      {
        createdAt: 'desc',
      },
    ],
  });
  return Response.json({ data: todos });
}

export async function POST(req: Request) {
  const todo = await req.json();

  if(todo.label === "")
  {
    todo.label = null 
  }

  try {
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
      },
    });
    return Response.json({ data: upsertTodo }, { status: 200 });
  } catch (error) {
    if (error instanceof PrismaClientValidationError) {
      return Response.json({ message: error.message }, { status: 400 });
    }
    return Response.json({ message: error }, { status: 400 });
  }
}
