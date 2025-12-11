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

  if (todo.label === '') {
    todo.label = null;
  }

  if (
    todo.priority !== 'LOW' &&
    todo.priority !== 'MEDIUM' &&
    todo.priority !== 'HIGH'
  ) {
    todo.priority = null;
  }

  if (todo.deadline) {
    todo.deadline = new Date(todo.deadline);
  }

  try {
    const upsertTodo = await prisma.todo.upsert({
      where: {
        id: todo.id ?? '',
        // Autre(s) si besoin ...
      },
      update: {
        status: todo.status === 'CHECKED' ? 'NOT_CHECKED' : 'CHECKED',
        // Autre(s) si besoin ...
      },
      create: {
        label: todo.label,
        priority: todo.priority ?? 'LOW',
        deadline: todo.deadline ?? undefined,
        
      },
    });
    return Response.json({ data: upsertTodo }, { status: 200 });
  } catch (error) {
    console.log(error);
    if (error instanceof PrismaClientValidationError) {
      return Response.json({ message: error.message }, { status: 400 });
    }
    return Response.json({ message: error }, { status: 400 });
  }
}
