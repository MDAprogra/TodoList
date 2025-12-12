import { prisma } from '@/lib/prisma';

export async function GET() {
  const todos = await prisma.todo.findMany({
    where: {
      isDeleted: true,
    },
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
