import { prisma } from '@/lib/prisma';

export async function GET(_req: Request,
  {
    params,
  }: {
    params: Promise<{ idUser: string }>;
  }) {
  const todos = await prisma.todo.findMany({
    where: {
      isDeleted: true,
      userId: (await params).idUser,
    },
    orderBy: [
      {
        status: 'desc',
      },
      {
        updatedAt: 'desc',
      },
    ],
  });
  return Response.json({ data: todos });
}
